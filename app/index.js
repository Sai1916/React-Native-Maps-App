import { StyleSheet, Text, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import { DeviceMotion } from "expo-sensors";
import * as Location from "expo-location";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import BottomSheetComponent from "../components/BottomSheetComponent";
import InputComp from "../components/InputComp";
import MapViewComponent from "../components/MapViewComponent";

export default function Page() {
 
  const router = useRouter();

  const [locationArray, setLocationArray] = useState([]);

  const [focused, setFocused] = useState(false);

  const [location, setLocation] = useState(null);
  // const [destination, setDestination] = useState({lat: 16.5842730, lng: 80.5163999}); 
  const [destination, setDestination] = useState(null); 
  const [destinationTitle, setDestinationTitle] = useState('');  

  const [destinationDetails, setDestinationDetails] = useState(null);

  const [errorMsg, setErrorMsg] = useState(null);

  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

  const { destinationLoc } = useLocalSearchParams();
  // console.log("params: ", destinationLoc?.destLat);    

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval: 300,
        mayShowUserSettingsDialog: true,
      });
      setLocation(location); 
      // setLocationArray([
      //   ...locationArray,
      //   {
      //     latitude: location.coords.latitude,
      //     longitude: location.coords.longitude,
      //   },
      // ]);
    })(); 
  },[location]);

  useEffect(() => { 
    if(destinationLoc){
      // console.log("destinationLoc: ", destinationLoc?.destLat, destinationLoc?.destLng);
      setDestination({lat: destinationLoc?.destLat, lng: destinationLoc?.destLng});
      // setDestinationTitle(params.title);
    } 
  },[destinationLoc])
 
  // console.log("location array: ", locationArray);

  let text = "Loading...";
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   text = JSON.stringify(location);
  // }

  useEffect(() => {
    const subscription = DeviceMotion.addListener((data) => {
      // console.log(data);
      // setLocationArray([...locationArray, {latitude: locationArray[locationArray.length-1].latitude + data.acceleration.x, longitude: locationArray[locationArray.length-1].longitude - data.acceleration.y}])
    });
    return () => subscription.remove();
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={[styles.main, { height: focused ? 400 : 120 }]}>
        <View style={styles.innerMain}>
          <TouchableOpacity style={styles.menuIcon}>
            <Ionicons name="ios-menu" size={28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.userIcon}>
            <FontAwesome5 name="user" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <InputComp
          setDestination={setDestination}
          setDestinationDetails={setDestinationDetails}
          setFocused={setFocused}
        />
      </View>

      <Text style={styles.subtitle}>{text}</Text>

      {location != null && (
        <MapViewComponent
          location={location}
          destination={destination}
          destinationTitle={destinationTitle}
          locationArray={locationArray}
          setLocation={setLocation}
          setLocationArray={setLocationArray}
          setDistance={setDistance}
          setDuration={setDuration}
          setDestinationTitle={setDestinationTitle}
        />
      )}

      {destination != null && (
        <BottomSheetComponent
          destinationTitle={destinationTitle}
          distance={distance}
          duration={duration}
        />
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  menuIcon: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 30,
  },
  userIcon: {
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#f2a83b",
    backgroundColor: "transparent",
    padding: 14,
    borderRadius: 50,
  },
  main: {
    // flex: 1,
    zIndex: 10,
    width: "100%",
    // height: !isHeight ? 400 : 100,
    // height: 200,
    // flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 30,
    maxWidth: 960,
  },
  innerMain: {
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    top: 6,
  },
});
