/*global ARTICLES*/ 
//ARTICLES is define in webpack
const articles = ARTICLES || [];

console.log('articles: ' , articles);

function getYear( date = new Date()){
  date = new Date(+date);
  return date.getFullYear();
}

function getMonth( date = new Date() ){
  date = new Date(+date);
  return date.getMonth() + 1;
}

function getMinYear(){
  let year = getYear();
  for ( let i = 0 ; i < articles.length ; i++ ){
    if ( getYear(articles[i].date) < year ){
      year = getYear(articles[i].date);
    }
  }
  return year;
}

function getMinMonthByYear( year = getYear()){
  let month = 12;
  for ( let i = 0 ; i < articles.length ; i++ ){
    if ( getYear(articles[i].date) === year && getMonth(articles[i].date) < month ){
      month = getMonth(articles[i].date);
    }
  }
  return month;
}

function getMaxMonthByYear( year = getYear()){
  let month = 1;
  for ( let i = 0 ; i < articles.length ; i++ ){
    if ( getYear(articles[i].date) === year && getMonth(articles[i].date) > month ){
      month = getMonth(articles[i].date);
    }
  }
  return month;
}

function getMaxYear(){
  let year = getYear();
  for ( let i = 0 ; i < articles.length ; i++ ){
    if ( getYear(articles[i].date) > year ){
      year = getYear(articles[i].date);
    }
  }
  return year;
}
/**
 * [getArticlesByYearAndMonth 根据年份和月份获取文章列表]
 * @param  {[type]} year  [description]
 * @param  {Number} month [description]
 * @return {[type]}       [description]
 */
export function getArticlesByYearAndMonth(year = getYear() , month = 0 ){
  let arr = [];
  for ( let i = 0 ; i < articles.length ; i++ ){
    if ( getYear(articles[i].date) === year ){
      if ( month ){
        if ( getMonth(articles[i].date) === month ){
          arr.push(articles[i]);
        }
      }else{
        arr.push(articles[i]);
      }
    }
  }
  return arr;
}

function getMonthArticlesByYear(year = getYear()){
  let arr = [0,0,0,0,0,0,0,0,0,0,0,0];
  let yearsArticles = getArticlesByYearAndMonth(year);
  for ( let i = 0 ; i < yearsArticles.length ; i++ ){
    arr[getMonth(yearsArticles[i].date) - 1] ++;
  }
  return arr;
}

export function getAllArticles(){
  return articles || [];
};

/**
 * [getAllCategory 获取所有分类]
 * @return {[type]} [description]
 */
export function getAllCategory(){
  let arr = [];
  for ( let i = 0 ; i < articles.length ; i++ ){
      for ( let j = 0 ; j < articles[i].categories.length ; j++ ){
        if ( !arr.includes(articles[i].categories[j]) ){
          arr.push(articles[i].categories[j]);
        }
      }
  }
  return arr;
};
/**
 * [getYearCategory 获取每年分类总数]
 * @param  {[type]} year       [description]
 * @param  {[type]} categories [description]
 * @return {[type]}            [description]
 */
function getYearCategory(year = getYear() , categories = getAllCategory()){
  let yearsArticles = getArticlesByYearAndMonth(year);
  let arr = [];
  
  for ( let i = 0 ; i < categories.length ; i++ ){
    arr.push(0);
  }
  
  for ( let i = 0 ; i < yearsArticles.length ; i ++ ){
    for ( let j = 0 ; j < yearsArticles[i].categories.length ; j++ ){
      arr[categories.indexOf(yearsArticles[i].categories[j])]++;
    }    
  }
  return arr;
}
/**
 * [getAllAuthors 获取所有作者]
 * @return {[type]} [description]
 */
function getAllAuthors(){
  let arr = [];
  for ( let i = 0 ; i < articles.length ; i++ ){
    if ( !arr.includes(articles[i].author) ){
      arr.push(articles[i].author);
    }
  }
  return arr;
}
/**
 * [getArticlesByCategory 获取分类文章列表]
 * @param  {[type]} category [description]
 * @return {[type]}          [description]
 */
