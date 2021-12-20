type Config = Omit<RequestInit, "method">;

enum Method {
  GET = "GET",
  HEAD = "HEAD",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

const prefix: string = "http://localhost:3000/api";

export const get = (path: string, config?: Config) =>
  fetch(prefix + path, { ...config, method: Method.GET });
export const head = (path: string, config?: Config) =>
  fetch(prefix + path, { ...config, method: Method.HEAD });
export const post = (path: string, config?: Config) =>
  fetch(prefix + path, { ...config, method: Method.POST });
export const put = (path: string, config?: Config) =>
  fetch(prefix + path, { ...config, method: Method.PUT });
export const patch = (path: string, config?: Config) =>
  fetch(prefix + path, { ...config, method: Method.PATCH });
export const del = (path: string, config?: Config) =>
  fetch(prefix + path, { ...config, method: Method.DELETE });
