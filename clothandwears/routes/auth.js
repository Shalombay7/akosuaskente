router.get('/login', async (req, res) => {
  const { mode, email, username, token, confirmed } = req.query;
  if (mode === 'login' && confirmed === '1') {
    req.session.user = { email, username };
    res.redirect('/');
  } else {
    res.status(400).render('error', { title: 'Invalid Login', error: 'Invalid login parameters' });
  }
});