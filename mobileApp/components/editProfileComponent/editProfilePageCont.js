import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { connect } from 'react-redux';
import SideMenu from 'react-native-side-menu';
import Icon from 'react-native-vector-icons/Ionicons';

import MapComponent from '../MapComponent/MapComponent.js';
import MyStatusBar from '../common/myStatusBar.js';
import TopNavigationBar from '../common/topNavBar.js';
import DrawerMenu from '../common/drawerMenu.js';
import EditProfile from './editProfile.js';

import userReducer from '../../redux/userReducer.js';
import * as userActions from '../../redux/userReducer.js';

class ProfilePageContainer extends Component {
  constructor (props) {
    super(props);
    this.state = { isOpen: false }; 
  }

  showSideMenu () {
    this.setState({ isOpen: true });
  }

  hideSideMenu () {
    this.setState({ isOpen: false });
  }

  componentWillMount() {
    this.props.dispatch(userActions.updateUserFacebook({isLoggedIn: true}));
    this.props.dispatch(userActions.updateMemlyCount([{}]));
  }

  DateParser(date) {
    console.log('checking date format', date);
    var dateArray = date.split('/');
    var month = Number(dateArray[0]);
    if (month === 1) {
      month = 'January';
    } else if (month === 2) {
      month = 'February';
    } else if (month === 3) {
      month = 'March';
    } else if (month === 4) {
      month = 'April';
    } else if (month === 5) {
      month = 'May';
    } else if (month === 6) {
      month = 'June';
    } else if (month === 7) {
      month = 'July';
    } else if (month === 8) {
      month = 'August';
    } else if (month === 9) {
      month = 'September';
    } else if (month === 10) {
      month = 'October';
    } else if (month === 11) {
      month = 'November';
    } else if (month === 12) {
      month = 'December';
    }

    var day = Number(dateArray[1]);
    var year = dateArray[2];

    var dateFormatted = `${month} ${day}, ${year}`;
    return dateFormatted;
  }

  render() {
    const menu = <DrawerMenu hideSideMenu={this.hideSideMenu.bind(this)} />;
    return (
      <SideMenu menu={menu} menuPosition={'right'} isOpen={ this.state.isOpen } >
          <MyStatusBar backgroundColor="#0288D1"/>
          <View style ={ styles.container2}>
            <TopNavigationBar showSideMenu={this.showSideMenu.bind(this)} />
            <View style={ styles.container1 }>
              <EditProfile user = {this.props.user} userFacebook = {this.props.userFacebook} memlyCount={this.props.memlyCount} />
            </View>
          </View>
      </SideMenu>
    );
  }
}

const styles = StyleSheet.create({
  container2: {
    flex: 1
  },
  container1: {
    flex: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

const mapStateToProps = function(state) {
  return {
    ...state,

    // isLoggedIn: state.userReducer.isLoggedIn,
    // user: state.userReducer.user,
    // userFacebook: state.userReducer.userFacebook,
    // memlyCount: state.userReducer.memlyCount,
    // birthday: state.userReducer.birthday,
  };
};

export default connect(mapStateToProps)(ProfilePageContainer);