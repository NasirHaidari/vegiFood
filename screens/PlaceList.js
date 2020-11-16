import React, { useEffect, useState } from 'react';
import { View, Text, Image, SafeAreaView, StyleSheet, FlatList } from 'react-native'
import { firebase} from '../db'


const db = firebase.firestore

const PlaceList = ({navigation}) => {
    const [Places , setPlaces ] = useState([]);

useEffect(() => {
    const FetchPlaces = async () => {
        const PlacesCollection = await db.collection('Places').get()
        setPlaces(PlacesCollection.docs.map(doc => {
            return doc.data()
         } ))
    }
    FetchPlaces()
    console.log(Places)
},[])

    return (
        Places === ''?
            <View>
            <Text>No data Yet!</Text>
            
            </View>
        :
            <SafeAreaView style={styles.container}>
        <FlatList
          data={Places}
          renderItem={Place}
          keyExtractor={place => place.id}
          extraData={selectedId}
        />
        
      </SafeAreaView>
        
        
    )
}

export default PlaceList;


const styles = StyleSheet.create({

    container: {

        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    }
})



