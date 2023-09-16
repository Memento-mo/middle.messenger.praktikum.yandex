import Block from '../../core/Block'

import { validate } from '../../utils/validate'

const fields = [
  {
    title: 'Почта',
    type: 'text',
    name: 'email',
    validate: (value: string) => validate(value, /^[a-zA-Z0-9_.-]+@[a-zA-Z]+(\.[a-zA-Z]+)*(\.[a-zA-Z]{2,})$/, 'Почта введена неправильно'),
  },
  {
    title: 'Логин',
    type: 'text',
    name: 'login',
    validate: (value: string) => validate(value, /^(?!\\d+$)[a-zA-Z0-9_-]{3,20}$/, 'От 3-ех до 20-ти символов, может содержать цифры'),
  },
  {
    title: 'Имя',
    type: 'text',
    name: 'first_name',
    validate: (value: string) => validate(value, /^[A-ZА-ЯЁ][a-zA-ZА-ЯЁа-яё-]*$/, 'Первая буква должна быть заглавная, без пробелов и цифр'),
  },
  {
    title: 'Фамилия',
    type: 'text',
    name: 'second_name',
    validate: (value: string) => validate(value, /^[A-ZА-ЯЁ][a-zA-ZА-ЯЁа-яё-]*$/, 'Первая буква должна быть заглавная, без пробелов и цифр'),
  },
  {
    title: 'Телефон',
    type: 'text',
    name: 'phone',
    validate: (value: string) => validate(value, /^\+?\d{10,15}$/, 'от 10 до 15 символов, состоит из цифр, может начинается с плюса.'),
  },
  {
    title: 'Пароль',
    type: 'password',
    name: 'password',
    validate: (value: string) => validate(value, /^(?=.*[A-Z])(?=.*\d).{8,40}$/, 'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.'),
  },
  { title: 'Пароль (еще раз)', type: 'password', name: 'password-repeat' },
]

export class SignInPage extends Block {
  constructor() {
    super({
      fields,
      onLogin: (event: Event) => {
        event.preventDefault()

        const refInputs = ['email', 'login', 'first_name', 'second_name', 'phone', 'password', 'password-repeat']
        const data: {
          [key in typeof refInputs[number]]: string
        } = {}

        refInputs.forEach((key) => {
          const value = this.refs[key].value()

          if (value) {
            data[key] = value
          }
        })

        console.log(data)
      },
    })
  }

  protected render() {
    return `
      <div class="auth-page">
        {{#> AuthCard
              fields=fields
              ref="loginForm"
              onClick=onLogin
              buttonLabel="Зарегистрироваться"
              buttonLinkLabel="Войти"
              pageTitle="Регистрация"
              href="login"
              page="signin"
        }}
          {{#each fields}}
            {{{ InputField
                  placeholder=this.title
                  type=this.type
                  classes="input"
                  name=this.name
                  ref=this.name
                  validate=this.validate
            }}}
          {{/each}}
        {{/AuthCard}}
      </div>
    `
  }
}
