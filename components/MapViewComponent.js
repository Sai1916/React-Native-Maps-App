import { Image, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import MapDirections from "./MapDirections";
import { MaterialIcons } from "@expo/vector-icons";

const MapViewComponent = ({
  location,
  destination,
  destinationTitle,
  locationArray,
  setLocation,
  setLocationArray,
  setDistance,
  setDuration,
  setDestinationTitle
}) => {
  const mapRef = useRef(null);

  const onDestinationPress = (e) => {
    setLocation({ coords: e.nativeEvent.coordinate });

    mapRef.current?.animateToRegion({
      region: {
        latitude: location?.coords?.latitude,
        longitude: location?.coords?.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      },
      duration: 500,
    });
  };

  return (
    <MapView
      ref={mapRef}
      // style={{height: '70%', width: "100%"}}
      style={StyleSheet.absoluteFillObject}
      initialRegion={{
        latitude: location?.coords?.latitude,
        longitude: location?.coords?.longitude,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      }}
      followsUserLocation={true}
      loadingEnabled={true}
      onUserLocationChange={(e) => {
        // console.log("location change: ",e.nativeEvent.coordinate);
        setLocation({ coords: e.nativeEvent.coordinate });
        setLocationArray([
          ...locationArray,
          {
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          },
        ]);
      }}
      // onRegionChange={(region) => {
      //   // console.log(region);
      //   setLocation({coords: region})
      //   // setLocationArray([...locationArray, {latitude: region.latitude, longitude: region.longitude}])
      // }}
      onPress={onDestinationPress}
      showsUserLocation={true}
    >
      {destination != null && (
        <MapDirections
          origin={location}
          destination={destination}
          setDistance={setDistance}
          setDuration={setDuration}
          setDestinationTitle={setDestinationTitle}
        />
      )}
      <Marker
        title="Your Location"
        coordinate={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }}
      >
        <Image
          source={require("../assets/top-UberX.png")}
          style={{
            width: 45,
            height: 50,
            resizeMode: "contain",
            transform: [
              {
                rotate: `${location.coords.heading}deg`,
              },
            ],
          }}
        />
      </Marker>
      {destination != null && (
        <Marker
          //   coordinate={{latitude: 16.5842730, longitude: 80.5168989}}
          //   coordinate={{latitude: 16.5842730, longitude: 80.51660402288437}}
          coordinate={{
            latitude: destination.lat,
            longitude: destination.lng,
          }}
          title={destinationTitle}
        >
          <MaterialIcons name="pin-drop" size={26} color="black" />
        </Marker>
      )}
    </MapView>
  );
};

export default MapViewComponent;

const styles = StyleSheet.create({});
