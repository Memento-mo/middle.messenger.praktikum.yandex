import { InputField } from '..'

export class InputFieldProfile extends InputField {
  protected render(): string {
    const {
      type,
      name,
      value,
      title,
    } = this.props

    return `
      <div>
        <div class="profile-fields__field">
          <label class="profile-fields__field-label">${title}</label>
            {{{ Input
                  ref="input"
                  type="${type}"
                  name="${name}"
                  placeholder=""
                  value="${value}"
                  classes="profile-fields__field-input"
                  onBlur=onBlur
            }}}
        </div>
        {{{ ErrorLine error=error ref="errorLine"}}}
      </div>
    `
  }
}
