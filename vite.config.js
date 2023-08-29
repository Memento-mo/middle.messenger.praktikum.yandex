import { resolve } from 'path'
import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'

const loginFields = [
  { title: 'Логин', type: 'text', name: 'login' },
  { title: 'Пароль', type: 'password', name: 'password' }
]

const signInFields = [
  { title: 'Почта', type: 'text', name: 'email' },
  { title: 'Логин', type: 'text', name: 'login' },
  { title: 'Имя', type: 'text', name: 'first_name' },
  { title: 'Фамилия', type: 'text', name: 'second_name' },
  { title: 'Телефон', type: 'text', name: 'phone' },
  { title: 'Пароль', type: 'password', name: 'password' },
  { title: 'Пароль (еще раз)', type: 'password', name: 'password-repeat' }
]

const profileFields = [
  { title: 'Почта', type: 'text', name: 'email', value: 'pochta@yandex.ru' },
  { title: 'Логин', type: 'text', name: 'login', value: 'glebkaz' },
  { title: 'Имя', type: 'text', name: 'first_name', value: 'Глеб' },
  { title: 'Фамилия', type: 'text', name: 'second_name', value: 'Пологов' },
  { title: 'Имя в чате', type: 'text', name: 'display_name', value: 'Глеб' },
  { title: 'Телефон', type: 'text', name: 'phone', value: '+7 (976) 854 23 32' }
]

const passwordsField = [
  { title: 'Старый пароль', type: 'password', name: 'oldPassword' },
  { title: 'Новый пароль', type: 'password', name: 'newPassword' },
  { title: 'Повторите новый пароль', type: 'password', name: 'newPassword' }
]

const icons = {
  backSVG: `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="14" cy="14" r="14" transform="rotate(-180 14 14)" fill="#3369F3"/>
            <rect x="20" y="14.8" width="11" height="1.6" transform="rotate(-180 20 14.8)" fill="white"/>
            <path d="M13 19L9 14L13 9" stroke="white" stroke-width="1.6"/>
            </svg>`,
  avatarSVG: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M36 2H4C2.89543 2 2 2.89543 2 4V25.2667L14.6547 22.3139C15.5486 22.1053 16.4635 22 17.3814 22H22.6186C23.5365 22 24.4514 22.1053 25.3453 22.3139L38 25.2667V4C38 2.89543 37.1046 2 36 2ZM4 0C1.79086 0 0 1.79086 0 4V36C0 38.2091 1.79086 40 4 40H36C38.2091 40 40 38.2091 40 36V4C40 1.79086 38.2091 0 36 0H4ZM10.9091 14.5455C12.9174 14.5455 14.5455 12.9174 14.5455 10.9091C14.5455 8.90079 12.9174 7.27273 10.9091 7.27273C8.90082 7.27273 7.27276 8.90079 7.27276 10.9091C7.27276 12.9174 8.90082 14.5455 10.9091 14.5455Z" fill="#CDCDCD"/>
              </svg>`
}

export default defineConfig({
  root: resolve(__dirname, 'src'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        profile: resolve(__dirname, 'src/pages/profile.html'),
        profileEdit: resolve(__dirname, 'src/pages/profile-edit.html'),
        profileEditPasswords: resolve(__dirname, 'src/pages/profile-edit-passwords.html'),
        login: resolve(__dirname, 'src/pages/login.html'),
        signin: resolve(__dirname, 'src/pages/signin.html'),
        '404': resolve(__dirname, 'src/pages/404.html'),
        '500': resolve(__dirname, 'src/pages/500.html')
      }
    }
  },
  plugins: [handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
      context: {
        title: 'Web chat',
        loginFields,
        signInFields,
        profileFields,
        passwordsField,
        ...icons
      }
  })]
})
