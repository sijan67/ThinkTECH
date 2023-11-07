# RTTI - Stops
# locations where buses provide scheduled service.

import requests

import sys
sys.path.append('..')  # Add the parent directory to the sys.path

# import translink api from api_key file from parent directory which is not pushed 
# to git (added to git ignore)
from api_key import api

api_key = api


# API endpoint URL
endpoint_url = 'https://api.translink.ca/rttiapi/v1/buses'

# request headers 
headers = {
    'Accept': 'application/json',
    'Authorization': f'Bearer {api_key}'
}

# required parameters in the query string
params = {
    'apikey': api_key,
    'stopNo': '60153',  # desired bus stop number
    # 'lat': 49.187706,   
    # 'long': -122.850060  
}


response = requests.get(endpoint_url, headers=headers, params=params)

if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(f"Request failed with status code {response.status_code}: {response.text}")
