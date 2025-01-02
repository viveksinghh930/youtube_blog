const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;



function createTokenForUser(user) {
    const payload = {
        id: user._id,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role,

    };
    
    const token = jwt.sign(payload, secret, { expiresIn: '24h' });

    return token;
}

function  validateToken(token) {
    try {
        const payload = jwt.verify(token, secret);

        return payload;
    } catch (error) {
        return null;
    }
}


module.exports = {
    createTokenForUser,
    validateToken,
}