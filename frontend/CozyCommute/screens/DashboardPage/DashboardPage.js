import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import style from './style';
import config from '../../config/config';

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

  return (
    <View style={style.container}>
      <Text>Dashboard Screen</Text>
      <Button title="Get Data" onPress={handleGetRequest} />
      <Text>Response from Server:</Text>
      {response ? (
        <Text>{JSON.stringify(response)}</Text>
      ) : (
        <Text>No response data yet.</Text>
      )}
    </View>
  );
}

export default Dashboard;
