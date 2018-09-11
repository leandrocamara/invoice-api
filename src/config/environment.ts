
/**
 * Objeto de configuração do servidor.
 *
 * @author Leandro Câmara
 */
export const environment = {
  server: { port: process.env.SERVER_PORT || 3000 },
  db: {
    mongodb: { url: process.env.MONGODB_URL || 'mongodb://localhost/tilix' }
  }
}
