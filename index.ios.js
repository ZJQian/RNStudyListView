/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity
} from 'react-native';


var Car = require('./Car.json')
var RNStudyListView = React.createClass ({

//初始化函数
  getInitialState(){

    //配置区数据
    var getSectionData = (dataBlob,sectionID) => {
      return dataBlob[sectionID];
    };

    //配置行数据
    var getRowData = (dataBlob,sectionID,rowID) => {
      return dataBlob[sectionID + ':' +rowID];
    };

    return {
      dataSource : new ListView.DataSource({

        getSectionData: getSectionData,//获取区中的数据
        getRowData: getRowData,//获取行中的数据
        rowHasChanged: (r1,r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1,s2) => s1 !== s2

      })

    }

  },

  render() {
    return (<ListView />);
  },

  componentDidMount(){
    this.loadDataFromJson();
  },

  loadDataFromJson(){
    //获取json数据
    var jsonData = Car.data;

    //定义一些变量
    var dataBlob = {},
        sectionIDs = [],
        rowIDs = [],
        cars = [];

    for (var i = 0; i < jsonData.length; i++) {
      //1.把区号放入sectionIDs数组中
      sectionIDs.push(i);

      //2.把区中的内容放入dataBlob对象中
      dataBlob[i] = jsonData[i].title;

      //3.取出该组中所有的车
      cars = jsonData[i].cars;
      rowIDs[i] = [];

      //遍历所有的车数组
      for (var j = 0; j < cars.length; j++) {
        //1.把行号放入rowIDs[i]中
        rowIDs[i].push(j);
        //2.把每一行的内容放入dataBlob对象中
        dataBlob[i + ':' + j] = cars[j];
      }
    }

    //更新状态
    this.setState({
      dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob,sectionIDs,rowIDs)
    });
  },

  render(){
    return (
      <View style = {styles.outerViewStyle}>
        <View style={styles.headerViewStyle}>
            <Text style={{color:'white',fontSize:25}}>车的品牌</Text>
        </View>
        <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            renderSectionHeader={this.renderSectionHeader}
        />
      </View>
    );
  },

  // 每一行的数据
  renderRow(rowData){
      return(
          <TouchableOpacity activeOpacity={0.5}>
              <View style={styles.rowStyle}>
                 <Text style={{marginLeft:5}}>{rowData.name}</Text>
              </View>
          </TouchableOpacity>
      );
  },

  renderSectionHeader(sectionData,sectionID) {
    return(
      <View style={styles.sectionHeaderViewStyle}>
        <Text style={{marginLeft:5,color:'red'}}>{sectionData}</Text>
      </View>
    );
  }
});

//设置样式
const styles = StyleSheet.create({
  outerViewStyle: {
    //占满窗口
    flex: 1
  },
  headerViewStyle: {
    height: 64,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowStyle: {
    //设置主轴的方向
    flexDirection: 'row',
    //侧轴方向居中
    alignItems: 'center',

    padding: 10,
    borderBottomColor: '#e8e8e8',
    borderBottomWidth: 0.5
  },
  sectionHeaderViewStyle: {
    backgroundColor: '#e8e8e8',
    justifyContent: 'center',
    height: 25
  }
});


AppRegistry.registerComponent('RNStudyListView', () => RNStudyListView);
