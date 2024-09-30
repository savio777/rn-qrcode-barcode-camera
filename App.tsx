import React, {useCallback, useState} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {useCameraDevice, useCameraPermission} from 'react-native-vision-camera';

import PermissionsPage from './src/components/PermissionsPage';
import NoCameraDeviceError from './src/components/NoCameraDeviceError';
import Camera from './src/components/Camera';
import ButtonHome from './src/components/ButtonHome';
import CameraQRCode from './src/components/CameraQRCode';
import {colors} from './colors';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    padding: 32,
    backgroundColor: colors.black,
  },
});

type IScreen = 'camera' | 'qrcode' | 'barcode' | 'generateQrcode' | undefined;

function App(): React.JSX.Element {
  const device = useCameraDevice('back');
  const {hasPermission} = useCameraPermission();

  const [screen, setScreen] = useState<IScreen>();

  const handleCloseScreen = useCallback(() => {
    setScreen(undefined);
  }, []);

  const handleSelectScreen = useCallback((value: IScreen) => {
    setScreen(value);
  }, []);

  if (!hasPermission) {
    return <PermissionsPage />;
  }
  if (device == null) {
    return <NoCameraDeviceError />;
  }

  return (
    <View style={StyleSheet.absoluteFill}>
      <View style={[styles.container, StyleSheet.absoluteFill]}>
        <ButtonHome
          onPress={() => handleSelectScreen('camera')}
          title="Câmera"
        />

        <ButtonHome
          onPress={() => handleSelectScreen('qrcode')}
          title="QR Code"
        />
      </View>

      {screen === 'camera' && <Camera onClose={handleCloseScreen} />}

      {screen === 'qrcode' && <CameraQRCode onClose={handleCloseScreen} />}

      <StatusBar backgroundColor={colors.black} barStyle="light-content" />
    </View>
  );
}

export default App;
