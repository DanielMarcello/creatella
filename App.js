import React from "react";
import { StyleSheet, View } from "react-native";

import Product from "./Product/Product"; // Product Component

export default class App extends React.Component {
  componentWillMount() {
    // "handle-delay.js" part
    setTimeout(() => {}, 100 + Math.floor(Math.random() * 3000));
  }

  render() {
    return (
      <View style={styles.container}>
        {/* Product Component */}
        <Product />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "stretch"
  }
});
