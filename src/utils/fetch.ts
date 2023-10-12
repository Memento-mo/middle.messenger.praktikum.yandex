/**
* Функцию реализовывать здесь необязательно, но может помочь не плодить логику у GET-метода
* На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
* На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
*/
function queryStringify(obj: {[key: string]: any}) {
  let queryString = ''

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (queryString !== '') {
        queryString += '&'
      }
      let value = obj[key]

      if (Array.isArray(value)) {
        value = value.join(',')
      } else if (typeof value === 'object') {
        value = '[object Object]'
      }
      queryString += `${key}=${value}`
    }
  }
  return queryString;
}

enum METHODS {
  GET,
  POST,
  PUT,
  DELETE
}

type Options = {
  timeout?: number
  method: METHODS
  headers?: {
    [key: string]: string
  }
  data?: any
}

type HTTPMethod = (url: string, options?: Options) => Promise<unknown>

export class HTTPTransport {
  get: HTTPMethod = (url, options) => this.request(url, { ...options, method: METHODS.GET }, options?.timeout)

  post: HTTPMethod = (url, options) => this.request(url, { ...options, method: METHODS.POST }, options?.timeout)

  put: HTTPMethod = (url, options) => this.request(url, { ...options, method: METHODS.PUT }, options?.timeout)

  delete: HTTPMethod = (url, options) => this.request(url, { ...options, method: METHODS.DELETE }, options?.timeout)

  // options:
  // headers — obj
  // data — obj
  request = (url: string, options: Options, timeout = 5000) => new Promise((resolve, reject) => {
    const { method, data, headers } = options
    const xhr = new XMLHttpRequest()

    const isGet = method === METHODS.GET;
    xhr.open(method as unknown as string, isGet && !!data ? `?${url}${queryStringify(data)}` : url)

    xhr.onload = () => {
      resolve(xhr)
    }

    if (headers) {
      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, String(headers[key]))
      })
    }

    xhr.timeout = timeout

    xhr.onabort = reject
    xhr.onerror = reject
    xhr.ontimeout = reject

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Set-Cookie', 'none');
    xhr.withCredentials = true

    if (method === METHODS.GET || !data) {
      xhr.send();
    } else {
      xhr.send(JSON.stringify(data))
    }
  })
}
