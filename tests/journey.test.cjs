const fs=require('fs'),vm=require('vm'),assert=require('assert');
const nodes=new Map();let serial=0,saved;
function node(id){if(!nodes.has(id))nodes.set(id,{textContent:'',value:'',hidden:false,disabled:false,innerHTML:'',dataset:{},style:{setProperty(){}},classList:{add(){},remove(){},toggle(){}},setAttribute(k,v){this[k]=v},focus(){},getBoundingClientRect(){return {left:0,top:0,width:100,height:40}},animate(){},scrollIntoView(){},addEventListener(){},replaceChildren(){},append(){},appendChild(){},querySelector(selector){return node(selector)}});return nodes.get(id)}
const stored={xp:516,completed:{'0:0':true,'0:1':true,'0:2':true,'0:3':true},attempts:{},streak:0,lastMission:0,lastChallenge:4,reviews:[]};
const ctx=vm.createContext({document:{documentElement:node("root"),getElementById:node,createElement:()=>node('g'+serial++),createElementNS:()=>node('svg'+serial++),querySelectorAll:()=>[],querySelector:()=>node('avatar')},localStorage:{getItem:()=>JSON.stringify(stored),setItem:(_,v)=>saved=v},window:{scrollTo(){},matchMedia:()=>({matches:true})},setTimeout:()=>1,clearTimeout(){},Map,console,Date});
vm.runInContext(fs.readFileSync('challenges.js','utf8')+'\n'+fs.readFileSync('adventure.js','utf8')+'\n'+fs.readFileSync('lessons.js','utf8')+'\n'+fs.readFileSync('village.js','utf8')+'\n'+fs.readFileSync('rescue.js','utf8')+'\n'+fs.readFileSync('app.js','utf8').split('el("reviveBtn").onclick=')[0],ctx);
const run=s=>vm.runInContext(s,ctx);run('gameScreen="adventure";state.drafts={};');run('state.completed={};state.xp=0;state.lessonDone={};currentMission=0;currentChallenge=1;initTeaching();render()');
function solve(m,c){run(`battleFor(${m});state.completed['${m}:${c}']=true;battleOutcome(true,true,{m:${m},c:${c}});equipNewReward(${m})`)}

(async()=>{
run('state.completed={};state.lessonDone={};state.drafts={};state.xp=0;state.attempts={};currentMission=0;currentChallenge=0;gameScreen="adventure";initJourney();render()');
assert.equal(node('rescueIntro').hidden,false);assert.equal(node('lessonPanel').hidden,true);
run('executePython=async()=>({ok:true,verified:false,stdout:"",world:{energy:75}})');node('answerInput').value='energy = 75';await run('runAnswer()');assert.equal(run('battleFor(0).hp'),100);assert.equal(run('state.xp'),0);assert.match(node('rescueFeedback').textContent,/75 energy/);assert.equal(run('state.completed["0:0"]'),undefined);
run('executePython=async()=>({ok:false,verified:false,stderr:"SyntaxError",world:{}})');node('answerInput').value='energy = ';await run('runAnswer()');assert.equal(run('battleFor(0).hp'),100);assert.match(node('rescueFeedback').textContent,/shield protected/);
run('executePython=async()=>({ok:true,verified:true,stdout:"energy = 100",world:{energy:100}})');node('answerInput').value='energy = 100';await run('runAnswer()');assert.equal(run('state.xp'),100);assert.equal(node('rescueNext').hidden,false);assert.match(node('rescueScene').className,/gateOpen/);
await run('runAnswer()');assert.equal(run('state.xp'),100);
node('rescueNext').onclick();assert.equal(run('currentChallenge'),1);assert.equal(node('rescueIntro').hidden,true);assert.equal(node('lessonPanel').hidden,false);assert.equal(node('battlePip').hidden,false);
run('battleOutcome(false,false,{m:0,c:1});battleOutcome(false,false,{m:0,c:2})');assert.equal(run('battleFor(0).hp'),100);
run('battleOutcome(false,false,{m:0,c:3})');assert.equal(run('battleFor(0).hp'),92);
run('renderCodeWorld({ok:true,stdout:"",world:{hp:42}})');assert.match(node('codeWorldCaption').textContent,/actual hp variable/);
run('renderCodeWorld({ok:true,stdout:"",world:{tools:["wand","potion"]}})');assert.match(node('codeWorldCaption').textContent,/actual Python collection/);
run('renderCodeWorld({ok:true,stdout:"",world:{shield:false}})');assert.match(node('codeWorldCaption').textContent,/false/);
run('executePython=async()=>({ok:true,verified:true,world:{pet:"Nova",coins:5}})');node('creationCode').value='pet = "Nova"\ncoins = 5';await run('buildCreation()');assert.equal(run('state.creation.pet'),'Nova');assert.equal(run('companionName()'),'Nova');assert.match(node('creationScene').textContent,/5 snacks/);
run('executePython=async()=>({ok:true,verified:false,world:{pet:"Bad",coins:-1}})');await run('buildCreation()');assert.equal(run('state.creation.pet'),'Nova');assert.equal(run('lessonBusy'),false);
run('reviewMode=true;battleOutcome(false,false,{m:0,c:3})');assert.equal(run('battleFor(0).hp'),92);
console.log('PASS opening rescue, real-result gate, errors and shield, rewards without farming, guided second lesson, companion, world values, creation save and invalid-edit preservation');
})().catch(e=>{console.error(e);process.exitCode=1});
