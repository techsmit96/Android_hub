import React, {Component} from 'react';
import {
  Button,
  SafeAreaView,
  View,
  PermissionsAndroid,
  Dimensions,
} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100;

export default class SaveSelectedImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storagePermission: false,
    };
  }
  componentDidMount(): void {
    this.checkAndGrantStoragePermission();
  }

  onSelect = () => {
    ImageCropPicker.openPicker({includeBase64: true}).then((image) => {
      const splittedArray = image.path.split('/');
      const fileName = splittedArray[splittedArray.length - 1];
      this.saveImage({
        source: image.data,
        fileName: fileName,
        mime: image.mime,
      });
    });
  };
  saveImage(data: {source: string, fileName: string, mime: string}) {
    const folderPath = '/storage/emulated/0/Youtube';
    const filePath = folderPath + '/' + data.fileName;
    RNFetchBlob.fs.isDir(folderPath).then((isDir) => {
      if (isDir) {
        this.addImage({source: data.source, path: filePath, mime: data.mime});
      } else {
        RNFetchBlob.fs.mkdir(folderPath).then(() => {
          this.addImage({source: data.source, path: filePath, mime: data.mime});
        });
      }
    });
  }
  addImage(data: {source: String, path: string, mime: string}) {
    RNFetchBlob.fs.createFile(data.path, data.source, 'base64').then(() => {
      RNFetchBlob.fs.scanFile([{path: data.path, mime: data.mime}]).then(() => {
        console.log('File has been scanned and saved');
      });
    });
  }

  checkAndGrantStoragePermission() {
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ).then((isPermitted) => {
      if (isPermitted) {
        this.setState({storagePermission: true});
      } else {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            message: 'Please Give Access to Save Image',
            title: 'Storage Permission',
          },
        ).then((data: string) => {
          this.setState({storagePermission: true});
        });
      }
    });
  }

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
          <View>
            <Button title={'select Image'} onPress={this.onSelect} />
          </View>
        </SafeAreaView>
      </>
    );
  }
}
