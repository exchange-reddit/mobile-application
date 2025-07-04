import BUTTONS from '@/constants/Button';
import FONTS from '@/constants/Font';
import INPUTS from '@/constants/Input';
import { useBackgroundAnimation } from '@/hooks/useBackgroundAnimation';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react'; // useRef, useEffect 추가
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

// TODO: 원형 선 위치 조정하기 

const CircularLines = () => (
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
      opacity={0.3}
    />
      

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

  const animatedColors = useBackgroundAnimation();


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
        colors={animatedColors} // background colors
        style={styles.gradient}
      >

        {/* Background decorative elements */}
        <CircularLines />
        
        {/* Stars */}
        <StarIcon size={20} style={[styles.star, { top: height * 0.27, left: width * 0.05 }]} />
        <StarIcon size={8} style={[styles.star, { top: height * 0.45, right: width * 0.1 }]} />
        <StarIcon size={15} style={[styles.star, { bottom: height * 0.35, left: width * 0.2 }]} />
        <StarIcon size={6} style={[styles.star, { bottom: height * 0.15, right: width * 0.25 }]} />

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

        
      </AnimatedLinearGradient>
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
  
  