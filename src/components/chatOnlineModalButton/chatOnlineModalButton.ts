import Block from '../../core/Block'

interface IProps {
  title: string
  click: () => void
  chatID: number
}

export class ChatOnlineModalButton extends Block {
  constructor(props: IProps) {
    super({
      ...props,
      events: {
        click: () => props.click(),
      },
    })
  }

  protected render(): string {
    const {
      title,
    } = this.props

    return `<button class="chat-online-modal-button">${title}</button>`
  }
}
