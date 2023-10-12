import type { State } from '../../utils/store'

import Block from '../../core/Block'

import { connect } from '../../utils/connect'
import { isToday } from '../../utils/isToday'

class MessageComponent extends Block {
  getTime(time: string) {
    const dateMsg = new Date(Date.parse(time))
    const hours = `${dateMsg.getHours()}`.padStart(2, '0')
    const minutes = `${dateMsg.getMinutes()}`.padStart(2, '0')

    let timestamp = `${hours}:${minutes}`

    if (!isToday(dateMsg)) {
      const months = `${dateMsg.getMonth()}`.padStart(2, '0')
      const days = `${dateMsg.getDate()}`

      timestamp = `${days}.${months} ${timestamp}`
    }

    return timestamp
  }

  protected render(): string {
    let isMine = false

    const {
      message,
      userIdMessage,
      time,
      userID,
    } = this.props

    if (userID === userIdMessage) {
      isMine = true
    }

    const date = this.getTime(time)

    return `
      <div class="chat-online__content-message ${isMine ? 'chat-online__content-message__right' : 'chat-online__content-message__left'}">
        <span>${message}</span>
        <span>${date}</span>
      </div>
    `
  }
}

const mapStateToProps = (state: State) => ({
  userID: state.user?.data.id,
})

export const Message = connect(mapStateToProps)(MessageComponent)
