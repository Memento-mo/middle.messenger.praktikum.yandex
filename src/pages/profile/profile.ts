import Block from '../../core/Block'

export class ProfilePage extends Block {
  constructor() {
    super({
      fields: [
        {
          title: 'Почта', type: 'text', name: 'email', value: 'pochta@yandex.ru',
        },
        {
          title: 'Логин', type: 'text', name: 'login', value: 'glebkaz',
        },
        {
          title: 'Имя', type: 'text', name: 'first_name', value: 'Глеб',
        },
        {
          title: 'Фамилия', type: 'text', name: 'second_name', value: 'Пологов',
        },
        {
          title: 'Имя в чате', type: 'text', name: 'display_name', value: 'Глеб',
        },
        {
          title: 'Телефон', type: 'text', name: 'phone', value: '+7 (976) 854 23 32',
        },
      ],
    })
  }

  protected render(): string {
    return `
      {{> ProfileContent}}
    `
  }
}
