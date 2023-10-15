import Block from '../../core/Block'

export class ChatOnlineModal extends Block {
  protected render(): string {
    return `
      <div class="chat-online-modal">
        <div class="chat-online-modal__icon">
          <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="1.5" cy="2" r="1.5" fill="#1E1E1E"/>
          <circle cx="1.5" cy="8" r="1.5" fill="#1E1E1E"/>
          <circle cx="1.5" cy="14" r="1.5" fill="#1E1E1E"/>
          </svg>
        </div>
        <div class="chat-online-modal__users">
          {{{ ChatOnlineModalButton title="Добавить пользователя" click=this.onHandleModalAddUser }}}
          {{{ ChatOnlineModalButton title="Удалить пользователя" click=this.onHandleModalRemoveUser }}}
          {{{ ChatOnlineModalButton title="Удалить чат" click=this.onHandleRemoveChat }}}
        </div>
      </div>
    `
  }
}
