export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete,
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";

function get<T>(url: string): Promise<T> {
  const requestOptions = {
    method: "GET",
  };

  return fetch(baseUrl + url, requestOptions).then<T>(handleResponse);
}

// eslint-disable-next-line @typescript-eslint/ban-types
function post<T>(url: string, body: object): Promise<T> {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  return fetch(baseUrl + url, requestOptions).then<T>(handleResponse);
}

// eslint-disable-next-line @typescript-eslint/ban-types
function put<T>(url: string, body: object): Promise<T> {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  return fetch(baseUrl + url, requestOptions).then<T>(handleResponse);
}

function _delete<T>(url: string): Promise<T> {
  const requestOptions = {
    method: "DELETE",
  };
  return fetch(baseUrl + url, requestOptions).then<T>(handleResponse);
}

function handleResponse<T>(res: Response) {
  return res.text().then((text) => {
    const data: T = JSON.parse(text) as T;

    if (!res.ok) {
      const error = `${res.status} ${res.statusText}`;
      return Promise.reject(error);
    }

    return data;
  });
}
