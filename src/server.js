const express=require('express');
const mongoose= require('mongoose');
const bodyParser =require( 'body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb+srv://dipesh:dipesh123@cluster0.9gwkj.mongodb.net/p';

const productRoutes=require('../src/routes/productRoutes')
const userRoutes=require('../src/routes/userRoutes')
mongoose.connect(MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

app.use(cors());
app.use(bodyParser.json());
app.use("/api/product",productRoutes)
app.use("/api/user",userRoutes)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
