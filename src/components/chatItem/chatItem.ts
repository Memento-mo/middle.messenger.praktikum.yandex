import Block from '../../core/Block'
import { IChat } from '../../types/chat'
import store from '../../utils/store'

export default class ChatItem extends Block {
  constructor(props: IChat) {
    super({
      ...props,
      events: {
        click: () => {
          store.set('currentChat', this.props.id)
        },
      },
    })
  }

  private getTime(time: string) {
    if (time === null) return ''

    const date = new Date(time)
    const hours = String(date.getHours())
    const minutes = String(date.getMinutes())

    return `${hours.length > 0 ? hours : `0${hours}`}:${minutes.length > 0 ? minutes : `0${minutes}`}`
  }

  protected render(): string {
    const {
      title,
      last_message,
      time,
      unread_count,
    } = this.props

    const date = this.getTime(time)

    return `
      <div class="chat-item">
        <div class="chat-item__text">
          <div class="chat-item__text-name">
            ${title}
          </div>
          <div class="chat-item__text-msg">
            ${last_message || ''}
          </div>
        </div>
        <div class="chat-item__metainfo">
          <div class="chat-item__metainfo-time">
            ${date}
          </div>
          {{#if unread_count}}
            <div class="chat-item__metainfo-count">
              ${unread_count}
            </div>
          {{/if}}
        </div>
      </div>
    `
  }
}
