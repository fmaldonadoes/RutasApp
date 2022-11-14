/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {PermissionsContext} from '../../context/PermissionsContext';
import {BlackButton} from '../../components/BlackButton';

export const PermissionsScreen = () => {
  const {permissions, askLocationPermission} = useContext(PermissionsContext);

  return (
    <View style={styles.containter}>
      <Text style={styles.title}> Se requiere el acceso a tu ubicación</Text>
      <BlackButton title="Permiso" onPress={askLocationPermission} />
      <Text style={{marginTop: 20}}>
        {JSON.stringify(permissions, null, 5)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: 200,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});
