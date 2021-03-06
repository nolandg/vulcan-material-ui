import React from 'react';
import FormsyMuiRadioGroup from '../formsy-mui/FormsyMuiRadioGroup';
import { replaceComponent } from 'meteor/vulcan:core';


const RadioGroupComponent = ({refFunction, ...properties}) =>
  <FormsyMuiRadioGroup {...properties} ref={refFunction}/>;


replaceComponent('FormComponentRadioGroup', RadioGroupComponent);
