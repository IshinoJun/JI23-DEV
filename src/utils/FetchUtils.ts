const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? '';

const handleResponse = <T>(res: Response) => {
  return res.text().then((text) => {
    const data: T = JSON.parse(text) as T;

    if (!res.ok) {
      const error = `${res.status} ${res.statusText}`;

      return Promise.reject(error);
    }

    return data;
  });
};

const get = <T>(url: string): Promise<T> => {
  const requestOptions = {
    method: 'GET',
  };

  return fetch(baseUrl + url, requestOptions).then<T>(handleResponse);
};

// eslint-disable-next-line @typescript-eslint/ban-types
const post = <T>(url: string, body: object): Promise<T> => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };

  return fetch(baseUrl + url, requestOptions).then<T>(handleResponse);
};

// eslint-disable-next-line @typescript-eslint/ban-types
const put = <T>(url: string, body: object): Promise<T> => {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };

  return fetch(baseUrl + url, requestOptions).then<T>(handleResponse);
};

const deleteApi = <T>(url: string): Promise<T> => {
  const requestOptions = {
    method: 'DELETE',
  };

  return fetch(baseUrl + url, requestOptions).then<T>(handleResponse);
};

const fetchWrapper = {
  get,
  post,
  put,
  delete: deleteApi,
};

export { fetchWrapper as default };
