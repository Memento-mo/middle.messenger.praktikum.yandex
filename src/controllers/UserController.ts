import store from '../utils/store'

import UserAPI from '../api/UserAPI'

import router from '../router/router'
import AuthController from './AuthController'

import type {
  IUser, IUserEdit, IUserEditPassword, IUserSearch,
} from '../types/user'

class UserController {
  private api = new UserAPI()

  async fetchEditProfile(data: IUserEdit) {
    try {
      await this.api.edit(data)
      AuthController.fetchUser()
    } catch (error) {
      console.error(error)
    }
  }

  async fetchEditPassword(data: IUserEditPassword) {
    try {
      await this.api.editPassword(data)
      router.go('/settings')
    } catch (error) {
      console.error(error)
    }
  }

  async fetchAvatarLoad(data: FormData) {
    try {
      const user: IUser = await this.api.avatar(data)
      store.set('user.data.avatar', user.avatar)
    } catch (error) {
      console.error(error)
    }
  }

  async fetchSearchUser(data: IUserSearch): Promise<IUser[]> {
    try {
      const user: IUser[] = await this.api.search(data)

      return user
    } catch (error) {
      console.error(error)
    }

    return []
  }
}

export default new UserController()
