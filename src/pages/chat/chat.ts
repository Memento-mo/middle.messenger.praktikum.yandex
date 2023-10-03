import ChatsController from '../../controllers/ChatsController'
import Block from '../../core/Block'

export class ChatPage extends Block {
  protected init(): void {
    this.props.isVisible = false
    this.props.onHandleModal = this.onHandleModal.bind(this)

    ChatsController.fetchAllChats()
  }

  onHandleModal() {
    this.props.isVisible = !this.props.isVisible
  }

  protected render(): string {
    return `
      {{> ChatContent}}
    `
  }
}
