import Block from '../../core/Block'

interface IProps {
  onClick: () => void
  classes?: string
}

export class Button extends Block {
  constructor(props: IProps) {
    super(props)

    this.props.events = {
      click: this.props.onClick,
    }
  }

  protected render() {
    const { label, classes } = this.props
    return `<button class="${classes || 'button'}">${label}</button>`
  }
}
