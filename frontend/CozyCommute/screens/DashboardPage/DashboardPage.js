import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput,FlatList , SafeAreaView, TouchableOpacity} from 'react-native';
import style from './style';
import config from '../../config/config';
import { FontAwesome5 } from '@expo/vector-icons';

function Dashboard() {
  const [response, setResponse] = useState(null);
  const ipAddress = config.ip;

  const handleGetRequest = () => {
    fetch('http://'+ipAddress+':8000', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setResponse(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handlePostRequest = () => {
    fetch('http://' + ipAddress + ':8000/nearby_stops/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lat: 49.268392,
        long: -123.251804,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setResponse(data.nearby_stops);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <SafeAreaView style={style.container}>

    <Text style={style.title}> Selected location : </Text>
    <Text >Response from Server:</Text>

      {response ? (
        <FlatList
          data={response}
          keyExtractor={(item) => item.StopNo.toString()}
          renderItem={({ item }) => (
            <View style={style.card}>
              <View style={style.row}>
                <FontAwesome5 name="bus" size={16} color="#333" />
                <Text style={style.rowText}>{item.Name}</Text>
              </View>
              <View style={style.row}>
                <FontAwesome5 name="wheelchair" size={16} color="#333" />
                <Text style={style.rowText}>Wheelchair Access: {item.WheelchairAccess ? 'Yes' : 'No'}</Text>
              </View>
              <View style={style.row}>
                <FontAwesome5 name="map-marker" size={16} color="#333" />
                <Text style={style.rowText}>Distance: {item.Distance} m</Text>
              </View>
            </View>
          )}
        />
      ) : (
        <Text>No response data yet.</Text>
      )}

<TouchableOpacity
        style={style.yellowButton} // Apply the custom yellowButton style
        onPress={handlePostRequest}
      >
        <Text style={style.buttonText}>Get Nearby Stops</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default Dashboard;
