import Block from '../../core/Block'
import { IChat } from '../../types/chat'
import { connect } from '../../utils/connect'
import { State } from '../../utils/store'

interface IProps {
  chats: IChat[]
}

class List extends Block {
  constructor(props: IProps) {
    super({
      chats: props.chats,
    })
  }

  protected render(): string {
    return `
      <div>
        {{#each chats}}
          {{> ChatItem }}
        {{/each}}
      </div>
    `
  }
}

const mapStateToProps = (state: State) => {
  if (state.chats?.data) {
    return { chats: state.chats?.data }
  }

  return {
    chats: [],
  }
}

export const ChatList = connect(mapStateToProps)(List)
