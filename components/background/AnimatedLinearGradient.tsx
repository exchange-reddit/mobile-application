import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';
import React from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';

const AnimatedLinearGradientComponent = Animated.createAnimatedComponent(LinearGradient);

type AnimatedLinearGradientProps = Omit<LinearGradientProps, 'colors'> & {
  colors: (string | Animated.AnimatedInterpolation<string>)[];
  style?: StyleProp<ViewStyle>;
};

export const AnimatedLinearGradient = ({ colors, style, ...props }: AnimatedLinearGradientProps) => {
  return (
    <AnimatedLinearGradientComponent
      {...props}
      colors={colors}
      style={style}
    />
  );
};
