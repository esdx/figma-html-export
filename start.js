
const fs = require('fs')
const path = require('path')
let configPath="./config.json"

var config = JSON.parse(fs.readFileSync(configPath, 'utf8'))

global.XFigmaToken=config.XFigmaToken //X-Figma-Token
global.figmaFileID=config.figmaFileID //figma dociment id (in url)
global.FigmaPageName=config.FigmaPageName
global.targetFrame=config.targetFrame //export only this frame
global.stopOnExport=config.stopOnExport //execute export dont parse chidrens
global.downloadStackSize=config.downloadStackSize //for limiting request to figma api
var linkFile = 'https://api.figma.com/v1/files/'+figmaFileID

//creating folders if not exist
if(!fs.existsSync(path.resolve('html/images'))) fs.mkdirSync(path.resolve('html/images'), { recursive: true })
if(!fs.existsSync(path.resolve('cache'))) fs.mkdirSync(path.resolve('cache'))


import {requestFile} from './modules/request.js'
import {processPage} from './modules/processPage.js'

let data=requestFile(linkFile, XFigmaToken, figmaFileID, true)  //link to file, token, get cached
data.then((result) => {processPage(result, FigmaPageName);}) //start result processing