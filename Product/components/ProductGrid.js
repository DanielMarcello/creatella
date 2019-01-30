import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Button,
  ActivityIndicator
} from "react-native";

class ProductGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    // en-US currency number format
    this.formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    });
  }

  /* Products functions */
  sortProducts = attrKey => {
    this.props.sortProducts(attrKey);
  };

  renderFooter = () => {
    return this.props.shownProducts.length == this.props.productList.length ? (
      <View style={styles.gridFooter}>
        <Text style={{ textAlign: "center" }}>~ end of catalogue ~</Text>
      </View>
    ) : (
      <View style={styles.gridFooter}>
        <ActivityIndicator animating size="large" color="#38023B" />
      </View>
    );
  };

  handleLoadMore = () => {
    this.props.handleLoadMore();
  };

  render() {
    return (
      <View style={styles.mainView}>
        {/* Sort by Section */}
        <View style={[styles.verticalView]}>
          <Text style={{ paddingTop: 10 }}>Sort by:</Text>
          <Button
            onPress={() => {
              this.sortProducts("size");
            }}
            title="Size"
            color="#9E2B25"
          />
          <Button
            onPress={() => {
              this.sortProducts("price");
            }}
            title="Price"
            color="#9E2B25"
          />
          <Button
            onPress={() => {
              this.sortProducts("key");
            }}
            title="ID"
            color="#9E2B25"
          />
        </View>

        {/* Products Grid */}
        <FlatList
          style={styles.productGrid}
          data={this.props.shownProducts}
          extraData={this.props}
          renderItem={({ item }) => (
            <View key={item.key} style={[styles.productItem]}>
              <Text style={{ fontSize: item.size, textAlign: "center" }}>
                {item.face}
              </Text>
              <View style={[styles.verticalView, { flex: 1 }]}>
                <Text style={{ textAlign: "center", flex: 1 }}>
                  {this.formatter.format(item.price / 100)}
                </Text>
                <Text style={{ textAlign: "center", flex: 1 }}>
                  {item.date}
                </Text>
              </View>
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
    flex: 5,
    paddingHorizontal: 5
  },
  verticalView: {
    flexDirection: "row"
  },
  productGrid: {
    marginBottom: 15,
    backgroundColor: "#F6F6E5"
  },
  productItem: {
    borderColor: "#38023B",
    borderWidth: 5,
    padding: 5,
    flex: 1
  },
  gridFooter: {
    paddingTop: 20,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderColor: "#CED0CE"
  }
});

export default ProductGrid;
