// lib/animationStore.ts
import { Animated } from 'react-native';
import { create } from 'zustand';

export const useAnimationStore = create((set) => ({
  backgroundValue: new Animated.Value(0),
  updateValue: (value: Animated.Value) => set({ backgroundValue: value})
}));
