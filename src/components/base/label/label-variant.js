import React, { PureComponent } from 'react';
import Label from './label';

export class H1 extends PureComponent {
  render() {
    return (
      <Label
        size={Label.SIZE_XXLARGE}
        weight={Label.WEIGHT_MEDIUM}
        {...this.props}
      />
    );
  }
}

export class H2 extends PureComponent {
  render() {
    return (
      <Label
        size={Label.SIZE_XLARGE}
        weight={Label.WEIGHT_MEDIUM}
        {...this.props}
      />
    );
  }
}

export class H3 extends PureComponent {
  render() {
    return (
      <Label
        size={Label.SIZE_LARGE}
        weight={Label.WEIGHT_MEDIUM}
        {...this.props}
      />
    );
  }
}

export class Small extends PureComponent {
  render() {
    return <Label size={Label.SIZE_SMALL} {...this.props} />;
  }
}

export class XSmall extends PureComponent {
  render() {
    return <Label size={Label.SIZE_XSMALL} {...this.props} />;
  }
}
export class XXSmall extends PureComponent {
  render() {
    return <Label size={Label.SIZE_XXSMALL} {...this.props} />;
  }
}

export class B extends PureComponent {
  render() {
    return <Label weight={Label.WEIGHT_BOLD} {...this.props} />;
  }
}
