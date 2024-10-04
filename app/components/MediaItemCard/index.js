import React from 'react';
import styled from '@emotion/styled';
import { string } from 'prop-types';
import { If } from '../If/index';

const Card = styled.div`
  border-style: solid;
  border-width: 1px;
  padding: 5px;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
    background: #eaeaea;
  }

  &:active {
    background: #cacaca;
  }
`;

/**
 * MediaItemCard component that displays information about a Media item (like a song).
 * It shows the repository's name, full name, and star count.
 *
 * @date 01/03/2024 - 14:47:28
 *
 * @param {Object} props - The component props.
 * @param {string} props.trackName - The name of the track.
 * @param {string} props.collectionName - The name of the collection.
 * @param {string} props.artistName - The name of the artist.
 * @param {string} props.country - The name of the country the media is from
 * @param {string} props.primaryGenreName - Genre name
 * @param {string} props.thumbnailSrc - thumbnail of the media
 * @returns {JSX.Element} The RepoCard component displaying the repository information.
 */
export function MediaItemCard({ trackName, collectionName, artistName, country, primaryGenreName, thumbnailSrc }) {
  return (
    <Card>
      <If condition={thumbnailSrc}>
        <img src={thumbnailSrc} alt="thumbnail" />
      </If>
      <If condition={trackName}>
        <div>{trackName}</div>
      </If>
      <If condition={collectionName}>
        <div>{collectionName}</div>
      </If>
      <If condition={artistName}>
        <div>{artistName}</div>
      </If>
      <If condition={country}>
        <div>{country}</div>
      </If>
      <If condition={primaryGenreName}>
        <div>{primaryGenreName}</div>
      </If>
    </Card>
  );
}

MediaItemCard.propTypes = {
  trackName: string,
  collectionName: string,
  artistName: string,
  country: string,
  primaryGenreName: string,
  thumbnailSrc: string
};

export default MediaItemCard;
