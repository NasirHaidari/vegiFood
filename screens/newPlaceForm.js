import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions, Button, Image } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location'
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker';

import Colors from '../constants/Colors';


export default newPlaceForm = () =>{


    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    


    const  [pickedImage, setPickedImage ] = useState()

    const verifyPermission = async () => {
      const result = await  Permissions.askAsync(
          Permissions.CAMERA_ROLL,
           Permissions.CAMERA
           );
        if ( result.status !== 'granted') {
          Alert.alert('Insufficient Permission!', ' allow the Camera', [{ text: 'OK'}]
          );
          return false;
        }
        return true;
    }

const takeImageHandler = async () => {
    const hasPermission = await verifyPermission()
    if (!hasPermission) { 
        return ;
    }
   
   
   const image = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [ 16, 9],
        quality: 0.2,
        

   });
   
   setPickedImage(image.uri);
  //  props.onImageTaken(image.uri);
        

}

 const SavePlaceHandle = () => {
   console.log('testing save')
 }



   
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
     <View>

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


    <View style={styles.imagePicker}> 
    <View style={ styles.imagePreview}>
    {!pickedImage ? 
    <Text>'No Image yet!'</Text> :
    <Image style={styles.image} source={{uri: pickedImage}}/>
    } 
    
    </View>   
    <Button title="Take a pic" 
        color={Colors.primary} 
        onPress={takeImageHandler}
    />
    <Button title="Save the Place"
    color={Colors.Orange}
    onPress={SavePlaceHandle}
    />
</View>





    

    </View>
)
   }   
  
  return (
    <View >
    <Text>No Location Yet!</Text>
    <Text>We need your Location to allow you to save a new place!</Text>
    
    </View>
  )
    


}









const styles = StyleSheet.create({
  MapView: {
    
    marginBottom: 10,
    width: '100%',
    height: 200,
    borderColor: '#ff7f50',
    borderWidth: 3,

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
  },

  imagePicker: {
    alignContent: 'center',
    marginBottom: 15
    

},
imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignContent: 'center',
    borderColor: '#ccc',
    borderWidth: 1

},
image: {
    width: '100%',
    height: '100%'
}
});
