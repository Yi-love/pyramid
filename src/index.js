'use strict';

const path = require('path');
const fs = require('fs');
const yamlFront = require('yaml-front-matter');
const TreeWorker = require('tree-worker');

const treeWorker = new TreeWorker();

module.exports = function pyramid(options = {}){

    /**
     * [isExtensionsFile 是否为相关文章]
     * @param  {String}  ext [description]
     * @return {Boolean}     [description]
     */
    function isExtensionsFile(ext = ''){
        let extensions = Array.isArray(options.extensions) && options.extensions.length ? options.extensions : ['.md' , '.markdown'];

        for ( let i = 0 ; i < extensions.length ; i++ ){
            if ( extensions[i].toLowerCase() === ext.toLowerCase() ){
                return true;
            }
        }
        return false;
    }
    /**
     * [getArticles 获取文档]
     * @param  {[Object]} articles [文章列表对象]
     * @return {[Array]}          [文章数组]
     */
    function getArticles(articles) {
        let arr = [];
        for ( let name in articles ){
            //获取文章
            if ( articles[name].type === 'S_IFREG' && isExtensionsFile(articles[name].paths.ext) ){
                arr.push({
                    path: articles[name].origin,
                    name: articles[name].paths.name,
                    date: articles[name].stats.mtime || articles[name].stats.ctime
                });
            }
        }
        return arr;
    }
    /**
     * [readFile 读取文件]
     * @param  {[type]} pt [description]
     * @return {[type]}    [description]
     */
    function readFile(pt){
        return new Promise((resolve ,reject)=>{
            fs.readFile(pt , {encoding:options.encoding || 'utf-8'} , (err , data)=>{
                if ( err ){
                    return reject(err);
                }
                return resolve(data);
            });
        });
    }
    function getDate (article , defDate){
        try{
            if ( article.date ){
                return +new Date(article.date);
            }
            if ( /^\d{4}\-\d{1,2}\-\d{1,2}-/.test(article.lastName) ){
                let names = article.lastName.split('-');
                return +new Date(names[0] , names[1] , names[2]);
            }
        }catch(err){
            console.error(`get ${article.lastName} file date is error: ${err}`);
            return +new Date(defDate);
        }
    }
    function queryFixed(article , defDate = new Date()){
        let realQuery = {};
        realQuery.title = article.title;
        let categories = article.categories || article.category || 'unkonw';
        if ( !Array.isArray(categories) ){
            categories = [categories];
        }
        realQuery.categories = categories;
        realQuery.tags = article.tags || [];
        realQuery.author = article.author || options.author || 'Owner';
        realQuery.date = getDate(article , defDate);
        return realQuery;
    }
    /**
     * [parseArticles 获取全部文章信息]
     * @param  {[Array]} articles [文章数组]
     * @return {[Array]}          [文章详情数组]
     */
    async function parseArticles(articles){
        let arr = [];
        for ( let i = 0 ; i < articles.length ; i++ ){
            try{
                let article = yamlFront.loadFront(await readFile(articles[i].path));
                article['__content'] = '';
                article.lastName = articles[i].name;
                arr.push(queryFixed(article , articles[i].date));
            }catch(err){
                console.error(`yamlFront parser article ${articles[i].path}  is error:  ${err}`);
            }
        }
        return arr;
    }
    /**
     * [writeFile 写入数据]
     * @param  {[type]} articles [文章数据]
     * @return {[type]}          [description]
     */
    function writeFile(articles){
        return new Promise((resolve , reject)=>{
            let str = 'module.exports=' + JSON.stringify(articles) + ';';
            fs.writeFile(path.resolve(__dirname , '../articles.js') , str , (err)=>{
                return err ? reject(err) : resolve(true);
            });
        });
    }

    return treeWorker.work(options.root)
        .then((that)=>that.stat)
        .then(getArticles)
        .then(parseArticles)
        .then(writeFile)
        .catch(err=>console.error(err));
};