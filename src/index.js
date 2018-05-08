'use strict';

const path = require('path');
const fs = require('fs');

const TreeWorker = require('tree-worker');
const config = require('../config');

let treeWorker = new TreeWorker();

/**
 * [getArticle 获取.md文档]
 * @param  {[Object]} articles [文章列表对象]
 * @return {[Array]}          [文章数组]
 */
function getArticle(articles) {
    console.log('=================== getArticle ==================================\n');
    console.log('articles: ' , articles);
    let arr = [];
    for ( let name in articles ){
        //获取markdown文章
        if ( articles[name].type === 'S_IFREG' && ('' + articles[name].paths.ext).toLowerCase() === '.md' ){
            arr.push({
                path: articles[name].origin,
                name: articles[name].paths.name
            });
        }
    }
    return arr;
}

function readFile(pt){
    return new Promise((resolve ,reject)=>{
        fs.readFile(pt , {encoding:'utf-8'} , (err , data)=>{
            if ( err ){
                return reject(err);
            }
            return resolve(data);
        });
    });
}

/**
 * [readArticleInformation 获取全部文章信息]
 * @param  {[Array]} articles [文章数组]
 * @return {[Array]}          [文章详情数组]
 */
async function readArticleInformation(articles){
    console.log('\n\n=================== readArticleInformation ==================================\n');
    console.log('articles: ' , articles);

    let arr = [];
    for ( let i = 0 ; i < articles.length ; i++ ){
        try{
            let result = await readFile(articles[i].path);
            let header = {
                categories: 'unkonw',
                name: articles[i].name
            };
            let title = result.match(/(\r\n?|\n)title:(\s*[^\r\n]+)(\r\n?|\n)/i);
            let date = result.match(/(\r\n?|\n)date:(\s*[^\r\n]+)(\r\n?|\n)/i);
            let categories = result.match(/(\r\n?|\n)categor(ies|y):(\s*\[?[^\r\n]+\]?)(\r\n?|\n)/i);
            let author = result.match(/(\r\n?|\n)author:(\s*[^\r\n]+)(\r\n?|\n)/i);
            
            if ( title && date && author && title[2] && date[2] && author[2] ){
                header.title = ('' + title[2]).trim();
                header.date = +new Date(('' + date[2]).trim());
                header.author = ('' + author[2]).trim();
            }else{
                throw new Error('unkonw article title , author , date');
            }
            if ( categories && categories[3] ){
                header.categories = ('' + categories[3]).trim().replace(/^\[/, '').replace(/\]$/,'');
            }
            arr.push(header);
        }catch(err){
            console.error(`read article ${articles[i].path}  information error:  ${err}`);
        }
    }

    return arr;
}

function writeJsFile(articles){
    return new Promise((resolve , reject)=>{
        let str = 'module.exports=' + JSON.stringify(articles) + ';';
        fs.writeFile(path.resolve(__dirname , config.dist) , str , (err)=>{
            return err ? reject(err) : resolve(true);
        });
    });
}

/**
 * [parseArticle 解析数据]
 * @param  {[Array]} articles [文章列表]
 * @return {[type]}          [description]
 */
function parseArticle(articles){
    console.log('\n\n=================== parseArticle ==================================\n');
    console.log('articles: ' , articles);
    return articles;
}

treeWorker.work(config.entryDir)
    .then((that)=>that.stat)
    .then(getArticle)
    .then(readArticleInformation)
    .then(parseArticle)
    .then(writeJsFile)
    .catch(err=>console.log(err));

