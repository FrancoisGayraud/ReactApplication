import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Rating, Card} from 'react-native-elements';
import uiTheme from '../../ui/materialVariable';
import ItemLine from '../Common/ItemLine';

export default class TaskRate extends Component<Props> {
  constructor(props) {
    super(props)
  }

  render() {
    let task = this.props.task;
    return (
        <Card containerStyle={{
          backgroundColor: 'white',
          borderRadius: 10,
          borderColor: uiTheme.palette.accentColor,
          borderWidth: 2}}>
          {!this.props.grooming &&
          <ItemLine description={this.props.value} iconName="place"/> }
          <ItemLine description={this.props.description} iconName="assignment" truncate={false}/>
          <View
            style={{
              paddingTop: 5,
              borderBottomColor: uiTheme.palette.underlineColor,
              borderBottomWidth: 1
            }}
          />
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingTop : 5}}>
            <Rating
              type="star"
              ratingCount={3}
              imageSize={22}
              startingValue={1}
              onFinishRating={(rating) => this.props.ratingCallback(rating, {task})}
            />
            <Text style={{
              fontSize: 11,
                fontWeight: 'bold',
              color: this.props.comment[this.props.index].color,
              alignSelf: 'center'
            }}>
              {this.props.comment[this.props.index].text}</Text>
          </View>
        </Card>
    );
  }
}
