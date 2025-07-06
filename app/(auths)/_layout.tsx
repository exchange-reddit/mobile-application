import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AnimatedLinearGradient } from '@/components/background/AnimatedLinearGradient';
import { useBackgroundAnimation } from '@/hooks/useBackgroundAnimation';
import { useColorScheme } from '@/hooks/useColorScheme';

import { Stack } from 'expo-router';
import {
  StyleSheet
} from 'react-native';

export default function AuthLayout() {
  const colorScheme = useColorScheme();
  const animatedColors = useBackgroundAnimation();
  const [loaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedLinearGradient
        colors={animatedColors} // background colors
        style={styles.gradient}
      />
      <Stack screenOptions={{
        contentStyle: { backgroundColor: 'transparent' },
        headerShown: false,
        animation: 'fade', // optional, to make transitions softer
      }}>
        <Stack.Screen name="login" options={{headerShown: false}}/>
        <Stack.Screen name="verification" options={{headerShown: false}}/>
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({ 
  gradient: {
    ...StyleSheet.absoluteFillObject, 
    flex: 1,
  }
});
