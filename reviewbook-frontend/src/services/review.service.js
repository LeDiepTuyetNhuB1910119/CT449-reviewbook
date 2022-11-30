import createApiClient from "./api.service";

class ReviewService {
  constructor(baseUrl = "/api/reviews") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    return (await this.api.get("/")).data;
  }
  async create(data) {
    return (await this.api.post("/", data)).data;
  }
  async getById(id) {
    return (await this.api.get(`/${id}`)).data;
  }
  async getByCategoryId(id) {
    return (await this.api.get(`/category/${id}`)).data;
  }
  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }
  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
}

export default new ReviewService();
