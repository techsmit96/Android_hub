import React from 'react';
import Home from './src/screens/Home';
import AutoVideo from './src/screens/AutoVideo';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerNavigator from './CustomDrawerNavigator';

const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends Component {
  render() {
    return (
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawerNavigator {...props} />}>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="AutoVideo" component={AutoVideo} />
      </Drawer.Navigator>
    );
  }
}
