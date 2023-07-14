import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoute.js'
//dotenv config
dotenv.config(); //path of env file can be added in {}

//rest object
const app = express();

//database config
connectDB();

//middlewares
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth', authRoutes);

//rest api
app.get('/', (req,res) => {

    res.send('<h1>Welcome to shoppe</h1>')
})

//PORT
const port = process.env.PORT || 8080

//run listen

app.listen(port, () => {
    console.log(`Server is running on ${process.env.DEV_MODE} mode on port ${port}`.bgCyan.white)
})