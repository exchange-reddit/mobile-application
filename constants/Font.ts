import { StyleSheet } from 'react-native';

const FONTS = StyleSheet.create({
    titleFont: {
        fontFamily: 'Inter-Bold',
        fontSize: 40,
        fontWeight: '100',
        letterSpacing: -1,
        color: 'white',
    }, 
    inputFont: {
        fontSize: 16,
        color: 'white',
    }, 
    buttonFont: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 1,
        fontFamily: 'Inter-SemiBold'
    }
});

export default FONTS;