import Axios, {
  AxiosPromise,
  AxiosRequestConfig,
  CancelTokenSource,
} from 'axios';
import {
  Blog,
  BlogsQuery,
  Category,
  Contact,
  List,
  Portfolio,
  Profile,
  SNS,
  Tag,
} from '../models';
import { generateBlogsUrl } from '../utils/GenerateUtils';

export class DevCMS {
  private axios = Axios.create({
    baseURL: process.env.END_POINT,
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': process.env.API_KEY ?? '',
      'X-WRITE-API-KEY': process.env.WRITE_API_KEY ?? '',
    },
  });

  private cancelTokenSource: CancelTokenSource | null = null;

  private resolveConfig = (): AxiosRequestConfig => {
    if (!this.cancelTokenSource)
      this.cancelTokenSource = Axios.CancelToken.source();

    const config: AxiosRequestConfig = {
      cancelToken: this.cancelTokenSource.token,
    };

    return config;
  };

  private resolvePromise = <T>(promise: AxiosPromise<T>): Promise<T> => {
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
  };

  private get<T>(url: string): Promise<T> {
    return this.resolvePromise(this.axios.get<T>(url, this.resolveConfig()));
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private post<T>(url: string, data?: object): Promise<T> {
    return this.resolvePromise(
      this.axios.post<T>(url, data, this.resolveConfig()),
    );
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private put<T>(url: string, data?: object): Promise<T> {
    return this.resolvePromise(
      this.axios.put<T>(url, data, this.resolveConfig()),
    );
  }

  private delete<T>(url: string): Promise<T> {
    return this.resolvePromise<T>(this.axios.delete(url, this.resolveConfig()));
  }

  public getProfile(id = 'ujoo8cbvf'): Promise<Profile> {
    return this.get<Profile>(`profile/${id}`);
  }

  public createContact(contact: Contact): Promise<string> {
    return this.post('contacts', contact);
  }

  public getPortfolio(): Promise<List<Portfolio>> {
    return this.get<List<Portfolio>>('portfolio');
  }

  public getSNS(id = 'guy_hqnt8'): Promise<SNS> {
    return this.get<SNS>(`sns/${id}`);
  }

  public getBlog(id: string): Promise<Blog> {
    return this.get<Blog>(`blogs/${id}`);
  }

  public getBlogs(query?: BlogsQuery): Promise<List<Blog>> {
    const url =
      (query && generateBlogsUrl(query)) ??
      'blogs?filters=createdAt[less_than]2022-07';

    return this.get<List<Blog>>(url);
  }

  public getBlogPreview(id: string, draftKey: string): Promise<Blog> {
    return this.get<Blog>(`blogs/${id}?draftKey=${draftKey}`);
  }

  public getCategories(): Promise<List<Category>> {
    return this.get<List<Category>>(`category?limit=9999`);
  }

  public getCategory(id: string): Promise<Category> {
    return this.get<Category>(`category/${id}`);
  }

  public getTags(): Promise<List<Tag>> {
    return this.get<List<Tag>>(`tag?limit=9999`);
  }

  public getTag(id: string): Promise<Tag> {
    return this.get<Tag>(`tag/${id}`);
  }
}
