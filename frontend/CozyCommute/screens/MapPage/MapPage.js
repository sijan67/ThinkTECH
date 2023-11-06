import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import MapView, { Marker , Callout} from 'react-native-maps';
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
    <View >
      {location && (
        <MapView style={style.map} initialRegion={{
          latitude: region.coords.latitude, //  current latitude
          longitude: region.coords.longitude, //  current longitude
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
          <Marker
            coordinate={{
              latitude: region.coords.latitude, //  current latitude
              longitude: region.coords.longitude, //  current longitude
            }}
            image={require('../../assets/map_marker.png')}
            title="Your Location"
            description="You are here"
          />

            {/* Show alerts + change location +  ( shelter information / input information + nearby stops ) */}
            <Callout tooltip>
              <View>
                <View style={style.bubble}>
                  <Text style={style.name}>Favourite Restaurant</Text>
                  {/* <Text>A short description</Text> */}
                  <Image 
                    style={style.image}
                    source={require('../../assets/bg.jpg')}
                  />
                </View>
                <View style={style.arrowBorder} />
                <View style={style.arrow} />
              </View>
            </Callout>
        </MapView>
      )}
    </View>
  );
};

export default Map;
