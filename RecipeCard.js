'use strict';

var React = require('react-native');
var {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ListView,
} = React;

var {height, width} = Dimensions.get('window');
var ApiKeys = require('./ApiKeys')
var getImageSource = require('./getImageSource');
// var entities = require('entities')
var API_URL = "https://api.nutrio.com"
var RecipeCard = React.createClass({
  getInitialState: function() {
    return {
      ingredientDataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      prepNotesDataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    }
  },
  componentDidMount: function() {
    this.fetchFullReicpe(this.props.recipe.guid);
  },
  getRecipeEndpoint: function(guid: string){
    return API_URL + "/api/v3/meals.json?guid=" + guid; //FIXME WHY I gotta put .json
  },
  fetchFullReicpe: function(guid: string ){
    fetch(this.getRecipeEndpoint(guid), this.getFetchOptions())
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        this.setState({
          loading: false,
          prepNotesDataSource: this.getPrepNotesDataSource(responseData[0].recipes[0].prep_notes),
          ingredientDataSource: this.getIngredientDataSource(responseData[0].recipes[0].recipe_foods),
        })
      })
      .done()
  },
  renderIngredient: function(ingredient: Object) {
    return (
      <Text style={styles.ingredient}>{ingredient.food.name}</Text>
    )
  },
  renderPrepNote: function(
    prepNote: Object,
    sectionID: number | string,
    rowID: number | string,
    highlightRowFunc: (sectionID: ?number | string, rowID: ?number | string) => void,
  ) {
    return (
      <View>
        <Text style={styles.ingredient}>{parseInt(rowID) + 1}:{' '}{prepNote.action}</Text>
      </View>
    )
  },
  getIngredientDataSource: function(ingredients: Array<any>) {
    return this.state.ingredientDataSource.cloneWithRows(ingredients);
  },
  getPrepNotesDataSource: function(prepNotes: Array<any>) {
    return this.state.prepNotesDataSource.cloneWithRows(prepNotes);
  },
  getFetchOptions: function(){
    return {
      headers: {
        'Authorization': 'Basic ' + btoa('not_needed:' + ApiKeys.user),
        'Content-Type': 'application/json',
      }
    }
  },
  render: function() {
    return(
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image
            resizeMode="contain"
            source={getImageSource(this.props.recipe, 4)}
            style={styles.image}/>
        </View>
        <View>
          <Text style={styles.recipeName}>
            {this.props.recipe.name}
          </Text>
        </View>
        <Text style={styles.header}>
          Ingredients:
        </Text>
        <ListView
          dataSource={this.state.ingredientDataSource}
          renderRow={this.renderIngredient}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}/>
        <Text style={styles.header}>
          Preparation Instructions:
        </Text>
        <ListView
          dataSource={this.state.prepNotesDataSource}
          renderRow={this.renderPrepNote}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false} />
      </ScrollView>
    )
  }
});


var styles = StyleSheet.create({
  contentContainer: {
    padding: 0,
    marginTop: -50,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'stretch',
  },
  header: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 20,
    padding: 5
  },
  ingredient: {
    paddingLeft: 5
  },
  image: {
    flex: 1,
    width: width,
    height: 350
  },
  rightPane: {
    justifyContent: 'space-between',
    flex: 1,
  },
  recipeName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: "#fff",
    backgroundColor: 'rgba(0,0,0,.5)',
    marginTop: -78,
    padding: 5
  },
  rating: {
    marginTop: 10,
  },
  ratingTitle: {
    fontSize: 14,
  },
  ratingValue: {
    fontSize: 28,
    fontWeight: '500',
  },
  mpaaWrapper: {
    alignSelf: 'flex-start',
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 3,
    marginVertical: 5,
  },
  mpaaText: {
    fontFamily: 'Palatino',
    fontSize: 13,
    fontWeight: '500',
  },
  
  mainSection: {
    flexDirection: 'row',
  },
});

module.exports = RecipeCard;