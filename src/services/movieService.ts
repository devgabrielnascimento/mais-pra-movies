import { httpClient } from "../api/axiosConfig";

export class MovieService {
  async getMovies(url: string) {
    try {
      const response = await httpClient.get(url);
      return response.data;
    } catch (error: any) {
      throw new Error("Erro interno do servidor", error);
    }
  }

  async detailMovie(url: string) {
    try {
      const response = await httpClient.get(url);
      return response;
    } catch (error: any) {
      throw new Error("Erro interno ao detalhar um filme", error);
    }
  }
}
