import React, {Component} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Card} from 'react-native-elements';
import uiTheme from '../../ui/materialVariable';
import ItemLine from '../Common/ItemLine';

export default class Comments extends Component<Props> {
  constructor(props) {
    super(props)
    this.state= {
      comments: this.props.comments
    }
  }

  refreshComments(text) {
    this.setState({comments: text});
  }

  render() {
    return(
      <View>
        <Card containerStyle={{
          backgroundColor: 'white',
          borderRadius: 10,
          borderColor: uiTheme.palette.accentColor,
          borderWidth: 2}}>
          <ItemLine description={"Commentaires"} iconName="assignment" truncate={false}/>
          <View
            style={{
              paddingTop: 5,
              borderBottomColor: uiTheme.palette.underlineColor,
              borderBottomWidth: 1
            }}
          />
          <View style={styles.textAreaContainer} >
            <TextInput
              underlineColorAndroid="transparent"
              placeholder={"Vos commentaires..."}
              placeholderTextColor={"grey"}
              multiline={true}
              onChangeText={this.props.commentsCallback}
            />
          </View>
        </Card>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textAreaContainer: {
    marginTop: 10,
    borderColor: uiTheme.palette.accentColor,
    borderWidth: 1,
    padding: 5,
    borderRadius: 10
  },
});