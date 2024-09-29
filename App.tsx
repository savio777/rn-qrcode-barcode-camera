import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

import PermissionsPage from './src/components/PermissionsPage';
import NoCameraDeviceError from './src/components/NoCameraDeviceError';

function App(): React.JSX.Element {
  const device = useCameraDevice('back');
  const {hasPermission} = useCameraPermission();

  if (!hasPermission) {
    return <PermissionsPage />;
  }
  if (device == null) {
    return <NoCameraDeviceError />;
  }

  return (
    <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
  );
}

export default App;
