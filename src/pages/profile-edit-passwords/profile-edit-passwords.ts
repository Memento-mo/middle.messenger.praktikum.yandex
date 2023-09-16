import Block from '../../core/Block'
import { validate } from '../../utils/validate'

export class ProfileEditPasswordsPage extends Block {
  constructor() {
    super({
      fields: [
        { title: 'Старый пароль', type: 'password', name: 'oldPassword' },
        {
          title: 'Новый пароль', type: 'password', name: 'newPassword', validate: (value: string) => validate(value, /^(?=.*[A-Z])(?=.*\d).{8,40}$/, 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.'),
        },
        { title: 'Повторите новый пароль', type: 'password', name: 'repeatPassword' },
      ],
      onLogin: (event: Event) => {
        event.preventDefault()
        const oldPassword = this.refs.oldPassword.value()
        const newPassword = this.refs.newPassword.value()
        const repeatPassword = this.refs.repeatPassword.value()

        const data = {
          oldPassword,
          newPassword,
          repeatPassword,
        }
        console.log(data)
      },
    })
  }

  protected render() {
    return `
      {{#>
        ProfileEditContentPasswords
          onClick=onLogin
      }}
          {{#each fields}}
            {{{ InputFieldProfile
                  title=this.title
                  type=this.type
                  name=this.name
                  value=""
                  ref=this.name
                  validate=this.validate
            }}}
          {{/each}}
      {{/ProfileEditContentPasswords}}
    `
  }
}
