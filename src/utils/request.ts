type Config = Omit<RequestInit, "method">;

enum Method {
  GET = "GET",
  PUT = "PUT",
  HEAD = "HEAD",
  POST = "POST",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

const prefix: string =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:3000/api"
    : "https://calvo-jp.vercel.app/api";

const request = {
  get: async (path: string, config?: Config) =>
    await fetch(prefix + path, { ...config, method: Method.GET }),
  head: async (path: string, config?: Config) =>
    await fetch(prefix + path, { ...config, method: Method.HEAD }),
  post: async (path: string, config?: Config) =>
    await fetch(prefix + path, { ...config, method: Method.POST }),
  put: async (path: string, config?: Config) =>
    await fetch(prefix + path, { ...config, method: Method.PUT }),
  patch: async (path: string, config?: Config) =>
    await fetch(prefix + path, { ...config, method: Method.PATCH }),
  delete: async (path: string, config?: Config) =>
    await fetch(prefix + path, { ...config, method: Method.DELETE }),
};

export default request;
