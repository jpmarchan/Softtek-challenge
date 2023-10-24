import swaggerJSDoc from 'swagger-jsdoc';
const options = {
  swaggerDefinition: {
    
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for your application',
    },
    basePath: '/',
  },
  
  apis: ['src/routes/v1/*.ts', 'src/dtos/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;