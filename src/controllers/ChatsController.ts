import ChatsAPI from '../api/ChatsAPI'
import store from '../utils/store'

import type {
  IAddUserChat, IAllUsersChat, ICreateChat, IRemoveUsersChat, IToken,
} from '../types/chat'
import { IUser } from '../types/user'
import messagesController from './MessagesController'

class ChatsController {
  private api = new ChatsAPI()

  async fetchToken(data: IToken): Promise<{ token: string }> {
    try {
      return await this.api.getToken(data)
    } catch (error) {
      console.error(error)
    }

    return { token: '' }
  }

  async fetchCreateChat(data: ICreateChat) {
    try {
      await this.api.create(data)
      this.fetchAllChats()
    } catch (error) {
      console.error(error)
    }
  }

  async fetchAddUser(data: IAddUserChat) {
    try {
      await this.api.addUserChat(data)
    } catch (error) {
      console.error(error)
    }
  }

  async fetchAllChats() {
    try {
      const chats = await this.api.all()
      console.log(chats)
      chats.forEach((chat) => {
        if (chat.id) {
          messagesController.connect(chat.id)
        }
      })

      store.set('chats', { data: chats })
    } catch (error) {
      console.error(error)
    }
  }

  async fetchAllUsersChat(data: IAllUsersChat): Promise<IUser[]> {
    try {
      const users = await this.api.allUsersChat(data)

      return users
    } catch (error) {
      console.error(error)
    }

    return []
  }

  async fetchRemoveUsersChat(data: IRemoveUsersChat) {
    try {
      await this.api.removeUsersChar(data)
    } catch (error) {
      console.error(error)
    }
  }
}

export default new ChatsController()
