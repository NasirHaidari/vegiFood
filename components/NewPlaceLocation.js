import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'


import newPlaceForm from './newPlaceForm';

export default newPlaceForm = () =>{

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
  
      useEffect(()=>{
  
      
        (async () => {
          let { status } = await Location.requestPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation({latitude: location.coords.latitude, longitude: location.coords.longitude});
        })();
       
      
          
      },[])
  
         

    console.log(location)


    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
    }
  
     if(location) {
 return (
    <MapView
      showsUserLocation
      style={ styles.MapView}
      initialRegion={{
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }}
    
    ></MapView>
)
   }   
  
  return (
    <View style={styles.noLocation}>
    <Text>No Location Yet!</Text>
    
    </View>
  )
    
 
}







 
//   if(location) {
//  return (
//     <MapView style={ styles.MapView}
//     initialRegion={{
//       latitude: location.latitude,
//       longitude: location.longitude,
//       latitudeDelta: 0.0922,
//       longitudeDelta: 0.0421
//     }}
    
//     ></MapView>
// )
//    }   
  
//   return (
//     <View style={styles.noLocation}><Text>No Location Yet!</Text></View>
//   )
    
 
// }

const styles = StyleSheet.create({
  MapView: {
    flex: 1,

  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noLocation: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

