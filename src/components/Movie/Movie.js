// @flow
// NODE MODULES
import * as React from "react";

// REDUX
import type { Movie as MovieType} from '../../views/App/App.types';

// COMPONENTS
// ........

// ASSETS
// ........

// UTILITIES
// ........

// TYPES
type Props = {
  movies: Array<Movie>
};

type State = {
  animateClass: string
};

// COMPONENT
export class Movie extends React.Component<Props, State> {
  constructor() {
    super();

    this.state = {
      animateClass: ""
    };
  }

  // CLASS FUNCTIONS
  componentDidMount(): void {
    setTimeout(() => {
      this.setState({
        animateClass: "--animate"
      })
    }, 50);
  }

  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    return true;
  };

  componentDidUpdate(prevProps: Props, prevState: State): void {}

  render(): React.Element<"div"> {
    // VARIABLES

    const { 
      title,
      release_date,
      overview,
      vote_average,
      genres,
      poster_path } = this.props.movie;

    const { animateClass } = this.state;

    // PRIVATE COMPONENTS

    let _poster: React.Element<'img'> 
      = <img 
          className={`Movie__poster`}
          src={`${ process.env.REACT_APP_POSTER_URL}${poster_path}`}
          alt={`Movie-${ title }`} />

    let _genres: React.Element<'div'> 
      = <div className={`Movie__genres`}>
          { genres.map( (genre, i) => {
              return <p key={`${ i }-${ title }-genre`}>{ genre }</p>
            }) 
          }
        </div>

    let _details: React.Element<'div'> 
      = <div className={`Movie__details`}>
          <h2>{ title }</h2>
          <p>{ overview }</p>
          { _genres }
          <p>Rating - { vote_average }</p>
        </div>

    // FINAL RENDERED JSX

    return (
      <div className={`Movie ${ animateClass }`}>
        { _poster }
        { _details }
      </div>
    );
  }
}