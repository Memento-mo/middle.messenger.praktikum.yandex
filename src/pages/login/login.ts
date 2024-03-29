import AuthController from '../../controllers/AuthController'
import Block from '../../core/Block'

export class LoginPage extends Block {
  constructor() {
    super({
      fields: [
        {
          title: 'Логин',
          type: 'text',
          name: 'login',
          validate: (value: string) => (value.length === 0 ? 'Длина логина должна быть больше 0' : ''),
        },
        {
          title: 'Пароль',
          type: 'password',
          name: 'password',
          validate: (value: string) => (value.length === 0 ? 'Длина пароля должна быть больше 0.' : ''),
        },
      ],
      onLogin: (event: Event) => {
        event.preventDefault()
        const login = this.refs.login.value() as string
        const password = this.refs.password.value() as string

        AuthController.fetchLogin({ login, password })
      },
    })
  }

  protected render() {
    return `
      <div class="auth-page">
        {{#> AuthCard
              fields=fields
              buttonLabel="Авторизоваться"
              pageTitle="Войти"
              onClick=onLogin
              buttonLinkLabel="Нет аккаунта?"
              href="/sign-up"
              page="loginPage"
        }}
          {{#each fields}}
            {{{ InputField
                  placeholder=this.title
                  type=this.type
                  name=this.name
                  classes="input"
                  ref=this.name
                  validate=this.validate
            }}}
          {{/each}}
        {{/AuthCard}}
      </div>
    `
  }
}
