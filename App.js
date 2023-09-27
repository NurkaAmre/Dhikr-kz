import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import Main from './screens/Main';
import Category from './screens/Category'
import AllahsNames from './screens/AllahsNames';
import DailyDhikr from './screens/DailyDhikr'
import AddDhikr from './screens/AddDhikr';
import MyDailyDhikr from './screens/MyDailyDhikr'
import CounterPage from './screens/CounterPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main" headerMode="none">
        <Stack.Screen name=" " component={Main} />
        <Stack.Screen name="Category" component={Category} />
        <Stack.Screen name="AllahsNames" component={AllahsNames} />
        <Stack.Screen name="DailyDhikr" component={DailyDhikr} />
        <Stack.Screen name="AddDhikr" component={AddDhikr} />
        <Stack.Screen name="MyDailyDhikr" component={MyDailyDhikr} />
        <Stack.Screen name="CounterPage" component={CounterPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
