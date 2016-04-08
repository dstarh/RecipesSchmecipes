'use strict';

var React = require('react-native');
var {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} = React;

var getImageSource = require('./getImageSource');

var RecipeRow = React.createClass({
  render: function() {
    return(
      <View>
        <TouchableWithoutFeedback
          onPress={this.props.onSelect}>
          <View style={styles.row}>
            <Image 
              source={getImageSource(this.props.recipe, 1)}
              style={styles.rowImage}/>
            <View style={styles.textContainer}>
              <Text style={styles.recipeName} numberOfLines={2}>
                {this.props.recipe.name}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  textContainer: {
    flex: 1,
  },
  recipeName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
    alignItems: 'center',
  },
  row: {
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 5,
  },
  rowImage: {
    backgroundColor: '#dddddd',
    height: 80,
    marginRight: 10,
    width: 120,
  },
  cellBorder: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: StyleSheet.hairlineWidth,
    marginLeft: 4,
  },
});

module.exports = RecipeRow;
