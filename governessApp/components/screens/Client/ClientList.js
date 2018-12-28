import React, {Component} from 'react';
import {FlatList, View, Text} from 'react-native';
import {List, SearchBar} from 'react-native-elements'
import {connect} from 'react-redux';
import {getClientAddresses} from "../../action/getClientAddresses";
import commonStyles from '../../ui/commonStyles';
import ClientItem from './ClientItem';
import uiTheme from '../../ui/materialVariable';

const mapStateToProps = (state) => {
  return {
    clientData: state.getClientAddressesReducer,
    tokenData: state.tokenReducer,
    connectionState: state.connectionCheckReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getClientAddresses: (apiToken) =>
      dispatch(getClientAddresses(apiToken))
  };
};

class ClientList extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      userInput: ''
    };
    this.filteredData = null;
  }

  componentDidMount() {
    this.props.getClientAddresses(this.props.tokenData.token.apiToken);
  }

  filterData(userInput) {
    this.setState({
      userInput
    });
    if (userInput === '')
      this.filteredData = this.props.clientData.clientAddressesData.data;
    else
      this.filteredData = this.props.clientData.clientAddressesData.data.filter(
        item => {
          let fullName = item.firstname + ' ' + item.lastname;
          fullName = fullName.toLowerCase();
          let fullAddress = item.address + ' ' + item.zipcode;
          fullAddress = fullAddress.toLowerCase();
          userInput = userInput.toLowerCase();
          return (fullName.includes(userInput) || fullAddress.includes(userInput));
        }
      );
  }

  render() {
    if (this.props.clientData.clientAddressesData !== null &&
      this.filteredData === null)
      this.filteredData = this.props.clientData.clientAddressesData.data.slice(0, 10);
    if (this.filteredData === null)
      return (
        <View style={commonStyles.EmptyListInfo}>
          <Text style={commonStyles.textInfo}>
            Vous n'avez aucun client.
          </Text>
        </View>
      );
    else {
      return (
        <List containerStyle={{marginTop: 0, borderTopWidth: 0}}>
          <FlatList
            keyExtractor={item => item.id}
            data={this.filteredData}
            ListHeaderComponent={
              <SearchBar
                containerStyle={{backgroundColor: uiTheme.palette.primaryColor}}
                inputStyle={{
                  backgroundColor: uiTheme.palette.darkerPrimaryColor, color: uiTheme.palette.accentColor,
                  textAlign: 'center', fontFamily: 'Montserrat-Medium'
                }}
                placeholderTextColor={uiTheme.palette.accentColor}
                onChangeText={userInput => this.filterData(userInput)}
                icon={{color: uiTheme.palette.accentColor}}
                onClear={() => this.filterData('')}
                placeholder='Nom ou adresse du client'
              />
            }
            stickyHeaderIndices={[0]}
            renderItem={({item}) => <ClientItem notShowChevron={false} item={item}/>}
          />
        </List>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientList);