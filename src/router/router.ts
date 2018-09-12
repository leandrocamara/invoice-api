
import * as restify from 'restify'

import { EventEmitter } from 'events'
import { NotFoundError } from 'restify-errors'

/**
 * Classe abstrata, herdada por todas as "Routers".
 *
 * @author Leandro Câmara
 */
export abstract class Router extends EventEmitter {

  /**
   * Aplica as rotas ao Servidor (application).
   *
   * @param application
   */
  public abstract applyRoutes(application: restify.Server)

  /**
   * Método genérico para renderizar o "documento" (resultante) na resposta da requisição.
   *
   * @param response
   * @param next
   * @throws
   */
  public render(response: restify.Response, next: restify.Next) {
    return (document) => {

      if (!document) {
        throw new NotFoundError('Documento não encontrado.')
      }

      response.json(document)
      return next()
    }
  }

  /**
   * Método genérico para renderizar a lista de "documentos" (resultante) na resposta da requisição.
   *
   * @param response
   * @param next
   */
  public renderAll (response: restify.Response, next: restify.Next) {
    return (documents: any[]) => {

      if (documents) {
        documents.forEach((document, index, array) => {
          array[index] = document
        })
      } else {
        documents = []
      }

      response.json(documents)
      return next()
    }
  }

}
