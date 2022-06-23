/**
 *
 * ItunesContainer Container
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage as T } from 'react-intl';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import { selectSomePayLoad } from './selectors';
import ItunesTracks from '@components/ItunesTracks';
import saga from './saga';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
`;

const StyledT = styled(T)`
  font-weight: 10px;
  text-transform: uppercase;
`;

const itunesTracks = {
  resultCount: 4,
  results: [
    {
      wrapperType: 'track',
      kind: 'song',
      artistId: 909253,
      collectionId: 1469577723,
      trackId: 1469577741,
      artistName: 'Jack Johnson',
      collectionName: 'Jack Johnson and Friends: Sing-A-Longs and Lullabies for the Film Curious George',
      trackName: 'Upside Down',
      collectionCensoredName: 'Jack Johnson and Friends: Sing-A-Longs and Lullabies for the Film Curious George',
      trackCensoredName: 'Upside Down',
      artistViewUrl: 'https://music.apple.com/us/artist/jack-johnson/909253?uo=4',
      collectionViewUrl: 'https://music.apple.com/us/album/upside-down/1469577723?i=1469577741&uo=4',
      trackViewUrl: 'https://music.apple.com/us/album/upside-down/1469577723?i=1469577741&uo=4',
      previewUrl:
        'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/5e/5b/3d/5e5b3df4-deb5-da78-5d64-fe51d8404d5c/mzaf_13341178261601361485.plus.aac.p.m4a',
      artworkUrl30:
        'https://is3-ssl.mzstatic.com/image/thumb/Music115/v4/08/11/d2/0811d2b3-b4d5-dc22-1107-3625511844b5/00602537869770.rgb.jpg/30x30bb.jpg',
      artworkUrl60:
        'https://is3-ssl.mzstatic.com/image/thumb/Music115/v4/08/11/d2/0811d2b3-b4d5-dc22-1107-3625511844b5/00602537869770.rgb.jpg/60x60bb.jpg',
      artworkUrl100:
        'https://is3-ssl.mzstatic.com/image/thumb/Music115/v4/08/11/d2/0811d2b3-b4d5-dc22-1107-3625511844b5/00602537869770.rgb.jpg/100x100bb.jpg',
      collectionPrice: 9.99,
      trackPrice: 1.29,
      releaseDate: '2005-01-01T12:00:00Z',
      collectionExplicitness: 'notExplicit',
      trackExplicitness: 'notExplicit',
      discCount: 1,
      discNumber: 1,
      trackCount: 14,
      trackNumber: 1,
      trackTimeMillis: 208643,
      country: 'USA',
      currency: 'USD',
      primaryGenreName: 'Rock',
      isStreamable: true
    },
    {
      wrapperType: 'track',
      kind: 'song',
      artistId: 909253,
      collectionId: 1469577723,
      trackId: 1469577830,
      artistName: 'Jack Johnson',
      collectionName: 'Jack Johnson and Friends: Sing-A-Longs and Lullabies for the Film Curious George',
      trackName: "We're Going To Be Friends",
      collectionCensoredName: 'Jack Johnson and Friends: Sing-A-Longs and Lullabies for the Film Curious George',
      trackCensoredName: "We're Going To Be Friends",
      artistViewUrl: 'https://music.apple.com/us/artist/jack-johnson/909253?uo=4',
      collectionViewUrl: 'https://music.apple.com/us/album/were-going-to-be-friends/1469577723?i=1469577830&uo=4',
      trackViewUrl: 'https://music.apple.com/us/album/were-going-to-be-friends/1469577723?i=1469577830&uo=4',
      previewUrl:
        'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/ce/48/5b/ce485b59-13b7-9859-0431-e602d6347479/mzaf_7168871676263777717.plus.aac.p.m4a',
      artworkUrl30:
        'https://is3-ssl.mzstatic.com/image/thumb/Music115/v4/08/11/d2/0811d2b3-b4d5-dc22-1107-3625511844b5/00602537869770.rgb.jpg/30x30bb.jpg',
      artworkUrl60:
        'https://is3-ssl.mzstatic.com/image/thumb/Music115/v4/08/11/d2/0811d2b3-b4d5-dc22-1107-3625511844b5/00602537869770.rgb.jpg/60x60bb.jpg',
      artworkUrl100:
        'https://is3-ssl.mzstatic.com/image/thumb/Music115/v4/08/11/d2/0811d2b3-b4d5-dc22-1107-3625511844b5/00602537869770.rgb.jpg/100x100bb.jpg',
      collectionPrice: 9.99,
      trackPrice: 1.29,
      releaseDate: '2005-01-01T12:00:00Z',
      collectionExplicitness: 'notExplicit',
      trackExplicitness: 'notExplicit',
      discCount: 1,
      discNumber: 1,
      trackCount: 14,
      trackNumber: 7,
      trackTimeMillis: 137533,
      country: 'USA',
      currency: 'USD',
      primaryGenreName: 'Rock',
      isStreamable: true
    },
    {
      wrapperType: 'track',
      kind: 'song',
      artistId: 909253,
      collectionId: 1469577723,
      trackId: 1469577808,
      artistName: 'Jack Johnson',
      collectionName: 'Jack Johnson and Friends: Sing-A-Longs and Lullabies for the Film Curious George',
      trackName: 'Broken',
      collectionCensoredName: 'Jack Johnson and Friends: Sing-A-Longs and Lullabies for the Film Curious George',
      trackCensoredName: 'Broken',
      artistViewUrl: 'https://music.apple.com/us/artist/jack-johnson/909253?uo=4',
      collectionViewUrl: 'https://music.apple.com/us/album/broken/1469577723?i=1469577808&uo=4',
      trackViewUrl: 'https://music.apple.com/us/album/broken/1469577723?i=1469577808&uo=4',
      previewUrl:
        'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/8b/fd/81/8bfd81a6-0217-b56c-01b0-7249ed910a35/mzaf_16218415284344588014.plus.aac.p.m4a',
      artworkUrl30:
        'https://is3-ssl.mzstatic.com/image/thumb/Music115/v4/08/11/d2/0811d2b3-b4d5-dc22-1107-3625511844b5/00602537869770.rgb.jpg/30x30bb.jpg',
      artworkUrl60:
        'https://is3-ssl.mzstatic.com/image/thumb/Music115/v4/08/11/d2/0811d2b3-b4d5-dc22-1107-3625511844b5/00602537869770.rgb.jpg/60x60bb.jpg',
      artworkUrl100:
        'https://is3-ssl.mzstatic.com/image/thumb/Music115/v4/08/11/d2/0811d2b3-b4d5-dc22-1107-3625511844b5/00602537869770.rgb.jpg/100x100bb.jpg',
      collectionPrice: 9.99,
      trackPrice: 1.29,
      releaseDate: '2006-02-07T12:00:00Z',
      collectionExplicitness: 'notExplicit',
      trackExplicitness: 'notExplicit',
      discCount: 1,
      discNumber: 1,
      trackCount: 14,
      trackNumber: 2,
      trackTimeMillis: 234746,
      country: 'USA',
      currency: 'USD',
      primaryGenreName: 'Rock',
      isStreamable: true
    },
    {
      wrapperType: 'track',
      kind: 'song',
      artistId: 41742672,
      collectionId: 263301268,
      trackId: 263301273,
      artistName: 'This Bike Is a Pipe Bomb',
      collectionName: 'Three Way Tie for a Fifth',
      trackName: 'Jack Johnson',
      collectionCensoredName: 'Three Way Tie for a Fifth',
      trackCensoredName: 'Jack Johnson',
      artistViewUrl: 'https://music.apple.com/us/artist/this-bike-is-a-pipe-bomb/41742672?uo=4',
      collectionViewUrl: 'https://music.apple.com/us/album/jack-johnson/263301268?i=263301273&uo=4',
      trackViewUrl: 'https://music.apple.com/us/album/jack-johnson/263301268?i=263301273&uo=4',
      previewUrl:
        'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/fd/bb/38/fdbb38d2-073d-4bc7-68c4-348a0be6d560/mzaf_4150435585996894188.plus.aac.p.m4a',
      artworkUrl30:
        'https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/f3/ee/b3/f3eeb3ff-ca32-273a-15aa-709bdfa64367/mzi.izwiyqez.jpg/30x30bb.jpg',
      artworkUrl60:
        'https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/f3/ee/b3/f3eeb3ff-ca32-273a-15aa-709bdfa64367/mzi.izwiyqez.jpg/60x60bb.jpg',
      artworkUrl100:
        'https://is4-ssl.mzstatic.com/image/thumb/Music124/v4/f3/ee/b3/f3eeb3ff-ca32-273a-15aa-709bdfa64367/mzi.izwiyqez.jpg/100x100bb.jpg',
      collectionPrice: 9.99,
      trackPrice: 0.99,
      releaseDate: '2004-06-15T12:00:00Z',
      collectionExplicitness: 'notExplicit',
      trackExplicitness: 'notExplicit',
      discCount: 1,
      discNumber: 1,
      trackCount: 11,
      trackNumber: 1,
      trackTimeMillis: 117573,
      country: 'USA',
      currency: 'USD',
      primaryGenreName: 'Alternative',
      isStreamable: true
    }
  ]
};

const renderItunes = () => {
  return (
    <>
      {itunesTracks.resultCount > 0 &&
        itunesTracks.results.map((item, index) => (
          <ItunesTracks
            key={index}
            artistName={item.artistName}
            trackName={item.trackName}
            artworkUrl={item.artworkUrl100}
          />
        ))}
    </>
  );
};

export function ItunesContainer() {
  return (
    <Container>
      <StyledT id={'Itunes Tracks'} />
      {renderItunes()}
    </Container>
  );
}

ItunesContainer.propTypes = {
  somePayLoad: PropTypes.any
};

const mapStateToProps = createStructuredSelector({
  somePayLoad: selectSomePayLoad()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectSaga({ key: 'itunesContainer', saga }))(ItunesContainer);

export const ItunesContainerTest = compose(injectIntl)(ItunesContainer);
