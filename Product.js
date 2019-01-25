import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

var cool = require("./");

class Product extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.mainView}>
        <Text style={styles.h1}>Products Grid</Text>
        <Text style={styles.p}>
          Here you're sure to find a bargain on some of the finest ascii
          available to purchase. Be sure to peruse our selection of ascii faces
          in an exciting range of sizes and prices.
        </Text>
        <Text style={styles.p}>But first, a word from our sponsors:</Text>
        <Image
          style={styles.sponsor}
          source={{
            uri: `https://unsplash.it/320/200?image=${Math.floor(
              Math.random() * 1000
            )}`
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    top: "2%",
    paddingHorizontal: 5
  },
  h1: {
    fontSize: 32
  },
  p: {
    marginBottom: 15,
    textAlign: "justify"
  },
  sponsor: {
    width: "50%",
    height: "25%"
  }
});

export default Product;
