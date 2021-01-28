import React, {Component} from 'react';
import {
  Animated,
  SafeAreaView,
  Text,
  PanResponder,
  Button,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100;

export default class Home extends Component {
  textPosition = {x: 0, y: 0};

  constructor(props) {
    super(props);
    this.position.addListener((latestPosition) => {
      this.textPosition = latestPosition;
    });
  }

  position = new Animated.ValueXY();
  PanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      const newPosition = {x: gestureState.dx, y: gestureState.dy};
      this.position.setValue(newPosition);
    },
    onPanResponderGrant: () => {
      this.position.setOffset({x: this.textPosition.x, y: this.textPosition.y});
      this.position.setValue({x: 0, y: 0});
    },
    onPanResponderEnd: () => {
      this.position.flattenOffset();
    },
  });

  render() {
    return (
      <>
        <Icon
          name="menu"
          style={[
            {fontSize: 9 * vw, marginVertical: 1.8 * vh, paddingLeft: 5 * vw},
          ]}
          onPress={() => this.props.navigation.openDrawer('CustomNavigator')}
        />
        <SafeAreaView
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Button
            title="Go to AutoVideo"
            onPress={() => this.props.navigation.navigate('AutoVideo')}
          />
          <Animated.View
            style={[this.position.getLayout()]}
            {...this.PanResponder.panHandlers}>
            <Text
              style={{
                color: 'blue',
                fontSize: 60,
                fontWeight: 'bold',
              }}>
              Sumit
            </Text>
          </Animated.View>
        </SafeAreaView>
      </>
    );
  }
}
