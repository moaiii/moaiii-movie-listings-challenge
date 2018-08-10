// @flow
// NODE MODULES
import * as React from "react";

// ASSETS
// import FaClose from 'react-icons/lib/fa/close';

// TYPES
type Props = {
  options: Array<{
    displayName: string,
    metadata: string,
    icon: string,
    color: string,
    disabled: boolean
  }>,
  selected: Array<string>,
  onSelect: Function,
  classMod: string
}

type State = {
  selected: Array<string>,
  animateClass: string
};

// COMPONENT
export class GenreSelector extends React.Component<Props, State> {
  constructor() {
    super();

    this.state = {
      animateClass: "",
      selected: []
    };
  }

  // CLASS FUNCTIONS
  componentDidMount(): void {
    setTimeout(() => {
      this.setState({
        animateClass: "--animate",
        selected: this.props.selected
      })
    }, 50);
  }

  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    return true;
  };

  componentDidUpdate(prevProps: Props, prevState: State): void {}

  onSelect = (option: Object, i: number) => {
    let _mode = this.state.selected.includes(option.name)
      ? 'removing' : 'adding';

    let _newSelectedArray = _mode === 'removing'
      ? this.state.selected.filter( x => x !== option.name)
      : [...this.state.selected, option.name];

    this.setState({ 
      selected: _newSelectedArray 
    }, () => { // pass the display name
      this.props.onSelect( this.state.selected );
    });
  }

  render(): React.Element<"div"> {
    // VARIABLES
    const {  
      options,
      onSelect } = this.props;

    const { animateClass, selected } = this.state;

    // DYNAMIC STYLES AND CLASSES
    // ...

    // PRIVATE COMPONENTS
    let _checkBoxes = options.map( (option, i) => {
      
      let _active = selected.includes(option.name);

      return(
        <div className={`GenreSelector__selector`}
          onClick={() => this.onSelect( option, i )}
          key={`${i}-selector`}>
          <div className={`GenreSelector__box`}>
            { _active ? <h1 className={`GenreSelector__icon`}>X</h1> : null }
          </div>
          <p className={`GenreSelector__label`}>
            { option.name }
          </p>
        </div>
      )
    })

    // FINAL RENDERED JSX
    return (
      <div className={`GenreSelector ${ animateClass }`}>
        { _checkBoxes }
      </div>
    );
  }
}