import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

// fetches the device screen width and height for responsive design.
const { width, height } = Dimensions.get('window');

// TODO: 별모양 Svg사용해서 더 예쁘게 만들기
const StarIcon = ({ size = 8, style }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
    <Path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      fill="white"
      opacity={0.8}
    />
  </Svg>
);

// TODO: 원형 선 위치 조정하기

const CircularLines = () => (
  <Svg
    width={width}
    height={height * 0.6}
    style={StyleSheet.absoluteFillObject}
    viewBox={`0 0 ${width} ${height * 0.6}`}
  >
    {[...Array(6)].map((_, index) => (
      <Circle
        key={index}
        cx={width / 2}
        cy={-50}
        r={80 + index * 40}
        fill="none"
        stroke="rgba(255, 255, 255, 0.1)"
        strokeWidth="1"
      />
    ))}
    {/* Small dots on the circles */}
    <Circle cx={width * 0.2} cy={120} r="2" fill="white" opacity={0.6} />
    <Circle cx={width * 0.8} cy={160} r="2" fill="white" opacity={0.6} />
    <Circle cx={width * 0.15} cy={200} r="2" fill="white" opacity={0.6} />
    <Circle cx={width * 0.85} cy={240} r="2" fill="white" opacity={0.6} />
    <Circle cx={width * 0.3} cy={280} r="2" fill="white" opacity={0.6} />
    <Circle cx={width * 0.7} cy={320} r="2" fill="white" opacity={0.6} />
  </Svg>
);

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login pressed');
  };

  const handleRegister = () => {
    console.log('Register pressed');
  };

  const handleContinueWithoutRegistration = () => {
    console.log('Continue without registration pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f3460']}
        style={styles.gradient}
      >
        {/* Background decorative elements */}
        <CircularLines />
        
        {/* Stars */}
        <StarIcon size={12} style={[styles.star, { top: height * 0.25, left: width * 0.15 }]} />
        <StarIcon size={8} style={[styles.star, { top: height * 0.45, right: width * 0.1 }]} />
        <StarIcon size={10} style={[styles.star, { bottom: height * 0.35, left: width * 0.2 }]} />
        <StarIcon size={6} style={[styles.star, { bottom: height * 0.15, right: width * 0.25 }]} />

        {/* Status bar info */}
        <View style={styles.statusBar}>
          <Text style={styles.time}>9:41</Text>
          <View style={styles.statusIcons}>
            <Text style={styles.statusIcon}>📶</Text>
            <Text style={styles.statusIcon}>📶</Text>
            <Text style={styles.statusIcon}>🔋</Text>
          </View>
        </View>

        {/* Main content */}
        <View style={styles.content}>
          <Text style={styles.title}>Omniversity</Text>
          
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>LOGIN</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.bottomSection}>
            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
              <Text style={styles.registerButtonText}>REGISTER</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={handleContinueWithoutRegistration}>
              <Text style={styles.continueText}>Continue without registration</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Home indicator */}
        <View style={styles.homeIndicator} />
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  time: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    color: 'white',
    marginLeft: 5,
    fontSize: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 48,
    fontWeight: '300',
    color: 'white',
    textAlign: 'center',
    marginBottom: 80,
    letterSpacing: -1,
  },
  formContainer: {
    marginBottom: 60,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginBottom: 16,
    fontSize: 16,
    color: 'white',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  loginButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 12,
    paddingVertical: 18,
    marginTop: 8,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
  },
  bottomSection: {
    alignItems: 'center',
  },
  registerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 60,
    marginBottom: 24,
    width: '100%',
    alignItems: 'center',
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
  },
  continueText: {
    color: 'white',
    fontSize: 16,
    textDecorationLine: 'underline',
    opacity: 0.8,
  },
  star: {
    position: 'absolute',
  },
  homeIndicator: {
    width: 134,
    height: 5,
    backgroundColor: 'white',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 8,
    opacity: 0.8,
  },
});
