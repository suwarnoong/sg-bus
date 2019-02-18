import React, { PureComponent } from 'react';
import Label from './label';

export const H1 = props => 
  <Label {...props} size={Label.SIZE_XXLARGE} weight={Label.WEIGHT_MEDIUM} />;

export const H2 = props => 
  <Label {...props} size={Label.SIZE_XLARGE} weight={Label.WEIGHT_MEDIUM} />;

export const H3 = props =>
  <Label {...props} size={Label.SIZE_LARGE} weight={Label.WEIGHT_MEDIUM} />;

  export const Small = props =>
  <Label {...props} size={Label.SIZE_SMALL} />;

export const XSmall = props =>
  <Label {...props} size={Label.SIZE_XSMALL} />;

export const XXSmall = props =>
  <Label {...props} size={Label.SIZE_XXSMALL} />;