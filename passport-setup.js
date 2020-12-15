const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth20' ).Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
        clientID:     "323264559868-un8aidbbvf26mtm9n6la3ma0uadsfonf.apps.googleusercontent.com",
        clientSecret: "5DoU-JzYNiHjWvgNHOEG_IHv",
        callbackURL: "http://localhost:3000/Google/callback",
        passReqToCallback   : true
    },
    function(request, accessToken, refreshToken, profile, done) {
        // use the profile info (mainly profile id) to check if the user is registered
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //   return done(err, user);
        // });
        return done(null, profile);
    }
));