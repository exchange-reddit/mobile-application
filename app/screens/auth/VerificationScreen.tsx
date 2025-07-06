import FONTS from '@/constants/Font';
import React, { useState } from 'react'; // useRef, useEffect 추가
import { StatusBar, StyleSheet, Text, View } from 'react-native';

export default function VerificationScreen() {
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
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.content}>
                <Text style={[FONTS.titleFont, styles.title]}>
                    Verification
                </Text>
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
        marginTop: 50,
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
