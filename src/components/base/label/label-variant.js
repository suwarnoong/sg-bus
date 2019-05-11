import React, { PureComponent } from 'react';
import Label from './label';

export class H1 extends PureComponent {
  render() {
    return (
      <Label
        {...this.props}
        size={Label.SIZE_XXLARGE}
        weight={Label.WEIGHT_MEDIUM}
      />
    );
  }
}

export class H2 extends PureComponent {
  render() {
    return (
      <Label
        {...this.props}
        size={Label.SIZE_XLARGE}
        weight={Label.WEIGHT_MEDIUM}
      />
    );
  }
}

export class H3 extends PureComponent {
  render() {
    return (
      <Label
        {...this.props}
        size={Label.SIZE_LARGE}
        weight={Label.WEIGHT_MEDIUM}
      />
    );
  }
}

export class Small extends PureComponent {
  render() {
    return <Label {...this.props} size={Label.SIZE_SMALL} />;
  }
}

export class XSmall extends PureComponent {
  render() {
    return <Label {...this.props} size={Label.SIZE_XSMALL} />;
  }
}
export class XXSmall extends PureComponent {
  render() {
    return <Label {...this.props} size={Label.SIZE_XXSMALL} />;
  }
}
