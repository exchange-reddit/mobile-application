import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';

export type RootStackParamList = {
    Auth: undefined;
    Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Auth" component={AuthStack} />
            {/* <Stack.Screen name="Main" component={MainStack} /> */}
        </Stack.Navigator>
    );
}
