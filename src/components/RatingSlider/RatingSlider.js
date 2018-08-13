// @flow
// NODE MODULES
import * as React from "react"; // $FlowFixMe
import Slider from 'rc-slider/lib/Slider'; // $FlowFixMe
import 'rc-slider/assets/index.css';

// An exmaple showing a stateless component to wrap the slider
// The slider is an example of using an NPM package

export const RatingSlider = ({onChange}: Function): React.Element<'div'> => {

  return(
    <Slider 
      min={0} 
      max={10} 
      step={0.5}
      defaultValue={3}
      marks={{
        '0': '0',
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
        '10': '10'
      }}
      onAfterChange={(e) => onChange(e)}/>
  )
}