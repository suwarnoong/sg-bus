import React, { PureComponent } from 'react';
import Label from './label';

export const H1 = (props) => <Label {...props} size="xxlarge"></Label>;
export const H2 = (props) => <Label {...props} size="xlarge"></Label>;
export const H3 = (props) => <Label {...props} size="large"></Label>;
export const Small = (props) => <Label {...props} size="small"></Label>;
export const XSmall = (props) => <Label {...props} size="xsmall"></Label>;
export const XXSmall = (props) => <Label {...props} size="xxsmall"></Label>;