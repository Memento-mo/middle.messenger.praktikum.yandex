import { ISigninData, ISignupData, IUser } from '../types/user'
import HTTPTransport from './HTTPTransport'

export default class AuhAPI {
  private http: HTTPTransport

  constructor() {
    this.http = new HTTPTransport('/auth')
  }

  login(data: ISigninData) {
    return this.http.post('/signin', { data })
  }

  signup(data: ISignupData) {
    return this.http.post('/signup', { data })
  }

  getUser(): Promise<IUser> {
    return this.http.get<IUser>('/user')
  }

  logout() {
    return this.http.post('/logout')
  }
}
