import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  Button,
  ActivityIndicator
} from "react-native";
import Sponsor from "./components/Sponsor";

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
      shownProducts: [],
      selecterSort: "",
      loading: false
    };

    // Create 500 products
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

    // en-US currency number format
    this.formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    });
  }

  componentDidMount() {
    // Sets the first 20 products
    this.setState({ shownProducts: productList.slice(0, 20) });
    this.generateSponsor();
  }

  /* Sponsors functions */
  generateSponsor = () => {
    var numberExists = false;
    while (!numberExists) {
      var randomNumber = Math.floor(Math.random() * 1080);
      if (this.state.sponsors.indexOf(randomNumber) == -1) {
        this.setState({ sponsors: [...this.state.sponsors, randomNumber] });
        numberExists = true;
      }
    }
  };

  /* Products functions */
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

  renderFooter = () => {
    return (
      <View
        style={{
          paddingTop: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  handleLoadMore = () => {
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
  };

  render() {
    return (
      <View style={styles.mainView}>
        {/* Header Content */}
        <Text style={styles.h1}>Products Grid</Text>
        <Text style={styles.p}>
          Here you're sure to find a bargain on some of the finest ascii
          available to purchase. Be sure to peruse our selection of ascii faces
          in an exciting range of sizes and prices.
        </Text>
        <Text style={styles.p}>But first, a word from our sponsors:</Text>

        {/* Sponsors */}
        <FlatList
          style={{ height: 150 }}
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

        {/* Sort by Section */}
        <View style={[styles.verticalView]}>
          <Text>Sort by:</Text>
          <Button
            onPress={() => {
              this.sortProducts("size");
            }}
            title="Size"
            color="#841584"
          />
          <Button
            onPress={() => {
              this.sortProducts("price");
            }}
            title="Price"
            color="#841584"
          />
          <Button
            onPress={() => {
              this.sortProducts("key");
            }}
            title="ID"
            color="#841584"
          />
        </View>

        {/* Products Grid */}
        <FlatList
          style={styles.productGrid}
          data={this.state.shownProducts}
          extraData={this.state}
          renderItem={({ item }) => (
            <View key={item.key} style={styles.verticalView}>
              <Text style={{ fontSize: item.size }}>{item.face}</Text>
              <Text>{this.formatter.format(item.price)}</Text>
              <Text>{item.date}</Text>
            </View>
          )}
          onEndReached={this.handleLoadMore}
          onEndThreshold={10}
          ListFooterComponent={this.renderFooter}
          onEndReachedThreshold={0.5}
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
    fontSize: 32
  },
  p: {
    marginBottom: 15,
    textAlign: "justify"
  },
  sponsor: {
    width: 93,
    height: 68
  },
  verticalView: {
    flexDirection: "row"
  },
  productGrid: {
    marginBottom: 15
  }
});

export default Product;
