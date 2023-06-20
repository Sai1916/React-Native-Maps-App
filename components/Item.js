import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

const Item = ({ item, selected, setSelected }) => {
  return (
    <Pressable
      style={[
        styles.item,
        {
          borderColor: selected.id === item.id ? "#000" : "lightgray",
          backgroundColor: selected.id === item.id ? "#000" : "transparent",
        },
      ]}
      onPress={() => selected.id === item.id ? setSelected({id: null}) : setSelected({ id: item.id })}
    >
      <View>
        <Text style={{ color: selected.id === item.id ? "#fff" : "#000" }}>
          Type: {item.type}
        </Text>
        <Text style={{ color: selected.id === item.id ? "#fff" : "#000" }}>
          Name: {item.name}
        </Text>
        <Text style={{ color: selected.id === item.id ? "#fff" : "#000" }}>
          Price: {item.price}
        </Text>
      </View>
      <Image source={item.image} style={styles.image} />
    </Pressable>
  );
};

export default Item;

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginVertical: 5,
    borderWidth: 0.8,
    flexDirection: "row",
    justifyContent: "space-between",
    // borderColor: 'lightgray',
    borderRadius: 5,
  },
  image:{
    width: 54,
    height: 54,
    resizeMode: 'contain',
    borderRadius: 30,
  }
});
