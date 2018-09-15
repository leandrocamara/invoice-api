
import * as mongoose from 'mongoose'
import { NotFoundError } from 'restify-errors'

import { Router } from './router'
import { AbstractBO } from '../business/abstract.business';

/**
 * Classe que realiza operações genéricas do modelo (<D>) especificado pela classe especializa.
 *
 * @author Leandro Câmara
 */
export abstract class ModelRouter<D extends mongoose.Document> extends Router {

  /**
   * Propriedade para armazenar o caminho (URL) do recurso.
   */
  public basePath: string

  /**
   * Define o modelo a ser utilizado pelo métodos genéricos.
   *
   * @param model
   */
  constructor (protected model: mongoose.Model<D>, protected business: AbstractBO<D>) {
    super();
    this.basePath = `/${model.collection.name}`
  }

  /**
   * Prepara a consulta antes de realizar a operação no BD.
   *
   * @param query
   */
  protected prepareOne (query: mongoose.DocumentQuery<D, D>): mongoose.DocumentQuery<D, D> {
    return query
  }

  /**
   * Verifica se o "id" informado é válido.
   */
  protected validateId = (req, resp, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      next(new NotFoundError('Documento não encontrado.'))
    } else {
      next()
    }
  }

  /**
   * Retorna uma lista de documentos.
   */
  protected findAll = async (req, resp, next) => {
    const documents = await this.business.findAll()
    this.renderAll(documents, resp, next)
  }

  /**
   * Retorna o documento conforme o "id" informado.
   */
  protected findById = async (req, resp, next) => {
    const document = await this.business.findById(req.params.id)
    this.render(document, resp, next)
  }

  /**
   * Salva um documento.
   */
  protected save = async (req, resp, next) => {
    const document = await this.business.save(req.body)
    this.render(document, resp, next)
  }

  /**
   * Atualiza todos os dados de um documento.
   */
  protected update = async (req, resp, next) => {
    const document = await this.business.update(req.params.id, req.body)
    this.render(document, resp, next)
  }

  /**
   * Remove um documento.
   */
  protected delete = async (req, resp, next) => {
    const result = await this.business.delete(req.params.id)
    resp.send(204)
  }

}
