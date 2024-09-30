import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {
  Camera as RNCamera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';

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
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const CameraQRCode = ({onClose}: Props) => {
  const [scanned, setScanned] = useState<
    {type: string; value?: string} | undefined
  >();

  const device = useCameraDevice('back');

  const cameraRef = useRef<RNCamera>(null);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      try {
        if (!scanned) {
          console.log(codes[0]);
          console.log(`Scanned ${codes.length} codes!`);
        }
        setScanned({
          type: codes[0].type,
          value: codes[0].value,
        });
      } catch (error) {
        Alert.alert('Erro', JSON.stringify(error));
      }
    },
  });

  if (device == null) {
    return null;
  }

  const handleBack = () => {
    if (scanned) {
      setScanned(undefined);
      return;
    }

    onClose();
  };

  if (scanned) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonClose} onPress={handleBack}>
          <Text style={styles.textButtonClose}>X</Text>
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.textButtonClose}>Tipo: {scanned.type}</Text>
          <Text style={styles.textButtonClose}>Valor: {scanned.value}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        codeScanner={codeScanner}
        isActive
      />

      <TouchableOpacity style={styles.buttonClose} onPress={handleBack}>
        <Text style={styles.textButtonClose}>X</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={styles.buttonCapturePicture}
        onPress={handleTakePicture}
      /> */}
    </View>
  );
};

export default CameraQRCode;
