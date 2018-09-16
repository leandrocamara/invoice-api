
import { AbstractBO } from './abstract.business'
import { User } from '../db/mongodb/user.model'

class UserBO extends AbstractBO<User> {

  /**
   * Método construtor.
   */
  constructor () {
    super(User)
  }

}

export const userBO = new UserBO()
