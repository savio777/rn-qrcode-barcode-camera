import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {useCameraPermission} from 'react-native-vision-camera';

const PermissionsPage = () => {
  const {hasPermission, requestPermission} = useCameraPermission();

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
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
