import React, {Component} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100;

type State = {
  paused: Boolean,
  position: {start: Number, end: Number},
  muted: Boolean,
};

class AutoVideo extends Component<any, State> {
  threshold = 150; //sensitivity
  constructor(props) {
    super(props);
    this.state = {
      paused: true,
      muted: true,
      position: {start: null, end: null},
    };
  }
  componentDidMount() {}

  onVideoLayout = (event) => {
    const {height} = Dimensions.get('window');
    this.state.position.start = -(
      event.nativeEvent.layout.y -
      height +
      this.threshold
    );
    this.state.position.end =
      event.nativeEvent.layout.y +
      event.nativeEvent.layout.height -
      this.threshold;
  };

  onScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    const paused = this.state.paused;
    const {start, end} = this.state.position;
    console.log(start, end, scrollPosition);
    if (scrollPosition < start && scrollPosition > end && paused) {
      this.setState({paused: false});
    } else if (scrollPosition > start && !paused) {
      this.setState({paused: true});
    } else if (scrollPosition < end && !paused) {
      this.setState({paused: true});
    }
  };

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <Icon
          name="menu"
          style={[
            {fontSize: 9 * vw, marginVertical: 1.8 * vh, paddingLeft: 5 * vw},
          ]}
          onPress={() => this.props.navigation.openDrawer('CustomNavigator')}
        />
        <SafeAreaView style={{flex: 1}}>
          <Button
            title="Go to Home"
            onPress={() => this.props.navigation.navigate('Home')}
          />
          <ScrollView scrollEventThrottle={16} onScroll={this.onScroll}>
            <TouchableOpacity
              onPress={() => this.setState({muted: !this.state.muted})}>
              <Video
                muted={this.state.muted}
                onLayout={this.onVideoLayout}
                paused={this.state.paused}
                style={{
                  backgroundColor: 'black',
                  width: '100%',
                  height: 300,
                  marginTop: 450,
                  marginBottom: 450,
                }}
                resizeMode={'cover'}
                source={{
                  uri:
                    'http://commondatastorage.googleapis.com/gtv-videos-bucket/big_buck_bunny_1080p.mp4',
                }}
              />
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

export default AutoVideo;

// import React, {Component} from 'react';
// import {
//   Dimensions,
//   Platform,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// import Video from 'react-native-video';

// class App extends Component {
//   threshold = 150;
//   constructor(props) {
//     super(props);
//     this.state = {
//       paused: true,
//       muted: true,
//       position: {start: null, end: null},
//     };
//   }

//   onVideoLayout = (event) => {
//     const {height} = Dimensions.get('window');
//     this.state.position.start = -(
//       event.nativeEvent.layout.y -
//       height +
//       this.threshold
//     );

//     this.state.position.end =
//       event.nativeEvent.layout.y +
//       event.nativeEvent.layout.height -
//       this.threshold;
//   };

//   onScroll = (event) => {
//     const scrollPosition = event.nativeEvent.contentOffset.y;
//     const paused = this.state.paused;
//     const {start, end} = this.state.position;
//     console.log(start, end, scrollPosition);
//     if (scrollPosition < start && scrollPosition > end && paused) {
//       this.setState({paused: false});
//     } else if (scrollPosition > start && !paused) {
//       this.setState({paused: true});
//     } else if (scrollPosition < end && !paused) {
//       this.setState({paused: true});
//     }
//   };

//   render() {
//     return (
//       // <View style={styles.container}>
//       <SafeAreaView style={{flex: 1}}>
//         <ScrollView scrollEventThrottle={16} onScroll={this.onScroll}>
//           <TouchableOpacity
//             onPress={() => this.setState({muted: !this.state.muted})}>
//             <Video
//               muted={this.state.muted}
//               onLayout={this.onVideoLayout}
//               paused={this.state.paused}
//               style={{
//                 backgroundColor: 'black',
//                 width: '100%',
//                 height: 300,
//                 marginTop: 450,
//                 marginBottom: 450,
//               }}
//               resizeMode={'cover'}
//               source={{
//                 uri:
//                   'http://commondatastorage.googleapis.com/gtv-videos-bucket/big_buck_bunny_1080p.mp4',
//               }}
//             />
//           </TouchableOpacity>
//         </ScrollView>
//       </SafeAreaView>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
// export default App;
