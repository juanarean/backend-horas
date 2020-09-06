// Inicio de la aplicacion

const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const mysqlSession = require('express-mysql-session');
const passport = require('passport');

const { database } = require('./keys');

// inicializaciones
const app = express();
require('./lib/passport');

//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views')); // aca le digo a node y express que la carpeta views esta en __dirname, esto seria /src, y le concateno views: /src/views
app.engine('.hbs', exphbs({
    defaultLayout: 'main', // aca va ir siempre que renderice una respuesta.
    layoutsDir: path.join(app.get('views'), 'layouts'), //aca le digo al modulo handlebars donde buscar las vistas, busco la carpteta views como la configure para node y le concateno layouts
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars') // aca hago funciones para las vistas. seria el js del html y css
}));
app.set('view engine', '.hbs');

// middlewares, siempre ponerlas antes de cargar las rutas. si no hacen nada... no termina nunca de cargar.
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'aplicacionobrasbasis',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
    store: new mysqlSession(database)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// variables globales
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});

// rutas
app.use(require('./routes/index'));
app.use('/api', require('./routes/api'));
app.use('/login', require('./routes/authentication'));
app.use('/horas', require('./routes/horas'));
app.use('/obras', require('./routes/obras'));

// publico
app.use(express.static(path.join(__dirname, 'public')));

// arrancar el server
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});