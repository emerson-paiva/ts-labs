import axios, { AxiosPromise } from 'axios';

type ApiSyncProps = {
  id?: number;
};

export class ApiSync<T extends ApiSyncProps> {
  constructor(public rootUrl: string) {}

  fetch = (id: number): AxiosPromise<T> => {
    return axios.get<T>(`${this.rootUrl}/${id}`);
  };

  save = (data: T): AxiosPromise => {
    const { id } = data;

    if (id) {
      return axios.put(`${this.rootUrl}/${id}`, data);
    }

    return axios.post(`${this.rootUrl}`, data);
  };
}
