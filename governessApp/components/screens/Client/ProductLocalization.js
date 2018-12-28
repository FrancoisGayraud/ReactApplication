import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import '../../utils/globalVariable';
import uiTheme from '../../ui/materialVariable';
import {getLocalizationProduct} from '../../action/getLocalizationProduct';
import {connect} from 'react-redux';

const mapDispatchToProps = (dispatch) => {
  return {
    getLocalizationProduct: (apiToken, addressId) =>
      dispatch(getLocalizationProduct(apiToken, addressId)),
  };
};

const mapStateToProps = (state) => {
  return {
    localizationProductData: state.getLocalizationProductReducer,
    tokenData: state.tokenReducer
  };
};

class ProductLocalization extends Component<Props> {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getLocalizationProduct(this.props.tokenData.token.apiToken, this.props.addressId);
  }

  render() {
    console.warn(this.props.localizationProductData);
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        {this.props.localizationProductData.localizationProductData && this.props.localizationProductData.localizationProductData.data &&
          this.props.localizationProductData.localizationProductData.data.map((product, i) => {
            return (
              <View key={i} style={{flex: 1, flexDirection: 'row', borderBottomColor: uiTheme.palette.underlineColor,
              borderBottomWidth: 1, minHeight: 80}}>
                <Image style={{width: 64, height: 64, alignSelf: 'center'}} source={{uri: API_NOBO_URL + product.product.url}}/>
                <View style={{flex: 1, alignSelf: 'center', paddingLeft: 30, justifyContent: 'flex-end'}}>
                  <Text style={{fontSize: 13, paddingLeft: 5, color: '#4c4c4c', fontFamily: 'Montserrat-Medium'}}>{product.description}</Text>
                </View>
              </View>
            )
          })
        }
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductLocalization);
