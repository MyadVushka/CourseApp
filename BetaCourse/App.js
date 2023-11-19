import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/HomeScreen';
import AddTransaction from './screens/AddTransaction';
import Transactions from './screens/Transactions';

const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{headerShown: false}} />
        <Tab.Screen name="Add Transactions" component={AddTransaction} options={{headerTransparent: true, headerTitleAlign: 'center'}} />
        <Tab.Screen name="Transactions" component={Transactions} options={{headerTransparent: true, headerTitleAlign: 'center'}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

