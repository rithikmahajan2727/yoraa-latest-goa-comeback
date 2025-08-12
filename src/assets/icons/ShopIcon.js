import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ShopIcon = ({ active, color = '#999999', size = 24 }) => {
  const iconColor = active ? '#000000' : color;
  
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 2L3 6V20A2 2 0 005 22H19A2 2 0 0021 20V6L18 2H6Z"
        stroke={iconColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M3 6H21"
        stroke={iconColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16 10A4 4 0 11-8 0"
        stroke={iconColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ShopIcon;
