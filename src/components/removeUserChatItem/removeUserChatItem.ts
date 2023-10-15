import ChatsController from '../../controllers/ChatsController'
import Block from '../../core/Block'

interface IProps {
  login: string
  chatID: number
}

export class RemoveUserChatItem extends Block {
  constructor(props: IProps) {
    super(props)

    this.props.handleRemove = this.handleRemove.bind(this)
  }

  handleRemove() {
    ChatsController.fetchRemoveUsersChat({ chatId: this.props.chatID, users: [this.props.id] })
  }

  protected render(): string {
    const { login } = this.props
    return `
      <div class="remove-user-item">
        <div class="remove-user-item__title">${login}</div>
        {{{ Button onClick=handleRemove label="Удалить"  classes="remove-user-item__button"}}}
      </div>
    `
  }
}
