/* eslint-disable curly */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {createContext, useState, useEffect} from 'react';
import {
  PermissionStatus,
  PERMISSIONS,
  check,
  openSettings,
} from 'react-native-permissions';
import {Platform, AppState} from 'react-native';

export interface PermissionState {
  locationStatus: PermissionStatus;
}

export const permissionInitState: PermissionState = {
  locationStatus: 'unavailable',
};

type PermissionsContextProps = {
  permissions: PermissionState;
  askLocationPermission: () => void;
  checkLocationPermission: () => void;
};

export const PermissionsContext = createContext({} as PermissionsContextProps); // TODO: Qué expone

export const PermissionsProvider = ({children}: any) => {
  const [permissions, setPermissions] = useState(permissionInitState);

  useEffect(() => {
    AppState.addEventListener('change', state => {
      if (state !== 'active') return;
      checkLocationPermission();
    });
  }, []);

  const askLocationPermission = async () => {
    let permissionStatus: PermissionStatus;

    if (Platform.OS === 'ios') {
      permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }

    if (permissionStatus === 'blocked' || permissionStatus === 'denied') {
      openSettings();
    }

    setPermissions({
      ...permissions,
      locationStatus: permissionStatus,
    });
  };

  const checkLocationPermission = async () => {
    let permissionStatus: PermissionStatus;

    if (Platform.OS === 'ios') {
      permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }

    setPermissions({
      ...permissions,
      locationStatus: permissionStatus,
    });
  };

  return (
    <PermissionsContext.Provider
      value={{
        permissions,
        askLocationPermission,
        checkLocationPermission,
      }}>
      {children}
    </PermissionsContext.Provider>
  );
};
