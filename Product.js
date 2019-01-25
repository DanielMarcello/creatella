import React from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";

import faces from "./faces";

const productList = [];

getRandomString = () => {
  return Math.random()
    .toString(36)
    .substr(2);
};

getRandomInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

class Product extends React.Component {
  constructor(props) {
    super(props);

    // Create 500 products
    for (let i = 0; i < 500; i++) {
      productList.push({
        id: getRandomInRange(0, 100000) + "-" + getRandomString(),
        size: getRandomInRange(12, 40),
        price: getRandomInRange(1, 1000),
        face: faces[i % faces.length],
        date: new Date(
          Date.now() - getRandomInRange(1, 1000 * 3600 * 24 * 15)
        ).toString()
      });
    }
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

        <ScrollView>
          <Image
            style={styles.sponsor}
            source={{
              uri: `https://unsplash.it/320/200?image=${Math.floor(
                Math.random() * 1000
              )}`
            }}
          />
        </ScrollView>
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
    width: 93,
    height: 68
  }
});

export default Product;
