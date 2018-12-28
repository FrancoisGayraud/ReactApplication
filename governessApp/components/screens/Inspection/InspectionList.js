import React, {Component} from 'react';
import {FlatList, View, Text} from 'react-native';
import {List, SearchBar} from 'react-native-elements'
import {connect} from 'react-redux';
import Item from './Item';
import {getInspection} from '../../action/getInspection';
import commonStyles from '../../ui/commonStyles';
import uiTheme from '../../ui/materialVariable';
import {formatDate} from '../../utils/utilsFunction';

const mapStateToProps = (state) => {
  return {
    tokenData: state.tokenReducer,
    inspectionData: state.getInspectionReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLastInspections: (apiToken, rowStartIndex) =>
      dispatch(getInspection(apiToken, rowStartIndex)),
  };
};

//Custom list using List from react-native-elements and FlatList from react-native
class InspectionList extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      userInput: ''
    };
    this.rowStartIndex = 1;
    this.filteredData = null;
  }

  componentDidMount() {
    //Api call to get past inspections
    this.props.getLastInspections(this.props.tokenData.token.apiToken,
      this.rowStartIndex);
  }

  //Callback called when user try to scroll past the end of the list to load
  //more inspections
  onScrollEndCallBack() {
    if (!this.props.inspectionData.isLoading) {
      this.rowStartIndex += 1;//Number of inspection returned by api in one call
      this.props.getLastInspections(this.props.tokenData.token.apiToken,
        this.rowStartIndex);
    }
  }

  filterData(userInput) {
    this.setState({
      userInput
    });
    if (userInput === '')
      this.filteredData = this.props.inspectionData.inspectionData.data;
    else
      this.filteredData = this.props.inspectionData.inspectionData.data.filter(
        item => {
          let clientName = item.clientFirstname + ' ' + item.clientLastname + ' ' + formatDate(item.date);
          clientName = clientName.toLowerCase();
          let providerName = item.providerFirstname + ' ' + item.providerLastname + ' ' + item.averageRate;
          providerName = providerName.toLowerCase();
          userInput = userInput.toLowerCase();
          return (clientName.includes(userInput) || providerName.includes(userInput));
        }
      );
  }

  render() {
    if (this.props.inspectionData.inspectionData !== null &&
      this.filteredData === null)
      this.filteredData = this.props.inspectionData.inspectionData.data;
    if (this.props.inspectionData.inspectionData === null)
      return (
        <View style={commonStyles.EmptyListInfo}>
          <Text style={commonStyles.textInfo}>
            Vous n'avez réalisé aucune inspection.
          </Text>
        </View>
      );
    else
      return (
        <List containerStyle={{marginTop: 0, borderTopWidth: 0}}>
          <FlatList
            keyExtractor={item => item.id}
            data={this.filteredData}
            onEndReached={this.onScrollEndCallBack.bind(this)}
            onEndReachedThreshold={0.5}
            ListHeaderComponent={
              <SearchBar
                containerStyle={{backgroundColor: uiTheme.palette.primaryColor}}
                inputStyle={{backgroundColor: uiTheme.palette.darkerPrimaryColor, color: uiTheme.palette.accentColor,
                  textAlign: 'center'}}
                placeholderTextColor={uiTheme.palette.accentColor}
                onChangeText={userInput => this.filterData(userInput)}
                icon={{color: uiTheme.palette.accentColor}}
                onClear={() => this.filterData('')}
                placeholder='Inspections passées'
              />
            }
            stickyHeaderIndices={[0]}
            renderItem={({item}) => <Item notShowChevron={true} item={item.mission} date={item.date} average_rate={item.average_rate}/>}
          />
        </List>
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InspectionList);