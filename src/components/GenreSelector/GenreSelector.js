// @flow
// NODE MODULES
import * as React from "react";

// ASSETS
// import FaClose from 'react-icons/lib/fa/close';

// TYPES
type Props = {
  options: Array<{
    displayName?: ?string,
    name?: ?string,
    metadata?: ?string,
    icon?: ?string,
    color?: ?string,
    disabled?: ?boolean
  }>,
  selected: Array<string>,
  onSelect: Function,
  classMod?: ?string
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
      console.log(this.state);
      this.props.onSelect( this.state.selected );
    });
  }

  clearAll = () => {
    this.setState({ selected: [] }, () => {
      this.props.onSelect( this.state.selected );
    })
  }

  render(): React.Element<"div"> {
    // VARIABLES
    const { options} = this.props;

    const { animateClass, selected } = this.state;

    // DYNAMIC STYLES AND CLASSES
    // ...

    // PRIVATE COMPONENTS
    let _checkBoxes = options.map( (option, i) => {
      
      let _active = selected.includes(option.name);

      return(
        <div 
          className={`GenreSelector__selector`}
          onClick={() => this.onSelect( option, i )}
          onKeyDown={(e) => {if(e.keyCode === 13) this.onSelect( option, i )}}
          key={`${i}-selector`}>

          <input 
            tabIndex={1}
            type="checkbox" 
            aria-checked={_active} 
            checked={_active} 
            id={option.name} 
            name="feature" 
            aria-labelledby={`label${i} genre-selection-group`}
            value={option.name} />

          <label id={`label${i}`} htmlFor={option.name}>{ option.name }</label>

        </div>
      )
    })

    let _clearAll 
      = <button 
            onClick={() => this.clearAll()}
            onKeyDown={(e) => {if(e.keyCode === 13) this.clearAll()}}
            tabIndex={1}
            id={`clear-all`} 
            name="feature" 
            aria-labelledby={`clearall1 genre-selection-group`}>
          <p id={`clear-all`}>Clear All</p>
      </button>

    // FINAL RENDERED JSX
    return (
      <div className={`GenreSelector ${ animateClass }`}>
        <p>When tabbing through the genres, you can press enter to select an option</p>
        <fieldset>
          { _checkBoxes }
          { _clearAll }
        </fieldset>
      </div>
    );
  }
}