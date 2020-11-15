import React, { useState} from 'react';
import { View, Button, Text, StyleSheet, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';


export default ImgPicker = props => {
    const  [pickedImage, setPickedImage ] = useState()
props.takeImage(pickedImage)
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
       props.onImageTaken(image.uri);
            

    }

    return (
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
    </View>
    )

}


const styles = StyleSheet.create({
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

