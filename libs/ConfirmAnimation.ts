import { useRef, useState } from 'react';
import {
    Animated,
    StyleSheet
} from 'react-native';

export default function ConfirmAnimation() {
const [isConfirmed, setIsConfirmed] = useState(false);
const confirmOpacity = useRef(new Animated.Value(1)).current;
const confirmTranslateY = useRef(new Animated.Value(0)).current;
const passwordTranslateY = useRef(new Animated.Value(50)).current;
const passwordOpacity = useRef(new Animated.Value(0)).current;

const handleConfirm = () => {
    setIsConfirmed(true);

    Animated.parallel([
    Animated.timing(confirmOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
    }),
    Animated.timing(confirmTranslateY, {
        toValue: -50,
        duration: 500,
        useNativeDriver: true,
    }),
    ]).start(() => {
    Animated.parallel([
        Animated.timing(passwordTranslateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
        }),
        Animated.timing(passwordOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
        }),
    ]).start();
    });
};


const styles = StyleSheet.create({
container: {
    flex: 1,
    paddingTop: 120,
    alignItems: 'center',
    backgroundColor: '#fff',
},
confirmText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
},
input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: 250,
    borderRadius: 6,
},
button: {
    backgroundColor: '#4682B4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
},
buttonText: {
    color: '#fff',
    fontSize: 16,
},
});
}