import { Alert, Button, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import items from "../assets/items";
import Item from "./Item";

const BottomSheetComponent = ({ destinationDetails, distance, duration }) => {
  const bottomSheetRef = useRef(null);

  const [selected, setSelected] = useState({
    id: null,
  });

  const booking = () => {
    Alert.alert("Booking", "Your ride has been booked successfully")
  }


  // variables
  const snapPoints = useMemo(() => ["25%", "50%", "70%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
    >
      <View style={styles.contentContainer}>
        {/* <Text>Awesome 🎉</Text> */}
        <Text>Destination: {destinationDetails}</Text>
        <Text>Distance: {distance} km</Text>
        <Text>Duration: {duration} min</Text>
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <Item item={item} selected={selected} setSelected={setSelected} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />

        {selected.id != null && (
          <View style={{ alignItems: "center",marginVertical: 10 }}>
            <Button title="Book Ride" style={styles.btn} onPress={booking}/>
          </View>
        )}

      </View>
    </BottomSheet>
  );
};

export default BottomSheetComponent;

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 10,
  },
  btn:{
    // marginVertical: 20,
    backgroundColor: '#000',
    color: '#fff',
  }
});
