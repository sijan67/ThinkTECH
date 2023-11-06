import requests
import sys
sys.path.append('..')  

from api_key import api
from google.transit import gtfs_realtime_pb2

api_key = api

# stop num and stop id is mixed up , correct it 


# First, retrieve nearby bus stops within a 200m radius
endpoint_url = 'https://api.translink.ca/rttiapi/v1/stops'
headers = {
    'Accept': 'application/json',
    'Authorization': f'Bearer {api_key}'
}
params = {
    'apikey': api_key,
    'lat': 49.276037,
    'long': -123.135256,
    'radius': 400,
    'routeNo': ''
}
response = requests.get(endpoint_url, headers=headers, params=params)

if response.status_code == 200:
    data = response.json()
    # print(data)
    stop_numbers = [stop['StopNo'] for stop in data]
else:
    print(f"Request failed with status code {response.status_code}: {response.text}")




# Next, display delay times for the retrieved bus stops
feed_url = "https://gtfs.translink.ca/v2/gtfsrealtime"
params = {"apikey": api_key}

stop_name_mapping = {}  # Create a dictionary to store stop names
with open('../google_transit/stops.txt', 'r') as stops_file:
    for line in stops_file:
        try:
            stop_id, stop_code, stop_name, *_ = line.strip().split(',')
            stop_name_mapping[stop_id] = {'stop_name': stop_name, 'stop_code': stop_code}
            # break
        except ValueError:
            # Handle lines with missing values
            pass

# get stop_id given stop_code , as we retrieve stop_code for nearby bus stops 
# and use stop_id for getting bus delays 

# print(stop_name_mapping)
def get_stop_id_by_code(mapping, target_code):
    for stop_id, info in mapping.items():
        if info['stop_code'] == target_code:
            return stop_id
    # If the code is not found, you can return a default value or raise an exception.
    return None  # You can change this to raise an exception if you prefer.


# get stop_id for the stop numbers nearby 
stop_ids = []

for stop_code in stop_numbers:
    print("STOP: ",stop_code)

    stop_id = get_stop_id_by_code(stop_name_mapping, str(stop_code))
    if (stop_id):
        stop_ids.append(stop_id)


print("stop_numbers are: ",stop_numbers)
print("stop_ids are: ", stop_ids)

try:
    for target_stop_id in stop_ids:
        response = requests.get(feed_url, params=params)

        if response.status_code == 200:
            feed = gtfs_realtime_pb2.FeedMessage()
            feed.ParseFromString(response.content)

            for entity in feed.entity:
                if entity.HasField('trip_update'):
                    trip_update = entity.trip_update
                    
                    for stop_time_update in trip_update.stop_time_update:
                        
                        if stop_time_update.stop_id == target_stop_id:
                            delay = stop_time_update.departure.delay
                            stop_name = stop_name_mapping[target_stop_id]['stop_name']
                            print(f"Delay at {stop_name} ({target_stop_id}): {delay} seconds")
        else:
            print(f"Failed to retrieve GTFS Realtime data. Status code: {response.status_code}")

except Exception as e:
    print(f"An error occurred: {str(e)}")