export function getArticlesByCategory(category){
  let arr = [];
  for ( let i = 0 ; i < articles.length ; i++ ){
    for ( let j = 0 ; j < articles[i].categories.length ; j++ ){
      if ( articles[i].categories[j] === category ){
        arr.push(articles[i]);
      }
    }
  }
  return arr;
};

/**
 * [getYearsArticles 根据年份划分文章]
 * @return {[type]} [description]
 */
export function getYearsArticles() {
  let yearsArticles = {};  
  let minYear = getMinYear();
  let maxYear = getMaxYear();
  for ( let i = minYear ; i <= maxYear ; i++ ){
    yearsArticles[i] = getArticlesByYearAndMonth(i).length;
  }
  return yearsArticles;
};
/**
 * [getMonthsArticles 获取月份数据]
 * @return {[type]} [description]
 */
export function getMonthsArticles(){
  let monthsArticles = {};  
  let minYear = getMinYear();
  let maxYear = getMaxYear();
  for ( let i = minYear ; i <= maxYear ; i++ ){
    monthsArticles[i] = getMonthArticlesByYear(i);
  }
  return monthsArticles;
};
/**
 * [getYearsCategories 获取所有年份分类总数]
 * @return {[type]} [description]
 */
export function getYearsCategories(){
  let yearsCategory = {};  
  let minYear = getMinYear();
  let maxYear = getMaxYear();
  for ( let i = minYear ; i <= maxYear ; i++ ){
    yearsCategory[i] = getYearCategory(i);
  }
  return yearsCategory;
};
/**
 * [getAllMonths 获取所有月份]
 * @return {[type]} [description]
 */
export function getAllMonths(){
  let minYear = getMinYear();
  let maxYear = getMaxYear();
  let minMonth = getMinMonthByYear(minYear);
  let maxMonth = getMaxMonthByYear(maxYear);

  let months = [];
  for ( let i = 0 ; i <= (maxYear - minYear) * 12 + ( maxMonth - minMonth) ; i++ ){
    months.push({
      year: minYear + Math.floor(( minMonth + i - 1 ) / 12),
      month: ( minMonth + i ) % 12 === 0 ? 12 : ( minMonth + i ) % 12
    });
  }
  return months;
};
/**
 * [getAuthorArticles 获取所有作者月份文章总数]
 * @return {[type]} [description]
 */
export function getAuthorArticles(){
  let authorArticles = [];  
  let authors = getAllAuthors();
  let minYear = getMinYear();
  let maxYear = getMaxYear();
  let minMonth = getMinMonthByYear(minYear);
  let maxMonth = getMaxMonthByYear(maxYear);

  let months = getAllMonths();
  for ( let j = 0 ; j < authors.length ; j++ ){
    authorArticles.push({
      name: authors[j],
      data: []
    });
    for ( let i = 0 ; i < months.length ; i++ ){
      authorArticles[j].data.push(0);
      let articleArr = getArticlesByYearAndMonth(months[i].year , months[i].month);
      for (let k = 0 ; k < articleArr.length ; k++ ){
        if ( articleArr[k].author.toLowerCase() === authors[j].toLowerCase() ){
          authorArticles[j].data[i] ++;
        }
      }
    }
  }
  return authorArticles;
};

/**
 * [getAuthorCategory 获取作者文章类别列表]
 * @return {[type]} [description]
 */
export function getAuthorCategory(){
  let authorCategories = [];
  let authors = getAllAuthors();
  let categories = getAllCategory();

  for ( let i = 0 ; i < authors.length ; i++ ){
    authorCategories.push({
      name: authors[i],
      data: [] 
    });
    for ( let j = 0 ; j < categories.length ; j++ ){
      authorCategories[i].data.push(0);
      let articleArr = getArticlesByCategory(categories[j]);
      for ( let k = 0 ; k < articleArr.length ; k++ ){
        if ( articleArr[k].author.toLowerCase() === authors[i].toLowerCase() ){
          authorCategories[i].data[j] ++;
        }
      }
    }
  }
  return authorCategories;
};

