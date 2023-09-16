import Block from '../../core/Block'

import { validate } from '../../utils/validate'

export class ProfileEditPage extends Block {
  constructor() {
    super({
      fields: [
        {
          title: 'Почта', type: 'text', name: 'email', value: 'pochta@yandex.ru', validate: (value: string) => validate(value, /^[a-zA-Z0-9_.-]+@[a-zA-Z]+(\.[a-zA-Z]+)*(\.[a-zA-Z]{2,})$/, 'Почта введена неправильно'),
        },
        {
          title: 'Логин', type: 'text', name: 'login', value: 'glebkaz', validate: (value: string) => validate(value, /^(?!\\d+$)[a-zA-Z0-9_-]{3,20}$/, 'От 3-ех до 20-ти символов, может содержать цифры'),
        },
        {
          title: 'Имя', type: 'text', name: 'first_name', value: 'Глеб', validate: (value: string) => validate(value, /^[A-ZА-ЯЁ][a-zA-ZА-ЯЁа-яё-]*$/, 'Первая буква должна быть заглавная, без пробелов и цифр'),
        },
        {
          title: 'Фамилия', type: 'text', name: 'second_name', value: 'Пологов', validate: (value: string) => validate(value, /^[A-ZА-ЯЁ][a-zA-ZА-ЯЁа-яё-]*$/, 'Первая буква должна быть заглавная, без пробелов и цифр'),
        },
        {
          title: 'Имя в чате', type: 'text', name: 'display_name', value: 'Глеб',
        },
        {
          title: 'Телефон', type: 'text', name: 'phone', value: '+79768542332', validate: (value: string) => validate(value, /^\+?\d{10,15}$/, 'от 10 до 15 символов, состоит из цифр, может начинается с плюса.'),
        },
      ],
      onLogin: (event: Event) => {
        event.preventDefault()

        const refInputs = ['email', 'login', 'first_name', 'second_name', 'phone', 'display_name']
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

  protected render(): string {
    return `
      {{#>
        ProfileEditContent
          onClick=onLogin
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
      {{/ProfileEditContent}}
    `
  }
}
