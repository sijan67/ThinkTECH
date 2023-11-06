import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import style from './style';
import * as Location from 'expo-location';

const Map = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let region = {};
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    region = JSON.parse(text);
  }

  return (
    <View style={style.container}>
      <Text>Map Screen</Text>
      {location && (
        <MapView style={style.map} initialRegion={{
          latitude: region.coords.latitude, // Your current latitude
          longitude: region.coords.longitude, // Your current longitude
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
          <Marker
            coordinate={{
              latitude: region.coords.latitude, // Your current latitude
              longitude: region.coords.longitude, // Your current longitude
            }}
            title="Your Location"
            description="You are here"
          />
        </MapView>
      )}
    </View>
  );
};

export default Map;
