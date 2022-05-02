import axios from "axios";
import { users } from "../constants";
import { buildUrl } from "../utilities";
import cache from "../services/localCache";

class HTTPClient {
  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL;
    this.createInstance();
    this.initPresets();
  }

  initPresets() {
    this.query = {
      per_page: 10,
      page: 1,
    };
  }

  createInstance() {
    this.api = axios.create({
      baseURL: this.baseUrl,
      timeout: 2000,
      headers: { "X-Requested-With": "XMLHttpRequest" },
    });
  }

  async get({ path = users, query = "" }) {
    const search = query.q;
    if (cache.hasIt(search)) {
      return cache.getValue(search);
    }
    const url = buildUrl({ path, query: { ...this.query, ...query } });
    let response;
    try {
      response = await this.api.get(url);
    } catch (error) {
      console.error(error);
    }
    const data = response.data.items.map(
      ({ id, avatar_url: avatarUrl, login: name }) => ({ id, avatarUrl, name })
    );
    cache.setValue({ key: search, value: data });
    return data;
  }
}

const API = new HTTPClient();

export default API;
