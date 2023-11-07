
# RTTI - Nearby Stops within 200m radius

import requests

import sys
sys.path.append('..')  # Add the parent directory to the sys.path

# import translink api from api_key file from parent directory which is not pushed 
# to git (added to git ignore)
from api_key import api

api_key = api


# API endpoint URL
endpoint_url = 'https://api.translink.ca/rttiapi/v1/stops'

# request headers 
headers = {
    'Accept': 'application/json',
    'Authorization': f'Bearer {api_key}'
}

# provide users lat and long
params = {
    'apikey': api_key,
    'lat': 49.268392,   
    'long':  -123.251804 ,
    'radius': 200,
    'routeNo': '' 
}


response = requests.get(endpoint_url, headers=headers, params=params)

if response.status_code == 200:
    data = response.json()
    # print(data)
    
    for stop in data:
        print(f"StopNo: {stop['StopNo']}, Name: {stop['Name']}, OnStreet: {stop['OnStreet']}, AtStreet: {stop['AtStreet']}, WheelchairAccess: {stop['WheelchairAccess']}, Distance: {stop['Distance']}")

else:
    print(f"Request failed with status code {response.status_code}: {response.text}")

