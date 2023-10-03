import { ICreateChat } from '../types/chat'
import HTTPTransport from './HTTPTransport'

export default class ChatsAPI {
  private http: HTTPTransport

  constructor() {
    this.http = new HTTPTransport('/chats')
  }

  create(data: ICreateChat) {
    return this.http.post('/', { data })
  }

  all() {
    return this.http.get('/')
  }
}
