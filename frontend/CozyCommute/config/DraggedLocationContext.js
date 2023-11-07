import React, { createContext, useContext, useState } from 'react';

const DraggedLocationContext = createContext();

export const useDraggedLocation = () => {
  return useContext(DraggedLocationContext);
};

export const DraggedLocationProvider = ({ children }) => {
  const [draggedLocation, setDraggedLocation] = useState({"latitude": 49.268392, "longitude": -123.251804});
  const [markerName, setMarkerName] = useState("Your Location"); // Initialize markerName with "Your Location"

  const updateDraggedLocation = (location) => {
    setDraggedLocation(location);
  };

  const updateMarkerName = (location) => {
    setMarkerName(location);
  };

  return (
    <DraggedLocationContext.Provider value={{ draggedLocation, updateDraggedLocation,markerName, updateMarkerName }}>
      {children}
    </DraggedLocationContext.Provider>
  );
};
