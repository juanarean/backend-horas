const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.signin', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username, password, done) => {
    // console.log(req.body);
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password);
        if (validPassword) {
            done(null, user, req.flash('success', 'Bienvenido ' + user.username + '!'));
        } else {
            done(null, false, req.flash('message', 'Datos incorrectos'));
        }
    } else {
        return done(null, false, req.flash('message', 'El usuario no existe'));
    }
}));

// configuracion de passport:
passport.use('local.signup', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username, password, done) => {
    const { fullname } = req.body;
    const newUser = {
        username,
        password,
        fullname
    };
    newUser.password = await helpers.encryptPasswords(password);
    const result = await pool.query('INSERT INTO users SET ?', [newUser]);
    //console.log(result);
    newUser.id = result.insertId;
    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    const row = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    // console.log(id);
    // console.log(row);
    done(null, row[0]);
});