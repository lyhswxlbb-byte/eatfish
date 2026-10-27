(function(){
const ALL = [].concat(window.SLIDES_A||[], window.SLIDES_B||[], window.SLIDES_C||[]);
const stage = document.getElementById('stage');
const dots = document.getElementById('dots');
const pager = document.getElementById('pager');
const prog = document.getElementById('progress');
const chapTag = document.getElementById('chapTag');

ALL.forEach((s,i)=>{
  const wrap = document.createElement('div');
  wrap.innerHTML = s.html.trim();
  const node = wrap.firstChild;
  if(i!==0) node.classList.remove('active');
  stage.insertBefore(node, document.getElementById('hud'));
  const d = document.createElement('i');
  if(i===0) d.classList.add('on');
  d.onclick = ()=>go(i);
  dots.appendChild(d);
});
const slideEls = Array.from(stage.querySelectorAll('.slide'));
const dotEls = Array.from(dots.children);
let cur = 0, lock=false;

const FONT = '"Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif';
const C = {teal:'#0F5C50', teal2:'#2E8374', gold:'#C2A15A', red:'#C0472F', ink:'#1C2925', grey:'#B6AA90', soft:'#DCE8E2'};

const chartFns = {
  chart_highspeed: ()=>{
    const c = echarts.init(document.getElementById('chart_highspeed'),null,{renderer:'svg'});
    c.setOption({
      series:[{type:'gauge', startAngle:210, endAngle:-30, min:0,max:100, radius:'92%', center:['50%','58%'],
        progress:{show:true,width:16,itemStyle:{color:new echarts.graphic.LinearGradient(0,0,1,0,[{offset:0,color:C.teal2},{offset:1,color:C.teal}])}},
        axisLine:{lineStyle:{width:16,color:[[1,'#E7DECB']]}},
        axisTick:{show:false},splitLine:{show:false},axisLabel:{show:false},pointer:{show:false},
        anchor:{show:false},
        detail:{valueAnimation:true,offsetCenter:['0%','-8%'],formatter:'{value}%',fontSize:34,fontFamily:FONT,color:C.teal,fontWeight:700},
        title:{offsetCenter:['0%','22%'],color:'#6E6A5E',fontSize:11,fontFamily:FONT},
        data:[{value:86.6,name:'高速机型销额份额 · 2026 618'}]}]
    });
    return c;
  },
  chart_brandshare: ()=>{
    const c = echarts.init(document.getElementById('chart_brandshare'),null,{renderer:'svg'});
    const names=['其他','戴森','追觅','徕芬'];
    const vals=[53.46,12.12,13.70,20.72];
    const cols=['#D7CDB9',C.grey,C.gold,C.teal];
    c.setOption({
      grid:{left:60,right:40,top:30,bottom:20},
      xAxis:{type:'value',max:60,axisLabel:{formatter:'{value}%',fontFamily:FONT,color:'#6E6A5E'},splitLine:{lineStyle:{color:'#EAE2D2'}},axisLine:{show:false},axisTick:{show:false}},
      yAxis:{type:'category',data:names,axisLine:{show:false},axisTick:{show:false},axisLabel:{fontFamily:FONT,fontSize:12,color:C.ink,fontWeight:600}},
      series:[{type:'bar',data:vals.map((v,i)=>({value:v,itemStyle:{color:cols[i],borderRadius:[0,5,5,0]}})),barWidth:22,
        label:{show:true,position:'right',formatter:'{c}%',fontFamily:FONT,fontSize:11,color:'#3B4742',fontWeight:600}}],
      graphic:[{type:'text',right:24,top:4,style:{text:'CR3 ≈ 46%',font:'700 12px '+FONT,fill:C.red}}]
    });
    return c;
  },
  chart_rhythm: ()=>{
    const c = echarts.init(document.getElementById('chart_rhythm'),null,{renderer:'svg'});
    const m=['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
    const v=[3,2,5,3,3,5,2,3,3,4,5,4];
    const peak={2:0,5:0,10:1,11:1};
    c.setOption({
      grid:{left:40,right:20,top:40,bottom:30},
      xAxis:{type:'category',data:m,axisLine:{lineStyle:{color:'#C9BFA9'}},axisTick:{show:false},axisLabel:{fontFamily:FONT,fontSize:11,color:'#3B4742'}},
      yAxis:{type:'value',min:0,max:5.5,interval:1,
        axisLabel:{fontFamily:FONT,color:'#9B937F',fontSize:10,formatter:function(v){return ['','低','','中','','高'][v]||'';}},
        splitLine:{lineStyle:{color:'#EDE5D5'}},axisLine:{show:false},axisTick:{show:false}},
      series:[{type:'bar',data:v.map((x,i)=>({value:x,itemStyle:{borderRadius:[5,5,0,0],
          color:i===11?new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:C.red},{offset:1,'color':'#E2A390'}]):
                 (x===5?new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:C.teal},{offset:1,color:C.teal2}]):'#CFC6B2')}})),
        barWidth:'46%',
        markPoint:{symbol:'pin',symbolSize:0,label:{show:false},data:[]},
        label:{show:true,position:'top',fontFamily:FONT,fontSize:10,color:'#3B4742',
          formatter:function(p){return ['年货/礼赠','','3.8女神节','','','618','','','换季防脱','','双11','新品上市'][p.dataIndex];}}
      }],
      graphic:[{type:'text',left:42,top:6,style:{text:'定性热度：由营销节点强度综合评定（非GMV实测值）',font:'11px '+FONT,fill:'#9B937F'}}]
    });
    return c;
  },
  chart_price: ()=>{
    const c = echarts.init(document.getElementById('chart_price'),null,{renderer:'svg'});
    c.setOption({
      legend:{top:0,textStyle:{fontFamily:FONT,fontSize:11,color:C.ink2},itemWidth:12,itemHeight:8},
      grid:{left:44,right:16,top:38,bottom:28},
      xAxis:{type:'category',data:['0–300元','300–1000元','1000元以上'],axisLine:{lineStyle:{color:'#C9BFA9'}},axisTick:{show:false},axisLabel:{fontFamily:FONT,fontSize:11.5,color:C.ink,fontWeight:600}},
      yAxis:{type:'value',max:100,axisLabel:{formatter:'{value}%',fontFamily:FONT,color:'#9B937F'},splitLine:{lineStyle:{color:'#EDE5D5'}},axisLine:{show:false},axisTick:{show:false}},
      series:[
        {name:'支付GMV占比',type:'bar',data:[58,28,14],barGap:'10%',barWidth:'30%',itemStyle:{color:C.teal,borderRadius:[5,5,0,0]},label:{show:true,position:'top',formatter:'{c}%',fontFamily:FONT,fontSize:10.5,color:C.teal,fontWeight:700}},
        {name:'订单量占比',type:'bar',data:[91,8,1],barWidth:'30%',itemStyle:{color:C.red,borderRadius:[5,5,0,0]},label:{show:true,position:'top',formatter:'{c}%',fontFamily:FONT,fontSize:10.5,color:C.red,fontWeight:700}}
      ]
    });
    return c;
  },
  chart_creator: ()=>{
    const c = echarts.init(document.getElementById('chart_creator'),null,{renderer:'svg'});
    c.setOption({
      tooltip:{trigger:'item',textStyle:{fontFamily:FONT}},
      legend:{bottom:0,textStyle:{fontFamily:FONT,fontSize:10.5,color:C.ink2},itemWidth:10,itemHeight:8},
      series:[{type:'pie',radius:['46%','72%'],center:['50%','44%'],avoidLabelOverlap:true,
        itemStyle:{borderColor:'#FBF8F1',borderWidth:2},
        label:{fontFamily:FONT,fontSize:11,color:C.ink,formatter:'{b}\n{d}%'},
        data:[
          {value:40,name:'拉量层 30-100w泛娱乐/AI剧情',itemStyle:{color:C.gold}},
          {value:20,name:'引爆层 100-500w头部',itemStyle:{color:C.red}},
          {value:40,name:'转化层 科技/健康/美垂',itemStyle:{color:C.teal}}
        ]}]
    });
    return c;
  },
  chart_5a: ()=>{
    const c = echarts.init(document.getElementById('chart_5a'),null,{renderer:'svg'});
    const data=[
      {name:'O→A1 泛人群拉新',v:40,r:'35–45% · 1-3次低成本曝光'},
      {name:'A1→A2 兴趣蓄水',v:27,r:'25–30% · 累计4-10次触达'},
      {name:'A2→A3 种草加深',v:18,r:'15–20% · 垂类内容+证据'},
      {name:'A3→A4 转化收割',v:15,r:'15–20% · 品专/搜索/直播'}
    ];
    c.setOption({
      tooltip:{show:false},
      series:[{type:'funnel',left:'4%',right:'30%',top:20,bottom:20,minSize:'28%',
        label:{formatter:'{b}\n{c}%',fontFamily:FONT,fontSize:11.5,color:'#FBF8F1',fontWeight:600},
        labelLine:{show:false},
        itemStyle:{borderColor:'#F5F0E6',borderWidth:2},
        data:data.map((d,i)=>({name:d.name,value:d.v,
          itemStyle:{color:[C.teal2,C.teal,C.gold,C.red][i]}}))}],
      graphic:data.map((d,i)=>({type:'text',right:8,top:36+i*60,style:{text:d.r,font:'11px '+FONT,fill:'#6E6A5E',textAlign:'right'}}))
    });
    return c;
  }
};
const charts = {};
function renderCharts(idx){
  const root = slideEls[idx];
  if(!root) return;
  root.querySelectorAll('.chart').forEach(el=>{
    if(!charts[el.id] && chartFns[el.id]){
      try{ charts[el.id] = chartFns[el.id](); }catch(e){console.error(el.id,e);}
    }
  });
}
window.addEventListener('resize',()=>{Object.values(charts).forEach(c=>c&&c.resize());});

