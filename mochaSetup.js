import { JSDOM } from 'jsdom'

const dom = new JSDOM('<div class="app"></div>', {
  url: 'http://localhost:3000',
})

global.dom = dom
global.window = dom.window

global.document = dom.window.document
global.Node = dom.window.Node
global.MouseEvent = dom.window.MouseEvent
