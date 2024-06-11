export default class TMDBservice {
  apiBase = "https://api.themoviedb.org/3";

  guestSession = "/authentication/guest_session/new";

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

  constructor() {
    this.createGuestSession()
      .then((res) => this.saveGuestSessionID(res.guest_session_id))
      .catch((err) => err);

    this.getGenresData()
      .then((res) => this.saveAllGenres(res.genres))
      .catch((err) => err);
  }

  createGuestSession = async () => {
    const res = await fetch(
      `${this.apiBase}/authentication/guest_session/new`,
      this.options,
    );
    const data = await res.json();
    return data;
  };

  saveGuestSessionID(res = "") {
    this.guestSessionID = res;
  }

  getMovies = async (movieName, page) => {
    const res = await fetch(
      `${this.apiBase}/search/movie?query=${movieName}&include_adult=false&language=en-US&page=${page}`,
      this.options,
    );
    const data = await res.json();
    return data;
  };

  getRatedMovies = async () => {
    const res = await fetch(
      `${this.apiBase}/guest_session/${this.guestSessionID}/rated/movies?language=en-US&page=1&sort_by=created_at.asc`,
      this.options,
    );
    const data = await res.json();
    return data;
  };

  addRatedMovie = async (movieId, value) => {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${this.apiToken}`,
      },
      body: JSON.stringify({ value }),
    };

    const res = await fetch(
      `${this.apiBase}/movie/${movieId}/rating?guest_session_id=${this.guestSessionID}`,
      options,
    );
    const data = await res.json();
    return data;
  };

  getGenresData = async () => {
    const res = await fetch(
      `${this.apiBase}/genre/movie/list?language=en`,
      this.options,
    );
    const data = await res.json();
    return data;
  };

  saveAllGenres(res = []) {
    this.allGenres = res;
  }
}
