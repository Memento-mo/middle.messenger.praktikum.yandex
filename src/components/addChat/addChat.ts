import ChatsController from '../../controllers/ChatsController'
import Block from '../../core/Block'

export class AddChatModal extends Block {
  onHandleCreateChat() {
    const element = this.refs.chat.element as HTMLInputElement

    if (element) {
      ChatsController.fetchCreateChat({ title: element.value })
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
          Cоздать новый чат
        </div>

        <div class="modal__card-content">
          {{{ Input
              type="text"
              placeholder="Введите название чата"
              value=""
              ref="chat"
              classes="add-chat__input"
              name="chat-name"
          }}} 
        </div>

        <div class="avatar-modal__card-buttons">
          {{{ Button label="Отмена" onClick=onCancel }}}
          {{{ Button label="Cоздать" onClick=onHandleCreateChat }}}
        </div>
      </div>
    </div>
    `
  }
}
