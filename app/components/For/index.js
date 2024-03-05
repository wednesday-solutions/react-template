/**
 *
 * For
 *
 */

import React from 'react';
import Proptypes from 'prop-types';
import styled from '@emotion/styled';
import { If } from '@components/If';

const FlexContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => props.orientation};
`;

/**
 * For component that renders a list of items using a specified render function.
 * It can optionally wrap the list with a parent component.
 *
 * @date 01/03/2024 - 14:47:28
 *
 * @param {Object} props - The component props.
 * @param {Array} props.of - The array of items to render.
 * @param {Function} [props.ParentComponent] - The component to use as the parent wrapper for the list. Defaults to a FlexContainer.
 * @param {Function} props.renderItem - The function to render each item in the array.
 * @param {boolean} [props.noParent] - If true, the list will not be wrapped with a parent component.
 * @returns {JSX.Element|null} The rendered list of items, optionally wrapped with a parent component.
 */

const defaultParent = (props) => <FlexContainer {...props} />;

const renderList = (of = [], renderItem) => of.map((item, index) => ({ ...renderItem(item, index), key: index }));
const renderChildren = (renderItem, ParentComponent, props) => (
  <ParentComponent {...props} data-testid="for">
    {renderList(props.of, renderItem)}
  </ParentComponent>
);

/**
 * For component that renders a list of items using a specified render function.
 * It can optionally wrap the list with a parent component.
 *
 * @date 01/03/2024 - 14:47:28
 *
 * @param {Object} props - The component props.
 * @param {Array} props.of - The array of items to render.
 * @param {Function} [props.ParentComponent] - The component to use as the parent wrapper for the list. Defaults to a FlexContainer.
 * @param {Function} props.renderItem - The function to render each item in the array.
 * @param {boolean} [props.noParent] - If true, the list will not be wrapped with a parent component.
 * @returns {JSX.Element|null} The rendered list of items, optionally wrapped with a parent component.
 */
export function For({ ParentComponent = defaultParent, renderItem, noParent, ...props }) {
  return (
    <>
      <If condition={(props.of || []).length}>
        <If condition={noParent} otherwise={renderChildren(renderItem, ParentComponent, props)}>
          {renderList(props.of, renderItem)}
        </If>
      </If>
    </>
  );
}

For.propTypes = {
  of: Proptypes.array,
  type: Proptypes.node,
  parent: Proptypes.object,
  renderItem: Proptypes.func.isRequired,
  noParent: Proptypes.bool,
  orientation: Proptypes.oneOf(['row', 'column']),
  ParentComponent: Proptypes.elementType
};

For.defaultProps = {
  orientation: 'row'
};
export default For;
