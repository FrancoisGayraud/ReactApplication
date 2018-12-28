import React, {Component} from 'react';
import {View, Linking} from 'react-native';
import {getAddressInfo} from '../../action/getAddressInfo';
import {connect} from 'react-redux';
import GridText from '../Common/GridText';
import { Button } from 'react-native-elements';
import uiTheme from '../../ui/materialVariable';

const mapDispatchToProps = (dispatch) => {
  return {
    getAddressInfo: (apiToken, addressId) =>
      dispatch(getAddressInfo(apiToken, addressId))
  };
};

const mapStateToProps = (state) => {
  return {
    tokenData: state.tokenReducer,
    addressData: state.getAddressInfoReducer
  };
};

class BuildingAccess extends Component<Props> {
  constructor(props) {
    super(props);
  }

  openItinerary() {
    let destination = encodeURI(this.props.addressData.addressData.data.address + " "
        + this.props.addressData.addressData.data.country + " "
        + this.props.addressData.addressData.data.zipcode);
    Linking.openURL("https://www.google.com/maps/dir/?api=1&destination=" + destination);
  }

  componentDidMount() {
    this.props.getAddressInfo(this.props.tokenData.token.apiToken, this.props.addressId);
  }

  render() {
    return (
      <View>
        { this.props.addressData.addressData && this.props.addressData.addressData.data &&
        this.props.addressData.addressData.data.address !== null &&
        <View>
          { this.props.addressData.addressData.data.address !== null && <GridText left={"Adresse"} right={this.props.addressData.addressData.data.address}/> }
          { this.props.addressData.addressData.data.address !== null && <GridText left={"Clefs"}
                                                                                  right={this.props.addressData.addressData.data.have_key === 1 ? "oui" : "non"}/> }
          { this.props.addressData.addressData.data.digicode !== null && <GridText left={"Digicode"} right={this.props.addressData.addressData.data.digicode}/> }
          { this.props.addressData.addressData.data.digicode_2 !== null && <GridText left={"Digicode secondaire"} right={this.props.addressData.addressData.data.digicode_2}/> }
          { this.props.addressData.addressData.data.batiment !== null && <GridText left={"Bâtiment"} right={this.props.addressData.addressData.data.batiment}/> }
          { this.props.addressData.addressData.data.floor !== null && <GridText left={"Etage"} right={this.props.addressData.addressData.data.floor}/> }
          { this.props.addressData.addressData.data.door !== null && <GridText left={"Porte"} right={this.props.addressData.addressData.data.door}/> }
          <Button icon={{name: 'map', type: 'feather'}}
                  title="Itinéraire"
                  buttonStyle={{ marginTop: 10, borderRadius: 10, borderColor: uiTheme.palette.accentColor, borderWidth: 2 }}
                  backgroundColor={uiTheme.palette.primaryColor}
                  color={uiTheme.palette.accentColor}
                  onPress={this.openItinerary.bind(this)}/>
        </View>
        }
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildingAccess);