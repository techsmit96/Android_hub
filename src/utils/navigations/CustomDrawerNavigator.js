import React from 'react';
import {Dimensions, Image, View, StyleSheet} from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Text,
  Caption,
  Paragraph,
  Drawer,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

import IconFound from 'react-native-vector-icons/Foundation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIonics from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../../components/context';

const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100;

const CustomDrawerNavigator = (props) => {
  const paperTheme = useTheme();
  const {toggleTheme} = React.useContext(AuthContext);

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image
                source={require('../../assets/images/my-photo.jpg')}
              />
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={styles.title}>Sumit Sakpal</Title>
                <Caption style={styles.caption}>www.onesprix.com</Caption>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  200
                </Paragraph>
                <Caption style={styles.caption}>Following</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  1K
                </Paragraph>
                <Caption style={styles.caption}>Followers</Caption>
              </View>
            </View>
          </View>
          {/* Drawer section */}
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={() => (
                <Icon
                  name="home-outline"
                  style={{fontSize: 2.8 * vh, color: 'lightgrey'}}
                />
              )}
              label="Home"
              onPress={() => props.navigation.navigate('Home')}
            />
            <DrawerItem
              icon={() => (
                <IconFound
                  name="play-video"
                  style={{fontSize: 2.8 * vh, color: 'lightgrey'}}
                />
              )}
              label="AutoVideo"
              onPress={() => props.navigation.navigate('AutoVideo')}
            />
            <DrawerItem
              icon={() => (
                <Icon
                  name="account-outline"
                  style={{fontSize: 2.8 * vh, color: 'lightgrey'}}
                />
              )}
              label="Profile"
              onPress={() => props.navigation.navigate('Profile')}
            />
            <DrawerItem
              icon={() => (
                <Icon
                  name="wallet-outline"
                  style={{fontSize: 2.8 * vh, color: 'lightgrey'}}
                />
              )}
              label="Wallet"
              onPress={() => props.navigation.navigate('Wallet')}
            />

            <DrawerItem
              icon={() => (
                <IconIonics
                  name="settings-outline"
                  style={{fontSize: 2.8 * vh, color: 'lightgrey'}}
                />
              )}
              label="Settings"
              onPress={() => props.navigation.navigate('Settings')}
            />
            <DrawerItem
              icon={() => (
                <IconIonics
                  name="images-outline"
                  style={{fontSize: 2.8 * vh, color: 'lightgrey'}}
                />
              )}
              label="Save Image"
              onPress={() => props.navigation.navigate('SaveSelectedImage')}
            />
          </Drawer.Section>
          <Drawer.Section title="Choose Preferences">
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}>
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={paperTheme.dark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={() => (
            <Icon
              name="exit-to-app"
              style={{fontSize: 2.8 * vh, color: 'grey'}}
            />
          )}
          label="Sign Out"
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
};

export default CustomDrawerNavigator;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 3 * vh,
  },
  title: {
    fontSize: 2 * vh,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 2 * vh,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 1 * vh,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 1.5 * vh,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 1 * vw,
  },
  drawerSection: {
    marginTop: 1.5 * vh,
  },
  bottomeDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
