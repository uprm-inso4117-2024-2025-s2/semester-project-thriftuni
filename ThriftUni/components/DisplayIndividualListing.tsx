import { StyleSheet, ScrollView, Dimensions } from 'react-native';
import { View, Text } from '@/components/Themed';
import React from 'react';
import ImageCarousel, {ImageItem} from './ImageCarousel';
import ListingDescription from './ListingDescription';

export interface ListingDetails {
    title: string;
    pictures: string[];
    description: string;
    sellerName: string;
    sellerBio: string;
}


export default function DisplayIndividualListing({ title, pictures, description, sellerName, sellerBio }: ListingDetails) {
    const images = pictures && pictures.length > 0
        ? pictures
        : [
`https://picsum.photos/200?random=${Math.floor(Math.random() * 100)}`,
          ];
    return (
        <View style={styles.container}>
            {/* Scrollable Content */}
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.listingTitle}>{title}</Text>
                <ImageCarousel/>
                <ListingDescription description={description}/>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        padding: 16,
    },
    listingTitle: {
        fontSize: 28,
        fontWeight: '600',
        marginBottom: 15,
        marginTop: 10,
        color: 'black',
        fontStyle: 'italic',
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
    },
    sellerName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        color: 'black',
    },
    sellerBio: {
        fontSize: 16,
        color: 'gray',

    },
});