
import * as mongoose from 'mongoose'
import { NotFoundError } from 'restify-errors'

import { Router } from './router'

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
  constructor (protected model: mongoose.Model<D>) {
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
  protected findAll = (req, resp, next) => {
    this.model.find()
      .then(this.renderAll(resp, next))
      .catch(next)
  }

  /**
   * Retorna o documento conforme o "id" informado.
   */
  protected findById = (req, resp, next) => {
    this.prepareOne(this.model.findById(req.params.id))
      .then(this.render(resp, next))
      .catch(next)
  }

  /**
   * Salva um documento.
   */
  protected save = (req, resp, next) => {
    let document = new this.model(req.body)
    document.save()
      .then(this.render(resp, next))
      .catch(next)
  }

  /**
   * Atualiza todos os dados de um documento.
   */
  protected update = (req, resp, next) => {
    const options = { runValidators: true, overwrite: true }
    this.model.updateOne({ _id: req.params.id }, { $set: req.body }, options).exec().then(result => {
      if (result.n) {
        return this.model.findById(req.params.id)
      } else {
        throw new NotFoundError('Documento não encontrado.')
      }
    }).then(this.render(resp, next)).catch(next)
  }

  /**
   * Remove um documento.
   */
  protected delete = (req, resp, next) => {
    this.model.deleteOne({ _id: req.params.id }).exec().then((result: any) => {
      if (result.ok) {
        resp.send(204)
      } else {
        throw new NotFoundError('Documento não encontrado.')
      }
      return next()
    }).catch(next)
  }

}
