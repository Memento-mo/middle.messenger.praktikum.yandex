import type { IUser } from './user'

export interface IMessage {
  id?: number
  chat_id?: number
  time?: string
  type?: string
  user_id?: string
  user_name?: string
  content?: string
  isMine?: boolean
  events?: Record<string, (e?: Event) => void>
}

export interface IChat {
  id?: number
  avatar?: string
  avatarSrc?: string
  title?: string
  time?: number | string
  last_message?: IMessage
  unread_count?: number
  isMine?: boolean
  users?: IUser[]
}

export interface ICreateChat {
  title: string
}
