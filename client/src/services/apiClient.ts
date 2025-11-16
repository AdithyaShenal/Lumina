import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost/",
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  // Get data
  async getAll() {
    const res = await axiosInstance.get<T[]>(this.endpoint);
    return res.data;
  }

  post(data: T) {
    axiosInstance.post<T>(this.endpoint, data).then((res) => res.data);
  }
}

export default APIClient;
