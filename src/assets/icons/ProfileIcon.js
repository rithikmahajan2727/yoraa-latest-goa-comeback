import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ProfileIcon = ({ active, color = '#999999', size = 24 }) => {
  const iconColor = active ? '#000000' : color;
  
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 21V19A4 4 0 0016 15H8A4 4 0 004 19V21"
        stroke={iconColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M12 11A4 4 0 100-8A4 4 0 0012 11Z"
        stroke={iconColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
};

export default ProfileIcon;
