// @flow
import {remapGenres} from '../utilities/genres';

import genres from './mockData/genres-api.json';

let _movie = {
  "vote_count": 1148,
  "id": 363088,
  "video": false,
  "vote_average": 7,
  "title": "Ant-Man and the Wasp",
  "popularity": 138.816,
  "poster_path": "/rv1AWImgx386ULjcf62VYaW8zSt.jpg",
  "original_language": "en",
  "original_title": "Ant-Man and the Wasp",
  "genre_ids": [
    28,
    12,
    14,
    35,
    878
  ],
  "backdrop_path": "/6P3c80EOm7BodndGBUAJHHsHKrp.jpg",
  "adult": false,
  "overview": "As Scott Lang awaits expiration of his term of house detention, Hope van Dyne and Dr. Hank Pym involve him in a scheme to rescue Mrs. van Dyne from the micro-universe into which she has fallen, while two groups of schemers converge on them with intentions of stealing Dr. Pym's inventions.",
  "release_date": "2018-07-04"
}

describe('Remaping genre ID\'s to the proper genre name', () => {

  it('should return a new key in the object \' genres\'', () => {
    expect(remapGenres( _movie, genres )).toHaveProperty( 'genres' );
  })

  it('should return the correct amount of genres', () => {
    expect(remapGenres( _movie, genres ).genres).toHaveLength( 5 );
  })

  it('should return the correctly mapped genres', () => {
    expect(remapGenres( _movie, genres ))
      .toHaveProperty( 'genres', [
        "Action",
        "Adventure",
        "Fantasy",
        "Comedy",
        "Science Fiction"
      ] );
  })
})