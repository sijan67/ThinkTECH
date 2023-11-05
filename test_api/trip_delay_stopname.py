import requests
import sys
sys.path.append('..')  
from api_key import api
from google.transit import gtfs_realtime_pb2  # Importing the Protocol Buffers module

api_key = api

# Defining the API endpoint URL for the specific feed type (e.g., Trip Update)
feed_url = "https://gtfs.translink.ca/v2/gtfsrealtime"

# Create a dictionary with the API key as a parameter
params = {"apikey": api_key}

# Load GTFS data to map stop IDs to stop names
stop_name_mapping = {}  # Create a dictionary to store stop names
with open('../google_transit/stops.txt', 'r') as stops_file:  
    for line in stops_file:
        try:
            stop_id, stop_code, stop_name, *_ = line.strip().split(',')
            stop_name_mapping[stop_id] = stop_name
        except ValueError:
            # Handle lines with missing values
            pass

# print(stop_name_mapping)

try:
    # Send a GET request to the API
    response = requests.get(feed_url, params=params)

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        # Parse the GTFS Realtime data using the gtfs-realtime library
        feed = gtfs_realtime_pb2.FeedMessage()
        feed.ParseFromString(response.content)

        # Loop through the feed entries to find delay information at a particular stop
        target_stop_id = "1"  #  stop ID interested in knowing delay time of 
        for entity in feed.entity:
            if entity.HasField('trip_update'):
                trip_update = entity.trip_update
                for stop_time_update in trip_update.stop_time_update:
                    if stop_time_update.stop_id == target_stop_id:
                        delay = stop_time_update.departure.delay
                        # Get the stop name from the mapping
                        stop_name = stop_name_mapping.get(target_stop_id, "Unknown Stop")
                        print(f"Delay at {stop_name} ({target_stop_id}): {delay} seconds")

    else:
        print(f"Failed to retrieve GTFS Realtime data. Status code: {response.status_code}")

except Exception as e:
    print(f"An error occurred: {str(e)}")
