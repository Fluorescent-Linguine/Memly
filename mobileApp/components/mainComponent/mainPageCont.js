import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SideMenu from 'react-native-side-menu';
import { connect } from 'react-redux';

import MapComponent from '../mapComponent/mapComponent.js';
import memlysReducer from '../../redux/memlysReducer.js';
import MyStatusBar from '../common/myStatusBar.js';
import TopNavigationBar from '../common/topNavBar.js';
import DrawerMenu from '../common/drawerMenu.js';

class MainPageContainer extends Component {
  constructor (props) {
    super(props);
    this.state = { isOpen: false }; 
  }

  showSideMenu () {
    this.setState({ isOpen: true });
    var context = this;
    setTimeout(function() {
      context.setState({isOpen: false});
    }, 3000);
  }

  hideSideMenu () {
    this.setState({ isOpen: false });
  }

  render() {
    const menu = <DrawerMenu hideSideMenu={this.hideSideMenu.bind(this)} />;
    return (
      <SideMenu menu={menu} menuPosition={'right'} isOpen={ this.state.isOpen } >
          <MyStatusBar backgroundColor="#0288D1"/>
          <View style ={ styles.container2}>
            <TopNavigationBar hideSideMenu={this.hideSideMenu.bind(this)} showSideMenu={this.showSideMenu.bind(this)} />
            <View style={ styles.container1 }>
              <MapComponent />
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

    buttonText: state.memlysReducer.buttonText
  };
};

export default connect(mapStateToProps)(MainPageContainer);
