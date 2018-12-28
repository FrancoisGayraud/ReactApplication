import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {getCardex} from '../../action/getCardex';
import {getInspection} from '../../action/getInspection';
import {getOnGoingMissions} from '../../action/getOnGoingMissions';
import {connect} from 'react-redux';
import uiTheme from '../../ui/materialVariable';
import TaskRate from './TaskRate';
import Comments from './Comments';
import '../../utils/globalVariable';
import ButtonsRatingModal from './ButtonsRatingModal';
import {modalIsVisible} from '../../action/modal';
import NavigationService from '../../navigation/NavigatorService';

const mapStateToProps = (state) => {
  return {
    cardexData: state.getCardexReducer,
    tokenData: state.tokenReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCardex: (apiToken, missionId) =>
      dispatch(getCardex(apiToken, missionId)),
    modalIsVisible: (bool) => dispatch(modalIsVisible(bool)),
    getOnGoingMissions: (apiToken) =>
      dispatch(getOnGoingMissions(apiToken)),
    getLastInspections: (apiToken, rowStartIndex) =>
      dispatch(getInspection(apiToken, rowStartIndex)),
  };
};

class RatingModal extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      comment: [], //array for comments on each grades like "Tâche effectuée à moitié"
      comments: "" //the string for the comments section
    };
    this.rates = [];
    this.rates.push({"rate": 1, "cardex_id": -1});
    this.state.comment.push({text: "Tâche effectuée à moitié", color: '#dc7b23'});
    this.initVariable = false;
    this.ratingCompleted = this.ratingCompleted.bind(this);
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

  // API call to post the result of the inspection
  postInspection() {
    this.rates.shift();
    fetch(API_NOBO_URL + "/governess/inspection",
      {
        method: 'post',
        headers: new Headers({'content-type': 'application/json', 'apiToken': this.props.tokenData.token.apiToken}),
        body: JSON.stringify({
          mission_id: parseInt(this.props.navigation.state.params.item.id),
          average_rate: Math.round(this.getAverageRate()),
          rates: this.rates,
          comments: this.state.comments,
          grooming: parseInt(this.rates[0].rate)
        })
      }).then((response) => {
      let status = response.status;
          return response.json().then((json) => {
        if (status !== 200)
          throw json.message[0];
        return (json);
      });
    })
      .then((postRatesData) => {
        console.log(postRatesData);
        //redo getOnGoingMissions api call to remove the missions the user just rated
        this.props.getOnGoingMissions(this.props.tokenData.token.apiToken);
        Snackbar.show({
          title: 'Inspection enregistrée avec succès',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: uiTheme.palette.accentColor
        });
        //redo getInspection api call to add the missions the user just rated
        this.props.getLastInspections(this.props.tokenData.token.apiToken, 1);
        NavigationService.goBack();
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.props.getCardex(this.props.tokenData.token.apiToken, this.props.navigation.state.params.item.id);
  }

  //Calculate average rate of the inspection before doing the post
  getAverageRate() {
    let total = 0;

    for (var i = 0; i < this.rates.length; i++) {
      total += this.rates[i].rate;
    }
    total = total / this.rates.length;
    total *= 33.3;

    return (total);
  }

  ratingCompleted(rating, task) {
    console.log(this.rates);
    // Parsing the array to update it with the new grade
    for (var i = 0; i < this.rates.length; i++) {
      if (this.rates[i].cardex_id === task.task.id) {
        this.rates[i].rate = rating;
        if (rating === 0) {
          this.state.comment[i] = {text: "Tâche non effectuée", color: '#ff4d4d'};
        }
        else if (rating === 1) {
          this.state.comment[i] = {text: "Tâche effectuée à moitié", color: '#dc7b23'};
        }
        else if (rating === 2) {
          this.state.comment[i] = {text: "Tâche effectuée", color: '#4e9628'};
        }
        else {
          this.state.comment[i] = {text: "Tâche effectuée à la perfection", color: '#067dae'};
        }
        this.setState({});
      }
    }
    this.initVariable = true;
  }

  refreshComments(text) {
    this.setState({comments: text});
  }

  render() {
    let index = 0;
    //let onTimeTask = {id: -1, description: "", value: "Ponctualité"}; Maybe we use it later ?
    let groomingTask = {id: -1, description: "Grooming", value: ""};

    return (
      <View style={{flex : 1}}>
        <ScrollView style={{backgroundColor: uiTheme.palette.primaryColor}}>
          <View style={{paddingBottom: 20}}>
            <Comments comments={this.state.comments} commentsCallback={this.refreshComments.bind(this)}/>
            <TaskRate task={groomingTask} index={0} description={groomingTask.description} value={groomingTask.value}
                      ratingCallback={this.ratingCompleted} comment={this.state.comment} key={0} grooming={true} comments={false}/>
            {
              this.props.cardexData.cardexData && this.props.cardexData.cardexData.data &&
              this.props.cardexData.cardexData.data.map((task, i) => {
                if (!this.initVariable) {
                  // Creating array for the dynamic rating
                  this.rates.push({"rate": 1, "cardex_id": task.id});
                  this.state.comment.push({text: "Tâche effectuée à moitié", color: '#dc7b23'});
                }
                return (
                  <TaskRate task={task} index={i + 1} description={task.description} value={task.value}
                          ratingCallback={this.ratingCompleted} comment={this.state.comment} key={i + 1} grooming={false} comments={false}/>
                );
              })
            }
          </View>
        </ScrollView>
        <ButtonsRatingModal postInspection={this.postInspection.bind(this)}/>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RatingModal);
