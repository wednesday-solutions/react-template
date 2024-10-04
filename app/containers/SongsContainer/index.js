import React from 'react';
import styled from '@emotion/styled';
import { IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import isEmpty from 'lodash/isEmpty';
import debounce from 'lodash/debounce';
import { translate } from '@app/utils';
import { getSongs } from '@app/services/songApi';

const StyledOutlinedInput = styled(OutlinedInput)`
  legend {
    display: none;
  }
  > fieldset {
    top: 0;
  }
`;

/**
 * SongsContainer component is responsible for fetching and displaying song data fetched from itunes
 * @returns {JSX.Element} The SongsContainer component
 */
export default function SongsContainer() {
  const handleOnChange = async (songName) => {
    if (!isEmpty(songName)) {
      // searchRepos(songName);
      //   console.log('You are looking for ', songName);
      try {
        await getSongs(songName);
        // console.log('itunes res = ', res);
      } catch (error) {
        // console.error('Itunes api error = ', error);
      }
    } else {
      // dispatchClearGithubRepos();
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  const handleOnSearchIconClick = () => {
    // console.log('Search icon clicked');
  };
  return (
    <>
      <StyledOutlinedInput
        inputProps={{ 'data-testid': 'search-bar' }}
        onChange={(event) => debouncedHandleOnChange(event.target.value)}
        fullWidth
        defaultValue={''}
        placeholder={translate('songs_search_input_placeholder')}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              data-testid="search-icon"
              aria-label="search repos"
              type="button"
              onClick={handleOnSearchIconClick}
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </>
  );
}
