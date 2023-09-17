import Block from '../../core/Block'

export class InputField extends Block {
  constructor(props) {
    super({
      ...props,
      onBlur: () => this.validate(),
    })
  }

  public value() {
    if (!this.validate()) {
      return ''
    }

    return (this.refs.input.element as HTMLInputElement).value
  }

  private validate() {
    const { value } = this.refs.input.element as HTMLInputElement
    const error = this.props.validate?.(value)

    if (error) {
      this.refs.errorLine.setProps({ error })
      return false
    }

    this.refs.errorLine.setProps({ error: undefined })
    return true
  }

  protected render(): string {
    const {
      placeholder,
      type,
      name,
      classes,
    } = this.props

    return `
      <div>
        {{{ Input
              placeholder="${placeholder}"
              ref="input"
              type="${type}"
              name="${name}"
              value=""
              classes="${classes}"
              onBlur=onBlur
        }}}
        {{{ ErrorLine error=error ref="errorLine"}}}
      </div>
    `
  }
}
