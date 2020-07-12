import Axios, {
  CancelTokenSource,
  AxiosRequestConfig,
  AxiosPromise,
} from "axios";
import Profile from "./models/Profile";
import Contact from "./models/Contact";

class DevClient {
  private axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_END_POINT,
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": process.env.NEXT_PUBLIC_X_API_KEY,
      "X-WRITE-API-KEY": process.env.NEXT_PUBLIC_X_WRITE_API_KEY,
    },
  });

  private cancelTokenSource: CancelTokenSource | null = null;

  private resolveConfig = () => {
    if (!this.cancelTokenSource)
      this.cancelTokenSource = Axios.CancelToken.source();

    const config: AxiosRequestConfig = {
      cancelToken: this.cancelTokenSource.token,
    };

    return config;
  };

  // 緩いエラーハンドリング
  private resolvePromise<T>(promise: AxiosPromise<T>) {
    return new Promise<T>((resolve, reject) => {
      promise
        .then((response) => {
          const { data, status } = response;

          if (status < 200 || status >= 300) {
            reject(response);
          } else if (status === 204) {
            resolve({} as T);
          } else {
            resolve(data);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  private get<T>(url: string) {
    return this.resolvePromise(this.axios.get<T>(url, this.resolveConfig()));
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private post<T>(url: string, data?: object) {
    return this.resolvePromise(
      this.axios.post<T>(url, data, this.resolveConfig())
    );
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private put<T>(url: string, data?: object) {
    return this.resolvePromise(
      this.axios.put<T>(url, data, this.resolveConfig())
    );
  }

  private delete<T>(url: string) {
    return this.resolvePromise<T>(this.axios.delete(url, this.resolveConfig()));
  }

  public getMyProfile(): Promise<Profile> {
    return this.get<Profile>("profile/ujoo8cbvf");
  }

  public createContact(contact: Contact): Promise<void> {
    return this.post("contacts", contact);
  }
}
export default DevClient;
