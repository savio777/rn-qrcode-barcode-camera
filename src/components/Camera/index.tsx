import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  useWindowDimensions,
} from 'react-native';
import {Camera as RNCamera, useCameraDevice} from 'react-native-vision-camera';

import {colors} from '../../../colors';

type Props = {
  onClose: () => void;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  buttonClose: {
    position: 'absolute',
    padding: 32,
  },
  textButtonClose: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
    elevation: 5,
  },
  buttonCapturePicture: {
    width: 60,
    height: 60,
    borderRadius: 120,
    backgroundColor: colors.white,
    bottom: 32,
    alignSelf: 'center',
    position: 'absolute',
    elevation: 5,
  },
});

const Camera = ({onClose}: Props) => {
  const [photoPath, setPhotoPath] = useState('');

  const device = useCameraDevice('back');

  const {width, height} = useWindowDimensions();

  const cameraRef = useRef<RNCamera>(null);

  if (device == null) {
    return null;
  }

  const handleBack = () => {
    if (photoPath) {
      setPhotoPath('');
      return;
    }

    onClose();
  };

  const handleTakePicture = async () => {
    try {
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePhoto();

        console.log(photo);

        setPhotoPath(photo.path);

        // ex upload image
        // https://react-native-vision-camera.com/docs/guides/taking-photos#getting-the-photos-data
      }
    } catch (error) {
      console.log('handleTakePicture', error);
      Alert.alert('Erro', JSON.stringify(error));
    }
  };

  if (photoPath) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: `file://${photoPath}`}}
          width={width}
          height={height}
        />
        <TouchableOpacity style={styles.buttonClose} onPress={handleBack}>
          <Text style={styles.textButtonClose}>X</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive
        photo
      />

      <TouchableOpacity style={styles.buttonClose} onPress={handleBack}>
        <Text style={styles.textButtonClose}>X</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonCapturePicture}
        onPress={handleTakePicture}
      />
    </View>
  );
};

export default Camera;
