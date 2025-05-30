import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardMedia, Typography, IconButton, Box } from '@mui/material';
import { PlayArrow, Pause } from '@mui/icons-material';
import styled from '@emotion/styled';

const StyledCard = styled(Card)`
  position: relative;
  width: 100%;
  transition: transform 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
  }
`;

const PlayButton = styled(IconButton)`
  position: absolute;
  right: 8px;
  bottom: 8px;
  background-color: rgba(147, 51, 234, 0.9);

  &:hover {
    background-color: rgba(147, 51, 234, 1);
  }
`;

const ArtistText = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: 0.875rem;
`;

function SongCard({ track }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handlePlayPause = (e) => {
    e.stopPropagation();
    if (!audioRef.current) {
      audioRef.current = new Audio(track.previewUrl);
      audioRef.current.addEventListener('ended', () => setIsPlaying(false));
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  React.useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('ended', () => setIsPlaying(false));
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <StyledCard>
      <CardMedia
        component="img"
        height="200"
        image={track.artworkUrl100.replace('100x100bb', '400x400bb')}
        alt={track.trackName}
      />
      <CardContent>
        <Typography variant="h6" noWrap>
          {track.trackName}
        </Typography>
        <ArtistText variant="body2" noWrap>
          {track.artistName}
        </ArtistText>
        <Box sx={{ mt: 1 }}>
          <Typography variant="caption" color="text.secondary">
            {track.primaryGenreName}
          </Typography>
        </Box>
      </CardContent>
      <PlayButton aria-label={isPlaying ? 'pause' : 'play'} onClick={handlePlayPause} size="medium">
        {isPlaying ? <Pause /> : <PlayArrow />}
      </PlayButton>
    </StyledCard>
  );
}

SongCard.propTypes = {
  track: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    artistName: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    primaryGenreName: PropTypes.string.isRequired
  }).isRequired
};

export default SongCard;
