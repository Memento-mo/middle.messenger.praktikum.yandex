import {
  IUser, IUserEdit, IUserEditPassword, IUserSearch,
} from '../types/user'
import HTTPTransport from './HTTPTransport'

export default class UserAPI {
  private http: HTTPTransport

  constructor() {
    this.http = new HTTPTransport('/user')
  }

  edit(data: IUserEdit) {
    return this.http.put('/profile', { data })
  }

  editPassword(data: IUserEditPassword) {
    return this.http.put('/password', { data })
  }

  avatar(data: FormData): Promise<IUser> {
    return this.http.put('/profile/avatar', { data })
  }

  search(data: IUserSearch): Promise<IUser[]> {
    return this.http.post('/search', { data })
  }
}
