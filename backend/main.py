# from fastapi import FastAPI, HTTPException
import requests

# app = FastAPI()
import sys
sys.path.append('..')  # Add the parent directory to the sys.path

# import translink api from api_key file from parent directory which is not pushed 
# to git (added to git ignore)
from api_key import api

api_key = api



from typing import Union

from fastapi import FastAPI, HTTPException, Form, Body

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

# @app.post("/nearby_stops/")
# async def get_nearby_stops(lat: float = Form(...), long: float = Form(...)):
#     # API endpoint URL
#     endpoint_url = 'https://api.translink.ca/rttiapi/v1/stops'

#     # Request headers
#     headers = {
#         'Accept': 'application/json',
#         'Authorization': f'Bearer {api_key}'
#     }

#     # Provide user's lat and long as query parameters
#     params = {
#         'apikey': api_key,
#         'lat': lat,
#         'long': long,
#         'radius': 200,
#         'routeNo': ''
#     }

#     response = requests.get(endpoint_url, headers=headers, params=params)

#     if response.status_code == 200:
#         data = response.json()
#         nearby_stops = []

#         for stop in data:
#             nearby_stops.append({
#                 "StopNo": stop['StopNo'],
#                 "Name": stop['Name'],
#                 "OnStreet": stop['OnStreet'],
#                 "AtStreet": stop['AtStreet'],
#                 "WheelchairAccess": stop['WheelchairAccess'],
#                 "Distance": stop['Distance']
#             })

#         return {"nearby_stops": nearby_stops}
#     else:
#         raise HTTPException(status_code=response.status_code, detail=f"Request failed with status code {response.status_code}")


@app.post("/nearby_stops/")
async def get_nearby_stops(data: dict = Body(...)):
    print("data is: ", data)
    # Ensure that the request body contains the 'lat' and 'long' fields
    if 'lat' not in data or 'long' not in data:
        raise HTTPException(status_code=400, detail="Invalid JSON data. 'lat' and 'long' fields are required.")

    # API endpoint URL
    endpoint_url = 'https://api.translink.ca/rttiapi/v1/stops'

    # Request headers
    headers = {
        'Accept': 'application/json',
        'Authorization': f'Bearer {api_key}'
    }

    # Provide user's lat and long as query parameters
    params = {
        'apikey': api_key,
        'lat': data['lat'],
        'long': data['long'],
        'radius': data['radius'],
        'routeNo': ''
    }

    response = requests.get(endpoint_url, headers=headers, params=params)
    print("response.status_code", response.status_code)

    if response.status_code == 200:
        data = response.json()
        nearby_stops = []

        for stop in data:
            nearby_stops.append({
                "StopNo": stop['StopNo'],
                "Name": stop['Name'],
                "OnStreet": stop['OnStreet'],
                "AtStreet": stop['AtStreet'],
                "WheelchairAccess": stop['WheelchairAccess'],
                "Distance": stop['Distance']
            })

        return {"nearby_stops": nearby_stops}
    else:
        raise HTTPException(status_code=response.status_code, detail=f"Request failed with status code {response.status_code}")
