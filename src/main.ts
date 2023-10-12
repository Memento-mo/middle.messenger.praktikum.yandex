import Handlebars from 'handlebars'

import * as Components from './components'
import * as Partials from './partials'
import * as Pages from './pages'
import { registerComponent } from './core/registerComponent'
import Block from './core/Block'
import Router from './router/router'
import AuthController from './controllers/AuthController'

const pages = {
  chat: Pages.ChatPage,
  login: Pages.LoginPage,
  notfound: Pages.NotFoundPage,
  settings: Pages.ProfilePage,
  'settings-edit': Pages.ProfileEditPage,
  'settings-edit-passwords': Pages.ProfileEditPasswordsPage,
  'server-error': Pages.ServerErrorPage,
  signup: Pages.SignUpPage,
}

enum Routes {
  Chat = '/messenger',
  SignUp = '/sign-up',
  Login = '/',
  Settings = '/settings',
  SettingsEdit = '/settings/edit',
  SettingsEditPasswords = '/settings/edit/passwords',
  Notfound = '/404',
  ServerError = '/500',
}

Object.entries(Partials).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component as Handlebars.Template)
})

Object.entries(Components).forEach(([name]) => {
  const componentLc = Components[name as keyof typeof Components] as typeof Block

  registerComponent(name, componentLc)
})

document.addEventListener('DOMContentLoaded', async () => {
  Router
    .use(Routes.Login, pages.login)
    .use(Routes.Chat, pages.chat)
    .use(Routes.SignUp, pages.signup)
    .use(Routes.Settings, pages.settings)
    .use(Routes.SettingsEdit, pages['settings-edit'])
    .use(Routes.SettingsEditPasswords, pages['settings-edit-passwords'])
    .use(Routes.Notfound, pages.notfound)
    .use(Routes.ServerError, pages['server-error'])

  try {
    const user = await AuthController.fetchUser()

    Router.start()

    if (user) {
      Router.go('/messenger')
    }
  } catch (error) {
    Router.start()
  }
})
