import express from "express";
import { PORT, mongodbURL } from "./app.config.js";
import authRouter from "./routes/auth.route.js";
import goalsRouter from "./routes/goals.route.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";


// import dotenv from "dotenv";

// dotenv.config();

const __dirname = path.resolve();

const app = express();

// middleware used for parsing request body
app.use(express.json());

app.use(cookieParser());

// temporary route with random status code to allow app to work in basic form.
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Daily A');
});

// test route
app.use('/api/test', authRouter);

// user authentication routes
app.use('/api/auth', authRouter);

// goals routes
app.use("/api/goals", goalsRouter);


// set static directory for build for deploying application
app.use(express.static(path.join(__dirname, 'frontend/dist')));


// serve index.html from frontend file for all routes
app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// middleware for handling errors
app.use((error, request, response, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal server error.';
    return response.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

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
