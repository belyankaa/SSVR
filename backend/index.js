require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT;
const app = express();
app.use(cors({
    origin: ['http://localhost:3001', "http://localhost:3000"],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: [],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use('/eventPrev', express.static(path.resolve(__dirname, 'eventPrev')));
app.use(fileUpload({}));
app.use('/api', router);

//Обработка ошибок, последний middleware
app.use(errorHandler);

// app.get('/', (req, res) => {
//     res.status(200).json({message: "It's Ok"})
// })

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Started server on port ${PORT}`));

    } catch (e) {
        console.log(e);
    }
}

start();