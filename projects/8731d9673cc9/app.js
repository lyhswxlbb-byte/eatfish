(() => {
  const data = window.QC_STAR_DATA || { items: [], cats: [] };
  let currentCat = '全部';
  let currentSub = '全部';
  let currentType = '全部';
  let keyword = '';
  const $ = (id) => document.getElementById(id);
  const catChips = $('catChips');
  const subChips = $('subChips');
  const typeChips = $('typeChips');
  const cards = $('cards');
  const countText = $('count');
  const ruleText = $('ruleText');
  const searchInput = $('searchInput');
  const conclusion = $('weeklyConclusion');
  const escapeHtml = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const num = (v) => Number.isFinite(Number(v || 0)) ? Number(v || 0) : 0;
  const score = (x) => num(x._sortScore || 0);
  const cats = () => ['全部', ...(data.cats || [])];
  const subCats = () => currentCat === '全部' ? ['全部'] : ['全部', ...((data.specificOptions || {})[currentCat] || [])];
  const types = () => ['全部', ...Array.from(new Set((data.items || []).filter(x => currentCat === '全部' || x.big_cat === currentCat).filter(x => currentSub === '全部' || x.specific_cat === currentSub).map(x => x.celebrity_mode || '未标注'))).sort()];
  function haystack(x) { return [x.title, x.summary, x.star_names_text, x.big_cat, x.specific_cat, x.celebrity_mode, x.material_type, x.why_good, ...(x.breakdownRows || []).map(r => r.detail)].join(' ').toLowerCase(); }
  function filtered() {
    const kw = keyword.trim().toLowerCase();
    return (data.items || []).filter(x => (currentCat === '全部' || x.big_cat === currentCat) && (currentSub === '全部' || x.specific_cat === currentSub) && (currentType === '全部' || x.celebrity_mode === currentType) && (!kw || haystack(x).includes(kw)));
  }
  function renderChips(el, list, active, onClick) {
    if (!el) return;
    el.innerHTML = list.map(v => `<button class="chip ${v === active ? 'active' : ''}" data-v="${escapeHtml(v)}">${escapeHtml(v)}</button>`).join('');
    el.querySelectorAll('button').forEach(btn => btn.addEventListener('click', () => onClick(btn.dataset.v)));
  }
  function rangeByScore(v) {
    if (v < 1000) return '0-1000元';
    if (v < 5000) return '1000-5000元';
    if (v < 10000) return '5000-1万元';
    if (v < 50000) return '1万-5万元';
    if (v < 100000) return '5万-10万元';
    return '10万元+';
  }
  function highlight(text) {
    let s = escapeHtml(text || '');
    s = s.replace(/(单人明星|多位明星|明星推荐|全量明星|Top10|复刻|真实视频帧|前3秒|信任锚点|群像热度|跑得好|重点放大)/g, '<mark class="hl-green">$1</mark>');
    s = s.replace(/(ROI|CTR|消耗|订单|0-3秒|3-12秒|12秒\+|\d+条|\d+位|\d+万|\d+%)/g, '<mark class="hl-yellow">$1</mark>');
    s = s.replace(/「([^」]+)」/g, '<mark class="hl-blue">「$1」</mark>');
    return s;
  }
  function scopeText() {
    const p = [];
    if (currentCat !== '全部') p.push(currentCat);
    if (currentSub !== '全部') p.push(currentSub);
    if (currentType !== '全部') p.push(currentType);
    if (keyword.trim()) p.push(`搜索：${keyword.trim()}`);
    return p.length ? p.join(' / ') : '全部明星';
  }
  function renderFilters() {
    renderChips(catChips, cats(), currentCat, v => { currentCat = v; currentSub = '全部'; currentType = '全部'; render(); });
    renderChips(subChips, subCats(), currentSub, v => { currentSub = v; currentType = '全部'; render(); });
    renderChips(typeChips, types(), currentType, v => { currentType = v; render(); });
    if (ruleText) ruleText.textContent = '';
  }
  function modeCards() {
    const modes = data.topConclusion?.modeSummary || [];
    return modes.map((m, idx) => {
      const why = m.mode === '单人明星'
        ? `单人明星整体更适合做家居类信任锚点：全量池中有 ${m.starCount || '-'} 位明星、${m.materials || '-'} 条素材，素材记忆点集中，更容易把“明星同款/明星推荐”落到一个具体商品卖点。`
        : `多位明星更适合声量型和组合背书：全量池中有 ${m.starCount || '-'} 位明星参与，适合用不同明星承接不同卖点，但要避免名单堆砌。`;
      const copy = m.mode === '单人明星' ? '复刻时优先选择识别度高的一位明星，前3秒亮明星姓名或同款提示，中段只讲一个家居痛点。' : '复刻时把多位明星拆成“信任/场景/转化”角色，画面和字幕必须说明每个人为什么出现。';
      return `<article class="material-insight-card level-${idx < 1 ? '重点放大' : '稳定补量'}"><div class="insight-rank">#${idx + 1}｜${idx === 0 ? '当前更强' : '补充策略'}</div><h3>${escapeHtml(m.mode)}</h3><div class="insight-metrics"><span><b>${escapeHtml(m.materials)}</b>全量素材</span><span><b>${escapeHtml(m.starCount)}</b>覆盖明星</span><span><b>${escapeHtml(m.cost)}</b>消耗区间</span><span><b>${escapeHtml(m.orders)}</b>订单区间</span></div><p><strong>结论：</strong>${highlight(why)}</p><p class="replicate"><strong>怎么复刻：</strong>${highlight(copy)}</p></article>`;
    }).join('');
  }
  function renderAllStars() {
    const all = data.allStars || [];
    return all.map((s, i) => `<a class="star-chip ${i < 10 ? 'hot' : ''}" href="${escapeHtml(s.bestUrl || '#')}" target="_blank" rel="noreferrer"><b>${i + 1}</b>${escapeHtml(s.name)}<em>${escapeHtml(s.cost)}｜${escapeHtml(s.materials)}条</em></a>`).join('');
  }
  function renderRecommendations() {
    const recs = data.starRecommendations || [];
    return recs.map(r => `<article class="material-insight-card"><div class="insight-rank">明星推荐 #${escapeHtml(r.rank)}</div><h3>${escapeHtml(r.name)}</h3><div class="insight-metrics"><span><b>${escapeHtml(r.cost)}</b>消耗区间</span><span><b>${escapeHtml(r.orders)}</b>订单区间</span><span><b>${escapeHtml(r.materials)}</b>素材条数</span><span><b>${escapeHtml(r.bestCategory || '-')}</b>代表类目</span></div><p><strong>为什么选：</strong>${highlight(r.reason)}</p><p><strong>做得好的视频：</strong><a href="${escapeHtml(r.bestUrl || '#')}" target="_blank" rel="noreferrer">${highlight(r.bestTitle || '打开代表视频')}</a></p></article>`).join('');
  }
  function renderConclusion(list) {
    const allStarCount = (data.allStars || []).length;
    const winner = data.topConclusion?.modeSummary?.[0]?.mode || '暂无';
    conclusion.innerHTML = `<div class="conclusion-head"><div><p class="eyebrow">${escapeHtml(scopeText())}</p><h2>${highlight(`全量明星池覆盖 ${allStarCount} 位明星，整体更推荐：${winner}`)}</h2></div><div class="qa-pill">上一周｜2026-10-05 至 2026-10-11</div></div><section class="material-insights"><div class="section-title"><p class="eyebrow">明星形式表现</p><h2>单人明星 vs 多位明星</h2></div><div class="material-insight-grid">${modeCards()}</div></section><section class="material-insights"><div class="section-title"><p class="eyebrow">明星推荐</p><h2>推荐明星与代表视频</h2></div><div class="material-insight-grid">${renderRecommendations()}</div></section><div class="mini-board"><div><h4>全量明星名单</h4><div class="all-stars-list">${renderAllStars()}</div></div></div>`;
  }
  function detailRows(item) {
    return (item.breakdownRows || []).map(r => `<div class="analysis-row deep-row"><b>${escapeHtml(r.module)}</b><p>${highlight(r.detail)}</p>${r.evidence ? `<em>${highlight(r.evidence)}</em>` : ''}</div>`).join('');
  }
  function timelineRows(item) {
    return (item.timeline || []).map(t => `<li><span>${escapeHtml(t.time)}</span><div><strong>${escapeHtml(t.stage)}</strong><em><b>话术/字幕</b>${highlight(t.speech)}</em><em><b>画面动作</b>${highlight(t.visual)}</em><em><b>复刻作用</b>${highlight(t.why)}</em></div></li>`).join('');
  }
  function metric(value, label) { return `<div><b>${escapeHtml(value || '-')}</b><span>${escapeHtml(label)}</span></div>`; }
  function card(item, idx) {
    const metrics = item.ranges || {};
    const url = item.open_url || item.video_url || '#';
    return `<article class="material-card"><div class="media-box"><img src="${escapeHtml(item.frame)}" alt="${escapeHtml(item.title)} 的真实视频帧" loading="lazy"/><div class="frame-note">${escapeHtml(item.frame_status || '原视频页真实视频帧')}</div><a class="open" href="${escapeHtml(url)}" target="_blank" rel="noreferrer">打开原素材</a></div><div class="content"><div class="card-head"><div><span class="rank">TOP ${escapeHtml(item.rank_in_cat || idx + 1)}</span><span class="tag">${escapeHtml(item.big_cat)}</span><span class="tag soft">${escapeHtml(item.specific_cat || '')}</span><span class="tag type-tag">${escapeHtml(item.celebrity_mode || '明星素材')}</span><span class="tag style-tag">${escapeHtml(item.star_names_text || '')}</span></div><span class="type">${escapeHtml(item.advertiser_name || '广告主已脱敏')}</span></div><h2>${highlight(item.title)}</h2><p class="summary">${highlight(item.summary)}</p><div class="why-good"><b>为什么这条明星素材值得复刻</b><p>${highlight(item.why_good || '')}</p></div><div class="metrics">${metric(metrics.cash_cost, '消耗区间')}${metric(metrics.ctr, '点击率区间')}${metric(metrics.cvr, '转化率区间')}${metric(metrics.roi, 'ROI区间')}${metric(metrics.finish_rate, '完播率区间')}${metric(metrics.orders, '订单数')}</div><details><summary>明星素材拆解｜明星是谁 / 具体做了啥 / 怎么复刻</summary><div class="analysis">${detailRows(item)}</div></details><details><summary>按秒复刻脚本｜话术 / 画面动作 / 作用</summary><ol class="timeline">${timelineRows(item)}</ol></details></div></article>`;
  }
  function renderCards(list) {
    countText.textContent = `当前展示 ${list.length} 条Top10明星素材卡｜大类 ${currentCat}｜具体类目 ${currentSub}｜明星形式 ${currentType}`;
    cards.innerHTML = list.length ? list.slice().sort((a, b) => score(b) - score(a)).map(card).join('') : '<div class="empty">当前筛选下Top10素材卡暂无命中，可切回“全部”查看。</div>';
  }
  function render() { renderFilters(); const list = filtered(); renderConclusion(list); renderCards(list); }
  searchInput?.addEventListener('input', (e) => { keyword = e.target.value || ''; render(); });
  render();
})();
