import React, {useState} from 'react';
import Home from './src/screens/Home';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import AutoVideo from './src/screens/AutoVideo';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerNavigator from './src/utils/navigations/CustomDrawerNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Profile from './src/screens/Profile';
import Wallet from './src/screens/Wallet';
import Settings from './src/screens/Settings';
import SaveSelectedImage from './src/screens/SaveSelectedImage';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import {AuthContext} from './src/components/context';

const Drawer = createDrawerNavigator();

const App = () => {
  const [isDarkTheme, setDarkTheme] = useState(false);

  const authContext = React.useMemo(
    () => ({
      toggleTheme: () => {
        setDarkTheme((isDarkTheme) => !isDarkTheme);
      },
    }),
    [],
  );

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333',
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff',
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={(props) => <CustomDrawerNavigator {...props} />}>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="AutoVideo" component={AutoVideo} />
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="Wallet" component={Wallet} />
            <Drawer.Screen name="Settings" component={Settings} />
            <Drawer.Screen
              name="SaveSelectedImage"
              component={SaveSelectedImage}
            />
          </Drawer.Navigator>
          {/* <CustomDrawerNavigator /> */}
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
};

export default App;
