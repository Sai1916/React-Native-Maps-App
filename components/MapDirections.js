import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MapViewDirections from "react-native-maps-directions";

const MapDirections = ({destination,setDistance,setDuration}) => {

    const API_KEY = "AIzaSyD9KHk0WErLGjt3lmbjy4-TXNt3I4CkDOY";

  return (
    <MapViewDirections
      origin={{ latitude: 16.5842679, longitude: 80.5162096 }}
      // destination={{latitude: 16.5842730, longitude: 80.5167024}}
      destination={{
        latitude: destination?.lat,
        longitude: destination?.lng,
      }}
      apikey={API_KEY} // insert your API Key here
      strokeWidth={2}
      strokeColor="#000"
      onStart={(params) => {
        console.log(
          `Started routing between "${params.origin}" and "${params.destination}"`
        );
      }}
      onReady={(result) => {
        console.log("result: " + result.legs[0].end_address); 
        console.log(`Distance: ${result.distance} km`);
        console.log(`Duration: ${result.duration} min.`);
        setDistance(result.distance);
        setDuration(result.duration);
      }}
      onError={(errorMessage) => {
        // console.log('GOT AN ERROR');
      }}
    />
  );
};

export default MapDirections;

const styles = StyleSheet.create({});