import { computed, observable } from 'mobx'

export default class User {
  @observable id
  @observable name
  @observable email
  @observable sessionToken

  constructor (user) {
    this.id = user.id
    this.name = user.name
    this.email = user.email
    this.sessionToken = user.sessionToken
  }

  @computed get displayName () {
    return this.name || this.email
  }
}