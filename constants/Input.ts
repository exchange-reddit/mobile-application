import { StyleSheet } from 'react-native';

const INPUTS = StyleSheet.create({
    oneLineInput: {
        // 인풋이 한줄 전체를 전부 차지할때 사용
        fontSize: 16, // 폰트 크기는 인풋을 따라가야 함
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        paddingHorizontal: 20,
        paddingVertical: 18,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    lineWithButtonInput: {
        // 인풋이 버튼과 같은 줄에 있을때 사용
        fontSize: 13, // 폰트 크기는 인풋을 따라가야 함
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        paddingHorizontal: 20,
        paddingVertical: 18,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        width: '70%',
    },
});

export default INPUTS;
