import { StyleSheet, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import {View, Text} from '@/components/Themed';

export default function ContactSeller({ onPress } : {onPress:() => void}) {
    return (
            <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>Contact seller</Text>
            </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row', // Align icon & text
        alignItems: 'center',
        backgroundColor: 'black',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        justifyContent: 'center',
        width: '100%',
        marginBottom: 10,
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: '400',
        fontStyle: 'italic',
    },
});