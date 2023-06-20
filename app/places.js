import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const places = () => {
  return (
    <View style={styles.container}>
        <GooglePlacesAutocomplete  
          placeholder='Search'
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true 
            console.log(data, details);
          }}
          style={StyleSheet.absoluteFillObject}
          query={{
            key: API_KEY,  
            language: 'en',
          }}
        />
    </View>
  )
}

export default places

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
})
