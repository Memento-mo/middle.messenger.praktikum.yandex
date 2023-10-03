import store from '../utils/store'
import router from '../router/router'

import AuthAPI from '../api/AuthAPI'

import type { ISigninData, ISignupData } from '../types/user'

class AuthController {
  private api = new AuthAPI()

  async fetchLogin(data: ISigninData) {
    try {
      await this.api.login(data)
      await this.fetchUser()

      router.go('/messenger')
    } catch (error) {
      console.error(error)
    }
  }

  async fetchSignup(data: ISignupData) {
    try {
      await this.api.signup(data)
      await this.fetchUser()

      router.go('/messenger')
    } catch (error) {
      console.error(error)
    }
  }

  async fetchUser() {
    try {
      const user = await this.api.getUser()
      store.set('user.data', user)
    } catch (error) {
      console.error(error)
    }
  }

  async fetchLogout() {
    await this.api.logout()

    router.go('/')
  }
}

export default new AuthController()
