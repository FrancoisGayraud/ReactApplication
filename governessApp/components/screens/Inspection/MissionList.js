import React, {Component} from 'react';
import {FlatList, View, Text} from 'react-native';
import {getOnGoingMissions} from '../../action/getOnGoingMissions';
import {List} from 'react-native-elements'
import ListTitle from '../Common/ListTitle';
import Item from './Item';
import {connect} from 'react-redux';
import commonStyles from '../../ui/commonStyles';

const mapStateToProps = (state) => {
  return {
    tokenData: state.tokenReducer,
    onGoingMissionsData: state.getOnGoingMissionsReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOnGoingMissions: (apiToken) =>
      dispatch(getOnGoingMissions(apiToken))
  };
};

//Custom list using List from react-native-elements and FlatList from react-native
class MissionList extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      timer: null
    };
  }

  //Call api again after 60 sec to refresh onGoingMissions
  tick() {
    this.props.getOnGoingMissions(this.props.tokenData.token.apiToken);
  }

  componentDidMount() {
    //Api call to get on going missions
    this.props.getOnGoingMissions(this.props.tokenData.token.apiToken);
    let interval = setInterval(this.tick.bind(this), 60000);
    this.setState({timer: interval});
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  render() {
    if (this.props.onGoingMissionsData.onGoingMissionsData && this.props.onGoingMissionsData.onGoingMissionsData.message === "No on going mission")
      return (
        <View style={commonStyles.container}>
          <ListTitle listTitle={this.props.listTitle}/>
          <View style={[commonStyles.EmptyListInfo, {flex: 7}]}>
            <Text style={commonStyles.textInfo}>
              Il n'y a aucune mission en cours.
            </Text>
          </View>
        </View>
      );
    else {
      return (
        <List containerStyle={{marginTop: 0, borderTopWidth: 0}}>
          {this.props.onGoingMissionsData.onGoingMissionsData && this.props.onGoingMissionsData.onGoingMissionsData.data &&
          <FlatList
            keyExtractor={item => item.id}
            data={this.props.onGoingMissionsData.onGoingMissionsData.data}
            ListHeaderComponent={<ListTitle listTitle={this.props.listTitle}/>}
            stickyHeaderIndices={[0]}
            renderItem={({item}) => <Item notShowChevron={false} item={item}/>}
          /> }
        </List>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MissionList);