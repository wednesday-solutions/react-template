import Proptypes from 'prop-types';

export const If = (props) => (props.condition ? props.children : props.otherwise);

If.propTypes = {
  condition: Proptypes.bool,
  otherwise: Proptypes.oneOfType([Proptypes.arrayOf(Proptypes.node), Proptypes.node]),
  children: Proptypes.oneOfType([Proptypes.arrayOf(Proptypes.node), Proptypes.node])
};

If.defaultProps = {
  otherwise: null
};
export default If;
