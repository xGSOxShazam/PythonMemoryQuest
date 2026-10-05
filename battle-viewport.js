/* Safari can resize/pan the visible viewport independently of page layout.
   Anchor the battle to that viewport; hide it while the keyboard is in use. */
function battleViewportTop(viewport,dockHeight){
  return Math.max(0,viewport.offsetTop+viewport.height-dockHeight);
}
function initBattleViewport(){
  const dock=document.getElementById('battleDock'),viewport=window.visualViewport;
  let frame=0;
  function update(){
    frame=0;
    const narrow=window.matchMedia('(max-width: 930px)').matches;
    const active=document.activeElement;
    const typing=narrow&&!!active&&active.matches('textarea,input:not([type]),input[type="text"],input[type="number"],input[type="email"],input[type="search"]');
    dock.classList.toggle('keyboardEditing',typing);
    const anchored=narrow&&!!viewport&&Math.abs(viewport.scale-1)<.02;
    dock.classList.toggle('viewportAnchored',anchored);
    if(anchored)dock.style.setProperty('--battle-top',battleViewportTop(viewport,dock.getBoundingClientRect().height)+'px');
    else dock.style.removeProperty('--battle-top');
  }
  function schedule(){if(!frame)frame=window.requestAnimationFrame(update);}
  if(viewport){viewport.addEventListener('resize',schedule);viewport.addEventListener('scroll',schedule);}
  window.addEventListener('resize',schedule);window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('pageshow',schedule);
  document.addEventListener('focusin',schedule);document.addEventListener('focusout',()=>{schedule();setTimeout(schedule,150);setTimeout(schedule,450);});
  if(typeof ResizeObserver!=='undefined')new ResizeObserver(schedule).observe(dock);
  if(typeof MutationObserver!=='undefined')new MutationObserver(schedule).observe(dock,{attributes:true,attributeFilter:['hidden']});
  update();
}
initBattleViewport();
