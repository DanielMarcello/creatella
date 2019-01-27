import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import Sponsor from "./components/Sponsor";
import ProductGrid from "./components/ProductGrid";

import faces from "./data/faces";

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

    this.state = {
      sponsors: [],
      shownProducts: []
    };

    // Creates 500 products
    for (let i = 0; i < 500; i++) {
      productList.push({
        key: getRandomInRange(0, 100000) + "-" + getRandomString(),
        size: getRandomInRange(12, 40),
        price: getRandomInRange(1, 1000),
        face: faces[i % faces.length],
        date: new Date(
          Date.now() - getRandomInRange(1, 1000 * 3600 * 24 * 15)
        ).toString()
      });
    }
  }

  componentDidMount() {
    // Sets the first 20 products
    this.setState({ shownProducts: productList.slice(0, 20) });
    this.generateSponsor();
  }

  /* Sponsors functions */
  generateSponsor = () => {
    let numberExists = false;
    while (!numberExists) {
      let randomNumber = Math.floor(Math.random() * 1080);
      if (this.state.sponsors.indexOf(randomNumber) == -1) {
        this.setState({ sponsors: [...this.state.sponsors, randomNumber] });
        numberExists = true;
      }
    }
  };

  /* Products Grid functions */
  sortProducts = attrKey => {
    this.setState({
      shownProducts: this.state.shownProducts.sort((a, b) => {
        if (a[attrKey] > b[attrKey]) {
          return 1;
        }
        if (a[attrKey] < b[attrKey]) {
          return -1;
        }
        // a must be equal to b
        return 0;
      })
    });
  };

  handleLoadMore = () => {
    if (this.state.shownProducts.length !== productList.length) {
      setTimeout(() => {
        console.log("Refreshing...");
        const { shownProducts } = this.state;
        const newProducts = productList.slice(
          shownProducts.length,
          shownProducts.length + 20
        );
        this.setState({
          shownProducts: [...shownProducts, ...newProducts]
        });
        this.generateSponsor();
      }, 2000);
    }
  };

  render() {
    return (
      <View style={styles.mainView}>
        {/* Header Content */}
        <Text style={styles.h1}>Products Grid</Text>
        <Text style={[styles.p, { flex: 1 }]}>
          Here you're sure to find a bargain on some of the finest ascii
          available to purchase. Be sure to peruse our selection of ascii faces
          in an exciting range of sizes and prices.
        </Text>
        <Text style={[styles.p, { flex: 0 }]}>
          But first, a word from our sponsors:
        </Text>

        {/* Sponsors */}
        <FlatList
          style={{ flex: 1 }}
          data={this.state.sponsors}
          extraData={this.state}
          renderItem={({ item }) => <Sponsor imageId={item} />}
          keyExtractor={item => item.toString()}
          numColumns={3}
        >
          {this.state.sponsors.map(item => (
            <Sponsor imageId={item} key={item} />
          ))}
        </FlatList>

        <ProductGrid
          shownProducts={this.state.shownProducts}
          productList={productList}
          sortProducts={attrKey => {
            this.sortProducts(attrKey);
          }}
          handleLoadMore={this.handleLoadMore}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    top: "2%",
    paddingHorizontal: 5
  },
  h1: {
    fontSize: 32,
    flex: 0.5
  },
  p: {
    textAlign: "justify"
  }
});

export default Product;
