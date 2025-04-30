import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Buttons() {
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

const styles = StyleSheet.create({
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
})