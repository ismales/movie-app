export default class TMDBservice {
  apiBase = "https://api.themoviedb.org/";

  searchMovie = "/search/movie?query=return";

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

  // async getMovies(query) {
  //   const url = `${this.apiBase}${this.searchMovie}&api_key=${this.apiKey}&query=${query}`;
  //   const data = await this.getData(url);
  //   return data;
  // }
  async getMovies() {
    const url = this.searchMovie;
    const movies = await this.getData(url);
    return movies;
  }
}
