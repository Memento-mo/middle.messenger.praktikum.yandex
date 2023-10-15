import ChatsController from '../../controllers/ChatsController'
import Block from '../../core/Block'
import { IUser } from '../../types/user'
import { connect } from '../../utils/connect'
import { State } from '../../utils/store'

class RemoveUserChatModal extends Block {
  async onHandleRemoveChat() {
    console.log('remove')
  }

  protected async init() {
    if (this.props.isVisible) {
      const users: IUser[] = await ChatsController.fetchAllUsersChat({ id: this.props.chatID })
        .then((users) => users.filter((user) => user.role !== 'admin'))

      this.props.users = users
    }
  }

  protected render() {
    const {
      isVisible,
      chatID,
    } = this.props

    return `
    <div class="modal ${isVisible ? 'show' : 'hide'}">
      <div class="modal__card">
        <div class="modal__card-title">
          Удалить пользователя из чата
        </div>

        <div class="modal__card-content">
          {{#each users}}
            {{{ RemoveUserChatItem login=this.login id=this.id chatID=${chatID} onClick=onCancel }}}
          {{/each}}
        </div>

        <div class="avatar-modal__card-buttons">
          {{{ Button label="Отмена" onClick=onCancel }}}
        </div>
      </div>
    </div>
    `
  }
}

const mapStateToProps = (state: State) => ({
  chatID: state.currentChat,
})

export const RemoveUserChat = connect(mapStateToProps)(RemoveUserChatModal)
