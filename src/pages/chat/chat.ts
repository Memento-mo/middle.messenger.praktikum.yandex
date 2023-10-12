import ChatsController from '../../controllers/ChatsController'
import Block from '../../core/Block'

export class ChatPage extends Block {
  protected init(): void {
    this.props.isVisible = false
    this.props.isVisibleAddUser = false
    this.props.isVisibleRemoveUser = false

    this.props.onHandleModal = this.onHandleModal.bind(this)
    this.props.onHandleModalAddUser = this.onHandleModalAddUser.bind(this)
    this.props.onHandleModalRemoveUser = this.onHandleModalRemoveUser.bind(this)

    ChatsController.fetchAllChats()
  }

  onHandleModal() {
    this.props.isVisible = !this.props.isVisible
  }

  onHandleModalAddUser() {
    this.props.isVisibleAddUser = !this.props.isVisibleAddUser
  }

  onHandleModalRemoveUser() {
    this.props.isVisibleRemoveUser = !this.props.isVisibleRemoveUser
  }

  protected render(): string {
    return `
      {{> ChatContent }}
    `
  }
}
