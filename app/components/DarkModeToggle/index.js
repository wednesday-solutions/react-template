import React from 'react';
import styled from '@emotion/styled';
import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from '@app/contexts/themeContext';

const ToggleButton = styled(IconButton)`
  && {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 56px;
    height: 56px;
    background: ${(props) => props.bgcolor};
    color: ${(props) => props.color};
    box-shadow: 0 4px 20px ${(props) => props.shadowcolor};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1000;

    &:hover {
      background: ${(props) => props.hoverbg};
      transform: translateY(-4px) rotate(15deg);
      box-shadow: 0 8px 30px ${(props) => props.shadowcolor};
    }

    &:active {
      transform: translateY(-2px) rotate(0deg);
    }

    @media (max-width: 768px) {
      width: 48px;
      height: 48px;
      bottom: 1.5rem;
      right: 1.5rem;
    }
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${(props) => (props.animate ? 'rotate 0.5s ease-in-out' : 'none')};

  @keyframes rotate {
    from {
      transform: rotate(0deg) scale(0.8);
      opacity: 0.5;
    }
    to {
      transform: rotate(360deg) scale(1);
      opacity: 1;
    }
  }
`;

// dark mode added
// eslint-disable-next-line complexity
export const DarkModeToggle = () => {
  const { isDarkMode, toggleTheme, colors } = useTheme();
  const [isAnimating, setIsAnimating] = React.useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    toggleTheme();
    setTimeout(() => setIsAnimating(false), 500);
  };

  const tooltipTitle = isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  const bgColor = isDarkMode ? colors.surface : colors.primary;
  const textColor = isDarkMode ? colors.accent : colors.text;
  const hoverBgColor = isDarkMode ? colors.hover : colors.secondary;
  const Icon = isDarkMode ? Brightness7 : Brightness4;

  return (
    <Tooltip title={tooltipTitle} placement="left" arrow>
      <ToggleButton
        onClick={handleToggle}
        aria-label="toggle dark mode"
        bgcolor={bgColor}
        color={textColor}
        hoverbg={hoverBgColor}
        shadowcolor={colors.shadow}
      >
        <IconWrapper animate={isAnimating}>
          <Icon fontSize="large" />
        </IconWrapper>
      </ToggleButton>
    </Tooltip>
  );
};

export default DarkModeToggle;
