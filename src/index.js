require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes.js');
const tracksRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(tracksRoutes);

const api_key = process.env.DB_PASS
const mongoUri = `mongodb+srv://${api_key}@cluster0.i9ftq.mongodb.net/<dbname>?retryWrites=true&w=majority`
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
});
mongoose.connection.on('ERROR', (err) => {
    console.log('Connected to mongo instance', err);
});

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});