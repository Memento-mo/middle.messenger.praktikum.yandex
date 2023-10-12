import Block from '../../core/Block'

interface IProps {
  onBlur: () => void
}

export class Input extends Block {
  constructor(props: IProps) {
    super({
      ...props,
      events: {
        blur: props.onBlur,
      },
    })
  }

  protected render(): string {
    const {
      placeholder,
      name,
      type,
      value,
      classes,
    } = this.props

    return `
          <input
            placeholder="${placeholder}"
            type="${type}"
            name="${name}"
            ref="${name}"
            value="${value}"
            class="${classes}"
          >
        `
  }
}
