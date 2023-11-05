import requests
import sys
sys.path.append('..') 
from api_key import api
from google.transit import gtfs_realtime_pb2  # Importing the Protocol Buffers module

api_key = api

# Defining the API endpoint URL for the specific feed type (e.g., Trip Update)
feed_url = "https://gtfs.translink.ca/v2/gtfsrealtime"


params = {"apikey": api_key}

try:
  
    response = requests.get(feed_url, params=params)

    if response.status_code == 200:
        # Parse the GTFS Realtime data using the gtfs-realtime library
        feed = gtfs_realtime_pb2.FeedMessage()
        feed.ParseFromString(response.content)

        # print("feed entitiy", feed.entity)

        # Loop through the feed entries to find delay information at a particular stop
        target_stop_id = "10815"  #  stop ID interested in finding delay information about
        for entity in feed.entity:
            if entity.HasField('trip_update'):
                trip_update = entity.trip_update
                for stop_time_update in trip_update.stop_time_update:
                    if stop_time_update.stop_id == target_stop_id:
                        delay = stop_time_update.departure.delay
                        print(f"Delay at {target_stop_id}: {delay} seconds")

    else:
        print(f"Failed to retrieve GTFS Realtime data. Status code: {response.status_code}")

except Exception as e:
    print(f"An error occurred: {str(e)}")
