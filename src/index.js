// Require external modules
const mongoose = require('mongoose')
// Import Cars Routes
const routes = require('./routes')
// Import Swagger Options
const swagger = require('./config/swagger');

// Connect to DB
mongoose.connect('mongodb://localhost/mycargarag',
    {
        useNewUrlParser: true, useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB connected…'))
    .catch(err => console.log(err))


// Require the framework and instantiate it
const fastify = require('fastify')({
    logger: true
})

// Register Swagger
fastify.register(require('fastify-swagger'), swagger.options);

routes.forEach((route, index) => {
    fastify.route(route)
});

// Declare a route
fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
})

// Run the server!
const start = async () => {
    try {
        await fastify.listen(3000)
        fastify.swagger()
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()