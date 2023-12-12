const express = require('express');
const router = express.Router();
const {
  handleLogin
} = require('../src/controllers/controller-login')


// Page: Login
router.get('/', (req, res, next) => {
  res.render('login', {
    title: 'Login',
    layout: 'layouts/main-layout',
    failMessage: req.flash('login-fail')
  });
});


// Proces: Login
router.post('/login', async (req, res) => {
  const handlelogin = await handleLogin(req.body);
  
  if (handlelogin.result){
    req.session.user_id = handlelogin.user_id;
    res.redirect('/dashboard');
  } else {
    // console.log(handlelogin.message)
    req.flash('login-fail', handlelogin.message);
    res.redirect('/');
  };
});


// Auth Middleware  
router.use((req, res, next) => {
  if (req.session && req.session.user_id) {
    next();
  } else {
    // User isn't login yet
    res.redirect('/')
  };
});


// Process: Logout
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect('/')
  })
})


// Page: Dashboard
router.get('/dashboard', (req, res) => {
  res.render('dashboard', {
    title: 'Dashboard',
    layout: 'layouts/main-layout'
  });
});

// Page: Dashboard
router.get('/detail', (req, res) => {
  res.render('detail', {
    title: 'Detail',
    layout: 'layouts/main-layout'
  });
});


module.exports = router;
