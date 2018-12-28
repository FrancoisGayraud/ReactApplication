import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import '../../utils/globalVariable';
import uiTheme from '../../ui/materialVariable';
import {getCardex} from '../../action/getCardex';
import {resetCardexData} from '../../action/getCardex';
import {connect} from 'react-redux';

const mapDispatchToProps = (dispatch) => {
  return {
    getCardex: (apiToken, addressId) =>
      dispatch(getCardex(apiToken, undefined, addressId)),    // 2nd argument is missionId (used in ratingModal to retreive card from a mission), here we retrieve cardex from an addressId so we set it to undefined
    resetCardexData: () => dispatch(resetCardexData())
  };
};

const mapStateToProps = (state) => {
  return {
    cardexData: state.getCardexReducer,
    tokenData: state.tokenReducer
  };
};

class Rooms extends Component<Props> {
  constructor(props) {
    super(props);
    this.rooms = [];
    this.renderedRooms = [];
  }

  initRenderedRoomsArray() {
    this.renderedRooms = [];
    this.rooms = [];
    //Creating an array with all the tasks for each rooms, to have all tasks of one room in one object of this array
    for (let i = 0; i < this.props.cardexData.cardexData.data.length; i++) {
      if (!this.rooms.includes(this.props.cardexData.cardexData.data[i].list_reference_id)) {
        let tmp = {};
        this.rooms.push(this.props.cardexData.cardexData.data[i].list_reference_id);
        tmp = {id: this.props.cardexData.cardexData.data[i].list_reference_id, desc: [this.props.cardexData.cardexData.data[i].description],
          img: API_NOBO_URL + this.props.cardexData.cardexData.data[i].place.url};
        this.renderedRooms.push(tmp);
      } else {
        for (let u = 0; u < this.renderedRooms.length; u++) {
          if (this.renderedRooms[u].id === this.props.cardexData.cardexData.data[i].list_reference_id) {
            this.renderedRooms[u].desc.push(this.props.cardexData.cardexData.data[i].description);
          }
        }
      }
    }
  }

  componentWillMount() {
    this.props.resetCardexData();
    this.props.getCardex(this.props.tokenData.token.apiToken, this.props.addressId);
  }

  // Check data[0].url to know if the store cleared the cardexData from the modal in inspection
  render() {
    { this.props.cardexData.cardexData && this.props.cardexData.cardexData.data && this.props.cardexData.cardexData.data[0]
    && this.initRenderedRoomsArray() }
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        {this.renderedRooms.map((room, i) => {
          return(
            <View key={i} style={{flex: 1, flexDirection: 'row', borderBottomColor: uiTheme.palette.underlineColor,
              borderBottomWidth: 1, minHeight: 90, paddingBottom: 10}}>
              <Image style={{width: 64, height: 64, alignSelf: 'center'}} source={{uri: room.img}}/>
              <View style={{flex: 1, alignSelf: 'center', justifyContent: 'flex-end', paddingLeft: 30}}>
                { room.desc.map((task, i) => {
                  return (
                    <View style={{flexDirection: 'row'}} key={i}>
                      <Text>{'\u2022'}</Text>
                      <Text style={{fontSize: 13, paddingLeft: 5, paddingRight: 5, color: '#4c4c4c', fontFamily: 'Montserrat-Medium'}}>{task}</Text>
                    </View>
                  );
                })
                }
              </View>
            </View>);
        })}
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
