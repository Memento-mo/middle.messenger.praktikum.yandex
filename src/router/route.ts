import Block from '../core/Block'

function render(query: string, block: Block) {
  const root = document.querySelector(query);

  if (root === null) {
    throw new Error(`root not found by selector "${query}"`);
  }

  root.innerHTML = '';

  root.append(block.getContent()!);

  return root;
}

export default class Route {
  _pathname: string

  _blockClass

  private _block: Block | null = null

  private _props: any

  constructor(pathname: string, view: typeof Block, props: any) {
    this._pathname = pathname
    this._blockClass = view
    this._props = props
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname
      this.render()
    }
  }

  leave() {
    if (this._block) {
      this._block.dispatchComponentWillUnmount()

      this._block = null
    }
  }

  match(pathname: string) {
    return pathname === this._pathname
  }

  render() {
    if (!this._block) {
      const props = this._props ? this._props : {};

      this._block = new this._blockClass(props);

      render(this._props.rootQuery, this._block);
    }
  }
}
