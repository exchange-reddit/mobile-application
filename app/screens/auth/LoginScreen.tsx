import { AuthStackParamList } from '@/app/navigators/AuthStack';
import BUTTONS from '@/constants/Button';
import FONTS from '@/constants/Font';
import INPUTS from '@/constants/Input';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react'; // useRef, useEffect 추가
import {
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

//5 July 도현님 제가 해냈어요(기존 위치에서 원 반짝이고 없어지는 애니메이션)
// 👍👍👍👍👍

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    type Nav = NativeStackNavigationProp<AuthStackParamList, 'Verification'>;

    const navigation = useNavigation<Nav>();

    const handleLogin = () => {
        console.log('Login pressed');
    };

    const handleRegister = () => {
        console.log('Register pressed');
        navigation.navigate('Verification');
    };

    const handleContinueWithoutRegistration = () => {
        console.log('Continue without registration pressed');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Main content */}
            <View style={styles.content}>
                <Text style={[FONTS.omniversityFont, styles.title]}>
                    Omniversity
                </Text>
                <View style={styles.formContainer}>
                    <TextInput
                        style={[
                            FONTS.inputFont,
                            INPUTS.oneLineInput,
                            styles.input,
                        ]}
                        placeholder="Enter your email"
                        placeholderTextColor="rgba(255, 255, 255, 0.7)"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <TextInput
                        style={[
                            FONTS.inputFont,
                            INPUTS.oneLineInput,
                            styles.input,
                        ]}
                        placeholder="Enter your password"
                        placeholderTextColor="rgba(255, 255, 255, 0.7)"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <TouchableOpacity
                        style={[BUTTONS.bigButton, styles.loginButton]}
                        onPress={handleLogin}
                    >
                        <Text style={[FONTS.buttonFont]}>LOGIN</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.bottomSection}>
                    <TouchableOpacity
                        style={[BUTTONS.bigButton, styles.registerButton]}
                        onPress={handleRegister}
                    >
                        <Text style={[FONTS.buttonFont]}>REGISTER</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleContinueWithoutRegistration}
                    >
                        <Text style={styles.continueText}>
                            Continue without registration
                        </Text>
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
        backgroundColor: 'transparent',
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
        marginBottom: 19,
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
        fontFamily: 'Inter-Medium',
    },

    star: {
        position: 'absolute',
    },
});
