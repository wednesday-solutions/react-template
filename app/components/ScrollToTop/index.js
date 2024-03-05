import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';

export const ScrollToTop = (props) => {
  // Extracts pathname property(key) from an object
  const { pathname } = useLocation();

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return props.children;
};

ScrollToTop.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  location: PropTypes.object
};
export default ScrollToTop;
