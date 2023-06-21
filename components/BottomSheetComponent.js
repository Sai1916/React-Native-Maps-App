import { Alert, Button, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import items from "../assets/items";
import Item from "./Item";

const BottomSheetComponent = ({ destinationTitle, distance, duration }) => {
  const bottomSheetRef = useRef(null);

  const [selected, setSelected] = useState({
    id: null,
  });

  const booking = () => {
    Alert.alert("Booking", "Your ride has been booked successfully");
  };

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
        <Text>Destination: {destinationTitle}</Text>
        <View style={styles.textView}>
          <Text style={styles.displayText}>
            Dist: {distance < 1 ? `${distance * 1000} m` : `${distance} km`}
          </Text>
          <Text style={styles.displayText}>
            Time:{" "}
            {duration < 1 ? `${duration * 60} s` : `${duration.toFixed(2)} min`}
          </Text>
        </View>
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <Item item={item} selected={selected} setSelected={setSelected} />
          )}
          // keyExtractor={(item) => item.id.toString()}
        />

        {selected.id != null && (
          <View style={{ alignItems: "center", marginVertical: 10 }}>
            <Button title="Book Ride" style={styles.btn} onPress={booking} />
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
  btn: {
    // marginVertical: 20,
    backgroundColor: "#000",
    color: "#fff",
  },
  textView:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  displayText:{
    fontSize: 22,
    fontWeight: "bold",
  }
});
