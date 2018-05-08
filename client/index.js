'use strict';
import {lineChart , areaChart , radialChart} from 'tui-chart';

import './index.scss';
import '../node_modules/tui-chart/dist/tui-chart.css';

import {
  getYearsArticlesData , getMonthsArticlesData ,
  getYearsCategoriesData , getAuthorArticlesData,
  getAuthorCategoryData} from './render';

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
    spline: true,
    showDot: false 
  },
  tooltip: {
    suffix: '篇'
  }
};

lineChart(document.getElementById('all-years'), getYearsArticlesData() , Object.assign(options , {xAxis:{title:'Year'}}));
lineChart(document.getElementById('all-months'), getMonthsArticlesData() , Object.assign(options , {xAxis:{title:'Month'}}));
lineChart(document.getElementById('category-years'), getYearsCategoriesData() , Object.assign(options , {xAxis:{title:'Year'}}));
areaChart(document.getElementById('all-authors'), getAuthorArticlesData() , Object.assign(options , {chart:{width: COMMON_WIDTH , height: 660} , xAxis:{title:'Month'}}));
radialChart(document.getElementById('author-categories'), getAuthorCategoryData() , Object.assign(options , {xAxis:{title:'分类'} , plot: { type: 'circle'}}));