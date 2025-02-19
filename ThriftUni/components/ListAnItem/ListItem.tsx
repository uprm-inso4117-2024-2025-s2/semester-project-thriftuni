import { StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { ScrollView, TextInput} from 'react-native'
import ImageUploader from '../ImageUploader';

function Selector({type} : {type: string}) {
    return (
        <TouchableOpacity style={styles.selectorContainer} onPress={() => alert(`Pressed on ${type} button.`)}>
            <Text style={styles.selectorLabel}>{type}</Text>
            <Text style={styles.selectorText}>Select &gt;</Text>
        </TouchableOpacity>
    )
}

function PriceInput() {
    const [price, setPrice] = useState('');

    return (
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Price</Text>
          <TextInput
            style={styles.priceInput}
            placeholder="$ 0.00"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />
        </View>
    );
}

function Buttons() {
    return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.draftButton}
                            onPress={() => alert(`Pressed on 'Save to drafts' button.`)}>
            <Text style={styles.draftButtonText}>Save to drafts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.postButton}
                            onPress={() => alert(`Pressed on 'Post listing' button.`)} >
            <Text style={styles.postButtonText}>Post listing</Text>
          </TouchableOpacity>
        </View>
    )
}
    

export default function ListItem() {
    const [text, setText] = useState('');
    return (
        <View style={styles.container}>
            {/* Top Bar here*/}
            <View style={styles.topBar}>
                <TouchableOpacity style={{padding: 10}}>
                    <Text>←</Text>
                </TouchableOpacity>
                <Text style={{fontSize: 22}}>Sell an item</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {/*Add picture section*/}
                <ImageUploader/>
                {/*Add description section*/}
                <View style={{padding: 5}}>
                    <Text style={{fontSize:18, marginBottom: 5,}}>Description</Text>
                    <TextInput 
                        style={styles.descriptionInput}
                        placeholder='Enter description ...'
                        placeholderTextColor="grey"
                        value={text}
                        onChangeText={setText}
                        textAlignVertical='top'
                        multiline={true}/>
                </View>
                {/*Divider*/}
                <View style={{marginTop: 20, marginBottom: 20, height: 5, borderWidth: 5, borderColor:'grey'}}/>
                {/*Category*/}
                <Selector type="Category"/> 
                <Selector type="Brand"/> 
                <Selector type="Condition"/> 
                <Selector type="Color"/> 
                <PriceInput/>
            </ScrollView>
            <Buttons/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex:1,
    },
    topBar: {
        alignContent: 'center',
        alignItems: 'center',
        height: 50,
        flexDirection: 'row',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    scrollView: {
        flexGrow: 1,
        paddingBottom: 120,
    },
    picturesSection: {
        padding: 5,
    },
    descriptionInput: {
        height: 130,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#E4AAAA',
    },
    selectorContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: 10,
        borderBottomWidth: 1, 
        borderBottomColor: '#ccc', 
        width: '100%',
        marginBottom: 15,
      },
    selectorLabel: {
        fontSize: 16,
        color: '#333',
      },
    selectorText: {
        fontSize: 12,
        color: '#888', 
      },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
    },
    priceLabel: {
        fontSize: 16,
        color: '#333',
    },
    priceInput: {
        fontSize: 12,
        color: '#000',
        textAlign: 'right',
        width: 80, 
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: 'white', // Keeps the background solid when scrolling
    },
    draftButton: {
       flex: 1,
       borderWidth: 1,
       borderColor: 'black',
       padding: 12,
       borderRadius: 5,
       alignItems: 'center',
       marginRight: 10,
    },
    draftButtonText: {
       color: 'black',
       fontSize: 16,
    },
    postButton: {
       flex: 1,
       backgroundColor: 'black',
       padding: 12,
       borderRadius: 5,
       alignItems: 'center',
    },
    postButtonText: {
       color: 'white',
       fontSize: 16,
    },
}
)