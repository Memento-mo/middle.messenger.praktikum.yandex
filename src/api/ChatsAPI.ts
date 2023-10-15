import HTTPTransport from './HTTPTransport'

import type {
  IAddUserChat, IAllUsersChat, IChat, ICreateChat, IRemoveChat, IRemoveUsersChat, IToken,
} from '../types/chat'
import { IUser } from '../types/user'

export default class ChatsAPI {
  private http: HTTPTransport

  constructor() {
    this.http = new HTTPTransport('/chats')
  }

  create(data: ICreateChat) {
    return this.http.post('/', { data })
  }

  addUserChat(data: IAddUserChat) {
    return this.http.put('/users', { data })
  }

  allUsersChat(data: IAllUsersChat): Promise<IUser[]> {
    return this.http.get(`/${data.id}/users`)
  }

  removeUsersChar(data: IRemoveUsersChat) {
    return this.http.delete('/users', { data })
  }

  getToken(data: IToken): Promise<{ token: string }> {
    return this.http.post(`/token/${data.id}`)
  }

  all(): Promise<IChat[]> {
    return this.http.get('/')
  }

  removeChat(data: IRemoveChat) {
    return this.http.delete('/', { data })
  }
}
