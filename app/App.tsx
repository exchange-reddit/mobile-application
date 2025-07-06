// App.tsx
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import RootNavigator from './navigators/RootNavigator';

export default function App() {
    return (
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
    );
}
