// eslint-disable-next-line
import React from 'react';
import Proptypes from 'prop-types';
const If = props => (props.condition ? props.children : props.otherwise);
If.propsTypes = {
  condition: Proptypes.bool,
  otherwise: Proptypes.oneOfType([Proptypes.arrayOf(Proptypes.node), Proptypes.node]),
  children: Proptypes.oneOfType([Proptypes.arrayOf(Proptypes.node), Proptypes.node])
};
If.defaultProps = {
  otherwise: null
};
export default If;
