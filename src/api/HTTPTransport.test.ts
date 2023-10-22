import sinon, {
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic,
} from 'sinon'
import { expect } from 'chai'
import HTTPTransport from './HTTPTransport'

describe('HTTPTransport', () => {
  let xhr: SinonFakeXMLHttpRequestStatic
  let instance: HTTPTransport
  const requests: SinonFakeXMLHttpRequest[] = []

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    (global as any).XMLHttpRequest = xhr

    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      requests.push(request)
    }

    instance = new HTTPTransport('/auth')
  })

  afterEach(() => {
    requests.length = 0
  })

  it('Check send GET request', () => {
    instance.get('/user')

    const [request] = requests

    expect(request.method).to.eq('GET')
  })

  it('Check send PUT request', () => {
    instance.put('/user')

    const [request] = requests

    expect(request.method).to.eq('PUT')
  })

  it('Check send DELETE request', () => {
    instance.delete('/user')

    const [request] = requests

    expect(request.method).to.eq('DELETE')
  })

  it('Check send POST request', () => {
    instance.post('/user')

    const [request] = requests

    expect(request.method).to.eq('POST')
  })

  it('Check send POST request with data', () => {
    instance.post(
      '/user',
      {
        data: {
          user: 'gleb',
        },
      },
    )

    const [request] = requests

    const name = JSON.parse(request.requestBody)?.user

    expect(name).to.be.eq('gleb')
  })
})
