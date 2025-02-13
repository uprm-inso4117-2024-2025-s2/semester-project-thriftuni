import { StyleSheet, Text, View, Animated, TouchableWithoutFeedback } from 'react-native'
import React, {useState} from 'react'
import { transform } from '@babel/core'
import { FontAwesome } from '@expo/vector-icons'

interface CollapsibleViewProps {
  startContent: React.ReactNode | null,
  title: string,
  children: React.ReactNode,
  noArrow?: boolean,
}

export default function CollapsibleView({startContent, title, children, noArrow}: CollapsibleViewProps) {
  const [isCollapsed, setCollapsed] = useState<boolean>(true)
  const [animation, setAnimation] = useState<Animated.Value>(new Animated.Value(0))

  const toggleCollapsed = () => {
    if (isCollapsed) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false
      }).start();
    }
    setCollapsed(!isCollapsed);
  }

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200]
  })

  const rotateInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-90deg"]
  })

  return (
    <View style={{borderBottomColor: "black", borderBottomWidth: 1}}>
      <TouchableWithoutFeedback onPress={toggleCollapsed}>
        <View style={styles.header}>
        <View style={styles.title_icon}>
          {startContent}
          <Text>{title}</Text>
        </View>
        {(!noArrow) && 
        <Animated.View  style={{transform: [{rotate: rotateInterpolate}], alignItems: "center", padding: 10}}>
          <FontAwesome name='angle-left' size={24} />
        </Animated.View>
        }
        </View>
      </TouchableWithoutFeedback>
      <Animated.View style={{height: heightInterpolate, overflow: 'hidden'}}>
        {children}
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  title_icon: {
    flexDirection:"row", 
    alignItems: "center", 
    justifyContent: "flex-start",
    gap: 5,
    padding: 10
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
})