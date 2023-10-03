import ChatsAPI from '../api/ChatsAPI'
import { ICreateChat } from '../types/chat'
import store from '../utils/store'

class ChatsController {
  private api = new ChatsAPI()

  async fetchCreateChat(data: ICreateChat) {
    try {
      await this.api.create(data)
      this.fetchAllChats()
    } catch (error) {
      console.error(error)
    }
  }

  async fetchAllChats() {
    try {
      const chats = await this.api.all()

      store.set('chats', { data: chats })
    } catch (error) {
      console.error(error)
    }
  }
}

export default new ChatsController()
