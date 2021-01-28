import React, {Component} from 'react';
import {Text, View, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '@react-navigation/native';

const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100;

const Profile = ({navigation}) => {
  const {colors} = useTheme();

  return (
    <View>
      <Icon
        name="menu"
        style={[
          {
            fontSize: 9 * vw,
            marginVertical: 1.8 * vh,
            paddingLeft: 5 * vw,
            color: colors.text,
          },
        ]}
        onPress={() => navigation.openDrawer('CustomNavigator')}
      />
      <Text style={{color: colors.text}}> This is Profile Page </Text>
    </View>
  );
};
export default Profile;
