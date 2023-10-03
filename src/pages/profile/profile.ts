import AuthController from '../../controllers/AuthController'
import Block from '../../core/Block'
import { connect } from '../../utils/connect'
import { State } from '../../utils/store'

class Profile extends Block {
  onLogout() {
    AuthController.fetchLogout()
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
        title: 'Почта', type: 'text', name: 'email', value: email,
      },
      {
        title: 'Логин', type: 'text', name: 'login', value: login,
      },
      {
        title: 'Имя', type: 'text', name: 'first_name', value: first_name,
      },
      {
        title: 'Фамилия', type: 'text', name: 'second_name', value: second_name,
      },
      {
        title: 'Имя в чате', type: 'text', name: 'display_name', value: display_name,
      },
      {
        title: 'Телефон', type: 'text', name: 'phone', value: phone,
      },
    ]

    this.props.firstName = first_name
    this.props.secondName = second_name
    this.props.isVisible = false
    this.props.onLogout = this.onLogout.bind(this)
    this.props.onHandleModal = this.onHandleModal.bind(this)
  }

  onHandleModal() {
    this.props.isVisible = !this.props.isVisible
  }

  protected render(): string {
    return `
      {{> ProfileContent }}
    `
  }
}

const mapStateToProps = (state: State) => ({
  user: state.user,
})

export const ProfilePage = connect(mapStateToProps)(Profile)
