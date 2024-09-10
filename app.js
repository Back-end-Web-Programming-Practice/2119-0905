const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const dotenv = require('dotenv');
const fs = require('fs');
const nunjucks = require('nunjucks');

const indexRouter = require('./routes');
const usersRouter = require('./routes/users');

dotenv.config();

const app = express();

nunjucks.configure('views', {
    express: app,
    watch: true,
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser(process.env.COOKIES_SECRET));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie',
}));

app.use('/', indexRouter);
app.use('/user', usersRouter);

// try {
//     fs.readdirSync("uploads");
// } catch (err) {
//     console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
//     fs.mkdirSync("uploads");
// }

// app.use((req, res, next) => {
//     console.log("모든 요청에서 다 실행됩니다.");
//     next();
// });
//
// app.use((req, res, next) => {
//     res.status(404).send("Not Found");
// })
//
// app.use((res, req, next, err) => {
//     console.error(err);
//     res.status(500).send(err.message);
// });

app.use((req, res, next) => {
    const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});



module.exports = app;
