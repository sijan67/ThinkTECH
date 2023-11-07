import requests
import sys
sys.path.append('..')

from api_key import api
from google.transit import gtfs_realtime_pb2

api_key = api
user_stop_id = "11302"  # Replace with the user-provided stop_id

url = f"https://gtfs.translink.ca/v2/gtfsalerts?apikey={api_key}"

response = requests.get(url)

if response.status_code == 200:
    feed = gtfs_realtime_pb2.FeedMessage()
    feed.ParseFromString(response.content)
    printed_stop_ids = set()  # To keep track of already printed stop_ids

    for entity in feed.entity:
        for informed_entity in entity.alert.informed_entity:
            if informed_entity.stop_id == user_stop_id and user_stop_id not in printed_stop_ids:
                # Print the desired information for the matching stop_id
                print("URL:", entity.alert.url.translation.text)
                print("Header Text:", entity.alert.header_text.translation.text)
                print("Description Text:", entity.alert.description_text.translation.text)
                print("Severity Level:", entity.alert.severity_level)
                print()

                # Add the stop_id to the printed_stop_ids set to avoid duplicate printing
                printed_stop_ids.add(user_stop_id)