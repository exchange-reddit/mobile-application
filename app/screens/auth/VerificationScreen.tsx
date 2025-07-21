import BUTTONS from '@/constants/Button';
import FONTS from '@/constants/Font';
import INPUTS from '@/constants/Input';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
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

import { useRegistrationStore } from '@/libs/registration/registrationStore';

// --- Constants ---
const CELL_COUNT = 5;
const VERIFICATION_TYPE_UNI_EMAIL = 1;

const autoComplete = Platform.select<TextInputProps['autoComplete']>({
    android: 'sms-otp',
    default: 'one-time-code',
});

export default function VerificationScreen() {
    // --- Form Data States ---
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [homeUniCode, setHomeUniCode] = useState('');
    const [exchangeUniCode, setExchangeUniCode] = useState('');

    // --- Zustand Store Data ---
    const {
        username,
        homeUniversityEmail,
        setHomeUniversityEmail,
        exchangeUniversityEmail,
        setExchangeUniversityEmail,
        password,
        setPassword,
        // reset, // The reset function - uncomment if you need a full form reset button
    } = useRegistrationStore();

    // --- Derived States (calculated on render) ---
    const isHomeUniCodeFilled = homeUniCode.length === CELL_COUNT;
    const isExchangeUniCodeFilled = exchangeUniCode.length === CELL_COUNT;

    const arePasswordsMatching =
        password === passwordConfirm && password.length > 0;
    const isPasswordValid =
        password.length >= 8 && // Minimum length
        /[0-9]/.test(password) && // Contains a number
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password); // Contains a special character

    // --- API Call Status States (more granular) ---
    const [isSendingHomeCode, setIsSendingHomeCode] = useState(false);
    const [isSendingExchangeCode, setIsSendingExchangeCode] = useState(false);
    const [isVerifyingHomeCode, setIsVerifyingHomeCode] = useState(false);
    const [isVerifyingExchangeCode, setIsVerifyingExchangeCode] =
        useState(false);

    // --- Verification Status States ---
    const [isHomeUniCodeVerified, setIsHomeUniCodeVerified] = useState(false);
    const [isExchangeUniCodeVerified, setIsExchangeUniCodeVerified] =
        useState(false);

    // --- User Feedback Message States ---
    const [homeUniMessage, setHomeUniMessage] = useState('');
    const [exchangeUniMessage, setExchangeUniMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');

    // --- CodeField Hooks ---
    const refHome = useBlurOnFulfill({
        value: homeUniCode,
        cellCount: CELL_COUNT,
    });
    const refExchange = useBlurOnFulfill({
        value: exchangeUniCode,
        cellCount: CELL_COUNT,
    });
    const [homeUniProps, getHomeUniCellOnLayoutHandler] = useClearByFocusCell({
        value: homeUniCode,
        setValue: setHomeUniCode,
    });
    const [exchangeUniProps, getExchangeUniCellOnLayoutHandler] =
        useClearByFocusCell({
            value: exchangeUniCode,
            setValue: setExchangeUniCode,
        });

    // --- Helper Function for Consistent API Error Handling ---
    const handleApiError = async (response, defaultMessage) => {
        let errorMessage = defaultMessage;
        try {
            // Attempt to parse error as JSON first (common for API errors)
            const errorData = await response.json();
            errorMessage = errorData.message || defaultMessage;
        } catch (jsonError) {
            // If JSON parsing fails, try to read as plain text
            try {
                const errorText = await response.text();
                errorMessage = errorText || defaultMessage;
            } catch (textError) {
                console.error(
                    'Failed to parse error response as text:',
                    textError,
                );
            }
        }
        Alert.alert('Error', errorMessage); // Display error to user
        return errorMessage; // Return message for local state update
    };

    // --- API Call: Send Home University Code ---
    const handleSendHomeUniversityCode = async () => {
        console.log('handleSendHomeUniversityCode pressed');
        setHomeUniMessage(''); // Clear previous messages
        setIsSendingHomeCode(true); // Start loading
        console.log(
            'Waiting for 1.5 seconds to simulate sending home uni code',
        );
        setTimeout(() => {
            console.log('Home uni code sent');
            setIsSendingHomeCode(false); // End loading
        }, 1500); // Wait 1.5 seconds
    };

    // --- API Call: Send Exchange University Code ---
    const handleSendExchangeUniversityCode = async () => {
        console.log('handleSendExchangeUniversityCode pressed');
        setExchangeUniMessage(''); // Clear previous messages
        setIsSendingExchangeCode(true); // Start loading
        console.log(
            'Waiting for 1.5 seconds to simulate sending exchange uni code',
        );
        setTimeout(() => {
            console.log('Exchange uni code sent');
            setIsSendingExchangeCode(false); // End loading
        }, 1500); // Wait 1.5 seconds
    };

    // --- API Call: Verify Home University Code ---
    const handleVerifyHomeUniCode = async () => {
        // Prevent re-triggering if already verifying or already verified
        if (isVerifyingHomeCode || isHomeUniCodeVerified) {
            return;
        }
        // Ensure code is filled before attempting verification
        if (!isHomeUniCodeFilled) {
            return;
        }

        setIsVerifyingHomeCode(true); // Start loading for verification
        setHomeUniMessage(''); // Clear previous messages
        console.log(
            'Automatically attempting verification with home uni code:',
            { homeUniCode, email: homeUniversityEmail.toLowerCase() },
        );

        setTimeout(() => {
            console.log('Verifying home uni code...');
        }, 1500); // Wait 1.5 seconds

        setIsHomeUniCodeVerified(true);
        console.log('Home uni code verified.');
        setIsVerifyingHomeCode(false); // End loading
    };

    // --- API Call: Verify Exchange University Code ---
    const handleVerifyExchangeUniCode = async () => {
        // Prevent re-triggering if already verifying or already verified
        if (isVerifyingExchangeCode || isExchangeUniCodeVerified) {
            return;
        }
        // Ensure code is filled before attempting verification
        if (!isExchangeUniCodeFilled) {
            return;
        }

        setIsVerifyingExchangeCode(true); // Start loading for verification
        setExchangeUniMessage(''); // Clear previous messages
        console.log(
            'Automatically attempting verification with exchange uni code:',
            {
                exchangeUniCode,
                email: exchangeUniversityEmail.toLowerCase(),
            },
        );

        setTimeout(() => {
            console.log('Verifying exchange uni code...');
            // Navigate to another screen, show a success message, etc.
        }, 1500); // Wait 1.5 seconds
        setIsExchangeUniCodeVerified(true);
        console.log('Exchange uni code verified.');
        setIsVerifyingExchangeCode(false); // End loading
    };

    // --- useEffect for Password Validation Feedback ---
    useEffect(() => {
        // Only show messages if user has started typing or if both fields are empty
        if (password.length === 0 && passwordConfirm.length === 0) {
            setPasswordMessage('');
            return;
        }

        if (!isPasswordValid) {
            setPasswordMessage(
                'Password must be at least 8 characters, contain a number, and a special character.',
            );
        } else if (!arePasswordsMatching) {
            setPasswordMessage('Passwords do not match.');
        } else {
            setPasswordMessage('');
        }
    }, [password, passwordConfirm, isPasswordValid, arePasswordsMatching]);

    // --- useEffect: Trigger Home University Code Verification ---
    useEffect(() => {
        // Trigger verification if code is filled, not already verifying, and not yet verified
        if (
            isHomeUniCodeFilled &&
            !isVerifyingHomeCode &&
            !isHomeUniCodeVerified
        ) {
            handleVerifyHomeUniCode();
        }
    }, [isHomeUniCodeFilled, isVerifyingHomeCode, isHomeUniCodeVerified]); // Dependencies

    // --- useEffect: Trigger Exchange University Code Verification ---
    useEffect(() => {
        // Trigger verification if code is filled, not already verifying, and not yet verified
        if (
            isExchangeUniCodeFilled &&
            !isVerifyingExchangeCode &&
            !isExchangeUniCodeVerified
        ) {
            handleVerifyExchangeUniCode();
        }
    }, [
        isExchangeUniCodeFilled,
        isVerifyingExchangeCode,
        isExchangeUniCodeVerified,
    ]); // Dependencies

    // --- Handle Continue Button ---
    const handleContinue = () => {
        console.log('Continue pressed');
        if (!isHomeUniCodeVerified) {
            Alert.alert(
                'Registration Incomplete',
                'Please verify your Home University email before continuing.',
            );
            return;
        }
        if (!isExchangeUniCodeVerified) {
            Alert.alert(
                'Registration Incomplete',
                'Please verify your Exchange University email before continuing.',
            );
            return;
        }
        if (!isPasswordValid) {
            Alert.alert(
                'Registration Incomplete',
                'Please ensure your password meets the requirements.',
            );
            return;
        }
        if (!arePasswordsMatching) {
            Alert.alert('Registration Incomplete', 'Passwords do not match.');
            return;
        }
        // navigation.navigate('FinalRegistration');
    };

    // --- Overall Loading State (for Continue button) ---
    const overallLoading =
        isSendingHomeCode ||
        isSendingExchangeCode ||
        isVerifyingHomeCode ||
        isVerifyingExchangeCode;

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.content}>
                <Text style={[FONTS.titleFont, styles.title]}>
                    Verification
                </Text>
                <View>
                    {/* Home University Email Section */}
                    <View>
                        <View style={styles.line}>
                            <TextInput
                                style={[
                                    FONTS.inputFont,
                                    INPUTS.lineWithButtonInput,
                                    styles.emailInput,
                                ]}
                                placeholder="Home University Email"
                                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                                value={homeUniversityEmail}
                                onChangeText={setHomeUniversityEmail}
                                // Disable input if sending code or already verified
                                editable={
                                    !isSendingHomeCode && !isHomeUniCodeVerified
                                }
                            />

                            <View style={{ width: 100, alignItems: 'flex-end' }}>
                            {!isHomeUniCodeVerified ? (
                                <TouchableOpacity
                                    style={[BUTTONS.smallButton]}
                                    onPress={handleSendHomeUniversityCode}
                                    // Disable button when sending code or already verified
                                    disabled={
                                        isSendingHomeCode ||
                                        isHomeUniCodeVerified
                                    }
                                >
                                    {isSendingHomeCode ? (
                                        <ActivityIndicator
                                            size="small"
                                            color="#fff"
                                        />
                                    ) : (
                                        <Text style={[FONTS.smallButtonFont]}>
                                            Send Code
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            ) : (
                                <Text style={[styles.confirmedText]}>
                                    Confirmed!
                                </Text>
                            )}
                            </View>

                        </View>
                        <SafeAreaView style={styles.root}>
                            {!isHomeUniCodeVerified && (
                                <CodeField
                                    ref={refHome}
                                    {...homeUniProps}
                                    value={homeUniCode}
                                    onChangeText={setHomeUniCode}
                                    cellCount={CELL_COUNT}
                                    rootStyle={styles.codeFieldRoot}
                                    keyboardType="number-pad"
                                    textContentType="oneTimeCode"
                                    autoComplete={autoComplete}
                                    testID="home-code-input"
                                    // Disable input while verifying or if already verified
                                    editable={
                                        !isVerifyingHomeCode &&
                                        !isHomeUniCodeVerified
                                    }
                                    renderCell={({
                                        index,
                                        symbol,
                                        isFocused,
                                    }) => (
                                        <Text
                                            key={index}
                                            style={[
                                                styles.cell,
                                                isFocused && styles.focusCell,
                                            ]}
                                            onLayout={getExchangeUniCellOnLayoutHandler(
                                                index,
                                            )}
                                        >
                                            {symbol ||
                                                (isFocused && <Cursor />)}
                                        </Text>
                                    )}
                                />
                            )}
                        </SafeAreaView>
                    </View>

                    {/* Exchange University Email Section */}
                    <View>
                        <View style={styles.line}>
                            <TextInput
                                style={[
                                    FONTS.inputFont,
                                    INPUTS.lineWithButtonInput,
                                    styles.emailInput,
                                ]}
                                placeholder="Exchange University Email"
                                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                                value={exchangeUniversityEmail}
                                onChangeText={setExchangeUniversityEmail}
                                // Disable input if sending code or already verified
                                editable={
                                    !isSendingExchangeCode &&
                                    !isExchangeUniCodeVerified
                                }
                            />

                            <View style={{ width: 100, alignItems: 'flex-end' }}>
                            {!isExchangeUniCodeVerified ? (
                                <TouchableOpacity
                                    style={[BUTTONS.smallButton]}
                                    onPress={handleSendExchangeUniversityCode}
                                    // Disable button when sending code or already verified
                                    disabled={
                                        isSendingExchangeCode ||
                                        isExchangeUniCodeVerified
                                    }
                                >
                                    {isSendingExchangeCode ? (
                                        <ActivityIndicator
                                            size="small"
                                            color="#fff"
                                        />
                                    ) : (
                                        <Text style={[FONTS.smallButtonFont]}>
                                            Send Code
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            ) : (
                                <Text style={[styles.confirmedText]}>
                                    Confirmed!
                                </Text>
                            )}
                            </View>
                        </View>
                        <SafeAreaView style={styles.root}>
                            <View style={styles.codeFieldContainer}>
                                {!isExchangeUniCodeVerified && (
                                    <CodeField
                                        ref={refExchange}
                                        {...exchangeUniProps}
                                        value={exchangeUniCode}
                                        onChangeText={setExchangeUniCode}
                                        cellCount={CELL_COUNT}
                                        rootStyle={styles.codeFieldRoot}
                                        keyboardType="number-pad"
                                        textContentType="oneTimeCode"
                                        autoComplete={autoComplete}
                                        testID="home-code-input"
                                        // Disable input while verifying or if already verified
                                        editable={
                                            !isVerifyingExchangeCode &&
                                            !isExchangeUniCodeVerified
                                        }
                                        renderCell={({
                                            index,
                                            symbol,
                                            isFocused,
                                        }) => (
                                            <Text
                                                key={index}
                                                style={[
                                                    styles.cell,
                                                    isFocused &&
                                                        styles.focusCell,
                                                ]}
                                                onLayout={getHomeUniCellOnLayoutHandler(
                                                    index,
                                                )}
                                            >
                                                {symbol ||
                                                    (isFocused && <Cursor />)}
                                            </Text>
                                        )}
                                    />
                                )}
                            </View>
                        </SafeAreaView>
                    </View>
                </View>

                {/* Password Section */}
                <Text style={styles.passwordGuideText}>
                    Your password must be at least 8 characters long, contain a
                    number, and a special character.
                </Text>
                <TextInput
                    style={[
                        FONTS.inputFont,
                        INPUTS.oneLineInput,
                        styles.passwordInput,
                    ]}
                    placeholder="Password"
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TextInput
                    style={[
                        FONTS.inputFont,
                        INPUTS.oneLineInput,
                        styles.passwordInput,
                    ]}
                    placeholder="Confirm Password"
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    value={passwordConfirm}
                    onChangeText={setPasswordConfirm}
                    secureTextEntry
                />
                {/* Password validation message */}
                {passwordMessage ? (
                    <Text
                        style={[
                            styles.messageText,
                            arePasswordsMatching && isPasswordValid
                                ? styles.successMessage
                                : styles.errorMessage,
                        ]}
                    >
                        {passwordMessage}
                    </Text>
                ) : null}

                {/* Continue Button */}
                <TouchableOpacity
                    style={[BUTTONS.bigButton]}
                    onPress={handleContinue}
                    // Disable if any API call is in progress or if verification/password conditions are not met
                    disabled={
                        overallLoading ||
                        !isHomeUniCodeVerified ||
                        !isExchangeUniCodeVerified ||
                        !isPasswordValid ||
                        !arePasswordsMatching
                    }
                >
                    <Text style={[FONTS.bigButtonFont]}>Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    bottomSection: {
        marginTop: 'auto',
    },
    passwordGuideText: {
        color: '#D1C9EF',
        fontSize: 12,
        marginTop: 60,
        marginBottom: 10,
    },
    passwordInput: {
        marginBottom: 10,
    },
    grainOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.15)',
        opacity: 0.8,
        borderWidth: 0.5,
        borderColor: 'rgba(0, 0, 0, 0.05)',
    },
    codeFieldContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        marginTop: 1,
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        marginBottom: 30,
    },
    gradient: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 160,
        paddingBottom: 80,
        paddingHorizontal: 20,
    },
    title: {
        textAlign: 'center',
        marginTop: 40,
        marginBottom: 60,
    },
    line: {
        flexDirection: 'row',
        padding: 10,
        paddingVertical: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
        width: '100%',
    },
    sendCodeButton: {},
    formContainer: {
        marginBottom: 0,
    },
    emailInput: {
        flex: 1, // Allows TextInput to take available space
        marginRight: 20,
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
    codeFieldRoot: { marginTop: 10, alignSelf: 'flex-start', marginLeft: 10 },
    cell: {
        width: 35,
        height: 35,
        lineHeight: 35,
        fontSize: 22,
        borderWidth: 1.5,
        borderColor: '#8799BC',
        textAlign: 'center',
        color: '#6577EC',
        marginHorizontal: 6,
        borderRadius: 10,
    },
    confirmedText: {
        color: '#D1C9EF',
        fontSize: 13,
        marginLeft: 20, // Adjusted margin for better alignment with CodeField
        marginBottom: 0, // Aligned with CodeField base
        alignSelf: 'center', // Vertically center with cells
    },
    focusCell: {
        borderColor: '#6577EC',
    },
    messageText: {
        fontSize: 12,
        marginTop: 5,
        marginLeft: 10,
        color: '#D1C9EF', // Default message color
    },
    successMessage: {
        color: 'green',
    },
    errorMessage: {
        color: 'red',
    },
});
