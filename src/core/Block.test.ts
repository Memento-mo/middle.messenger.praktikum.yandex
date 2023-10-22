import { expect } from 'chai'
import sinon from 'sinon'
import Block from './Block'

interface IProps {
  text?: string
  events?: Record<string, () => void>
}

describe('Block', () => {
  let PageClass: typeof Block

  before(() => {
    class Page extends Block {
      constructor(props: IProps) {
        super({
          ...props,
        })
      }

      protected render(): string {
        return `
          <div>
            <span id="test-text">{{text}}</span>
            <button>{{text-button}}</button>
          </div>
        `
      }
    }

    PageClass = Page
  })

  it('Should create component with state from constuctor', () => {
    const pageComponent = new PageClass({ text: 'Gleb' })

    const span = pageComponent.element?.querySelector('#test-text')?.innerHTML

    expect(span).to.be.eq('Gleb')
  })

  it('Should reactive props', () => {
    const testText = 'newValue'

    const pageComponent = new PageClass({ text: 'value' })

    pageComponent.setProps({ text: testText })

    const span = pageComponent.element?.querySelector('#test-text')?.innerHTML

    expect(span).to.be.eq(testText)
  })

  it('Component should be set event on element', () => {
    const handleStub = sinon.stub()
    const pageComponent = new PageClass({
      events: {
        click: handleStub,
      },
    })

    const event = new MouseEvent('click')
    pageComponent.element?.dispatchEvent(event)

    expect(handleStub.calledOnce).to.be.true
  })
})
