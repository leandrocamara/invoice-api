
import * as mongoose from 'mongoose'

import { User } from './user.model'

/**
 * Interface que representa o Documento "Invoice".
 */
export interface Invoice extends mongoose.Document {
  value: number
  paid: boolean
  dateMaturity: Date
  nameCompany: string
  user: mongoose.Types.ObjectId | User
}

/**
 * Schema: Define as propriedades (metadados) dos documentos.
 */
const invoiceSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true
  },
  paid: {
    type: Boolean,
    required: true
  },
  dateMaturity: {
    type: Date,
    required: true
  },
  nameCompany: {
    type: String,
    required: true,
    maxlength: 250
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

/**
 * Exporta o Model "Invoice", que faz uso do Schema "invoiceSchema".
 * O Model serve para manipular os Documentos da Collection.
 * O Mongoose utilizará o nome do Model para definir o nome (no plural) da Collection.
 */
export const Invoice = mongoose.model<Invoice>('Invoice', invoiceSchema)
