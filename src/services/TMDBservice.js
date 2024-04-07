export default class TMDBservice {
  apiBase = "https://api.themoviedb.org/3";

  searchMovie = "/search/movie?";

  apiKey = "edf1b2d191eb5263e6c7f78b0f2ac438";

  apiToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZGYxYjJkMTkxZWI1MjYzZTZjN2Y3OGIwZjJhYzQzOCIsInN1YiI6IjY2MDFiYjc0MjI2YzU2MDE0YTZmYTk1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.a2hAV_e0uHDvZJnmB1zIXHCf5rMDbesYv_ADJADrAC8";

  options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${this.apiToken}`,
    },
  };

  async getData(url) {
    const response = await fetch(`${this.apiBase}${url}`, this.options);
    const data = await response.json();
    return data;
  }

  async getMovies(query, page) {
    const url = `${this.searchMovie}&query=${query}&page=${page}`;
    const data = await this.getData(url);
    return data;
  }
}
