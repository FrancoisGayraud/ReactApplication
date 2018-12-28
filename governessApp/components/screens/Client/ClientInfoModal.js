import React, {Component} from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import commonStyles from '../../ui/commonStyles';
import {modalIsVisible} from '../../action/modal';
import '../../utils/globalVariable';
import {Card} from 'react-native-elements';
import BuildingAccess from './BuildingAccess';
import Rooms from './Rooms';
import ProductLocalization from './ProductLocalization';
import uiTheme from '../../ui/materialVariable';

const mapDispatchToProps = (dispatch) => {
  return {
    modalIsVisible: (bool) => dispatch(modalIsVisible(bool)),
  };
};

const mapStateToProps = (state) => {
  return {
    tokenData: state.tokenReducer,
  };
};

class ClientInfoModal extends Component<Props> {
  constructor(props) {
    super(props);
    this.willBlurSubscription = this.props.navigation.addListener(
      'willBlur',
      payload => {this.componentWillBlur()}
    );
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      payload => {this.componentWillFocus()}
    );
  }

  componentWillUnmount() {
    this.willBlurSubscription.remove();
    this.willFocusSubscription.remove();
  }

  componentWillFocus() {
    this.props.modalIsVisible(true);
  }

  componentWillBlur() {
    this.props.modalIsVisible(false);
  }

  render() {
    return (
      <ScrollView style={{backgroundColor: uiTheme.palette.primaryColor}}>
        <View style={[commonStyles.container, {paddingBottom: 20, backgroundColor: uiTheme.palette.primaryColor}]}>
          <Card containerStyle={{borderRadius: 10, borderColor: uiTheme.palette.accentColor}}>
            <Text style={{textAlign: "center", fontSize: 18, fontWeight: 'bold', color: 'black'}}>{this.props.navigation.state.params.clientName}</Text>
          </Card>
          <Card title={'Accès au bâtiment'} titleStyle={styles.titleStyle}
                dividerStyle={styles.dividerStyle}
                containerStyle={{borderRadius: 10, borderColor: uiTheme.palette.accentColor}}>
            <BuildingAccess addressId={this.props.navigation.state.params.addressId}/>
          </Card>
          <Card title={'Lieux'} titleStyle={styles.titleStyle}
                dividerStyle={styles.dividerStyle}
                containerStyle={{borderRadius: 10, borderColor: uiTheme.palette.accentColor}}>
            <Rooms addressId={this.props.navigation.state.params.addressId}/>
          </Card>
          <Card title={'Localisation des produits'} titleStyle={styles.titleStyle}
                dividerStyle={styles.dividerStyle}
                containerStyle={{borderRadius: 10, borderColor: uiTheme.palette.accentColor}}>
            <ProductLocalization addressId={this.props.navigation.state.params.addressId}/>
          </Card>
        </View>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientInfoModal);

const styles = StyleSheet.create({
  titleStyle: {
    color: 'black',
    fontFamily: 'Montserrat-Medium'
  },
  dividerStyle: {
    backgroundColor: uiTheme.palette.accentColor,
    height: 2
  }
});
