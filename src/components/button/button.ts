import Block from '../../core/Block'

interface IProps {
  onClick: () => void
}

export class Button extends Block {
  constructor(props: IProps) {
    super(props)

    this.props.events = {
      click: this.props.onClick,
    }
  }

  protected render() {
    const { label } = this.props
    return `<button class="button">${label}</button>`
  }
}
