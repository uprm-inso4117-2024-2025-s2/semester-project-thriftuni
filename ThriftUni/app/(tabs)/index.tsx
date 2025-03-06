import { StyleSheet } from 'react-native';

// FOR DEVELOPMENT PURPOSES ONLY------------------

import { testFirebaseConfig } from '../../firebase.config';

const dummyData : any[] = [];

export default function TabOneScreen() {

  testFirebaseConfig();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F9FF',
    paddingBottom: 80,
  },
  listingGrid: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
