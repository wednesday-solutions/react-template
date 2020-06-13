import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import T from '@components/T';
import { CustomCard, Container } from '../HomeContainer/styles';

const { Search } = Input;

function ItunesSongs({ intl, maxwidth, padding }) {
  return (
    <Container maxwidth={maxwidth} padding={padding}>
      <CustomCard
        title={intl.formatMessage({ id: 'songs_search' })}
        maxwidth={maxwidth}
      >
        <T marginBottom={10} id="get_song_details" />
        <Search type="text" />
      </CustomCard>
    </Container>
  );
}

ItunesSongs.propTypes = {
  intl: PropTypes.object,
  maxwidth: PropTypes.number,
  padding: PropTypes.number
};

export default ItunesSongs;
