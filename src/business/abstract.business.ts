
import * as mongoose from 'mongoose'

import { NotFoundError } from 'restify-errors'

export abstract class AbstractBO<D extends mongoose.Document> {

  /**
   * Define o modelo a ser utilizado pelo métodos genéricos.
   *
   * @param model
   */
  constructor (public model: mongoose.Model<D>) {}

  /**
   * Retorna uma lista de documentos.
   */
  public async findAll () {
    try {
      return await this.model.find()
    } catch (error) {
      throw new NotFoundError('Falha ao buscar os documentos.')
    }
  }

  /**
   * Retorna o documento conforme o "id" informado.
   *
   * @param id
   */
  public async findById (id) {
    try {
      return await this.prepareOne(this.model.findById(id))
    } catch (error) {
      throw new NotFoundError('Falha ao buscar o documento.')
    }
  }

  /**
   * Salva um documento.
   *
   * @param data
   */
  public async save (data: D) {
    try {
      const document = new this.model(data)
      return await document.save()
    } catch (error) {
      throw new NotFoundError('Falha ao inserir o documento.')
    }
  }

  /**
   * Atualiza todos os dados de um documento.
   *
   * @param id
   * @param data
   */
  public async update (id, data: D) {
    try {
      const options = { runValidators: true, overwrite: true }
      await this.model.updateOne({ _id: id }, { $set: data }, options)

      return await this.findById(id)
    } catch (error) {
      throw new NotFoundError('Falha ao alterar o documento.')
    }
  }

  /**
   * Remove um documento.
   *
   * @param id
   */
  public async delete (id) {
    try {
      const result = await this.model.deleteOne({ _id: id })
      if (!result.ok) {
        throw new NotFoundError('Documento não encontrado.')
      }
    } catch (error) {
      throw new NotFoundError('Falha ao remover o documento.')
    }
  }

  /**
   * Verifica se o "id" informado é válido.
   */
  public validateId (id) {
    return mongoose.Types.ObjectId.isValid(id)
  }

  /**
   * Prepara a consulta antes de realizar a operação no BD.
   *
   * @param query
   */
  protected prepareOne (query: mongoose.DocumentQuery<D, D>): mongoose.DocumentQuery<D, D> {
    return query
  }

}
