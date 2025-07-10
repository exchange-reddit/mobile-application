import { RootStackParamList } from '@/app/navigators/RootNavigator';
import BUTTONS from '@/constants/Button';
import FONTS from '@/constants/Font';
import INPUTS from '@/constants/Input';
import { storeTokens } from '@/utils/secureStorage';
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

    type Nav = NativeStackNavigationProp<RootStackParamList>;

    const navigation = useNavigation<Nav>();

    const handleLogin = async () => {
        console.log('Login pressed');
        try {
            const loginUrl = process.env.EXPO_PUBLIC_LOGIN_URL;

            if (!loginUrl) {
                console.error(
                    'Login URL is not defined. Please check your app.config.js and environment variables.',
                );
                return;
            }

            console.log(`Attempting to fetch from: ${loginUrl}`);

            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    homeUniEmail: email,
                    password: password,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(
                    `HTTP error! status: ${response.status}, message: ${errorText}`,
                );

                throw new Error(`Login failed with status: ${response.status}`);
            }

            const json = await response.json();
            console.log('Login successful:', json);
            await storeTokens(json.accessToken, json.refreshToken);
            navigation.navigate('Main', { screen: 'Home' });
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const handleRegister = () => {
        console.log('Register pressed');
        navigation.navigate('Auth', { screen: 'Verification' });
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
                        <Text style={[FONTS.bigButtonFont]}>LOGIN</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.bottomSection}>
                    <TouchableOpacity
                        style={[BUTTONS.bigButton, styles.registerButton]}
                        onPress={handleRegister}
                    >
                        <Text style={[FONTS.bigButtonFont]}>REGISTER</Text>
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
    container: {
        flex: 1,
        backgroundColor: 'transparent',
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
        marginTop: 8,
        alignItems: 'center',
    },

    bottomSection: {
        alignItems: 'center',
    },

    registerButton: {
        marginBottom: 24,
    },

    continueText: {
        color: 'white',
        fontSize: 16,
        textDecorationLine: 'underline',
        opacity: 0.8,
        fontFamily: 'Inter-Medium',
    },
});
