import React, {Component} from 'react';
import {Text, View, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100;

export default class Wallet extends Component {
  render() {
    return (
      <View>
        <Icon
          name="menu"
          style={[
            {fontSize: 9 * vw, marginVertical: 1.8 * vh, paddingLeft: 5 * vw},
          ]}
          onPress={() => this.props.navigation.openDrawer('CustomNavigator')}
        />
        <Text> This is Wallet Page </Text>
      </View>
    );
  }
}
