import UserController from '../../controllers/UserController'
import Block from '../../core/Block'

export class AvatarModal extends Block {
  onLoadFile() {
    const element = this.refs.file.element as HTMLInputElement

    if (element) {
      const File = element.files![0]
      const formData = new FormData()
      formData.append('avatar', File)

      UserController.fetchAvatarLoad(formData)
      this.props.onCancel = this.props.onCancel.bind(this)
    }
  }

  protected init(): void {
    this.props.onClick = this.onLoadFile.bind(this)
  }

  protected render() {
    const {
      isVisible,
    } = this.props

    return `
      <div class="avatar-modal ${isVisible ? 'show' : 'hide'}">
        <div class="avatar-modal__card">
          <div class="avatar-modal__card-title">
            Загрузите файл
          </div>

          <div class="avatar-modal__card-select">
            Выбрать файл на компьютере
            <div class="avatar-modal__card-file">
              {{{ Input
                  type="file"
                  placeholder="Выбрать файл на компьютере"
                  name="file"
                  ref="file"
              }}}
            </div>
          </div>

          <div class="avatar-modal__card-buttons">
            {{{ Button label="Отмена" onClick=onCancel }}}
            {{{ Button label="Поменять" onClick=onClick }}}
          </div>
        </div>
      </div>
    `
  }
}
