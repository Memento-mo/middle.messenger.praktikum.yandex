import Block from '../../core/Block'

export class ServerErrorPage extends Block {
  protected render() {
    return '{{> ErrorContent code="500" msg="Мы уже фиксим" label="Назад к чатам" href="/"}}'
  }
}
