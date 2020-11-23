import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image  } from 'react-native';
import MapView, { Marker, Polyline, Callout} from 'react-native-maps';
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('screen')
// import Polyline from '@mapbox/polyline' 
import ENV from '../env'
import { decode } from "@mapbox/polyline";
const Locations = require('../locations.json')
import markerIcon from '../assets/plate.bmp'



export default PlaceListOnMap = () =>{
  

const [location, setLocation] = useState(null);
const [errorMsg, setErrorMsg] = useState(null);
const [locations, setLocations] = useState(null)
const [ coords, setCoords] = useState(null);
const [locs, setLocs] = useState(null)


 

  useEffect(()=>{

  
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({latitude: location.coords.latitude, longitude: location.coords.longitude});
      
      setLocations(location)
    })();
   
    console.log('here is outside(1)', location)
  



  



  


  getInfo= async props => {
    console.log('props inside of getInfo', props)
    const myLocation = await props[1].coords
    const dest = await props[0].coords
    console.log('my coords inside getInfo',myLocation)
    // setLocs({
    //   latitude: myLocation.latitude,
    //   longitude: myLocation.longitude,
    //   desLatitude: dest.latitude,
    //   desLongitude: dest.longitude
    // })
    
    // const startLoc = `${latitude},${longitude}`
    // const desLoc = [locs.desLatitude, locs.desLongitude]
    const startLoc = await props[1]
    const desLoc = await props[0].coords
    console.log('startLoc is :', startLoc,
    'desLoc is :', desLoc)
    try {
          const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${desLoc}&key=AIzaSyCJg8LtFVPMpu7uiJLE37AQ5ZbzpafeWx0`)
          const respJson = await resp.json();
          const response = respJson.routes[0]
          console.log('this is a ',resp, respJson, response)
          const distanceTime = response.legs[0]
          const distance = distanceTime.distance.text
          const time = distanceTime.duration.text
          const points = Polyline.decode(respJson.routes[0].overview_polyline.points);
          const coords = points.map(point => {
            return {
              latitude: point[0],
              longitude: point[1]
            }
          })
          setCoords({ coords, distance, time })
        } catch(error) {
          console.log('Error: ', error)
        }
  }

 const Poly = async  () => {

    return ( <Polyline coordinates= {[await location.coords,await placeInfo.coords]} />)
  }
  
      
  },[])

     console.log('here is outside of useEffect (2)', location)




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

>

{Locations.map((place, name) => {
  return  (<MapView.Marker
    key={name}
    coordinate={place.coords}
    
    pinColor='green'
    onPress={()=> getInfo([place, location])}
    />)
})}


</MapView>

)
}   

return (
<View style={styles.noLocation}>
<Text>Waiting for your GPS location !</Text>

</View>
)


}







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


 











// const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?
//         origin=${location}&destination=${desLoc}&key=AIzaSyCJg8LtFVPMpu7uiJLE37AQ5ZbzpafeWx0`);









