const { Router } = require('express');
const User = require('../models/user');
const router = Router();


router.get('/signin', (req, res) => {
    
    return res.render('signin');

});


router.get('/signup', (req, res) => {

    return res.render('signup');

})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

   try {
    
    const token = await User.matchPasswordAndGenetateToken(email, password);
    return res.cookie("token", token).redirect('/');
    
     

   } catch (error) {
    return res.render('signin',{error:"Incorrect Email or Password"});
   }
   

        
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});


router.post('/signup', async (req, res) => {
        const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
        return res.status(400).send('All fields are required');
    }
    try {
        await User.create({ fullName, email, password })
        return res.redirect('/');

    }
    catch (err) {
        console.log(err);
        return res.status(500).send('Something went wrong');
    }
})
module.exports = router;