import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const port = process.env.production ? 1222 || 1223 : 8000;

const options = {
  definition: {
    openapi: "3.0.0",
    failOnErrors: true,
    info: {
      version: "0.1.0",
      title: "We Office",
      description: "My RESTful API using Swagger",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        // url: "http://weoffice.sonidlab.co.kr",
        description: "we-office server",
      },
    ],
  },
  basePath: "/",
  apis: ["src/routes/*.ts", "src/controller/*.ts"],
};

export const specs = swaggerJsdoc(options);
export { swaggerUi };
