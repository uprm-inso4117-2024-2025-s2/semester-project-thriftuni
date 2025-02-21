import { StyleSheet, ScrollView, Button, Platform  } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

import { useGoogleSignIn } from '../../firebase/auth';
//import GoogleButton from '../../components/Buttons/GoogleButtons.tsx'





export default function TabOneScreen() {
    const { request, promptAsync } = useGoogleSignIn(); // ✅ Obtener el request y promptAsync del hook
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      {/* Renderizar el botón solo si la plataforma es web */}

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