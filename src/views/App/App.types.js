
export type Movie = {
  adult: boolean,
  backdrop_path: string,
  genre_ids: Array<number>,
  id: number,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  release_date: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number,
  genres?: ?Array<string> // modifiction - added to the api object for filtering
}

export type Genre = {
  id: number,
  name: string
}