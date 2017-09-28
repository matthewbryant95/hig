import * as PropTypes from 'prop-types';
import * as HIG from 'hig-vanilla';

import HIGElement from '../../../../elements/HIGElement';
import HIGNodeList from '../../../../elements/HIGNodeList';
import HIGChildValidator from "../../../../elements/HIGChildValidator";
import createComponent from '../../../createComponent';
import OptionComponent, { OptionAdapter } from './OptionAdapter'

export class GroupAdapter extends HIGElement {
  constructor(HIGConstructor, initialProps) {
    super(HIGConstructor, initialProps);

    this.props = { ...initialProps };

    this.options = new HIGNodeList({
      OptionAdapter: {
        type: OptionAdapter,
        HIGConstructor: this.hig.partials.Option,
        onAdd: (instance, beforeInstance) => {
          this.hig.addOption(instance, beforeInstance);
        }
      }
    });
  }

  componentDidMount() {
  }

  commitUpdate(updatePayload, oldProps, newProp) {
    for (let i = 0; i < updatePayload.length; i += 2) {
      const propKey = updatePayload[i];
      const propValue = updatePayload[i + 1];

      switch (propKey) {
        default: {
          // No-op
        }
      }
    }
  }

  createElement(ElementConstructor, props) {
    switch (ElementConstructor) {
      case OptionAdapter:
        return this.options.createElement(ElementConstructor, props);
      default:
        throw new Error(`Unknown type ${ElementConstructor.name}`);
    }
  }

  insertBefore(instance, beforeChild = {}) {
    if (instance instanceof OptionAdapter) {
      this.options.insertBefore(instance);
    } else {
      throw new Error(
        `${this.constructor.name} cannot have a child of type ${instance
          .constructor.name}`
      );
    }
  }

  removeChild(instance) {
    if (instance instanceof OptionAdapter) {
      this.options.removeChild(instance)
    }
    instance.unmount();
  }
}

const GroupComponent = createComponent(GroupAdapter);

GroupComponent.propTypes = {
  children: HIGChildValidator([OptionComponent, Option])
};

GroupComponent.__docgenInfo = {
  props: {}
};

export default GroupComponent;
