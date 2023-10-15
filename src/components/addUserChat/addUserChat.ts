import ChatsController from '../../controllers/ChatsController'
import UserController from '../../controllers/UserController'
import Block from '../../core/Block'
import { connect } from '../../utils/connect'
import { State } from '../../utils/store'

class AddUserChatModal extends Block {
  async onHandleCreateChat() {
    const element = this.refs.chat.element as HTMLInputElement
    const users = await UserController.fetchSearchUser({ login: element.value })

    if (element && users?.length > 0) {
      ChatsController.fetchAddUser({ users: [users[0].id], chatId: this.props.chatID })
      this.props.onCancel()
    }
  }

  protected init(): void {
    this.props.onHandleCreateChat = this.onHandleCreateChat.bind(this)
  }

  protected render() {
    const {
      isVisible,
    } = this.props

    return `
    <div class="modal ${isVisible ? 'show' : 'hide'}">
      <div class="modal__card">
        <div class="modal__card-title">
          Добавить пользователя в чат
        </div>

        <div class="modal__card-content">
          {{{ Input
              type="text"
              placeholder="Введите логин"
              value=""
              ref="chat"
              classes="add-chat__input"
              name="chat-name"
          }}} 
        </div>

        <div class="avatar-modal__card-buttons">
          {{{ Button label="Отмена" onClick=onCancel }}}
          {{{ Button label="Добавить" onClick=onHandleCreateChat }}}
        </div>
      </div>
    </div>
    `
  }
}

const mapStateToProps = (state: State) => ({
  chatID: state.currentChat,
})

export const AddUserChat = connect(mapStateToProps)(AddUserChatModal)
