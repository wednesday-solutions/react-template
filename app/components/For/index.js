/**
 *
 * For
 *
 */

import React from 'react';
import Proptypes from 'prop-types';
import styled from 'styled-components';
import If from '@components/If/';

const FlexContainer = styled.div`
  display: flex;
  flex-direction: ${props => (props.isRow ? `row;` : `column;`)};
`;

export function For({
  of = [],
  ParentComponent = props => <FlexContainer {...props} />,
  renderItem,
  noParent,
  ...props
}) {
  const list = () => of.map((item, index) => ({ ...renderItem(item, index), key: index }));
  const children = () => (
    <ParentComponent {...props} data-testid="for">
      {list()}
    </ParentComponent>
  );
  return (
    <>
      <If condition={noParent} otherwise={<>{children()}</>}>
        <If condition={(of || []).length}>{list()}</If>
      </If>
    </>
  );
}

For.propTypes = {
  of: Proptypes.array,
  type: Proptypes.node,
  parent: Proptypes.object,
  iteratee: Proptypes.string,
  renderItem: Proptypes.func.isRequired,
  noParent: Proptypes.bool,
  ParentComponent: Proptypes.func
};
For.defaultProps = {
  isRow: true
};
export default For;
