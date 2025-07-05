import BUTTONS from '@/constants/Button';
import FONTS from '@/constants/Font';
import INPUTS from '@/constants/Input';
import { useRouter } from 'expo-router';
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
import Svg, { Circle, Defs, Path, RadialGradient, Stop } from 'react-native-svg';

//5 July 도현님 제가 해냈어요(기존 위치에서 원 반짝이고 없어지는 애니메이션)
// 👍👍👍👍👍

// fetches the device screen width and height for responsive design.
const { width, height } = Dimensions.get('window');

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
//번짝이는 모션
const TwinklingDot = ({ cx, cy, r = 2, delay = 0 }) => {
  const opacityAnim = useRef(new Animated.Value(0.8)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const startAnimation = () => {
      const twinkleAnimation = Animated.loop(
        Animated.sequence([
          // 밝아지고 커지기
          Animated.parallel([
            Animated.timing(opacityAnim, {
              toValue: 1,
              duration: 800 + Math.random() * 400, // 0.8~1.2초
              useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
              toValue: 1.3,
              duration: 800 + Math.random() * 400,
              useNativeDriver: true,
            }),
          ]),
          // 잠시 유지
          Animated.delay(200 + Math.random() * 1000), // 0.2~0.5초
          // 원래대로 돌아가기
          Animated.parallel([
            Animated.timing(opacityAnim, {
              toValue: 0.6,
              duration: 800 + Math.random() * 400,
              useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
              toValue: 1,
              duration: 800 + Math.random() * 400,
              useNativeDriver: true,
            }),
          ]),
          // 잠시 어두운 상태 유지
          Animated.delay(1000 + Math.random() * 2000), // 1~3초
        ])
      );

      // 딜레이 후 애니메이션 시작
      setTimeout(() => {
        twinkleAnimation.start();
      }, delay);
    };
    startAnimation();
  }, [opacityAnim, scaleAnim, delay]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: cx - r,
        top: cy - r,
        width: r * 2,
        height: r * 2,
        opacity: opacityAnim,
        transform: [{ scale: scaleAnim }],
      }}
    >
      <View
        style={{
          width: r * 2,
          height: r * 2,
          backgroundColor: 'white',
          borderRadius: r,
          shadowColor: 'white',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.8,
          shadowRadius: 4,
          elevation: 5,
        }}
      />
    </Animated.View>
  );
};

const CircularLines = () => {
  // 점들의 위치 정보
  const dots = [
    { cx: width * 0.2, cy: 103, delay: 0 },
    { cx: width * 0.8, cy: 153, delay: 500 },
    { cx: width * 0.15, cy: 186, delay: 1000 },
    { cx: width * 0.85, cy: 240, delay: 1500 },
    { cx: width * 0.2, cy: 280, delay: 2000 },
    { cx: width * 0.40, cy: 320, delay: 2500 },
    { cx: width * 0.60, cy: 700, delay: 1000 },
    { cx: width * 0.90, cy: 650, delay: 1000 },
  ];

  return (
    <View style={StyleSheet.absoluteFillObject}>
      {/* SVG 원들 */}
      <Svg
        width={width}
        height={height * 0.6}
        style={StyleSheet.absoluteFillObject}
        viewBox={`0 0 ${width} ${height * 0.6}`}
      >
        <Defs>
          <RadialGradient id="whiteToTransparent" cx="80%" cy="100%" r="80%">
            <Stop offset="0%" stopColor="white" stopOpacity="1" />
            <Stop offset="80%" stopColor="white" stopOpacity="0" />
          </RadialGradient>
        </Defs>

        {[...Array(6)].map((_, index) => (
          <Circle
            key={index}
            cx={width / 2}
            cy={-50}
            r={80 + index * 40}
            fill="none"
            stroke="rgba(255, 255, 255, 0.8)"
            strokeWidth="0.4"
          />
        ))}
        
        {/* Gradient circle - 새로 추가된 원 */}
        <Circle
          cx={width / 2}
          cy={-50}
          r={280}
          fill="url(#whiteToTransparent)"
          opacity={0.2}
        />
      </Svg>

      {/* 반짝이는 점들 */}
      {dots.map((dot, index) => (
        <TwinklingDot
          key={index}
          cx={dot.cx}
          cy={dot.cy}
          r={1.5}
          delay={dot.delay}
        />
      ))}
    </View>
  );
};



export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleLogin = () => {
    console.log('Login pressed');
  };

  const handleRegister = () => {
    console.log('Register pressed');
    router.push('/register');
  };

  const handleContinueWithoutRegistration = () => {
    console.log('Continue without registration pressed');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

        {/* Background decorative elements */}
        <CircularLines />
        
        {/* Stars */}
        <StarIcon size={20} style={[styles.star, { top: height * 0.27, left: width * 0.05 }]} />
        <StarIcon size={8} style={[styles.star, { top: height * 0.45, right: width * 0.05 }]} />
        <StarIcon size={15} style={[styles.star, { bottom: height * 0.35, left: width * 0.2 }]} />
        <StarIcon size={6} style={[styles.star, { bottom: height * 0.15, right: width * 0.5 }]} />

        {/* Main content */}
        <View style={styles.content}>
          <Text style={[FONTS.titleFont, styles.title]}>Omniversity</Text>
          
          <View style={styles.formContainer}>
            <TextInput
              style={[FONTS.inputFont, INPUTS.oneLineInput, styles.input]}
              placeholder="Enter your email"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <TextInput
              style={[FONTS.inputFont, INPUTS.oneLineInput, styles.input]}
              placeholder="Enter your password"
              placeholderTextColor="rgba(255, 255, 255, 0.7)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            
            <TouchableOpacity style={[BUTTONS.bigButton, styles.loginButton]} onPress={handleLogin}>
              <Text style={[FONTS.buttonFont]}>LOGIN</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.bottomSection}>
            <TouchableOpacity style={[BUTTONS.bigButton, styles.registerButton]} onPress={handleRegister}>
              <Text style={[FONTS.buttonFont]}>REGISTER</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={handleContinueWithoutRegistration}>
              <Text style={styles.continueText}>Continue without registration</Text>
            </TouchableOpacity>
          </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // 애니메이션 효과 때문에 필요 없을것 같아 일단 View를 지웠습니다. 
  // 그래도 혹시 몰라 스타일은 남깁니다. 
  grainOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    opacity: 0.8,
    // 미세한 패턴 효과
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },

  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  // 타이틀, 이메일 및 비밀번호 입력창, 로그인 버튼, 회원가입 버튼, 계속하기 버튼을 포함하는 컨테이너.
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  title: {
    textAlign: 'center',
    marginTop: 180,
    marginBottom: -100,
  },
  formContainer: {
    marginBottom: 0,
  },
  input: {
    marginBottom: 19
  },

  loginButton: {
    backgroundColor: 'rgba(210, 173, 237, 0.39)',
    marginTop: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  bottomSection: {
    alignItems: 'center',
  },

  registerButton: {
    backgroundColor: 'rgba(192, 219, 239, 0.37)',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
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
  
  