
import { Server } from './server/server'
import { invoiceRouter } from './router/invoice.router'

const server = new Server()

// Instancia o Servidor.
server.bootstrap([
  invoiceRouter
]).then(server => {

  console.log('Servidor inicializado em: ', server.application.address())

}).catch(error => {

  console.log('Falha ao inicializar o Servidor!')
  console.error(error)
  process.exit(1)

})
