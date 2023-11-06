import requests

import sys
sys.path.append('..')  

from api_key import api

api_key = api


stop_number = '61036'  


endpoint_url = f'https://api.translink.ca/rttiapi/v1/stops/{stop_number}/estimates'


headers = {
    'Accept': 'application/json',
    'Authorization': f'Bearer {api_key}'
}


params = {
    'apikey': api_key,
    'count': 6,  # The number of buses to return (default 6)
    'timeframe': 120,  # The search time frame in minutes (default 120)
    'routeNo': 'R1'  # If present, will search for stops specific to route
}

response = requests.get(endpoint_url, headers=headers, params=params)

if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(f"Request failed with status code {response.status_code}: {response.text}")
