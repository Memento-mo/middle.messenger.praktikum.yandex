const enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type Options = {
  timeout?: number
  method?: METHODS
  headers?: {
    [key: string]: string
  }
  data?: Object
}

type HTTPMethod = <Response>(
  url: string,
  options?: Options
) => Promise<Response>

export default class HTTPTransport {
  protected endpoint: string

  private API = 'https://ya-praktikum.tech/api/v2'

  constructor(endpoint: string) {
    this.endpoint = `${this.API}${endpoint}`;
  }

  public get: HTTPMethod = (url, options) => this.request(this.endpoint + url, { ...options, method: METHODS.GET })

  public post: HTTPMethod = (url, options) => this.request(this.endpoint + url, { ...options, method: METHODS.POST })

  public put: HTTPMethod = (url, options) => this.request(this.endpoint + url, { ...options, method: METHODS.PUT })

  public delete: HTTPMethod = (url, options) => this.request(this.endpoint + url, { ...options, method: METHODS.DELETE })

  private request: HTTPMethod = (url, options = { method: METHODS.GET }) => {
    const { method } = options;
    let { data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method as any, url);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = () => reject(new Error('abort'));
      xhr.onerror = () => reject(new Error('network error'));
      xhr.ontimeout = () => reject(new Error('timeout'));

      let sendData: FormData | string;
      if (!(data instanceof FormData)) {
        xhr.setRequestHeader('Content-Type', 'application/json');
        data = JSON.stringify(data) as string;
        sendData = data as string;
      } else {
        sendData = data as FormData;
      }

      if (method === METHODS.GET && url.match(/(.png|.jpg)$/)) {
        xhr.responseType = 'blob';
      } else {
        xhr.responseType = 'json';
      }

      xhr.withCredentials = true;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(sendData);
      }
    });
  };
}
