import { StyleSheet, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import {View, Text} from '@/components/Themed';

export default function WishlistItem({ onPress } : {onPress:() => void}) {
    return (
            <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>Wishlist Item</Text>
            </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row', // Align icon & text
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        justifyContent: 'center',
        width: '100%',
        borderWidth: 1,
    },
    text: {
        color: 'black',
        fontSize: 16,
        fontWeight: '400',
        fontStyle: 'italic',
    },
});