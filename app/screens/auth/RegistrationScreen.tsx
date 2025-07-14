import FONTS from '@/constants/Font';
import INPUTS from '@/constants/Input';
import React, { useEffect, useState } from 'react'; // useRef, useEffect 추가
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
    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
    const [selectedLanguageValue, setSelectedLanguageValue] = useState('');
    const [selectedGenderValue, setSelectedGenderValue] = useState('');
    const [isContinueButtonDisabled, setIsContinueButtonDisabled] =
        useState(true);

    // modal state
    const [genderModalVisible, setGenderModalVisible] = useState(false);
    const [languageModalVisible, setLanguageModalVisible] = useState(false);

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
    };

    const handleContinuePress = () => {
        console.log('Continue pressed');
    };

    useEffect(() => {
        // Check if all fields have non-empty values
        const allFieldsFilled =
            firstname.trim() !== '' &&
            lastname.trim() !== '' &&
            selectedLanguageValue.trim() !== '' &&
            selectedGenderValue.trim() !== '';

        // Update the button's disabled state
        setIsContinueButtonDisabled(!allFieldsFilled);
    }, [firstname, lastname, selectedLanguageValue, selectedGenderValue]); // Re-run this effect whenever these state variables change

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
                <TextInput
                    style={[FONTS.inputFont, INPUTS.oneLineInput]}
                    placeholder="User Name"
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    value={username}
                    onChangeText={setUsername}
                />
                <View style={VIEWS.oneLineView}>
                    <TextInput
                        style={[FONTS.inputFont, INPUTS.basicInput]}
                        placeholder="Last Name"
                        placeholderTextColor="rgba(255, 255, 255, 0.7)"
                        value={lastname}
                        onChangeText={setLastname}
                    />
                    <TextInput
                        style={[FONTS.inputFont, INPUTS.basicInput]}
                        placeholder="First Name"
                        placeholderTextColor="rgba(255, 255, 255, 0.7)"
                        value={firstname}
                        onChangeText={setFirstname}
                    />
                </View>
                <View style={VIEWS.oneLineView}>
                    <View id="languagePicker">
                        <Pressable
                            style={[BUTTONS.smallModalButton]}
                            onPress={showLanguagePicker}
                        >
                            <Text style={[FONTS.inputFont]}>
                                {selectedLanguageValue != ''
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
                                        } // Custom styling for iOS picker items
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
                    <View id="genderPicker">
                        <Pressable
                            style={[BUTTONS.smallModalButton]}
                            onPress={showGenderPicker}
                        >
                            <Text style={FONTS.inputFont}>
                                {selectedGenderValue != ''
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
                                        } // Custom styling for iOS picker items
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
        marginBottom: 30, // This margin might be intended to push content up from the bottom
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
});
