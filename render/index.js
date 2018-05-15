import {
  getYearsArticles , getMonthsArticles ,
  getYearsCategories , getAllCategory ,
  getAuthorArticles , getAllMonths ,
  getAuthorCategory , getArticlesByCategory ,
  getAllArticles } from '../lib';

export function getYearsArticlesData() {
  let yearsArticles = getYearsArticles();
  console.log('getYearsArticles: ' , yearsArticles);
  
  let categories = [];
  for ( let year in yearsArticles ){
    categories.push(year);
  }
  categories.sort((a,b)=>a - b);

  let series = {
    name: 'all year',
    data: []
  };

  for ( let i = 0 ; i < categories.length ; i++ ){
    series.data.push(yearsArticles[categories[i]]);
  }
  return {
    categories: categories,
    series: [series]
  };
};

export function getYearsTotalArticlesData() {
  let yearsArticles = getYearsArticles();
  console.log('getYearsArticles: ' , yearsArticles);
  
  let categories = [];
  for ( let year in yearsArticles ){
    categories.push(year);
  }
  categories.sort((a,b)=>a - b);

  let series = {
    name: 'total articles',
    data: []
  };

  for ( let i = 0 ; i < categories.length ; i++ ){
    if ( i === 0 ){
      series.data.push(yearsArticles[categories[i]]);
    }else{
      series.data.push(yearsArticles[categories[i]] + series.data[i - 1]);
    }
  }
  return {
    categories: categories,
    series: [series]
  };
};

export function getMonthsArticlesData() {
  let monthsArticles = getMonthsArticles();
  console.log('getMonthsArticles: ' , monthsArticles);
  
  let years = [];
  let series = [];
  for ( let year in monthsArticles ){
    years.push(year);
  }
  years.sort((a,b)=>a - b);

  for ( let i = 0 ; i < years.length ; i++ ){
    series.push({
      name: years[i],
      data: monthsArticles[years[i]]
    });
  }
  return {
    categories: [1,2,3,4,5,6,7,8,9,10,11,12],
    series
  };
};

export function getYearsCategoriesData(){
  let yearsCategories = getYearsCategories();
  let categories = getAllCategory();
  console.log('getYearsCategories: ' , yearsCategories);
  console.log('getAllCategory: ' , categories);

  let years = [];
  let series = [];
  for ( let year in yearsCategories ){
    years.push(year);
  }
  years.sort((a,b)=>a - b);

  for ( let i = 0 ; i < categories.length ; i++ ){
    series.push({
      name: categories[i],
      data: []
    });
    for ( let year in yearsCategories ){
      series[i].data.push(yearsCategories[year][i]);
    }
  }
  return {
    categories: years,
    series
  };
};

export function getAllCategoryData(){
  let categories = getAllCategory();
  let allArticles = getAllArticles();
  console.log('getAllCategory: ' , categories);
  console.log('getAllArticles: ' , allArticles);

  let series = [];

  for ( let i = 0 ; i < categories.length ; i++ ){
    series.push({
      name: categories[i],
      data: getArticlesByCategory(categories[i]).length
    });
  }
  return {
    categories: ['文章分类'],
    series
  };
};

export function getAuthorArticlesData(){
  let authorArticles = getAuthorArticles();
  let months = getAllMonths();

  console.log('getAuthorArticles: ' , authorArticles);
  console.log('getAllMonths: ' , months);

  let categories = [];
  for ( let i = 0 ; i < months.length ; i ++ ){
    categories.push('' + (months[i].month < 10 ? '0' + months[i].month : months[i].month) + '/' + months[i].year);
  }

  return {
    categories,
    series: authorArticles
  }
};

export function getAuthorCategoryData(){
  let authorCategories = getAuthorCategory();
  let categories = getAllCategory();

  console.log('getAuthorCategory: ' , authorCategories);
  console.log('getAllCategory: ' , categories);

  return {
    categories,
    series: authorCategories
  };
};

export function getAuthorAllArticlesData(){
  let authorArticles = getAuthorArticles();

  console.log('getAuthorArticles: ' , authorArticles);

  let series = [];
  
  for ( let i = 0 ; i < authorArticles.length ; i++ ){
    series.push({
      name: authorArticles[i].name,
      data: 0
    });

    for ( let j = 0 ; j < authorArticles[i].data.length ; j ++ ){
      series[i].data += authorArticles[i].data[j];
    }
  }

  return {
    categories: ['全部文章'],
    series
  };
};