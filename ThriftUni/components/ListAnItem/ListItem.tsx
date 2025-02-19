import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { ScrollView, TextInput} from 'react-native'
import ImageUploader from './ImageUploader';
import Selector from './Selector'
import PriceInput from './PriceInput';
import Buttons from './Buttons';
    

export default function ListItem() {
    const [text, setText] = useState('');
    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <View style={styles.topBar}>
                <TouchableOpacity style={{padding: 10}}
                                    onPress={() => alert('Pressed on Back button.')}>
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
                {/* Item details */}
                <Selector type="Category"/> 
                <Selector type="Brand"/> 
                <Selector type="Condition"/> 
                <Selector type="Color"/> 
                <PriceInput/>
            </ScrollView>
            {/* Save to draft and post buttons */}
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
}
)