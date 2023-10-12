import Block from '../../core/Block'

export class ChatPage extends Block {
  protected render(): string {
    return `
      {{> ChatContent}}
    `
  }
}
