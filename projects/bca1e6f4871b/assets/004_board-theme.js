/* Muted BOARD palette is applied before any ECharts instance is created. */
(() => {
  const map={'#183459':'#37434c','#245bd7':'#36536e','#163c93':'#36536e','#739de9':'#81aabc','#8fb6f1':'#c6d2dc','#aac8f7':'#c6d2dc','#648fe1':'#81aabc','#eef5ff':'#f5f7f8','#607895':'#627486','#526d8c':'#627486','#e1ebf8':'#e1e7eb','#e4edf9':'#e1e7eb','#e3ecf7':'#e1e7eb','#bdd0eb':'#d5dee5','#b8ceef':'#d5dee5','#e7ecf2':'#e7ebee'};
  function recolor(v){
    if(Array.isArray(v)){v.forEach((x,i)=>v[i]=recolor(x));return v;}
    if(v&&typeof v==='object'){Object.keys(v).forEach(k=>v[k]=recolor(v[k]));if(v.splitLine?.lineStyle)v.splitLine.lineStyle.type='dashed';return v;}
    if(typeof v==='string')return map[v.toLowerCase()]||v;
    return v;
  }
  const init=echarts.init;
  echarts.init=function(...args){const c=init.apply(this,args),set=c.setOption;c.setOption=function(options,...rest){return set.call(this,recolor(options),...rest);};return c;};
})();
