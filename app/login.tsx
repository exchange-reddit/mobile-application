import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react'; // useRef, useEffect 추가
import {
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';


// fetches the device screen width and height for responsive design.
const { width, height } = Dimensions.get('window');

// TODO: 별모양 Svg사용해서 더 예쁘게 만들기
const StarIcon = ({ size = 8, style }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      <Path
        d="M 0 -10 M 12 5 C 12 11 15 14 20 14 C 15 14 12 17 12 23 c 0 -6 -3 -9 -9 -9 C 9 14 12 11 12 5 z"
        fill="white"
        opacity={0.9}
      />
    </Svg>
  );
};

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
    <Circle cx={width * 0.2} cy={103} r="2" fill="white" opacity={0.8} />
    <Circle cx={width * 0.8} cy={153} r="2" fill="white" opacity={0.8} />
    <Circle cx={width * 0.15} cy={186} r="2" fill="white" opacity={0.8} />
    <Circle cx={width * 0.85} cy={240} r="2" fill="white" opacity={0.8} />
    <Circle cx={width * 0.3} cy={280} r="2" fill="white" opacity={0.8} />
    <Circle cx={width * 0.7} cy={320} r="2" fill="white" opacity={0.8} />
  </Svg>
);
//29.June Nayeon edited
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);



export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Animation values
  const gradientAnimation = useRef(new Animated.Value(0)).current;

  // Gradient color sets for animation
  const gradientSets = [
    ['#020030', '#614798', '#3743AC'],
    ['#614798', '#3743AC', '#020030'],
    ['#3743AC', '#020030', '#614798'],
  ];

  useEffect(() => {
    // Start the gradient animation
    const animateGradient = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(gradientAnimation, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: false,
          }),
          Animated.timing(gradientAnimation, {
            toValue: 2,
            duration: 4000,
            useNativeDriver: false,
          }),
          Animated.timing(gradientAnimation, {
            toValue: 0,
            duration: 4000,
            useNativeDriver: false,
          }),
        ])
      ).start();
    };

    animateGradient();
  }, []);

  const animatedColors = gradientSets[0].map((_, index) => 
    gradientAnimation.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [
        gradientSets[0][index],
        gradientSets[1][index],
        gradientSets[2][index],
      ],
    })
  );

  //until this

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
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <AnimatedLinearGradient
        colors={['#020030', '#614798', '#3743AC']} // background colors
        style={styles.gradient}
      >
        {/* Background decorative elements */}
        <CircularLines />
        
        {/* Stars */}
        <StarIcon size={12} style={[styles.star, { top: height * 0.25, left: width * 0.15 }]} />
        <StarIcon size={8} style={[styles.star, { top: height * 0.45, right: width * 0.1 }]} />
        <StarIcon size={10} style={[styles.star, { bottom: height * 0.35, left: width * 0.2 }]} />
        <StarIcon size={6} style={[styles.star, { bottom: height * 0.15, right: width * 0.25 }]} />

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

        
      </AnimatedLinearGradient>
    </View>
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
    fontFamily: 'Inter-Medium'
  },
  title: {
    fontSize: 40,
    fontWeight: '300',
    color: 'white',
    textAlign: 'center',
    marginBottom: 80,
    letterSpacing: -1,
    fontFamily: 'Inter-Bold'
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
    fontFamily: 'Inter-SemiBold'
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
    fontFamily: 'Inter-SemiBold'
  },
  continueText: {
    color: 'white',
    fontSize: 16,
    textDecorationLine: 'underline',
    opacity: 0.8,
    fontFamily: 'Inter-Medium'
  },
  star: {
    position: 'absolute',
  },
  });
  
  