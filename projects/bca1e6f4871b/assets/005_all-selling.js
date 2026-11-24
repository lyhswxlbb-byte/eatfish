/* All 71 labels remain available in ordinary named pages, without hover. */
window.renderAllSelling = (() => {
  let page=0;
  const requested=new URLSearchParams(location.search).get('sellingLabels');
  if(['0','1','2','all'].includes(requested))page=requested==='all'?-1:+requested;
  return function(chart,rows,onSelect){
    const host=document.getElementById('aggBubble'),count=Math.ceil(rows.length/24);
    let controls=document.getElementById('aggNamePages');
    if(!controls){
      host.insertAdjacentHTML('beforebegin',`<div id="aggNamePages" class="agg-name-pages"><button data-label-page="-1">全集总览 · ${rows.length} 点</button>${Array.from({length:count},(_,i)=>`<button data-label-page="${i}">名称 ${i+1}/${count}</button>`).join('')}<small id="aggPageCount"></small></div>`);
      controls=document.getElementById('aggNamePages');
      controls.onclick=e=>{const b=e.target.closest('button');if(b){page=+b.dataset.labelPage;window.renderAllSelling(chart,rows,onSelect);}};
    }
    controls.querySelectorAll('button').forEach(b=>b.classList.toggle('active',+b.dataset.labelPage===page));
    const tooltip=chart.getOption().tooltip?.[0]?.formatter;
    const scale=['#f5f7f8','#c6d2dc','#81aabc','#36536e'];
    const row=page<0?rows:rows.slice(page*24,page*24+24);
    document.getElementById('aggPageCount').textContent=page<0?`全部 ${rows.length} 点；完整名称见 1–${count} 页`:`${page*24+1}–${page*24+row.length} / ${rows.length} 标签`;
    document.querySelector('.agg-bubble-card .chart-head h3').textContent=page<0?'全部卖点｜71 点全集概览':`全部卖点｜名称常显 ${page+1}/${count}`;
    document.querySelector('.agg-bubble-card>.note').textContent=page<0?'X：GMV 下限指数 ｜ Y：订单下限指数 ｜ 面积：关联款数':'名称页：X 为 GMV 下限指数，行轴为卖点名；点右数值为订单下限指数，非散点纵向距离。';
    const base={animation:false,tooltip:{confine:true,formatter:tooltip,textStyle:{color:'#37434c'},backgroundColor:'#fff',borderColor:'#d5dee5'},textStyle:{fontFamily:'Noto Sans SC, PingFang SC, sans-serif'},toolbox:{right:0,feature:{dataZoom:{yAxisIndex:page<0?0:false},restore:{}}}};
    if(page<0){
      chart.setOption({...base,grid:{left:66,right:30,top:18,bottom:50},xAxis:{type:'value',min:-6,max:112,name:'GMV 下限指数',nameLocation:'middle',nameGap:28,splitLine:{lineStyle:{type:'dashed',color:'#e1e7eb'}}},yAxis:{type:'value',min:-6,max:112,name:'订单下限指数',splitLine:{lineStyle:{type:'dashed',color:'#e1e7eb'}}},visualMap:{show:false,min:0,max:100,dimension:1,inRange:{color:scale}},dataZoom:[{type:'inside',xAxisIndex:0,filterMode:'none'},{type:'inside',yAxisIndex:0,filterMode:'none'}],series:[{type:'scatter',data:rows.map(r=>({name:r.name,row:r,value:[r.gmvIndex,r.orderIndex,r.count]})),symbolSize:v=>Math.sqrt(v[2]/32)*52,itemStyle:{opacity:.85,borderColor:'#36536e',borderWidth:.7},label:{show:false},emphasis:{label:{show:true,formatter:'{b}',color:'#37434c'}}}]},true);
    }else{
      const halves=[row.slice(0,12),row.slice(12)],grids=[],xs=[],ys=[],series=[];
      halves.forEach((part,i)=>{if(!part.length)return;grids.push({left:i?610:130,top:12,width:315,bottom:34});xs.push({gridIndex:i,type:'value',min:0,max:110,axisLabel:{fontSize:10,color:'#627486'},axisLine:{lineStyle:{color:'#c6d2dc'}},splitLine:{lineStyle:{type:'dashed',color:'#e1e7eb'}}});ys.push({gridIndex:i,type:'category',inverse:true,data:part.map(r=>r.name),axisLabel:{interval:0,fontSize:12,color:'#37434c',width:125,overflow:'break'},axisTick:{show:false},axisLine:{show:false}});series.push({type:'scatter',xAxisIndex:i,yAxisIndex:i,data:part.map((r,j)=>({name:r.name,row:r,value:[r.gmvIndex,j,r.count,r.orderIndex]})),symbolSize:v=>Math.sqrt(v[2]/32)*19,label:{show:true,position:'right',fontSize:10,color:'#627486',formatter:p=>p.data.row.orderIndex.toFixed(1)},itemStyle:{borderColor:'#36536e',borderWidth:.6,opacity:1}});});
      chart.setOption({...base,grid:grids,xAxis:xs,yAxis:ys,dataZoom:[],visualMap:{show:false,min:0,max:100,dimension:3,inRange:{color:scale}},series},true);
    }
    chart.off('click');chart.on('click',p=>onSelect(p.name));
    window.sellingVisibility={total:rows.length,namedPage:page,pageCount:count,visibleNames:page<0?[]:row.map(r=>r.name),allNames:rows.map(r=>r.name)};
  };
})();
