const express = require('express');
const router = express.Router();
const axios = require('axios');
const Order = require('../models/Order');

// Checkout and initiate payment
router.post('/checkout', async (req, res) => {
  const { phoneNumber } = req.body;
  const cart = req.session.cart || [];
  if (!cart.length) return res.status(400).send('Cart is empty');

  // Calculate total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Create order
  const order = new Order({
    userId: 'guest', // Simplified, replace with actual user ID
    products: cart,
    total,
  });
  await order.save();

  // MTN MoMo Payment Request
  try {
    const response = await axios.post(
      'https://sandbox.mtn.cm/collection/v1_0/requesttopay',
      {
        amount: total,
        currency: 'XAF', // Adjust based on your region
        externalId: order._id.toString(),
        payer: { partyIdType: 'MSISDN', partyId: phoneNumber },
        payerMessage: 'Payment for Cloth & Wears',
        payeeNote: 'Order ID: ' + order._id,
      },
      {
        headers: {
          'X-Reference-Id': Math.random().toString(36).substring(2),
          'Ocp-Apim-Subscription-Key': process.env.MTN_MOMO_SUBSCRIPTION_KEY,
          Authorization: `Bearer ${process.env.MTN_MOMO_API_KEY}`,
          'X-Target-Environment': process.env.MTN_MOMO_ENVIRONMENT,
        },
      }
    );

    if (response.status === 202) {
      order.paymentStatus = 'initiated';
      await order.save();
      res.render('checkout', { orderId: order._id, message: 'Payment initiated. Check your phone.' });
    } else {
      res.status(500).send('Payment initiation failed');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Payment error');
  }
});

module.exports = router;