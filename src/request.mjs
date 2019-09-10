/*const fs = require('fs')
const path = require('path')
const axios = require('axios')*/
import fs from 'fs'
import path from 'path'
import axios from 'axios'

import Cache from 'file-system-cache'
console.log(Cache)
const cache = Cache.default ({
    basePath: "./cache", // Path where cache files are stored
  })

let requestFile = function(link, token, fileID, cached) {
    if(cached) cached=cache.getSync(fileID, false) //if not cached then request from API

    if (cached) {
        console.log('getting page from cache')
        return cache.get(fileID)
    }else{
        const instance = axios.create({
            headers: {'X-Figma-Token': token}
        });
        console.log('Requesting page from API.')
        return instance.get(link)
        .then((response) => {
                console.log('Success!')
                cache.set(fileID, response.data)
                /*const savePath = path.resolve('./cache', 'response-data')
                const writer = fs.createWriteStream(savePath)
                writer.write(JSON.stringify(response.data))*/
                return response.data
            },
            (error) => {
                console.log(error)
            }
        )
    }
}

export {requestFile};

class Stack {
    constructor(){
        this.counter=0
        this.svg=[]
        this.png=[]
    }
    process(elemId, imageName, format){
        this.counter++ //total images processed
        var cached = cache.getSync(imageName, false);
        if (!cached) { //enqueue
            this[format].push({id:elemId, name:imageName})
        } else { // get from cache
            //console.log('geting from cache: ' + imageName+'.'+format);
            const savePath = path.resolve('./html', 'images', imageName +'.'+ format)
            const writer = fs.createWriteStream(savePath)
            writer.write(Buffer.from(cached.data));
        }
        if(this[format].length==global.downloadStackSize){ //global stack counter here
            
            this.getImages(format, this[format])
            this[format]=[]//empty
        }
    }
    getImages(format){
        console.log('-----' + this[format].length + ' .'+ format + ' processing')
        //aggregate ids
        let stack = this[format]
        let ids=''
        this[format].forEach( row =>{
            ids+=row.id+','
        })
        ids=ids.slice(0, -1)
            const instance = axios.create({
            baseURL: 'https://api.figma.com/v1/images/',
            timeout: 30000,
            headers: {'X-Figma-Token': global.XFigmaToken}
        });
        let link = global.figmaFileID
        link+= '?ids='+ids+'&format='+ format;
        if(this[format].length>0)
        {return instance.get(link)
            .then((response) => {
                
                var images = response.data.images;   //{elemId : url}
                if(typeof url === 'object' && url === null) console.log('wrong url!')
                else downloadImages(images, stack, format, cache);  //need to set cache
            },
            (error) => {
                console.log(error);
            }
        );}
    }
    getImagesLeft(){
        this.getImages('svg')
        this.getImages('png')
    }
}

let stack = new Stack();
export {stack}

let getImageMap = function(elemId, imageName='key', format='png', link=figmaFileID, token=XFigmaToken){
    stack.process(elemId, imageName, format)
}
export {getImageMap};

function downloadImages(images, stack, format, cache){  
    let queue = Object.entries(images)
    queue.forEach(row=>{
        let name =''
        let id =''
        stack.forEach(stackRow=>{
            if(stackRow.id==row[0]) {name=stackRow.name; id = stackRow.id}
        })
        downloadImage(row[1], name,format,cache, id)
    })
}

function downloadImage (url, name, ext, cache, id) { //id for diagnostic
    const savePath = path.resolve('./html', 'images', name +'.'+ ext)
    const writer = fs.createWriteStream(savePath)
    const instance = axios.create({
        responseType: 'arraybuffer',
    });
    if(typeof url === 'object' && url === null) {
        console.log('wrong url! ' + id)
    } else {
        instance.get(url)
        .then((response) => {
            writer.write(response.data);
            cache.set(name, response.data)
        },
        (error) => {
            console.log('no way it is failed!');
            console.log(error);
        }
    );}
}