import FONTS from '@/constants/Font';
import INPUTS from '@/constants/Input';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    Modal,
    Platform,
    Pressable,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import BUTTONS from '@/constants/Button';
import { Picker } from '@react-native-picker/picker';

const { height, width } = Dimensions.get('window');
const marginHeight = height * 0.1;

export default function RegistrationScreen() {
    // input data
    const [username, setUsername] = useState('');
    const [usernameMessage, setUsernameMessage] = useState('');
    const [isDuplicateCheckInProgress, setIsDuplicateCheckInProgress] =
        useState(false);
    const [lastname, setLastname] = useState('');
    const [lastnameMessage, setLastnameMessage] = useState('');
    const [firstname, setFirstname] = useState('');
    const [firstnameMessage, setFirstnameMessage] = useState('');
    const [selectedLanguageValue, setSelectedLanguageValue] = useState('');
    const [languageMessage, setLanguageMessage] = useState('');
    const [selectedGenderValue, setSelectedGenderValue] = useState('');
    const [genderMessage, setGenderMessage] = useState('');
    const [isContinueButtonDisabled, setIsContinueButtonDisabled] =
        useState(true);

    // modal state
    const [genderModalVisible, setGenderModalVisible] = useState(false);
    const [languageModalVisible, setLanguageModalVisible] = useState(false);

    const handleUsernameChange = async (newUsername) => {
        setUsername(newUsername);
        if (newUsername.trim() === '') {
            setUsernameMessage('Username is required.');
            setIsDuplicateCheckInProgress(false);
            return;
        }

        setUsernameMessage('');
        setIsDuplicateCheckInProgress(true);

        try {
            const isDuplicate = await checkUsernameDuplicate(newUsername);
            if (isDuplicate) {
                setUsernameMessage(
                    'Username already taken, please choose another.',
                );
            } else {
                setUsernameMessage('Username available!');
            }
        } catch (error) {
            console.error('Error checking username:', error);
            setUsernameMessage('Error checking username. Please try again.');
        } finally {
            setIsDuplicateCheckInProgress(false);
        }
    };

    const checkUsernameDuplicate = (usernameToCheck) => {
        return new Promise((resolve) => {
            setIsDuplicateCheckInProgress(true);
            setTimeout(() => {
                if (usernameToCheck === 'existingUser') {
                    console.log('Username already taken.');
                    resolve(true);
                } else {
                    console.log('Username is available.');
                    resolve(false);
                }
                setIsDuplicateCheckInProgress(false);
            }, 1500);
        });
    };

    const showLanguagePicker = () => {
        setLanguageModalVisible(true);
        if (selectedLanguageValue === '') {
            setSelectedLanguageValue('Korean');
        }
    };

    const hideLanguagePicker = () => {
        setLanguageModalVisible(false);
    };

    const handleLanguageChange = (itemValue) => {
        setSelectedLanguageValue(itemValue);
        if (itemValue.trim() !== '') {
            setLanguageMessage('');
        } else {
            setLanguageMessage('Please select a language.');
        }
    };

    const showGenderPicker = () => {
        setGenderModalVisible(true);
        if (selectedGenderValue === '') {
            setSelectedGenderValue('Male');
        }
    };

    const hideGenderPicker = () => {
        setGenderModalVisible(false);
    };

    const handleGenderChange = (itemValue) => {
        setSelectedGenderValue(itemValue);
        if (itemValue.trim() !== '') {
            setGenderMessage('');
        } else {
            setGenderMessage('Please select a gender.');
        }
    };

    const handleContinuePress = () => {
        console.log('Continue pressed');
    };

    useEffect(() => {
        if (lastname.trim() === '') {
            setLastnameMessage('Required');
        } else {
            setLastnameMessage('');
        }

        if (firstname.trim() === '') {
            setFirstnameMessage('Required');
        } else {
            setFirstnameMessage('');
        }

        if (selectedLanguageValue.trim() === '') {
            setLanguageMessage('Required');
        } else {
            setLanguageMessage('');
        }

        if (selectedGenderValue.trim() === '') {
            setGenderMessage('Required');
        } else {
            setGenderMessage('');
        }

        const allFieldsFilled =
            username.trim() !== '' &&
            lastname.trim() !== '' &&
            firstname.trim() !== '' &&
            selectedLanguageValue.trim() !== '' &&
            selectedGenderValue.trim() !== '';

        const noErrorMessages =
            usernameMessage.includes('available') ||
            (usernameMessage === '' &&
                username.trim() !== '' &&
                lastnameMessage === '' &&
                firstnameMessage === '' &&
                languageMessage === '' &&
                genderMessage === '');

        setIsContinueButtonDisabled(!(allFieldsFilled && noErrorMessages));
    }, [
        username,
        lastname,
        firstname,
        selectedLanguageValue,
        selectedGenderValue,
        usernameMessage,
        lastnameMessage,
        firstnameMessage,
        languageMessage,
        genderMessage,
    ]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.content}>
                <View style={styles.headerContainer}>
                    <Text style={[FONTS.titleFont, styles.title]}>
                        Hello new user! 👋
                    </Text>
                    <Text style={[FONTS.subTitleFont, styles.subTitle]}>
                        Would you like to tell me about yourself?
                    </Text>
                </View>
                <View style={styles.formContainer}>
                    <View id="user-name">
                        {isDuplicateCheckInProgress ? (
                            <Text style={[styles.messageText]}>
                                Checking username availability...
                            </Text>
                        ) : (
                            <Text
                                style={[
                                    styles.messageText,
                                    usernameMessage.includes('taken') ||
                                    usernameMessage.includes('required') ||
                                    usernameMessage.includes('Error')
                                        ? styles.errorMessage
                                        : styles.successMessage,
                                ]}
                            >
                                {usernameMessage}
                            </Text>
                        )}
                        <TextInput
                            style={[FONTS.inputFont, INPUTS.oneLineInput]}
                            placeholder="User Name"
                            placeholderTextColor="rgba(255, 255, 255, 0.7)"
                            value={username}
                            onChangeText={handleUsernameChange}
                        />
                    </View>

                    <View id="real-name" style={styles.inputContainer}>
                        <View style={styles.lastNameContainer}>
                            {lastnameMessage !== '' ? (
                                <Text
                                    style={[
                                        styles.messageText,
                                        styles.errorMessage,
                                    ]}
                                >
                                    {lastnameMessage}
                                </Text>
                            ) : (
                                <Text
                                    style={[
                                        styles.messageText,
                                        styles.errorMessage,
                                    ]}
                                ></Text>
                            )}
                            <TextInput
                                style={[FONTS.inputFont, INPUTS.basicInput]}
                                placeholder="Last Name"
                                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                                value={lastname}
                                onChangeText={setLastname}
                            />
                        </View>

                        <View style={styles.firstNameContainer}>
                            {firstnameMessage !== '' ? (
                                <Text
                                    style={[
                                        styles.messageText,
                                        styles.errorMessage,
                                    ]}
                                >
                                    {firstnameMessage}
                                </Text>
                            ) : (
                                <Text
                                    style={[
                                        styles.messageText,
                                        styles.errorMessage,
                                    ]}
                                >
                                    {lastnameMessage}
                                </Text>
                            )}
                            <TextInput
                                style={[
                                    FONTS.inputFont,
                                    INPUTS.basicInput,
                                    styles.firstNameInput,
                                ]}
                                placeholder="First Name"
                                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                                value={firstname}
                                onChangeText={setFirstname}
                            />
                        </View>
                    </View>

                    <View id="pickers" style={styles.inputContainer}>
                        <View style={styles.languageContainer}>
                            <View>
                                {languageMessage !== '' ? (
                                    <Text
                                        style={[
                                            styles.messageText,
                                            styles.errorMessage,
                                        ]}
                                    >
                                        {languageMessage}
                                    </Text>
                                ) : (
                                    <Text
                                        style={[
                                            styles.messageText,
                                            styles.errorMessage,
                                        ]}
                                    >
                                        {lastnameMessage}
                                    </Text>
                                )}
                            </View>
                            <View>
                                <Pressable
                                    style={[BUTTONS.smallModalButton]}
                                    onPress={showLanguagePicker}
                                >
                                    <Text style={[FONTS.inputFont]}>
                                        {selectedLanguageValue !== ''
                                            ? selectedLanguageValue
                                            : 'Preferred Language'}
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                        <View style={styles.genderContainer}>
                            <View>
                                {genderMessage !== '' ? (
                                    <Text
                                        style={[
                                            styles.messageText,
                                            styles.errorMessage,
                                        ]}
                                    >
                                        {genderMessage}
                                    </Text>
                                ) : (
                                    <Text
                                        style={[
                                            styles.messageText,
                                            styles.errorMessage,
                                        ]}
                                    >
                                        {lastnameMessage}
                                    </Text>
                                )}
                            </View>

                            <View>
                                <Pressable
                                    style={[BUTTONS.smallModalButton]}
                                    onPress={showGenderPicker}
                                >
                                    <Text style={FONTS.inputFont}>
                                        {selectedGenderValue !== ''
                                            ? selectedGenderValue
                                            : 'Gender'}
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.continueContainer}>
                    <Pressable
                        style={[
                            isContinueButtonDisabled
                                ? BUTTONS.bigButtonDisabled
                                : BUTTONS.bigButton,
                            styles.continueButton,
                        ]}
                        disabled={isContinueButtonDisabled}
                        onPress={handleContinuePress}
                    >
                        <Text style={FONTS.bigButtonFont}>CONTINUE</Text>
                    </Pressable>
                </View>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={languageModalVisible}
                onRequestClose={hideLanguagePicker}
            >
                <Pressable
                    style={styles.centeredView}
                    onPress={hideLanguagePicker}
                >
                    <Pressable
                        style={styles.modalView}
                        onPress={(e) => e.stopPropagation()}
                    >
                        <Picker
                            selectedValue={selectedLanguageValue}
                            onValueChange={handleLanguageChange}
                            style={styles.picker}
                            itemStyle={
                                Platform.OS === 'ios' ? styles.pickerItem : {}
                            }
                        >
                            <Picker.Item label="Korean" value="Korean" />
                            <Picker.Item label="Swedish" value="Swedish" />
                            <Picker.Item label="English" value="English" />
                        </Picker>
                    </Pressable>
                </Pressable>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={genderModalVisible}
                onRequestClose={hideGenderPicker}
            >
                <Pressable
                    style={styles.centeredView}
                    onPress={hideGenderPicker}
                >
                    <Pressable
                        style={styles.modalView}
                        onPress={(e) => e.stopPropagation()}
                    >
                        <Picker
                            selectedValue={selectedGenderValue}
                            onValueChange={handleGenderChange}
                            style={styles.picker}
                            itemStyle={
                                Platform.OS === 'ios' ? styles.pickerItem : {}
                            }
                        >
                            <Picker.Item label="Male" value="Male" />
                            <Picker.Item label="Female" value="Female" />
                            <Picker.Item
                                label="Non-binary"
                                value="Non-binary"
                            />
                        </Picker>
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    content: {
        flex: 1,
        paddingTop: height * 0.15,
        paddingBottom: height * 0.1,
        paddingHorizontal: 20,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: height * 0.05,
    },
    title: {
        textAlign: 'center',
        marginBottom: 10,
    },
    subTitle: {
        textAlign: 'center',
    },
    formContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        gap: height * 0.03,
    },
    inputContainer: {
        marginBottom: height * 0.02,
        flexDirection: 'row',
    },
    inlineMessageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    messageText: {
        fontSize: 12,
        alignSelf: 'flex-start',
        marginLeft: 8,
        marginBottom: 5,
    },
    errorMessage: {
        color: '#FF6347',
    },
    successMessage: {
        color: '#32CD32',
    },
    lastNameInput: {
        flex: 1,
        marginRight: 10,
    },
    firstNameInput: {
        flex: 2,
    },
    lastNameContainer: {
        flex: 1,
        flexDirection: 'column',
        marginRight: 10,
    },
    firstNameContainer: {
        flex: 2,
        flexDirection: 'column',
    },
    languageContainer: {
        flex: 1,
        flexDirection: 'column',
        marginRight: 10,
    },
    genderContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    leftMessage: {
        flex: 1,
        alignItems: 'flex-start',
    },
    rightMessage: {
        flex: 1,
        alignItems: 'flex-start',
    },
    pickerWrapper: {
        flex: 1,
    },
    continueContainer: {
        justifyContent: 'flex-end',
        flex: 1,
    },
    continueButton: {
        marginTop: marginHeight,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
    },
    picker: {
        width: '100%',
        height: 150,
    },
    pickerItem: {
        fontSize: 16,
    },
});
