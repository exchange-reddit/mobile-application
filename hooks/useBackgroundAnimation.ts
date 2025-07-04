// hooks/useBackgroundAnimation.ts
import { useAnimationStore } from '@/libs/backgroundAnimationStore';
import { useEffect } from 'react';
import { Animated } from 'react-native';

const gradientSets = [
  ['#020030', '#614798', '#3743AC'],
  ['#614798', '#3743AC', '#020030'],
  ['#3743AC', '#020030', '#614798'],
];

export const useBackgroundAnimation = () => {
  const backgroundValue = useAnimationStore((state) => state.backgroundValue);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(backgroundValue, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: false,
        }),
        Animated.timing(backgroundValue, {
          toValue: 2,
          duration: 4000,
          useNativeDriver: false,
        }),
        Animated.timing(backgroundValue, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: false,
        }),
      ])
    );
    loop.start();

    return () => loop.stop(); // Optional cleanup
  }, []);

  // Return interpolated animated colors
  const animatedColors = gradientSets[0].map((_, index) =>
    backgroundValue.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [
        gradientSets[0][index],
        gradientSets[1][index],
        gradientSets[2][index],
      ],
    })
  );

  return animatedColors;
};