function go(i){
  if(i<0||i>=ALL.length||i===cur) return;
  slideEls[cur].classList.remove('active');
  dotEls[cur].classList.remove('on');
  cur=i;
  slideEls[cur].classList.add('active');
  dotEls[cur].classList.add('on');
  pager.innerHTML = '<b>'+String(i+1).padStart(2,'0')+'</b> / '+ALL.length;
  prog.style.width = ((i+1)/ALL.length*100)+'%';
  chapTag.textContent = ALL[i].chap||'';
  try{history.replaceState(null,'','#'+(i+1));}catch(e){}
  setTimeout(()=>{Object.values(charts).forEach(c=>c&&c.resize());renderCharts(cur);},60);
}
prog.style.width = (1/ALL.length*100)+'%';
chapTag.textContent = ALL[0].chap||'';
pager.innerHTML = '<b>01</b> / '+ALL.length;
const hp=parseInt(location.hash.slice(1),10);
if(hp>=2&&hp<=ALL.length) go(hp-1);
setTimeout(()=>renderCharts(cur),100);

document.getElementById('nextBtn').onclick=()=>go(cur+1);
document.getElementById('prevBtn').onclick=()=>go(cur-1);
document.getElementById('fsBtn').onclick=()=>{
  if(!document.fullscreenElement) document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen();
  else document.exitFullscreen&&document.exitFullscreen();
};
document.addEventListener('keydown',e=>{
  if(['ArrowRight','ArrowDown','PageDown',' '].includes(e.key)){e.preventDefault();go(cur+1);}
  if(['ArrowLeft','ArrowUp','PageUp'].includes(e.key)){e.preventDefault();go(cur-1);}
  if(e.key==='Home')go(0); if(e.key==='End')go(ALL.length-1);
});
let wt=0;
stage.addEventListener('wheel',e=>{
  if(Date.now()-wt<650)return;
  if(Math.abs(e.deltaY)<8)return;
  wt=Date.now(); go(cur+(e.deltaY>0?1:-1));
},{passive:true});let tx=0,ty=0;
stage.addEventListener('touchstart',e=>{tx=e.touches[0].clientX;ty=e.touches[0].clientY;},{passive:true});
stage.addEventListener('touchend',e=>{
  const dx=e.changedTouches[0].clientX-tx, dy=e.changedTouches[0].clientY-ty;
  if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)) go(cur+(dx<0?1:-1));
  else if(Math.abs(dy)>55) go(cur+(dy<0?1:-1));
},{passive:true});
})();
