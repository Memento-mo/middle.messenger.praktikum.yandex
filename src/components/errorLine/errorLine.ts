import Block from '../../core/Block'

export class ErrorLine extends Block {
  protected render(): string {
    return '<div class="error">{{error}}</div>'
  }
}
