import React from 'react';
import Svg, { Path } from 'react-native-svg';

const HomeIcon = ({ active, color = '#999999', size = 24 }) => {
  const iconColor = active ? '#000000' : color;
  
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Roof triangle */}
      <Path
        d="M12 4L20 11H4L12 4Z"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* House base */}
      <Path
        d="M4 11V19H20V11"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Door */}
      <Path
        d="M9 19V15H15V19"
        stroke={iconColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
};

export default HomeIcon;
