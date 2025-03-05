import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const swaggerOptions = {
    swaggerDefinition:{
        openapi: "3.0.0",
        info:{
            title: "Supermercado API",
            version:"1.0.0",
            description: "API para sistema de un supermercado",
            contact:{
                name: "Abner Del Cid",
                email: "adelcid-2023336@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3001/Supermercado/v1"
            }
        ]
    },
    apis:[
        "./src/auth/*.js",
        "./src/cart/*.js",
        "./src/products/*.js",
        "./src/orders/*.js"
    ]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export { swaggerDocs, swaggerUI };