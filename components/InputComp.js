import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete/GooglePlacesAutocomplete";

const InputComp = ({setDestination, setDestinationDetails, setFocused}) => {
    
    const ref = useRef(null);

    const API_KEY = "AIzaSyD9KHk0WErLGjt3lmbjy4-TXNt3I4CkDOY";

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
      nearbyPlacesAPI="GooglePlacesSearch"
      textInputProps={{
        clearButtonMode: "never",
        placeholderTextColor: "#000",
        cursorColor: "#000",
      }}
      isFo
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
        types: "geocode",
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
});
