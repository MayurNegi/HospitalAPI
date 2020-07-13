const passport = require('passport');
const JWTStrategy = require('passwport-jwt').Stategy;
const ExtractJWT = require('passport-jwt').ExtractJwt ;

const Doctor = require('../models/doctor');

let opts = {
    jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken('Bearer'),
    secretOrKey = 'secret'
}

passport.use(new JWTStrategy(opts, function(jwt_payload, done) {
    Doctor.findOne(jwt_payload._id , function(err, doctor){

        if(err){
            console.log('error in finding doctor from JWT', err);
            return;
        }

        if(doctor){
            return done(null, doctor);
        }else{
            return done(null, false);
        }

    })
}));

module.exports = passport ;