import { RootStackParamList } from '@/app/navigators/RootNavigator';
import BUTTONS from '@/constants/Button';
import FONTS from '@/constants/Font';
import { removeTokens } from '@/utils/secureStorage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react'; // useRef, useEffect 추가
import {
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function HomeScreen() {
    type Nav = NativeStackNavigationProp<RootStackParamList>;

    const navigation = useNavigation<Nav>();

    const handleLogout = async () => {
        await removeTokens();
        navigation.navigate('Auth', { screen: 'Login' });
        console.log('User logged out successfully');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Main content */}
            <View style={styles.content}>
                <Text style={[FONTS.omniversityFont, styles.title]}>
                    Home Screen
                </Text>

                <TouchableOpacity
                    style={[BUTTONS.bigButton, styles.logoutButton]}
                    onPress={handleLogout}
                >
                    <Text style={[FONTS.bigButtonFont]}>Log Out</Text>
                </TouchableOpacity>
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
    logoutButton: {
        marginBottom: 24,
    },
});
