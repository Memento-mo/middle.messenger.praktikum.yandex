import HTTPTransport from './HTTPTransport'

export class ResourcesAPI {
  private http: HTTPTransport

  constructor() {
    this.http = new HTTPTransport('/resources')
  }

  read(path: string): Promise<Blob> {
    return this.http.get(path);
  }
}
