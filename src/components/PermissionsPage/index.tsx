import React, {useEffect} from 'react';
import {View, Text, Platform, PermissionsAndroid} from 'react-native';
import {useCameraPermission} from 'react-native-vision-camera';

const PermissionsPage = () => {
  const {hasPermission, requestPermission} = useCameraPermission();

  useEffect(() => {
    if (!hasPermission) {
      if (Platform.OS === 'android') {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      } else {
        requestPermission();
      }
    }
  }, [hasPermission, requestPermission]);

  return (
    <View>
      <Text>Necessário permissão da câmera</Text>
      <Text>{hasPermission ? 'Tem permissão' : 'Não tem permissão'}</Text>
    </View>
  );
};

export default PermissionsPage;
