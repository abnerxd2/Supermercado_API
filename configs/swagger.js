
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"

const swaggerOptions = {
    swaggerDefinition:{
        openapi: "3.0.0",
        info:{
            title: "Supermercasdo API",
            version:"1.0.0",
            description: "API para sistema de un supermercado",
            contact:{
                name: "Abner Del Cid ",
                email: "adelcid-2023336@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3000/adopptionSystem/v1"
            }
        ]
    },
    apis:[
        "./src/auth/*.js",
    ]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)

export { swaggerDocs, swaggerUi }