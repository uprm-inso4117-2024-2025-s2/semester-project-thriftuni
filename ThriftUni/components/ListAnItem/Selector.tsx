import { StyleSheet, Text, TouchableOpacity } from 'react-native'

export default function Selector({type} : {type: string}) {
    return (
        <TouchableOpacity style={styles.selectorContainer} onPress={() => alert(`Pressed on ${type} button.`)}>
            <Text style={styles.selectorLabel}>{type}</Text>
            <Text style={styles.selectorText}>Select &gt;</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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
});