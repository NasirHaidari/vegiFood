import React from 'react';
import {ScrollView, View, Button, Text, TextInput, StyleSheet,Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


import Map from '../components';

export default NewPlaceForm = () => {
    const [titleValue, setTitleValue] = useState('title');
    const [selectedImage, setSelectedImage] = useState()
    const [selectedLocation, setSelectedLocation] = useState()


  


    const ImgPicker = props => {
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
           props.onImageTaken(image.uri);
                
    
        }


        const savePlaceHandler = () => {
            console.log('saveHandler',)
        }

        const locationPickedHandler = useCallback(location => {
            setSelectedLocation(location);
        })
        
    
            const titleChangeHandler = text => {
            setTitleValue(text);
    }


    return (  
        

        <ScrollView>
            <View style={Styles.form}>
                <Text style={Styles.label}>Title</Text>
                <TextInput
                    style={Styles.TextInput}
                    onChangeText={titleChangeHandler}
                    value={titleValue}
                />
                <ImagePicker onImageTaken={imageTakenHandler} />
                <LocationPicker
                    
                    onLocationPicked={locationPickedHandler}
                />
                <Button
                    title="Save Place"
                    color={Colors.primary}
                    onPress={savePlaceHandler}
                />
            </View>
        </ScrollView>

    );
}

const Styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2,
        backgroundColor: 'red'
    }
})
}
