import React from 'react';
import PropTypes from 'prop-types';
import { CustomCard } from '../HomeContainer/styles';

function ItunesSongs({ intl, maxwidth }) {
  return (
    <CustomCard
      title={intl.formatMessage({ id: 'songs_search' })}
      maxwidth={maxwidth}
    />
  );
}

ItunesSongs.propTypes = {
  intl: PropTypes.object,
  maxwidth: PropTypes.number
};

export default ItunesSongs;
