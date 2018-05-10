import {
  getYearsArticles , getMonthsArticles ,
  getYearsCategories , getAllCategory ,
  getAuthorArticles , getAllMonths ,
  getAuthorCategory} from '../lib';

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
    series: series
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
    series: series
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