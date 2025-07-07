import BUTTONS from '@/constants/Button';
import FONTS from '@/constants/Font';
import INPUTS from '@/constants/Input';
import React, { useState } from 'react'; // useRef, useEffect 추가
import {
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
} from 'react-native';

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';

export default function VerificationScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

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
                <View style={styles.line}>
                    <TextInput
                        style={[
                            FONTS.inputFont,
                            INPUTS.lineWithButtonInput,
                            styles.emailInput,
                        ]}
                        placeholder="Home University Email"
                        placeholderTextColor="rgba(255, 255, 255, 0.7)"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <TouchableOpacity
                        style={[BUTTONS.smallButton]}
                        onPress={handleLogin}
                    >
                        <Text style={[FONTS.smallButtonFont]}>Send Code</Text>
                    </TouchableOpacity>
                </View>
                <SafeAreaView style={styles.root}>
                    <CodeField
                        ref={ref}
                        {...props}
                        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                        value={value}
                        onChangeText={setValue}
                        cellCount={CELL_COUNT}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        autoComplete={autoComplete}
                        testID="my-code-input"
                        renderCell={({ index, symbol, isFocused }) => (
                            <Text
                                key={index}
                                style={[
                                    styles.cell,
                                    isFocused && styles.focusCell,
                                ]}
                                onLayout={getCellOnLayoutHandler(index)}
                            >
                                {symbol || (isFocused && <Cursor />)}
                            </Text>
                        )}
                    />
                </SafeAreaView>
                <View style={styles.line}>
                    <TextInput
                        style={[
                            FONTS.inputFont,
                            INPUTS.lineWithButtonInput,
                            styles.emailInput,
                        ]}
                        placeholder="Exchange University Email"
                        placeholderTextColor="rgba(255, 255, 255, 0.7)"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <TouchableOpacity
                        style={[BUTTONS.smallButton]}
                        onPress={handleLogin}
                    >
                        <Text style={[FONTS.smallButtonFont]}>Send Code</Text>
                    </TouchableOpacity>
                </View>
                <SafeAreaView style={styles.root}>
                    <CodeField
                        ref={ref}
                        {...props}
                        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                        value={value}
                        onChangeText={setValue}
                        cellCount={CELL_COUNT}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        autoComplete={autoComplete}
                        testID="my-code-input"
                        renderCell={({ index, symbol, isFocused }) => (
                            <Text
                                key={index}
                                style={[
                                    styles.cell,
                                    isFocused && styles.focusCell,
                                ]}
                                onLayout={getCellOnLayoutHandler(index)}
                            >
                                {symbol || (isFocused && <Cursor />)}
                            </Text>
                        )}
                    />
                </SafeAreaView>
                <Text style={styles.confirmedText}>Confirmed!</Text>
                <Text style={styles.passwordGuideText}>
                    Your password must consist of number, and special character
                    </Text>
                <TextInput
                    style={[FONTS.inputFont, INPUTS.oneLineInput, styles.passwordInput,]}
                    placeholder="Password"
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TextInput
                    style={[FONTS.inputFont, INPUTS.oneLineInput, styles.passwordInput, ]}
                    placeholder="Reenter Password"
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry   
                />
                <TouchableOpacity
                    style={[BUTTONS.bigButton]}
                    onPress={handleLogin}
                >
                    <Text style={[FONTS.bigButtonFont]}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const CELL_COUNT = 5;
const autoComplete = Platform.select<TextInputProps['autoComplete']>({
    android: 'sms-otp',
    default: 'one-time-code',
});

const styles = StyleSheet.create({
    // 애니메이션 효과 때문에 필요 없을것 같아 일단 View를 지웠습니다.
    // 그래도 혹시 몰라 스타일은 남깁니다. 
    bottomSection: {
    marginTop: 'auto', // ✅ 아래로 밀어내기
},
passwordGuideText: {
  color: '#D1C9EF',       // 밝은 보라색 톤
  fontSize: 12,           // 작게
  marginBottom: 6,        // 아래 입력칸과 살짝 간격
},
passwordInput: {
  marginBottom: 12, // ✅ 입력칸 사이 간격
},


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
        marginBottom: 30,
        
    },
    gradient: {
        flex: 1,
    },
    // 타이틀, 이메일 및 비밀번호 입력창, 로그인 버튼, 회원가입 버튼, 계속하기 버튼을 포함하는 컨테이너.
    //
    content: {
        flex: 1,
        justifyContent: 'flex-start', 
        paddingTop: 160, 
        paddingBottom: 80, 
        paddingHorizontal: 20,
    },
    title: {
        textAlign: 'center',
        marginTop: 60,
    },
    line: {
        flexDirection: 'row',
        padding: 10,
        paddingVertical: 8,
        justifyContent: 'space-between', // ✅ 좌우 정렬
        alignItems: 'center',
        alignContent: 'center',
        width: '100%',
    },
    sendCodeButton: {},
    formContainer: {
        marginBottom: 0,
    },
    emailInput: {
        marginRight: 20,
    },
    bottomSection: {
        alignItems: 'center',
        
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

    root: { padding: 20 },
    codeFieldRoot: { marginTop: 10, alignSelf: 'flex-start', marginLeft: 10, },
    cell: {
        width: 35,
        height: 35,
        lineHeight: 35,
        fontSize: 22,
        borderWidth: 1.5,
        borderColor: '#8799BC',
        textAlign: 'center',
        color: '#6577EC', // text color
        marginHorizontal: 6,
        borderRadius: 10
    },

    confirmedText: {
        color: '#D1C9EF',
        textAlign: 'right',
        fontSize: 13,
        marginTop: 1,
        marginRight: 20,
},    
    focusCell: {
        borderColor: '#6577EC',

    },

    
});
