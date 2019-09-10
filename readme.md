# figma-html-export
This script is not very stable! The correct result is not guaranteed.
I'm not a programmer really but here is a little script I wrote to cover some rare cases where I need to create HTML version of
Figma files. There is an online tool called figma2html but it's also not perfect.
Several things work in this script that is not yet implemented in the latter.
Like gradients and boolean groups (but boolean groups only converted to images here).

### Some notes
•All blocks positioned absolutely  
•Constraints will be considered during export. If your Figma page have a block centered inside parent frame with corresponding constaints being set, it will be centered in the output as well (e.g. like so: left:50%; trosform:translateY(-50%);)  
•If something rendered in a wrong way you may try assigning export (png or svg) setting to it in Figma and set stopOnExport:true  
•Some svgs inside Figma might be looking like complex strictures of separate vector paths nested in groups - to reduce complexity assign export settings to the top level nodes of such elements in Figma or Ctrle-E them  
•Icon fonts like FA will not be rendered correctly. Use export setting in Figma to fix  
•Styles for text objects will be added to documents but @font-face not. Some fonts you have localy will work  
•Set line height for text manually (api provide slightly wrong values otherwise)  
•Top level frames exported as separate html files. Transitions between them converted to links. If you need just one frame use "targetFrame" in your config.json  
•Nodes with mirroring (Shift-E Shift-V) may not be correctly parsed  
•At the current stage this script is not very suitable for large documents. It will create too many images in a very irrational way

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
node --experimental-modules  figma-html-export.mjs  
or npm start  
files should appear in the html folder  
to update images remove cache folder  
