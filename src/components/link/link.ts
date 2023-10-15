import Block from '../../core/Block'
import router from '../../router/router'

interface IProps {
  pathname: string
}

export class Link extends Block {
  constructor(props: IProps) {
    super({
      ...props,
      events: {
        click: () => router.go(props.pathname),
      },
    })
  }

  protected render(): string {
    const { title, classes } = this.props

    return `
      <a class="${classes}">${title}</a>
    `
  }
}
