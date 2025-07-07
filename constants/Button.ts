import { StyleSheet } from 'react-native';

const BUTTONS = StyleSheet.create({
    bigButton: {
        // 버튼이 한줄을 전부 차지할때 사용
        backgroundColor: 'rgba(210, 173, 237, 0.39)',
        borderRadius: 12,
        paddingVertical: 18,
        paddingHorizontal: 60,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    smallButton: {
        // 버튼이 인풋과 같은 줄에 있을때 사용
        backgroundColor: 'rgba(210, 173, 237, 0.39)',
        borderRadius: 12,
        paddingVertical: 20,
        paddingHorizontal: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
});

export default BUTTONS;
