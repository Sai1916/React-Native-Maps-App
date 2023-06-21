import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {API_KEY} from "@env"
import MapView, { Marker } from 'react-native-maps';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import * as Location from "expo-location";
import { Ionicons } from '@expo/vector-icons';


const locateDest = () => {

  const router = useRouter();

  const navigation = useNavigation();

  const [presentLoc,setPresentLoc] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 300,
        mayShowUserSettingsDialog: true,
      });
      setPresentLoc(location);
    })(); 
  },[]);

  if(!presentLoc) {
    return <ActivityIndicator size={"large"} />;
  }

  // console.log("presentLoc: ",presentLoc);

  return (
    <View style={styles.container}>
        <MapView 
          style={StyleSheet.absoluteFillObject}
          initialRegion={{
            latitude: presentLoc?.coords?.latitude, 
            longitude: presentLoc?.coords?.longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          }}
          loadingEnabled={true}
          loadingIndicatorColor='blue'
          showsUserLocation={true}
          onRegionChange={(region) => {
            // console.log("change in region: ",region);
            setPresentLoc({coords: {latitude: region?.latitude,longitude: region?.longitude}})
          }}
        >
          <Marker
            coordinate={{latitude:presentLoc?.coords?.latitude, longitude:presentLoc?.coords?.longitude}}
          > 
            <Ionicons name="ios-pin" size={34} color="red" />
          </Marker>
        </MapView>
        <Pressable style={{top: 40, left: 20}} onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={36} color="black" /> 
        </Pressable>

        <Pressable  
          style={styles.btn}
          onPress={() => {

            // console.warn("destLat: ", presentLoc?.coords?.latitude);
            // console.warn("destLng: ", presentLoc?.coords?.longitude);
            navigation.replace("index",{
              destinationLoc : {
                destLat: presentLoc?.coords?.latitude,
                destLng: presentLoc?.coords?.longitude
              }
            })
          }}
        >
          <Text style={styles.text}>Confirm Destination</Text>
        </Pressable>

    </View>
  )
}

export default locateDest

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn:{
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
  }, 
  text:{
    color: '#fff',
    fontSize: 16,
  }
})
