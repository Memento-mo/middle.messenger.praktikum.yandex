import Handlebars from 'handlebars'

import * as Components from './components'
import * as Partials from './partials'
import * as Pages from './pages'
import { registerComponent } from './core/registerComponent'
import Block from './core/Block'

const pages = {
  chat: Pages.ChatPage,
  login: Pages.LoginPage,
  notfound: Pages.NotFoundPage,
  profile: Pages.ProfilePage,
  'profile-edit': Pages.ProfileEditPage,
  'profile-edit-passwords': Pages.ProfileEditPasswordsPage,
  'server-error': Pages.ServerErrorPage,
  signin: Pages.SignInPage,
}

Object.entries(Partials).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component as Handlebars.Template)
})

Object.entries(Components).forEach(([name]) => {
  const componentLc = Components[name as keyof typeof Components] as typeof Block

  registerComponent(name, componentLc)
})

function navigate(page: keyof typeof pages) {
  const app = document.getElementById('app')

  const Component = pages[page]

  const component = new Component()

  if (page === 'chat') {
    app?.append(component.getContent()!)
  } else {
    app?.replaceChildren(component.getContent() || '')
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const pageFromQuery = window.location.pathname.split('/')[1] as keyof typeof pages

  if (!pages[pageFromQuery]) {
    navigate('chat')
  } else {
    navigate(pageFromQuery)
  }
});

document.addEventListener('click', (e) => {
  if (e.target) {
    const page = (e.target as HTMLElement).getAttribute('page') as keyof typeof pages

    if (page) {
      navigate(page)

      e.preventDefault()
      e.stopImmediatePropagation()
    }
  }
})
