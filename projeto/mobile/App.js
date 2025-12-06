import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import InstituicoesScreen from './src/components/Instituicoes/InstituicoesScreen';
import AulasScreen from './src/screens/AulasScreen';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: true,
          }}
        >
          <Tab.Screen 
            name="Instituicoes" 
            component={InstituicoesScreen}
            options={{
              title: 'Instituições',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="domain" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen 
            name="Aulas" 
            component={AulasScreen}
            options={{
              title: 'Horários',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="calendar-clock" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </PaperProvider>
  );
}
