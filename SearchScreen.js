'use strict'

var React = require('react-native');

var {
  StyleSheet,
  Text,
  View,
} = React;


var SearchScreen = React.createClass({
  render: function() {
    console.log("render is being called");
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Foo Bar</Text>
      </View>
    );
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

module.exports = SearchScreen;