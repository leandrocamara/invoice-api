
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
   * Verifica se o "id" informado é válido.
   */
  protected validateId = (req, resp, next) => {
    if (!this.business.validateId(req.params.id)) {
      next(new NotFoundError('Documento não encontrado.'))
    }
    next()
  }

  /**
   * Retorna uma lista de documentos.
   */
  protected findAll = async (req, resp, next) => {
    try {
      const documents = await this.business.findAll()
      this.renderAll(documents, resp, next)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Retorna o documento conforme o "id" informado.
   */
  protected findById = async (req, resp, next) => {
    try {
      const document = await this.business.findById(req.params.id)
      this.render(document, resp, next)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Salva um documento.
   */
  protected save = async (req, resp, next) => {
    try {
      const document = await this.business.save(req.body)
      this.render(document, resp, next)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Atualiza todos os dados de um documento.
   */
  protected update = async (req, resp, next) => {
    try {
      const document = await this.business.update(req.params.id, req.body)
      this.render(document, resp, next)
    } catch (error) {
      next(error)
    }
  }

  /**
   * Remove um documento.
   */
  protected delete = async (req, resp, next) => {
    try {
      await this.business.delete(req.params.id)
      resp.send(204)
    } catch (error) {
      next(error)
    }
  }

}
