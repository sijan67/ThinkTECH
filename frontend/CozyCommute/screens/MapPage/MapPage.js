import React from 'react'
import { View, Text } from 'react-native'
import style from './style'
import MapView from 'react-native-maps';


const Map = () => {
  return (
 
<View style={style.container}>
<Text>Map Screen</Text>
{/* <Mapbox.MapView style={styles.map} /> */}
<MapView style={style.map} />
</View>
  );
}

export default Map;
