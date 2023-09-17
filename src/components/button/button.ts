import Block, { IProps } from '../../core/Block'

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
