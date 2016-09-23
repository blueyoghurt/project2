module.exports = {

    'facebookAuth' : {
        'clientID'      : process.env.FB_ID, // your App ID
        'clientSecret'  : process.env.FB_KEY, // your App Secret
        'callbackURL'   : 'https://inventory-wdi5sg.herokuapp.com/auth/facebook/callback'
    }
};


// 'http://localhost:3000/auth/facebook/callback'
