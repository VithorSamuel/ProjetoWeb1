import { virustotal, resultado } from "../controller/virustotalController.js"

async function virustotalRoutes(fastify){
    fastify.post('/virustotal', virustotal)
    fastify.get('/virustotal/result/:id', resultado )
}
export default virustotalRoutes