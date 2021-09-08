import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/user.js';
import clientRoutes from './routes/client.js';

dotenv.config();
const app = express()

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

app.use('/user', userRoutes);
app.use('/client', clientRoutes);

app.get('/', (req, res) => {
   res.send('clean and bright api');
})

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log('connected to DB'))
   .catch((err) => console.log('DB connection Error!', err))

const port = process.env.PORT || 5000;
app.listen(port, () => {
   console.log(`server started on port ${port}`)
})

//Test comment