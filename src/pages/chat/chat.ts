import ChatsController from '../../controllers/ChatsController'
import Block from '../../core/Block'
import { connect } from '../../utils/connect'
import { State } from '../../utils/store'

class Chat extends Block {
  protected init(): void {
    this.props.isVisible = false
    this.props.isVisibleAddUser = false
    this.props.isVisibleRemoveUser = false

    this.props.onHandleModal = this.onHandleModal.bind(this)
    this.props.onHandleModalAddUser = this.onHandleModalAddUser.bind(this)
    this.props.onHandleModalRemoveUser = this.onHandleModalRemoveUser.bind(this)
    this.props.onHandleRemoveChat = this.onHandleRemoveChat.bind(this)

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

  async onHandleRemoveChat() {
    if (this.props.id) {
      await ChatsController.fetchRemoveChat({ chatId: this.props.id })
      ChatsController.fetchAllChats()
    }
  }

  protected render(): string {
    return `
      {{> ChatContent }}
    `
  }
}

const mapStateToProps = (state: State) => {
  const id = state.currentChat

  return {
    id,
  }
}

export const ChatPage = connect(mapStateToProps)(Chat)
