import express from "express";
import { PORT, mongodbURL } from "./config.js";
import authRouter from "./routes/auth.route.js";
import mongoose from "mongoose";


// import dotenv from "dotenv";

// dotenv.config();

const app = express();

// middleware used for parsing request body
app.use(express.json());

// temporary route with random status code to allow app to work in basic form.
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Daily A');
});

app.use('/test', authRouter)
app.use('/auth', authRouter)

// mongoose handles DB connection, only listens on port if DB connection succeeds
mongoose
    .connect(mongodbURL)
    .then(() => {
        console.log('App connected to database.');
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
