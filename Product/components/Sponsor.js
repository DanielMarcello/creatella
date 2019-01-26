import React from "react";
import { StyleSheet, Image, ScrollView } from "react-native";

class Sponsor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Image
        key={this.props.imageId}
        style={styles.sponsor}
        source={{
          uri: `https://unsplash.it/320/200?image=${this.props.imageId}`
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  sponsor: {
    width: 93,
    height: 68,
    marginLeft: 8,
    marginBottom: 4
  }
});

export default Sponsor;
