# figma-html-export
This script is not very stable! The correct result is not guaranteed.
I'm not a programmer really but here is a little script I wrote to cover some rare cases where I need to create HTML version of
Figma files. There is an online tool called figma2html but it's also not perfect.
Several things work in this script that is not yet implemented in the latter.
Like gradients and boolean groups (but boolean groups only converted to images here).
### Installation
1. git clone on download this script.  
2. Install dependencies using npm install
### Configuration
Create config.json with following fields  
{  
    "XFigmaToken":"your figma api token",  
    "figmaFileID":"file id (from url)",  
    "FigmaPageName":"name of the page to convert",  
    "targetFrame":false,  <---- convert only this frame if false convert all  
    "stopOnExport":true,  <--- if element have export configured it wil be placed like so (no jpeg and pdf only png and svg)  
    "downloadStackSize":30 <--- to reduse numder of requests that will be send to API images will be requested by stacks  
}  
### Usage
node figma-html-export.js
files should appear in html folder
to update images remove cache folder