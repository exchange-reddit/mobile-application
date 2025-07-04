import { StyleSheet } from 'react-native';

const BUTTONS = StyleSheet.create({
    bigButton: {
        borderRadius: 12,
        paddingVertical: 18,
        paddingHorizontal: 60,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    }
});

export default BUTTONS;