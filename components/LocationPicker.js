import React, { useState, useEffect} from 'react'
import { View, Button, Text, ActivityIndicator, Alert, StyleSheet} from 'react-native'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
 


import Colors from '../constants/Colors'
import MapPreview from './MapPreview'



const LocationPicker = ({route}) => {
   
    const [ isFetching, setIsFetching] = useState(false)
    const [pickedLocation, setPickedLocation] = useState()
    // const mapPickedLocation = props.navigation.getParam('pickedLocation')
    const mapPickedLocation = route.params.pickedLocation

    const {onLocationPicked} = route.params;

    useEffect(() => {
        if (mapPickedLocation) {
            setPickedLocation(mapPickedLocation)
            props.onLocationPicked(mapPickedLocation)
        }
    }, [mapPickedLocation, onLocationPicked])

    const verifyPermission = async () => {
        const result = await  Permissions.askAsync(Permissions.LOCATION);
          if ( result.status !== 'granted') {
            Alert.alert('Insufficient Permission!', ' allow the Location', [{ text: 'OK'}]
            );
            return false;
          }
          return true;
      }


    const getLocationHandler = async () => {
       const hasPermission = await verifyPermission()
        if (!hasPermission) {
             return
        }
        try{
            setIsFetching(true)
        const location = await Location.getCurrentPositionAsync({timeout: 5000})
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        })
        props.onLocationPicked({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        })
        console.log(location)
        } catch (err) {
            Alert.alert('Could not fetch location','Please try again later or pick a location on the map.', [{ text: 'Okey'}])
        }
        setIsFetching(false)
    }

        const pickOnMapHandler = () => {
            props.navigation.navigate('Map')
        }



    return (
        <View style={styles.locationPicker}>
        <MapPreview 
        style={ styles.mapPreview} 
        location={pickedLocation} 
        onPress={pickOnMapHandler}
        >
        {isFetching ?(
        <ActivityIndicator size='large' color={Colors.primary} />
        ) : (
        <Text>NO LOCATION YET!</Text>
        )}
        </MapPreview>
        <View style={styles.action}>
        <Button
        title="Get User LOcation" 
        color={Colors.primary} 
        onPress={getLocationHandler}
         />

         <Button
         title="Pick On Map" 
         color={Colors.primary} 
         onPress={pickOnMapHandler}
          />

        </View>
    </View>
    )
}


const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15,
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1 
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    }
})


export default LocationPicker