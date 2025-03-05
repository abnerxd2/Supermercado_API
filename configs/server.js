import express from 'express';
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import apiLimiter from "../src/middlewere/rate-limit-validator.js";
import authroutes from "../src/auth/auth.routes.js";
import { dbConnection } from './mongo.js';
import { swaggerDocs, swaggerUI } from "./swagger.js";
import createAdmin from '../src/auth/auth.controller.js';
import createCategory from "../src/category/category.controller.js";
import userroutes from "../src/user/user.routes.js";
import categoryroutes from "../src/category/category.routes.js";
import productoroutes from "../src/products/products.routes.js";
import carroutes from "../src/carrito/carrito.routes.js";
import facturaroutes from "../src/factura/factura.routes.js";

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());
    app.use(cors({
        origin: '*', // Permitir todas las solicitudes de origen
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'", `http://localhost:${process.env.PORT}`],
                connectSrc: ["'self'", `http://localhost:${process.env.PORT}`],
                imgSrc: ["'self'", "data:"],
                styleSrc: ["'self'", "'unsafe-inline'"],
            },
        },
    }));
    app.use(morgan("dev"));
    app.use(apiLimiter);
}

const routes = (app) =>{
    app.use("/Supermercado/v1/auth", authroutes);
    app.use("/Supermercado/v1/user", userroutes);
    app.use("/Supermercado/v1/category", categoryroutes);
    app.use("/Supermercado/v1/product", productoroutes);
    app.use("/Supermercado/v1/car", carroutes);
    app.use("/Supermercado/v1/factura", facturaroutes);
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
}

const conectarDB = async () => {
    try {
        await dbConnection();
    } catch (err) {
        console.log(`Database connection failed: ${err}`);
    }
}

export const initServer = () => {
    const app = express();
    try {
        conectarDB();
        createAdmin();
        createCategory();
        middlewares(app);
        routes(app);
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port: ${process.env.PORT}`);
            console.log(`Swagger docs available at http://localhost:${process.env.PORT}/api-docs`);
        });
    } catch (err) {
        console.log(`Server init failed: ${err}`);
    }
}