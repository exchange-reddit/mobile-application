import FONTS from '@/constants/Font';
import INPUTS from '@/constants/Input';
import React, { useEffect, useState } from 'react';
import {
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
import VIEWS from '@/constants/View';
import { Picker } from '@react-native-picker/picker';

export default function RegistrationScreen() {
    // input data
    const [username, setUsername] = useState('');
    const [usernameMessage, setUsernameMessage] = useState(''); // Message for username
    const [isDuplicateCheckInProgress, setIsDuplicateCheckInProgress] =
        useState(false);
    const [lastname, setLastname] = useState('');
    const [lastnameMessage, setLastnameMessage] = useState(''); // Message for lastname
    const [firstname, setFirstname] = useState('');
    const [firstnameMessage, setFirstnameMessage] = useState(''); // Message for firstname
    const [selectedLanguageValue, setSelectedLanguageValue] = useState('');
    const [languageMessage, setLanguageMessage] = useState(''); // Message for language
    const [selectedGenderValue, setSelectedGenderValue] = useState('');
    const [genderMessage, setGenderMessage] = useState(''); // Message for gender
    const [isContinueButtonDisabled, setIsContinueButtonDisabled] =
        useState(true);

    // modal state
    const [genderModalVisible, setGenderModalVisible] = useState(false);
    const [languageModalVisible, setLanguageModalVisible] = useState(false);

    // Handles username input and checks for duplication asynchronously
    const handleUsernameChange = async (newUsername) => {
        setUsername(newUsername);
        if (newUsername.trim() === '') {
            setUsernameMessage('Username is required.');
            setIsDuplicateCheckInProgress(false); // Ensure loading is off if input is empty
            return;
        }

        setUsernameMessage(''); // Clear previous message
        setIsDuplicateCheckInProgress(true); // Set loading state to true

        try {
            // Simulate an API call to check for username duplication
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
            setIsDuplicateCheckInProgress(false); // Always set loading state to false after check
        }
    };

    // Simulates an asynchronous API call to check for username duplication
    const checkUsernameDuplicate = (usernameToCheck) => {
        return new Promise((resolve) => {
            setIsDuplicateCheckInProgress(true);
            setTimeout(() => {
                // 'existingUser' is a simulated duplicate username
                if (usernameToCheck === 'existingUser') {
                    console.log('Username already taken.');
                    setIsDuplicateCheckInProgress(false);
                    resolve(true); // Resolve with true if duplicate
                } else {
                    console.log('Username is available.');
                    setIsDuplicateCheckInProgress(false);
                    resolve(false); // Resolve with false if available
                }
            }, 1500); // Reduced delay for quicker testing
        });
    };

    // Shows the language picker modal
    const showLanguagePicker = () => {
        setLanguageModalVisible(true);
        // Set a default value if nothing is selected when opening the picker
        if (selectedLanguageValue === '') {
            setSelectedLanguageValue('Korean');
        }
    };

    // Hides the language picker modal
    const hideLanguagePicker = () => {
        setLanguageModalVisible(false);
    };

    // Handles language selection from the picker
    const handleLanguageChange = (itemValue) => {
        setSelectedLanguageValue(itemValue);
        // Clear or set message based on selection
        if (itemValue.trim() !== '') {
            setLanguageMessage('');
        } else {
            setLanguageMessage('Please select a language.');
        }
    };

    // Shows the gender picker modal
    const showGenderPicker = () => {
        setGenderModalVisible(true);
        // Set a default value if nothing is selected when opening the picker
        if (selectedGenderValue === '') {
            setSelectedGenderValue('Male');
        }
    };

    // Hides the gender picker modal
    const hideGenderPicker = () => {
        setGenderModalVisible(false);
    };

    // Handles gender selection from the picker
    const handleGenderChange = (itemValue) => {
        setSelectedGenderValue(itemValue);
        // Clear or set message based on selection
        if (itemValue.trim() !== '') {
            setGenderMessage('');
        } else {
            setGenderMessage('Please select a gender.');
        }
    };

    // Handles the continue button press
    const handleContinuePress = () => {
        console.log('Continue pressed');
        // You can add navigation or further logic here
    };

    // Effect to validate inputs and enable/disable the continue button
    useEffect(() => {
        // Validate lastname and set message
        if (lastname.trim() === '') {
            setLastnameMessage('Last Name is required.');
        } else {
            setLastnameMessage('');
        }

        // Validate firstname and set message
        if (firstname.trim() === '') {
            setFirstnameMessage('First Name is required.');
        } else {
            setFirstnameMessage('');
        }

        // Validate language selection and set message
        if (selectedLanguageValue.trim() === '') {
            setLanguageMessage('Preferred Language is required.');
        } else {
            setLanguageMessage('');
        }

        // Validate gender selection and set message
        if (selectedGenderValue.trim() === '') {
            setGenderMessage('Gender is required.');
        } else {
            setGenderMessage('');
        }

        // Check if all fields have non-empty values and no error messages
        const allFieldsFilled =
            username.trim() !== '' &&
            lastname.trim() !== '' &&
            firstname.trim() !== '' &&
            selectedLanguageValue.trim() !== '' &&
            selectedGenderValue.trim() !== '';

        const noErrorMessages =
            usernameMessage.includes('available') || // Username available is a positive message
            (usernameMessage === '' &&
                username.trim() !== '' && // No message and filled
                lastnameMessage === '' &&
                firstnameMessage === '' &&
                languageMessage === '' &&
                genderMessage === '');

        // Enable button only if all fields are filled AND there are no error messages
        setIsContinueButtonDisabled(!(allFieldsFilled && noErrorMessages));
    }, [
        username,
        lastname,
        firstname,
        selectedLanguageValue,
        selectedGenderValue,
        usernameMessage, // Include usernameMessage in dependencies to react to its changes
        lastnameMessage,
        firstnameMessage,
        languageMessage,
        genderMessage,
    ]); // Re-run this effect whenever these state variables change

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.content}>
                <Text style={[FONTS.titleFont, styles.title]}>
                    Hello new user! 👋
                </Text>
                <Text style={[FONTS.subTitleFont, styles.title]}>
                    Would you like to tell me about yourself?
                </Text>

                {/* Username Input */}
                {isDuplicateCheckInProgress ? (
                    <Text style={[styles.messageText]}>
                        Checking username availability...
                    </Text>
                ) : (
                    usernameMessage !== '' && (
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
                    )
                )}
                <TextInput
                    style={[FONTS.inputFont, INPUTS.oneLineInput]}
                    placeholder="User Name"
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    value={username}
                    onChangeText={handleUsernameChange}
                />

                <View style={VIEWS.oneLineView}>
                    {/* Last Name Input */}
                    {lastnameMessage !== '' && (
                        <Text style={[styles.messageText, styles.errorMessage]}>
                            {lastnameMessage}
                        </Text>
                    )}
                    <TextInput
                        style={[FONTS.inputFont, INPUTS.basicInput]}
                        placeholder="Last Name"
                        placeholderTextColor="rgba(255, 255, 255, 0.7)"
                        value={lastname}
                        onChangeText={setLastname} // Message update handled in useEffect
                    />

                    {/* First Name Input */}
                    {firstnameMessage !== '' && (
                        <Text style={[styles.messageText, styles.errorMessage]}>
                            {firstnameMessage}
                        </Text>
                    )}
                    <TextInput
                        style={[FONTS.inputFont, INPUTS.basicInput]}
                        placeholder="First Name"
                        placeholderTextColor="rgba(255, 255, 255, 0.7)"
                        value={firstname}
                        onChangeText={setFirstname} // Message update handled in useEffect
                    />
                </View>

                <View style={VIEWS.oneLineView}>
                    {/* Preferred Language Picker */}
                    <View id="languagePicker">
                        {languageMessage !== '' && (
                            <Text
                                style={[
                                    styles.messageText,
                                    styles.errorMessage,
                                ]}
                            >
                                {languageMessage}
                            </Text>
                        )}
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
                                            Platform.OS === 'ios'
                                                ? styles.pickerItem
                                                : null
                                        }
                                    >
                                        <Picker.Item
                                            label="Korean"
                                            value="Korean"
                                        />
                                        <Picker.Item
                                            label="Swedish"
                                            value="Swedish"
                                        />
                                        <Picker.Item
                                            label="English"
                                            value="English"
                                        />
                                    </Picker>
                                </Pressable>
                            </Pressable>
                        </Modal>
                    </View>

                    {/* Gender Picker */}
                    <View id="genderPicker">
                        {genderMessage !== '' && (
                            <Text
                                style={[
                                    styles.messageText,
                                    styles.errorMessage,
                                ]}
                            >
                                {genderMessage}
                            </Text>
                        )}
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
                                            Platform.OS === 'ios'
                                                ? styles.pickerItem
                                                : null
                                        }
                                    >
                                        <Picker.Item
                                            label="Male"
                                            value="Male"
                                        />
                                        <Picker.Item
                                            label="Female"
                                            value="Female"
                                        />
                                        <Picker.Item
                                            label="Non-binary"
                                            value="Non-binary"
                                        />
                                    </Picker>
                                </Pressable>
                            </Pressable>
                        </Modal>
                    </View>
                </View>

                <Pressable
                    style={[
                        isContinueButtonDisabled
                            ? BUTTONS.bigButtonDisabled
                            : BUTTONS.bigButton,
                    ]}
                    disabled={isContinueButtonDisabled}
                    onPress={handleContinuePress}
                >
                    <Text style={FONTS.bigButtonFont}>CONTINUE</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        marginBottom: 30,
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
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
    emailInput: {
        marginRight: 20,
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
        padding: 35,
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
    messageText: {
        fontSize: 12,
        marginBottom: 4,
        alignSelf: 'flex-start',
        marginLeft: 8, // Align with input padding
    },
    errorMessage: {
        color: '#FF6347', // Tomato red for errors
    },
    successMessage: {
        color: '#32CD32', // Lime green for success
    },
});
