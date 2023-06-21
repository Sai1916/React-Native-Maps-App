import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete/GooglePlacesAutocomplete";
import {API_KEY} from '@env'
import { useRouter } from "expo-router";


const InputComp = ({setDestination, setDestinationDetails, setFocused}) => {
    
    const ref = useRef(null);

    const router = useRouter();


    useEffect(() => {
        setFocused(ref.current?.isFocused());
        // console.log("isHeight: ", focused);
    });
    

  return (
    <GooglePlacesAutocomplete
      ref={ref} 
      placeholder="Search"
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        // console.log("data: ", data);
        console.log("details: ", details.geometry.location);
        // console.log("destination details: ", details);
        setDestinationDetails(details.formatted_address);
        setDestination(details.geometry.location);
        ref.current?.blur();
      }}
      nearbyPlacesAPI="GoogleReverseGeocoding"
      textInputProps={{
        clearButtonMode: "never",
        placeholderTextColor: "#000",
        cursorColor: "#000",
      }}
      renderHeaderComponent={() => (
        <Pressable style={styles.inputHeader} onPress={() =>  router.push({pathname: '/locateDest'}) }>
          <Text style={styles.headerText}>Locate destination on Map</Text>
          <FontAwesome5 name="location-arrow" size={22} color="black" />
        </Pressable>
      )}
      debounce={400}
      renderRightButton={() => (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => {
            ref.current?.clear();
            ref.current?.blur();
            setDestination(null);
            setDestinationDetails(null);
          }}
        >
          <MaterialIcons name="highlight-remove" size={24} color="black" />
        </TouchableOpacity>
      )}
      styles={{
        container: {
          flex: 1,
          width: "100%",
        },
        textInput: {
          backgroundColor: "#e2e2e2",
          borderRadius: 20,
          fontWeight: "700",
          marginTop: 5,
          flex: 1,
        },
        textInputContainer: {
          backgroundColor: "#e2e2e2",
          borderRadius: 50,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 10,
        },
      }}
      query={{
        key: API_KEY, 
        language: "en",
        types: ["geocode","address", "establishment","(regions)","(cities)"],
      }}
      onFail={(error) => console.error(error)}
      fetchDetails={true}
    />
  ); 
};

export default InputComp;

const styles = StyleSheet.create({
  clearButton: {
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#fff",
    marginLeft: 5,
  },
  inputHeader:{
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    padding: 14,
  },
  headerText:{
    fontSize: 14,
    fontWeight: "bold",
  }
});
