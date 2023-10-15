import Block from '../../core/Block'
import router from '../../router/router'

interface IProps {
  pathname: string
  label: string
}

export class ButtonLink extends Block {
  constructor(props: IProps) {
    super({
      ...props,
      events: {
        click: () => router.go(props.pathname),
      },
    })
  }

  protected render() {
    const { label } = this.props
    return `<a class="button-link">${label}</a>`
  }
}
