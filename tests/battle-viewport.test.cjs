const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const classes=new Set(),properties=new Map(),events=new Map(),frames=[];
let narrow=true,height=135;
const viewport={offsetTop:0,height:844,scale:1,addEventListener:(name,fn)=>events.set('viewport:'+name,fn)};
const dock={classList:{toggle(name,on){on?classes.add(name):classes.delete(name)}},style:{setProperty:(key,value)=>properties.set(key,value),removeProperty:key=>properties.delete(key)},getBoundingClientRect:()=>({height})};
const document={activeElement:{matches:()=>false},getElementById:()=>dock,addEventListener:(name,fn)=>events.set('document:'+name,fn)};
const window={visualViewport:viewport,matchMedia:()=>({matches:narrow}),requestAnimationFrame:fn=>{frames.push(fn);return frames.length},addEventListener:(name,fn)=>events.set('window:'+name,fn)};
vm.runInNewContext(fs.readFileSync('battle-viewport.js','utf8'),{window,document,setTimeout:fn=>fn()});
function flush(){while(frames.length)frames.shift()()}
assert.equal(properties.get('--battle-top'),'709px');
viewport.height=650;events.get('viewport:resize')();flush();assert.equal(properties.get('--battle-top'),'515px');
viewport.offsetTop=30;viewport.height=400;events.get('viewport:scroll')();flush();assert.equal(properties.get('--battle-top'),'295px');
document.activeElement={matches:()=>true};events.get('document:focusin')();flush();assert.equal(classes.has('keyboardEditing'),true);
document.activeElement={matches:()=>false};viewport.offsetTop=0;viewport.height=844;events.get('document:focusout')();flush();assert.equal(classes.has('keyboardEditing'),false);assert.equal(properties.get('--battle-top'),'709px');
height=260;events.get('window:resize')();flush();assert.equal(properties.get('--battle-top'),'584px');
viewport.scale=2;events.get('viewport:resize')();flush();assert.equal(classes.has('viewportAnchored'),false);assert.equal(properties.has('--battle-top'),false);
viewport.scale=1;narrow=false;events.get('window:resize')();flush();assert.equal(classes.has('viewportAnchored'),false);
window.visualViewport=null;vm.runInNewContext(fs.readFileSync('battle-viewport.js','utf8'),{window,document,setTimeout:fn=>fn()});assert.equal(classes.has('viewportAnchored'),false);
console.log('PASS viewport resize/pan, focus/blur recovery, dock height, zoom, desktop and API fallback');
