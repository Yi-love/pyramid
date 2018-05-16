'use strict';
import {lineChart , columnChart , pieChart , areaChart , radialChart} from 'tui-chart';

import './index.scss';
import './tui-chart.css'; //先这样解决

import {
  getYearsArticlesData , getMonthsArticlesData ,
  getYearsCategoriesData , getAllCategoryData , 
  getAuthorArticlesData , getAuthorCategoryData,
  getAuthorAllArticlesData , getYearsTotalArticlesData,
  getAllYearsArticlesData , getMonthsTotalArticlesData ,
  getAllMonthsArticlesData } from '../render';

/**
 * [css 获取css]
 * @param  {[type]} dom  [description]
 * @param  {[type]} attr [description]
 * @return {[type]}      [description]
 */
function css(dom , attr) {
  return window.getComputedStyle(dom)[attr];
}

let COMMON_WIDTH = parseInt(css(document.getElementById('body-container') , 'width')) - 1;
let COMMON_HEIGHT = 500;

let options = {
  chart:{
    width: COMMON_WIDTH,
    height: COMMON_HEIGHT
  },
  yAxis: {
    title: 'Amount',
    pointOnColumn: true
  },
  series: {
    showDot: false 
  },
  tooltip: {
    suffix: '篇'
  }
};

function format(){
  return  function(value, chartType, areaType, valuetype, legendName) {
    if (areaType === 'makingSeriesLabel') { // formatting at series area
      value = value + '篇';
    }
    return value;
  }
}

lineChart(document.getElementById('all-years'), getYearsArticlesData() , Object.assign({} , options , {xAxis:{title:'Year'} , series:{showDot: false,zoomable: true}}));
pieChart(document.getElementById('articles-years'), getAllYearsArticlesData() , Object.assign({} ,options , {tooltip: {} , chart:{width: COMMON_WIDTH , height: COMMON_HEIGHT , format: format()} , series: {radiusRange: ['40%', '100%'] ,showLegend: true,showLabel: true,labelAlign: 'outer'}}));
lineChart(document.getElementById('all-articles-years'), getYearsTotalArticlesData() , Object.assign({} , options , {xAxis:{title:'Year'} , series:{showDot: false,zoomable: true}}));
columnChart(document.getElementById('year-all-months'), getMonthsArticlesData() , Object.assign({} ,options , {xAxis:{title:'Month'}}));
lineChart(document.getElementById('all-months'), getAllMonthsArticlesData() , Object.assign({} , options , {xAxis:{title:'Month'} , series:{showDot: false,zoomable: true}}));
pieChart(document.getElementById('month-articles'), getMonthsTotalArticlesData() , Object.assign({} ,options , {tooltip: {} , chart:{width: COMMON_WIDTH , height: COMMON_HEIGHT , format: format()} , series: {radiusRange: ['40%', '100%'] ,showLegend: true,showLabel: true,labelAlign: 'outer'}}));
columnChart(document.getElementById('category-years'), getYearsCategoriesData() , Object.assign({} ,options , {xAxis:{title:'Year'}}));
pieChart(document.getElementById('all-categories'), getAllCategoryData() , Object.assign({} ,options , {tooltip: {} , chart:{width: COMMON_WIDTH , height: 800 , format: format()} , series: {radiusRange: ['40%', '100%'] ,showLegend: true,showLabel: true,labelAlign: 'outer'}}));
areaChart(document.getElementById('all-authors'), getAuthorArticlesData() , Object.assign({} , options , {chart:{width: COMMON_WIDTH , height: 660} , xAxis:{title:'Month'}}));
radialChart(document.getElementById('author-categories'), getAuthorCategoryData() , Object.assign({} , options , {chart:{width: COMMON_WIDTH , height: 660} , xAxis:{title:'分类'} , plot: { type: 'circle'}}));
pieChart(document.getElementById('author-articles'), getAuthorAllArticlesData() , Object.assign({} ,options , {tooltip: {} , chart:{width: COMMON_WIDTH , height: 800 , format: format()} , series: {radiusRange: ['40%', '100%'] ,showLegend: true,showLabel: true,labelAlign: 'outer'}}));




