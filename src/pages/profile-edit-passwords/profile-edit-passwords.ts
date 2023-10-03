import UserController from '../../controllers/UserController'
import Block from '../../core/Block'
import { IUserEditPassword } from '../../types/user'
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
        let isValid = true

        event.preventDefault()
        const oldPassword = this.refs.oldPassword.value() as string
        const newPassword = this.refs.newPassword.value() as string
        const repeatPassword = this.refs.repeatPassword.value() as string

        const data: IUserEditPassword = {
          oldPassword,
          newPassword,
        }

        if (
          newPassword !== repeatPassword
          // @ts-ignore
            || this.refs.newPassword.props.validate(newPassword)
            || !oldPassword
        ) {
          isValid = false
        }

        if (isValid) {
          UserController.fetchEditPassword(data)
        }
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
