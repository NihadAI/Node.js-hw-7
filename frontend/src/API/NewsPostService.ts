import axios from "axios";

export default class NewsPostService {

  static getToken() {
    const token = localStorage.getItem("Token"); 
    return token;
  }

  static getHeaders() {
    const token = this.getToken();

    if (token) {
      return {
        Authorization: `Token ${token}`,
      };
    }

    return {}; 
  }

  static async getAllPosts({ page, size }: IPageOptions) {
    try {
      const headers = this.getHeaders();
      const response = await axios.get("http://localhost:8000/newsposts", {
        params: { page, size },
        headers, 
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async getPostByID(id: string) {
    try {
      const headers = this.getHeaders(); 
      const response = await axios.get(`http://localhost:8000/newsposts/${id}`, {
        headers,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async createPost(post: IPost) {
    try {
      const headers = this.getHeaders(); 
      const response = await axios.post("http://localhost:8000/newsposts", post, {
        headers, 
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async updatePost(id: string, post: IPost) {
    try {
      const headers = this.getHeaders(); 
      const response = await axios.put(`http://localhost:8000/newsposts/${id}`, post, {
        headers,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  static async deletePost(id: string) {
    try {
      const headers = this.getHeaders(); 
      const response = await axios.delete(`http://localhost:8000/newsposts/${id}`, {
        headers, 
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
}
