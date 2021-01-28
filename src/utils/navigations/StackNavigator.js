import React from 'react';
import Home from './src/screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AutoVideo from './src/screens/AutoVideo';

const Stack = createStackNavigator();
export default class StackNavigator extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: 'HomeScreen',
            headerTitleAlign: 'center',
            headerStyle: {backgroundColor: 'orange'},
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="AutoVideo"
          component={AutoVideo}
          options={{
            headerTitle: 'AutoVideoScreen',
            headerTitleAlign: 'center',
            headerStyle: {backgroundColor: 'orange'},
            headerTintColor: 'white',
          }}
        />
      </Stack.Navigator>
    );
  }
}
