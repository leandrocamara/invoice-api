
import { AbstractBO } from './abstract.business'
import { Invoice } from '../db/mongodb/invoice.model'

class InvoiceBO extends AbstractBO<Invoice> {

  /**
   * Método construtor.
   */
  constructor () {
    super(Invoice)
  }

}

export const invoiceBO = new InvoiceBO()
