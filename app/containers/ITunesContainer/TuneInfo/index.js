/**
 *
 * TuneInfo
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { colors } from '@themes';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import styled from 'styled-components';
import T from '@components/T';
import { selectSelectedTune } from '../selectors';

const CustomInfoCard = styled.div`
  width: 50vw;
  height: 50vh;
  background-color: ${colors.primary};
  margin-top: 15vh;
  margin-left: 25vw;
  padding: 4rem;
`;
const CustomCard = styled.div`
  margin-top: 6vh;
  text-align: center;
`;

const CustomImg = styled.div`
  margin-bottom: 5vh;
`;
export function TuneContainer({ selectedTune }) {
  const artistName = selectedTune?.artistName;
  const trackName = selectedTune?.trackName;
  const release = selectedTune?.releaseDate?.substring(0, 4);
  return (
    <div data-testid="tune-info">
      <Helmet>
        <title>TuneContainer</title>
        <meta name="description" content="Description of TuneContainer" />
      </Helmet>
      <CustomInfoCard>
        <CustomCard>
          <CustomImg>
            <img src={selectedTune.artworkUrl100} alt="" />
          </CustomImg>
          <div>
            <T id="track_name" values={{ trackName }} />
          </div>
          <div>
            <T id="artist_name" values={{ artistName }} />
          </div>

          <div>
            <T id="released" values={{ release }} />
          </div>
        </CustomCard>
      </CustomInfoCard>
    </div>
  );
}

TuneContainer.propTypes = {
  selectedTune: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  selectedTune: selectSelectedTune()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(TuneContainer);

export const TuneContainerTest = compose(injectIntl)(TuneContainer);
