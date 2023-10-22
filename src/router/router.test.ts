import { expect } from 'chai'
import { LoginPage } from '../pages/login'
import { SignUpPage } from '../pages/signup'
import router from './router'

describe('Router', () => {
  beforeEach(() => {
    router.routes = []
  })

  it('New router have 0 routes', () => {
    expect(router.routes.length).to.be.equal(0)
  })

  it('Can add a new route', () => {
    router.use('/login', LoginPage)

    const { routes } = router

    expect(routes.length).to.be.equal(1)
    expect(routes[0]._pathname).to.be.equal('/login')
  })

  it('Can find a route if it is among used routes', () => {
    router
      .use('/login', LoginPage)
      .use('/sign-up', SignUpPage)
      .start()
    const { routes } = router

    expect(routes[1]._pathname).to.be.equal('/sign-up')
  })

  it('Testing back', () => {
    router
      .use('/login', LoginPage)
      .start()

    router.back()

    expect(router.routes.length).to.eq(1)
  })

  it('Testing forward', () => {
    router
      .use('/login', LoginPage)
      .use('/sign-up', SignUpPage)
      .start()

    router.forward()

    expect(router.routes.length).to.eq(2)
  })
})
