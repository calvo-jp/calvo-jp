import globalConfig from "config";

enum Method {
  GET = "GET",
  PUT = "PUT",
  HEAD = "HEAD",
  POST = "POST",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

const prefix = (path: string) => {
  let prefix_: string;

  if (globalConfig.DEBUG) {
    prefix_ = "http://localhost:3000/api/";
  } else {
    prefix_ = "https://calvo-jp.vercel.app/api/";
  }

  return prefix_ + path;
};

type RequestConfig = Omit<RequestInit, "method">;
type GetRequestConfig = Omit<RequestConfig, "body">;
type DeleteRequestConfig = GetRequestConfig;

const request = {
  get: async (path: string, config?: GetRequestConfig) =>
    await fetch(prefix(path), { ...config, method: Method.GET }),
  head: async (path: string, config?: RequestConfig) =>
    await fetch(prefix(path), { ...config, method: Method.HEAD }),
  post: async (path: string, config?: RequestConfig) =>
    await fetch(prefix(path), { ...config, method: Method.POST }),
  put: async (path: string, config?: RequestConfig) =>
    await fetch(prefix(path), { ...config, method: Method.PUT }),
  patch: async (path: string, config?: RequestConfig) =>
    await fetch(prefix(path), { ...config, method: Method.PATCH }),
  delete: async (path: string, config?: DeleteRequestConfig) =>
    await fetch(prefix(path), { ...config, method: Method.DELETE }),
};

export default request;
