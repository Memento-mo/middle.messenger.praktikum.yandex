import UserAPI from '../api/UserAPI'
import router from '../router/router'
import { IUser, IUserEdit, IUserEditPassword } from '../types/user'
import store from '../utils/store'

class UserController {
  private api = new UserAPI()

  async fetchEditProfile(data: IUserEdit) {
    try {
      await this.api.edit(data)
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
}

export default new UserController()
