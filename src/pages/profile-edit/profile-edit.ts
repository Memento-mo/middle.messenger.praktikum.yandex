import AuthController from '../../controllers/AuthController'
import UserController from '../../controllers/UserController'
import Block from '../../core/Block'
import { IUserEdit } from '../../types/user'
import { connect } from '../../utils/connect'
import { State } from '../../utils/store'

import { validate } from '../../utils/validate'

class ProfileEdit extends Block {
  onSubmit(event: Event) {
    let isValid = true

    event.preventDefault()

    const refInputs: Array<keyof IUserEdit> = ['email', 'login', 'first_name', 'second_name', 'phone', 'display_name']
    const data: IUserEdit = {
      first_name: '',
      second_name: '',
      email: '',
      phone: '',
      login: '',
      display_name: '',
    }

    refInputs.forEach((key) => {
      const value = this.refs[key].value()
      if (value) {
        // @ts-ignore
        if (!this.refs[key].props.validate(value)) {
          data[key] = value
        }
      }
    })

    Object.keys(data).forEach((key) => {
      if (!data[key as keyof typeof data]) {
        isValid = false
      }
    })

    if (isValid) {
      UserController.fetchEditProfile(data)
      AuthController.fetchUser()
    }
  }

  protected init(): void {
    const {
      first_name,
      email,
      second_name,
      phone,
      display_name,
      login,
    } = this.props.user.data

    this.props.fields = [
      {
        title: 'Почта', type: 'text', name: 'email', value: email, validate: (value: string) => validate(value, /^[a-zA-Z0-9_.-]+@[a-zA-Z]+(\.[a-zA-Z]+)*(\.[a-zA-Z]{2,})$/, 'Почта введена неправильно'),
      },
      {
        title: 'Логин', type: 'text', name: 'login', value: login, validate: (value: string) => validate(value, /^(?!\\d+$)[a-zA-Z0-9_-]{3,20}$/, 'От 3-ех до 20-ти символов, может содержать цифры'),
      },
      {
        title: 'Имя', type: 'text', name: 'first_name', value: first_name, validate: (value: string) => validate(value, /^[A-ZА-ЯЁ][a-zA-ZА-ЯЁа-яё-]*$/, 'Первая буква должна быть заглавная, без пробелов и цифр'),
      },
      {
        title: 'Фамилия', type: 'text', name: 'second_name', value: second_name, validate: (value: string) => validate(value, /^[A-ZА-ЯЁ][a-zA-ZА-ЯЁа-яё-]*$/, 'Первая буква должна быть заглавная, без пробелов и цифр'),
      },
      {
        title: 'Имя в чате', type: 'text', name: 'display_name', value: display_name || '', validate: (value: string) => validate(value, /^[A-ZА-ЯЁ][a-zA-ZА-ЯЁа-яё-]*$/, 'Первая буква должна быть заглавная, без пробелов и цифр'),
      },
      {
        title: 'Телефон', type: 'text', name: 'phone', value: phone, validate: (value: string) => validate(value, /^\+?\d{10,15}$/, 'от 10 до 15 символов, состоит из цифр, может начинается с плюса.'),
      },
    ]

    this.props.onSubmit = this.onSubmit.bind(this)
    this.props.isVisible = false
    this.props.onHandleModal = this.onHandleModal.bind(this)
  }

  onHandleModal() {
    this.props.isVisible = !this.props.isVisible
  }

  protected render(): string {
    return `
      {{#>
        ProfileEditContent
          onClick=onSubmit
      }}
        {{#each fields}}
          {{{ InputFieldProfile
                title=this.title
                type=this.type
                name=this.name
                value=this.value
                ref=this.name
                validate=this.validate
          }}}
        {{/each}}
        {{{ AvatarModal }}}
      {{/ProfileEditContent}}
    `
  }
}

const mapStateToProps = (state: State) => ({
  user: state.user,
})

export const ProfileEditPage = connect(mapStateToProps)(ProfileEdit)
