/* Local ECharts upgrade. No business API requests; only verified input snapshot. */
(() => {
  const font='Inter, "PingFang SC", "Noto Sans SC", sans-serif';
  const blue=['#eef5ff','#aac8f7','#648fe1','#245bd7','#163c93'];
  const charts={};
  let quadrant='全部', heatPage=0, priceMode='热力图';
  const $=id=>document.getElementById(id);
  const panel=key=>document.querySelector(`.slide[data-key="${key}"]`);
  const fmt=v=>Number(v).toLocaleString('zh-CN');
  const pct=v=>`${Number(v).toFixed(2)}%`;
  const chart=(id,w,h)=>{
    if(!window.echarts){$(id).innerHTML='<p class="warning">图表库未加载，请刷新页面。数据快照不受影响。</p>';return null;}
    if(!charts[id])charts[id]=echarts.init($(id),null,{renderer:'svg',width:w,height:h});
    return charts[id];
  };
  const axis={axisLine:{lineStyle:{color:'#bdd0eb'}},axisTick:{show:false},axisLabel:{color:'#526d8c',fontFamily:font,fontSize:13},splitLine:{lineStyle:{color:'#e4edf9'}}};
  const base={animation:false,textStyle:{fontFamily:font,color:'#183459'},tooltip:{confine:true,backgroundColor:'#fff',borderColor:'#b8ceef',textStyle:{color:'#183459',fontSize:14},extraCssText:'box-shadow:0 8px 30px #18345925;border-radius:12px;max-width:390px;white-space:normal;line-height:1.65;'},aria:{enabled:true}};
  const heading=(key,title,sub)=>{panel(key).querySelector('h2').textContent=title;panel(key).querySelector('.subtitle').textContent=sub;};
  heading('selling','功能词有规模基础，极端环比只能列入复核清单',`${bg} · 每类目 Top30 · 横条看相对规模，气泡看平台字段分布`);
  panel('selling').querySelector('.body').innerHTML=`${tabs('selling')}<div class="bubble-layout"><div class="card bubble-ranking"><h3 id="sellingTitle">支付 GMV 相对指数 Top30</h3><div class="scroll" id="sellingBars"></div><p class="note">Top1 = 100；同类目归一化。<br>不显示未核验精确 GMV，不加总重叠卖点。</p></div><div class="card bubble-card"><div class="chart-head"><h3>卖点气泡分布</h3><button id="bubbleZoom">框选放大</button><button id="bubbleReset">重置缩放</button></div><div class="quadrants" id="quadrants">${['全部','高潜力','规模主力','增长观察','长尾','环比缺失'].map((q,i)=>`<button data-q="${q}" class="${i?'':'active'}">${q}</button>`).join('')}</div><div class="note">X：GMV 相对指数 ｜ Y：平台 GMV 环比字段 × 100% ｜ 气泡面积 ∝ 商品数 ｜ 蓝色深浅：订单量</div><div id="bubbleChart" role="img" aria-label="两类目卖点互动气泡图"></div><div class="bubble-key">订单字段色阶（两类目共用）：0　<span></span>　${fmt(Math.max(...D.selling.map(r=>r.orders)))}<b>△ 极值：绘图封顶 999%，原值见悬停</b></div><p class="note" id="bubbleMeta"></p></div></div><div class="warning bubble-warning"><b>平台环比字段，比较周期未核验，不用于确定性增速结论。</b>象限仅为观察分区：X ≥ 50 为相对高规模，Y > 0 为字段正值；“高潜力”等名称不是投资或投放评级。缺失环比不补 0。</div><div class="note" id="sellingInsight"></div>${source('selling','卖点洞察 / 类目热卖 Top30 字段')}`;
  heading('prices','热力对照“量”与“值”：低中价走量，高价贡献 GMV',`${bg} · 全部 30 档 × GMV / 订单占比 · 同一色阶跨指标、跨类目可比`);
  panel('prices').querySelector('.body').innerHTML=`${tabs('prices')}<div class="toolbar price-view"><button id="showPriceHeat" class="active">价格带热力图</button><button id="showPriceBars">双指标柱图（辅助）</button><button id="priceDetails">查看 30 档原文区间</button><span class="note">订单价格分层，不等于商品当前报价；各档宽度不同。</span></div><div class="card price-card"><h3 id="priceHeatTitle">30 档 × 双指标真实占比</h3><div id="priceHeatChart" role="img" aria-label="30档价格带双指标热力图"></div><div id="priceChart" style="display:none"></div><div class="scale-legend">固定份额色阶：<b>0%</b><span></span><b>10%</b><b>20%</b><b>30%</b><span class="note">两类目、两指标使用相同颜色映射；0.00% 为来源原文。</span></div></div><div class="price-insight-row"><div class="card tint" id="priceInsight"></div><div class="card"><h3>缺失区间 ≠ 0</h3><p class="note">仅各类目 Top10 档有金额 / 订单区间，其他档仍有真实占比。其他椅子 0–50 档混有非目标椅型，不能用于人体工学椅定价。类目订单单均价原文：电脑椅 516.22 / 其他椅子 324.89，非关键词样本客单价。</p></div></div>${source('prices','价格带分析 / 每类目完整 30 档')}`;
  heading('heat','同档看受众构成，不把列内占比反读为人群偏好',`${bg} · 各价格档内人群订单占比（列内）· 9 人群 × 30 档`);
  panel('heat').querySelector('.body').innerHTML=`${tabs('heat')}<div class="card audience-heat-card"><div class="chart-head"><h3>人群 × 订单价格档</h3><div class="heat-pages" id="heatPages">${['01–10 档','11–20 档','21–30 档','全部 30 档'].map((x,i)=>`<button data-p="${i}" class="${i?'':'active'}">${x}</button>`).join('')}</div></div><div id="audienceHeatChart" role="img" aria-label="9类人群乘30价格档列内构成热力图"></div><div class="scale-legend">固定人群色阶：<b>0%</b><span></span><b>20%</b><b>40%</b><b>60%</b><span class="note">两类目统一 0–60%；灰色 -- 未提供，非 0。</span></div></div><div class="warning" id="heatInsight"></div>${source('population','类目人群偏好 / 支付订单价格档交叉表')}`;
  // Keep the original range-detail modal handler; it reads states.prices at click time.
  const detailHandler=document.getElementById('priceDetails');
  detailHandler.onclick=()=>{
    const c=states.prices, modal=document.createElement('div');modal.id='detailModal';modal.className='toc open';
    modal.innerHTML=`<div class="tocbox" style="width:1000px;max-height:85vh;display:flex;flex-direction:column"><div class="toolbar"><h3 style="flex:1">${c} / 完整类目 30 档原文</h3><button id="detailsClose">关闭 ×</button></div><p class="note">${bg} · 空区间不是 0。</p><div class="scroll" style="margin-top:18px;flex:1"><table class="table"><thead><tr><th>价格档</th><th>GMV 占比</th><th>订单占比</th><th>GMV 原文区间</th><th>订单原文区间</th></tr></thead><tbody>${D.prices.filter(r=>r['类目']===c).map(r=>`<tr><td>${r['价格带']}</td><td>${r['GMV占比原文']}</td><td>${r['订单占比原文']}</td><td>${esc(r['GMV区间原文']||'未取得（非 0）')}</td><td>${esc(r['订单区间原文']||'未取得（非 0）')}</td></tr>`).join('')}</tbody></table></div></div>`;
    document.body.appendChild(modal);$('detailsClose').onclick=()=>modal.remove();modal.onclick=e=>{if(e.target===modal)modal.remove()};
  };
  const qname=r=>r.growthPercent===null?'环比缺失':r.index>=50?(r.growthPercent>0?'高潜力':'规模主力'):(r.growthPercent>0?'增长观察':'长尾');
  function selling(c){
    const rows=D.selling.filter(r=>r.category===c), valid=rows.filter(r=>r.growthPercent!==null),missing=rows.filter(r=>r.growthPercent===null);
    $('sellingTitle').textContent=c+' / 相对规模 Top30';
    $('sellingBars').innerHTML=bars(rows.map(r=>[`${r.rank}. ${r.name}`,r.index.toFixed(2)]),100);
    $('sellingInsight').textContent=c==='电脑椅'?'商业解读：人体工学、办公居相对规模头部；优先验证功能 × 办公的表达。新品、耐磨等极端字段仅列入复核，不据此评为增长爆款。':'商业解读：家用、金属、休闲、实木混入大盘，人体工学原排名第 7。中国大陆、经济型等极端字段不能解释为目标人体工学椅机会。';
    $('bubbleMeta').innerHTML=`供给大小映射：面积 ∝ 商品数字段（两类目共用比例）；${missing.length} 个环比缺失：${missing.map(r=>esc(r.name)).join('、')||'无'}。${quadrant==='环比缺失'?'以下清单保留原始缺失，不定位到 Y=0。':''}`;
    const filtered=valid.filter(r=>quadrant==='全部'||qname(r)===quadrant), maxProducts=Math.max(...D.selling.map(r=>r.products)),maxOrders=Math.max(...D.selling.map(r=>r.orders));
    const points=filtered.map(r=>({name:r.name,value:[r.index,Math.min(r.growthPercent,999),r.products,r.orders],row:r,symbol:'circle'}));
    const instance=chart('bubbleChart',960,235);if(!instance)return;
    instance.setOption({...base,grid:{left:76,right:48,top:24,bottom:56},xAxis:{...axis,type:'value',min:0,max:105,name:'GMV 相对指数',nameLocation:'middle',nameGap:32},yAxis:{...axis,type:'value',min:-100,max:1040,name:'平台环比字段（%）',nameTextStyle:{fontSize:13},axisLabel:{...axis.axisLabel,formatter:v=>v+'%'}},dataZoom:[{type:'inside',xAxisIndex:0,filterMode:'none'},{type:'inside',yAxisIndex:0,filterMode:'none'}],toolbox:{top:0,right:0,feature:{dataZoom:{yAxisIndex:0},restore:{}}},visualMap:{show:false,type:'continuous',min:0,max:maxOrders,dimension:3,inRange:{color:blue},seriesIndex:0},tooltip:{...base.tooltip,formatter:p=>{
      const r=p.data.row;if(!r)return '';
      return `<b>${esc(c)} / ${esc(r.name)}</b><br>支付 GMV 相对指数：${r.index.toFixed(2)}（Top1=100）<br>GMV 环比字段原值：${esc(r.growthRaw)}<br>字段 × 100%：${pct(r.growthPercent)}${r.growthPercent>999?'（绘图封顶 999%）':''}<br>商品数字段：${fmt(r.products)}<br>订单字段：${fmt(r.orders)}<br>观察分区：${qname(r)}<br><span style="color:#607895">比较周期未核验；非确定性增长结论。标签重叠，不加总；GMV 金额单位未核验。</span>`;
    }},series:[{type:'scatter',data:points,symbolSize:v=>Math.sqrt(v[2]/maxProducts)*68,label:{show:true,formatter:p=>p.data.row.rank<=8||p.data.row.growthPercent>999?(p.data.row.growthPercent>999?'△ ':'')+p.name:'',position:'top',fontSize:12,color:'#183459'},labelLayout:{hideOverlap:true},emphasis:{label:{show:true,formatter:'{b}',position:'top',color:'#183459',fontSize:13},itemStyle:{borderWidth:2,borderColor:'#163c93'}},itemStyle:{opacity:.85,borderColor:'#fff',borderWidth:1},markLine:{silent:true,symbol:'none',label:{show:false},lineStyle:{type:'dashed',color:'#91acd3'},data:[{xAxis:50},{yAxis:0}]},markArea:{silent:true,itemStyle:{color:'#245bd708'},data:[[{xAxis:50,yAxis:0},{xAxis:105,yAxis:1040}]]}}],graphic:quadrant==='环比缺失'?[{type:'text',left:100,top:100,style:{text:missing.length?missing.map(r=>`${r.name}：环比 --；GMV 指数 ${r.index}；商品 ${fmt(r.products)}；订单 ${fmt(r.orders)}`).join('\n'):'本类目 30 个卖点环比字段均有值',font:'15px '+font,fill:'#607895',lineHeight:32}}]:[]},true);
    $('bubbleChart').dataset.points=points.length;
  }
  function prices(c){
    const rows=D.prices.filter(r=>r['类目']===c), bands=rows.map(r=>r['价格带']);
    $('priceHeatTitle').textContent=c+' / 完整 30 档 × GMV、订单占比';
    const cells=[];rows.forEach((r,i)=>['GMV占比原文','订单占比原文'].forEach((k,j)=>cells.push([i,j,parseFloat(r[k])])));
    const instance=chart('priceHeatChart',1418,225);if(instance)instance.setOption({...base,grid:{left:100,right:18,top:18,bottom:62},xAxis:{...axis,type:'category',data:bands,axisLabel:{...axis.axisLabel,interval:0,rotate:52,fontSize:12}},yAxis:{...axis,type:'category',data:['GMV 占比','订单占比'],inverse:true,splitArea:{show:true}},visualMap:{show:false,min:0,max:30,dimension:2,inRange:{color:blue}},tooltip:{...base.tooltip,formatter:p=>`${esc(c)} · ${bands[p.value[0]]} 档<br>${p.value[1]?'订单':'GMV'}占比：${pct(p.value[2])}<br>完整类目背景，未关键词筛选`},series:[{type:'heatmap',data:cells,label:{show:true,fontSize:12,formatter:p=>`{${p.value[2]>18?'light':'dark'}|${pct(p.value[2])}}`,rich:{light:{color:'#fff',fontSize:12},dark:{color:'#183459',fontSize:12}}},itemStyle:{borderWidth:3,borderColor:'#fff'},emphasis:{itemStyle:{borderWidth:2,borderColor:'#183459'}}}]},true);
    // Native double-indicator bars retained as an auxiliary view.
    priceRender(c);
    $('priceHeatChart').style.display=priceMode==='热力图'?'block':'none';$('priceChart').style.display=priceMode==='热力图'?'none':'block';
    $('priceInsight').innerHTML=c==='电脑椅'?'<h3>电脑椅：量与值分层</h3><p class="note">201–250 / 251–300 档订单占比 <b>13.48% / 12.31%</b>；1001–2000 / 3001–4000 档 GMV 占比 <b>10.81% / 10.00%</b>。中低价订单与高价成交价值并存；订单价格档不是SKU报价。</p>':'<h3>其他椅子：混合椅型背景</h3><p class="note">0–50 档订单占比 <b>25.96%</b>；1001–2000 档 GMV 占比 <b>21.15%</b>。低价订单混有其他椅型，不能迁移成人体工学椅的定价建议。</p>';
  }
  const order=['新锐白领','genz','小镇青年','资深中产','精致妈妈','都市蓝领','小镇中老年','都市银发','其他'];
  function heat(c){
    const bands=D.prices.filter(r=>r['类目']===c).map(r=>r['价格带']), cells=[],missing=[];
    order.forEach((n,j)=>{const r=D.heat.find(x=>x['类目']===c&&x['人群']===n);bands.forEach((b,i)=>{let v=parseFloat(r[b]);if(Number.isFinite(v))cells.push([i,j,v]);else missing.push({value:[i,j],raw:r[b]});});});
    const start=heatPage===3?0:heatPage*10,end=heatPage===3?29:start+9,all=heatPage===3;
    const instance=chart('audienceHeatChart',1418,330);if(!instance)return;
    instance.setOption({...base,grid:{left:108,right:20,top:8,bottom:all?88:50},xAxis:{...axis,type:'category',data:bands,axisLabel:{...axis.axisLabel,interval:0,rotate:all?50:0,fontSize:all?11:13}},yAxis:{...axis,type:'category',data:order,inverse:true,axisLabel:{...axis.axisLabel,fontSize:14}},dataZoom:[{type:'inside',xAxisIndex:0,startValue:start,endValue:end,zoomLock:true,filterMode:'filter'}],visualMap:{show:false,min:0,max:60,dimension:2,seriesIndex:0,inRange:{color:blue}},tooltip:{...base.tooltip,formatter:p=>`<b>${esc(c)} / ${bands[p.value[0]]} 档</b><br>${order[p.value[1]]}：${p.seriesIndex===1?'--（未提供，非 0）':pct(p.value[2])}<br>各价格档内人群订单占比（列内）<br>不是人群跨价格档的行内偏好；无绝对订单 / TGI。`},series:[{type:'heatmap',data:cells,label:{show:true,fontSize:all?10:14,formatter:p=>`{${p.value[2]>36?'light':'dark'}|${pct(p.value[2])}}`,rich:{light:{color:'#fff',fontSize:all?10:14},dark:{color:'#183459',fontSize:all?10:14}}},itemStyle:{borderColor:'#fff',borderWidth:3},emphasis:{itemStyle:{borderColor:'#183459',borderWidth:2}}},{type:'scatter',data:missing,symbol:'rect',symbolSize:[all?39:125,29],itemStyle:{color:'#e7ecf2'},label:{show:true,formatter:'--',color:'#607895',fontSize:13}}]},true);
    $('heatInsight').innerHTML=c==='电脑椅'?'<b>商业解读：</b>251–300 档内 genz 为 29.84%；1001–2000 / 3001–4000 档内新锐白领为 42.84% / 50.42%。不同价格档内构成有差异，非TGI或个人跨档选择。<br><b>读取边界：</b>每列 9 人群合计约 100%，四舍五入误差保留；50.42% 不是新锐白领有 50.42% 的订单买此档。':'<b>商业解读：</b>1001–2000 档内新锐白领 26.79%；3001–4000 档内新锐白领 33.39%、资深中产 17.91%。仅为完整其他椅子类目背景。<br><b>读取边界：</b>各价格档内人群订单占比（列内），不反读为行内偏好；-- 未提供，不补 0。';
  }
  function population(c){
    populationRender(c);
    if(charts.audienceRankChart){charts.audienceRankChart.dispose();delete charts.audienceRankChart;}
    $('populationBars').innerHTML='<div id="audienceRankChart" role="img" aria-label="完整9类人群订单占比排行"></div>';
    const rows=D.population.filter(r=>r['类目']===c).sort((a,b)=>parseFloat(b['占比原文'])-parseFloat(a['占比原文']));
    const instance=chart('audienceRankChart',812,340);if(!instance)return;
    instance.setOption({...base,grid:{left:100,right:70,top:8,bottom:26},xAxis:{...axis,type:'value',min:0,max:30,axisLabel:{...axis.axisLabel,formatter:v=>v+'%'}},yAxis:{...axis,type:'category',data:rows.map(r=>r['人群']),inverse:true},tooltip:{...base.tooltip,formatter:p=>`${esc(c)} / ${esc(rows[p.dataIndex]['人群'])}<br>支付订单占比：${rows[p.dataIndex]['占比原文']}<br>完整类目未关键词筛选；非商品 Top3 标签占比，无绝对订单 / TGI。`},series:[{type:'bar',data:rows.map(r=>parseFloat(r['占比原文'])),barWidth:18,itemStyle:{color:'#245bd7',borderRadius:[0,5,5,0]},label:{show:true,position:'right',formatter:p=>pct(p.value),fontSize:14,color:'#183459'}}]},true);
  }
  renders.selling=selling;renders.prices=prices;renders.heat=heat;renders.population=population;
  ['selling','prices','heat'].forEach(key=>{panel(key).querySelector('[data-tabs]').onclick=e=>{const b=e.target.closest('button');if(!b)return;states[key]=b.dataset.cat;panel(key).querySelectorAll('[data-cat]').forEach(x=>x.classList.toggle('active',x===b));renders[key](states[key]);};});
  $('quadrants').onclick=e=>{const b=e.target.closest('button');if(!b)return;quadrant=b.dataset.q;$('quadrants').querySelectorAll('button').forEach(x=>x.classList.toggle('active',x===b));selling(states.selling);};
  let zoomActive=false;
  $('bubbleZoom').onclick=()=>{zoomActive=!zoomActive;charts.bubbleChart?.dispatchAction({type:'takeGlobalCursor',key:'dataZoomSelect',dataZoomSelectActive:zoomActive});$('bubbleZoom').classList.toggle('active',zoomActive);};
  $('bubbleReset').onclick=()=>{charts.bubbleChart?.dispatchAction({type:'restore'});zoomActive=false;$('bubbleZoom').classList.remove('active');};
  ['showPriceHeat','showPriceBars'].forEach((id,i)=>$(id).onclick=()=>{priceMode=i?'柱图':'热力图';$('showPriceHeat').classList.toggle('active',!i);$('showPriceBars').classList.toggle('active',!!i);prices(states.prices);});
  $('heatPages').onclick=e=>{const b=e.target.closest('button');if(!b)return;heatPage=+b.dataset.p;$('heatPages').querySelectorAll('button').forEach(x=>x.classList.toggle('active',x===b));heat(states.heat);};
  const oldGo=go;go=function(n){oldGo(n);const key=document.querySelector('.slide.current').dataset.key;if(['selling','prices','heat','population'].includes(key))renders[key](states[key]);};
  window.addEventListener('beforeprint',()=>{selling(states.selling);prices(states.prices);population(states.population);const prev=heatPage;heatPage=3;heat(states.heat);heatPage=prev;});
  window.addEventListener('afterprint',()=>heat(states.heat));
  // Expose only verification metadata, not user identity or credentials.
  window.chartSnapshot={library:'ECharts 5.6.0 local',priceColorRange:[0,30],audienceColorRange:[0,60],quadrantThresholds:{x:50,y:0},growthPlotCap:999};
  const query=new URLSearchParams(location.search);
  if(query.get('category')==='other'){
    Object.keys(states).forEach(k=>{states[k]='其他椅子';panel(k).querySelectorAll('[data-cat]').forEach(b=>b.classList.toggle('active',b.dataset.cat==='其他椅子'));});
  }
  if(['0','1','2','3'].includes(query.get('heat'))){heatPage=+query.get('heat');$('heatPages').querySelectorAll('button').forEach(b=>b.classList.toggle('active',+b.dataset.p===heatPage));}
  if(['全部','高潜力','规模主力','增长观察','长尾','环比缺失'].includes(query.get('quadrant'))){quadrant=query.get('quadrant');$('quadrants').querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.q===quadrant));}
  $('tocgrid').querySelectorAll('button').forEach((b,i)=>{b.innerHTML=`<em>${String(i+1).padStart(2,'0')}</em>${esc(document.querySelectorAll('.slide')[i].querySelector('h2').textContent)}`;});
  go(page);
})();
