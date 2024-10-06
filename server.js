const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();


app.get('/', (req, res) => {
    res.send('<h1>Hello, Express.js Server!</h1>');
});

const corsOptions = {
    credentials: true,
    origin: ['http://localhost:4200'] // Whitelist the domains you want to allow
};

app.use(cors(corsOptions));

const categoriesRoute = require('./routes/categoryRoutes');
const productsRoute = require('./routes/productRoutes');
const usersRoute = require('./routes/userRoutes');
const authRoute = require('./routes/authRoutes');
const {join} = require("node:path");
app.use(express.json());
app.use('/categories', categoriesRoute);
app.use('/products', productsRoute);
app.use('/users', usersRoute);
app.use('/login', authRoute);
app.use('/image', express.static(__dirname + '/image'));



const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
