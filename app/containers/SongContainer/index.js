import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import { Input  } from 'antd';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';

import { selectSongContainer, selectSongsData, } from './selectors';

import T from '@components/T';


const { Search } = Input;

const ResultContainer = styled.div`
  && {
    display: flex;
    flex-direction: column;
    max-width: 80vw;
    width: 100%;
    margin: 20px auto;
    padding: ${props => props.padding}px;
  }
`;

export function SongContainer({
    query,
    maxwidth,
    padding
}) {

    const [loading, setLoading] = useState(false);




    const handleOnChange = rName => {
        if (!isEmpty(rName)) {
            setLoading(true);

        } else {
          setLoading(false)
        }
    };

    const handleOnSearch = rName => {
      //search function
      setLoading(false)
    }
    const debouncedHandleOnChange = debounce(handleOnChange, 200);
    const debouncedHandleOnSearch = debounce(handleOnSearch, 200);



    return (
        <ResultContainer maxwidth={maxwidth} padding={padding}>

            <T marginBottom={10} id="search_itunes" />
            <Search
                data-testid="search-bar"
                defaultValue={query}
                type="text"
                onChange={evt => debouncedHandleOnChange(evt.target.value)}
                onSearch={searchText => debouncedHandleOnSearch(searchText)}
            />
            {loading && <h2>Loading...</h2>}
        </ResultContainer>

    )
}
SongContainer.propTypes = {
    dispatchSongs: PropTypes.func,
    dispatchClearSongs: PropTypes.func,
    intl: PropTypes.object,
    songsData: PropTypes.shape({
        songs: PropTypes.array,
        songCount: PropTypes.number
    }),
    query: PropTypes.string,
    history: PropTypes.object,
    maxwidth: PropTypes.number,
    padding: PropTypes.number
};

SongContainer.defaultProps = {
    maxwidth: 500,
    padding: 20
};


const mapStateToProps = createStructuredSelector({
    songContainer: selectSongContainer(),
    songsData: selectSongsData(),

});

function mapDispatchToProps(dispatch) {
    return {
        
    };
}


const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

export default compose(
    injectIntl,

    withConnect,
)(SongContainer);