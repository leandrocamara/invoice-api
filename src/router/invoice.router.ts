
import * as restify from 'restify'

import { ModelRouter } from './model.router'
import { Invoice } from '../db/mongodb/invoice.model'
import { invoiceBO } from '../business/invoice.business'

/**
 * Rotas do recurso "Invoice".
 *
 * @author Leandro Câmara
 */
class InvoiceRouter extends ModelRouter<Invoice> {

  /**
   * Método construtor.
   */
  constructor () {
    super(Invoice, invoiceBO)
  }

  /**
   * Aplica as rotas do recurso "Invoice" ao Servidor.
   *
   * @param application
   */
  public applyRoutes(application: restify.Server) {
    application.get(`${this.basePath}`, this.findAll)
    application.get(`${this.basePath}/:id`, [this.validateId, this.findById])
    application.post(`${this.basePath}`, this.save)
    application.put(`${this.basePath}/:id`, [this.validateId, this.update])
    application.del(`${this.basePath}/:id`, [this.validateId, this.delete])
  }

}

export const invoiceRouter = new InvoiceRouter()
