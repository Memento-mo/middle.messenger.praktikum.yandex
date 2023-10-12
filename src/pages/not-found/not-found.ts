import Block from '../../core/Block'

export class NotFoundPage extends Block {
  protected render() {
    return '{{> ErrorContent code="404" msg="Не туда попали" label="Назад к чатам" href="/"}}'
  }
}
