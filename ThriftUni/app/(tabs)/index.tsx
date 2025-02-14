import { StyleSheet, ScrollView } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
// import ContinueWithGoogleButton from '../../components/Buttons/ContinueWithGoogleButton';
import ContinueWithGoogleButton2 from '../../components/Buttons/AllGoogleButtons';

import { testFirebaseConfig } from '../../firebase.config';
//<ContinueWithGoogleButton onPress={() => console.log('Google Sign-In pressed')} />

const themes = ['neutral', 'light', 'dark'];
const styleTypes = ['rd_ctn', 'rd_na', 'rd_SI', 'rd_SU', 'sq_ctn', 'sq_na', 'sq_SI', 'sq_SU'];

export default function TabOneScreen() {

  testFirebaseConfig();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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