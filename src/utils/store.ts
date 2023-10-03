import EventBus from '../core/EventBus'

import { set } from './helpers'

import type { IUser } from '../types/user'
import type { IChat, IMessage } from '../types/chat'

export enum StoreEvents {
  Updated = 'updated',
}

export interface Chat {
  data: IChat[]
  users: IUser[][]
}

export interface State {
  user?: {
    data: IUser
  }
  chats?: Chat
  messages?: IMessage[]
  currentChat?: number
}

class Store extends EventBus {
  private state: State = {}

  public getState() {
    return this.state
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value)

    this.emit(StoreEvents.Updated, this.getState())
  }
}

const store = new Store();

(window as any).store = store;

export default store;
