import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import style from './style';
import * as Location from 'expo-location';
import config from '../../config/config';
import Geocoder from 'react-native-geocoding';

const Map = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [markerName, setMarkerName] = useState("Your Location"); // Initialize markerName with "Your Location"
  const apiKey = config.googleMapsApiKey;
  Geocoder.init(apiKey);
 

  const getLocationName = async (latitude, longitude) => {
    try {
      const res = await Geocoder.from({ latitude, longitude });
      const address = res.results[0].formatted_address;
      
      // Split the address string at the comma and take the first part
        const addressname = address.split(',')[0].trim();

        console.log("Location Name:", addressname);
        setMarkerName(addressname);
    } catch (error) {
      console.error("Error getting location name:", error);
    }
  };

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

  const onMarkerDragEnd = (e) => {
    // When the marker is dragged and dropped, update the markerName
    console.log("dragged, " , e.nativeEvent.coordinate)
    let latlon = e.nativeEvent.coordinate
    getLocationName(latlon["latitude"], latlon["longitude"])

  };

  return (
    <View>
      {location && (
        <MapView
          style={style.map}
          initialRegion={{
            latitude: region.coords.latitude,
            longitude: region.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: region.coords.latitude,
              longitude: region.coords.longitude,
            }}
            image={require('../../assets/map_marker.png')}
            title={markerName} // Display the marker name
            description="Your selected location"
            onSelect={() => console.log('onSelect')}
            onDragStart={() => console.log('onDragStart')}
            draggable
            onDragEnd={onMarkerDragEnd} // Call the onMarkerDragEnd function when marker is dropped
          />
        </MapView>
      )}
      {location && (
        <View style={style.overlayView}>
          <View style={style.bubble}>
            <View style={style.rowContainer}>
              <View style={style.arrowBorder} />
              <Text style={style.name}>99 bus</Text>
            </View>
            <Text>Short description</Text>
            <Image style={style.image} source={require('../../assets/bg.jpg')} />
          </View>
        </View>
      )}
    </View>
  );
};

export default Map;
