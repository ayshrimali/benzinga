import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from './routes';

import ChartScreen from '../screen/chart';

interface RoutesProps { }
export type RootStackParamList = {
    [ROUTES.Chart]: undefined;

};

const Stack = createStackNavigator<RootStackParamList>();

const AppContainer: React.FC<RoutesProps> = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="none" initialRouteName={ROUTES.Chart}>
                <Stack.Screen name={ROUTES.Chart} component={ChartScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppContainer;
