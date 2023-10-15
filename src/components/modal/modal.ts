import Block from '../../core/Block'

export class Modal extends Block {
  constructor() {
    super()
    console.log('call')
  }

  protected render() {
    const {
      isVisible,
      labelButton,
      title,
    } = this.props
    console.log(isVisible)
    return `
      <div class="modal show ${isVisible ? 'show' : 'hide'}">
        <div class="modal__card">
          <div class="modal__card-title">
            ${title}
          </div>

          <div class="modal__card-content">
            {{> @partial-block }}
          </div>

          <div class="avatar-modal__card-buttons">
            {{{ Button label="Отмена" onClick=onCancel }}}
            {{{ Button label=${labelButton} onClick=onClick }}}
          </div>
        </div>
      </div>
    `
  }
}
