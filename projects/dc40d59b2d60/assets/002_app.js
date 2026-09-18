/* ===========================================================
   家纺爆款情报看板 · app.js
   数据源：同级 ./data.json（每 60 秒自动回读，可用 ?refresh=NN 自定义）
   兜底：window.__FALLBACK_DATA__（data-inline.js，用于 file:// 本地打开）
   =========================================================== */
'use strict';

/* ---------------- 配置 ---------------- */
const DEFAULT_INTERVAL = 60;
const MIN_INTERVAL = 10;

function readInterval() {
  const q = new URLSearchParams(location.search).get('refresh');
  const n = parseInt(q, 10);
  if (!q || isNaN(n)) return DEFAULT_INTERVAL;
  return Math.max(MIN_INTERVAL, n);
}

const STATE = {
  interval: readInterval(),
  data: null,
  updatedAt: null,
  countdown: 0,
  timer: null,
  tick: null,
  loading: false,
  offline: false,
  activeCat: null,
  filters: {},   // catId -> { platforms:Set, kw:string }
  charts: {},    // id -> echarts instance
};

/* ---------------- 工具 ---------------- */
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/* 盘古之白：中英文 / 中数字之间补空格（仅用于展示文本） */
function pangu(s) {
  if (s == null) return '';
  return String(s)
    .replace(/([\u4e00-\u9fa5\u3005-\u3007])([A-Za-z0-9])/g, '$1 $2')
    .replace(/([A-Za-z0-9%）\)])([\u4e00-\u9fa5\u3005-\u3007])/g, '$1 $2');
}
/* 展示文本 = 转义 + 盘古 */
const T = (s) => esc(pangu(s));

function fmtDateTime(iso) {
  if (!iso) return '—';
  const m = String(iso).match(/^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})/);
  if (m) return `${m[1]}-${m[2]}-${m[3]} ${m[4]}:${m[5]}`;
  const m2 = String(iso).match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m2 ? m2[0] : String(iso);
}

function nowStr() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

function toast(msg, warn) {
  const el = $('#toast');
  $('#toast-text').textContent = msg;
  el.classList.toggle('warn', !!warn);
  $('.material-symbols-outlined', el).textContent = warn ? 'error' : 'check_circle';
  el.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove('show'), 3200);
}

/* 数字滚动动画 */
function countUp(el, target, decimals) {
  const dur = 1000;
  const t0 = performance.now();
  function step(t) {
    const p = Math.min(1, (t - t0) / dur);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = (target * e).toFixed(decimals);
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target.toFixed(decimals);
  }
  requestAnimationFrame(step);
}

/* 区块淡入由 CSS animation 负责；此处仅保留兼容入口（保证内容始终可见） */
function revealAll() { $$('.reveal').forEach(e => e.classList.add('in')); }
function bindReveal() { revealAll(); }

/* ECharts 统一风格 */
const PALETTE = ['#C2542F', '#A98149', '#6E7A4F', '#7E2F3C', '#C9A227', '#8C7B6B', '#D08A62'];
const AXIS_STYLE = {
  axisLine: { lineStyle: { color: '#D9CDBC' } },
  axisLabel: { color: '#4A423C', fontSize: 13, fontFamily: 'Noto Sans SC' },
  axisTick: { show: false },
  splitLine: { lineStyle: { color: '#EFE7DC', type: 'dashed' } }
};
function mkChart(id, option) {
  const el = document.getElementById(id);
  if (!el || typeof echarts === 'undefined') return null;
  if (STATE.charts[id]) { STATE.charts[id].dispose(); delete STATE.charts[id]; }
  const c = echarts.init(el, null, { renderer: 'canvas' });
  c.setOption(Object.assign({
    textStyle: { fontFamily: 'Noto Sans SC, sans-serif', color: '#1F1B18' },
    color: PALETTE,
    animationDuration: 900,
    animationEasing: 'cubicOut',
    tooltip: {
      backgroundColor: 'rgba(31,27,24,.94)', borderWidth: 0,
      textStyle: { color: '#FDFBF8', fontSize: 13, fontFamily: 'Noto Sans SC' },
      extraCssText: 'border-radius:10px;padding:9px 12px;box-shadow:0 10px 26px rgba(0,0,0,.22)'
    }
  }, option));
  STATE.charts[id] = c;
  return c;
}
window.addEventListener('resize', () => { Object.values(STATE.charts).forEach(c => c && c.resize()); });

/* =========================================================
   数据拉取 + 自动刷新
   ========================================================= */
async function fetchData(manual) {
  if (STATE.loading) return;
  STATE.loading = true;
  setRefreshBtn(true);
  try {
    const res = await fetch('./data.json?t=' + Date.now(), { cache: 'no-store' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const json = await res.json();
    const changed = !STATE.updatedAt || json?.meta?.updated_at !== STATE.updatedAt;
    setOnline(true);
    if (changed) {
      STATE.data = json;
      STATE.updatedAt = json?.meta?.updated_at || null;
      renderAll(json);
      if (manual !== 'init') toast('数据已更新：' + fmtDateTime(STATE.updatedAt));
    } else {
      renderMeta(json);                       // 时间戳等轻量信息始终刷新
      if (manual === true) toast('已是最新数据，无变化');
    }
  } catch (err) {
    console.error('[dashboard] 读取 data.json 失败：', err);
    setOnline(false);
    if (!STATE.data) {
      // 首次失败（常见于 file:// 的 CORS 限制）→ 用内联兜底数据渲染
      const fb = window.__FALLBACK_DATA__;
      if (fb) {
        STATE.data = fb;
        STATE.updatedAt = fb?.meta?.updated_at || null;
        renderAll(fb);
        console.warn('[dashboard] 已改用内联兜底数据 window.__FALLBACK_DATA__ 渲染（部署到 http(s) 环境后将以 fetch 到的 data.json 为准）');
      } else {
        $('#kpi-grid').innerHTML = '<div class="card p-5 text-[14px]">数据加载失败，请检查同级目录下是否存在 data.json。</div>';
      }
    }
    if (manual === true) toast('刷新失败，仍显示上次数据', true);
  } finally {
    STATE.loading = false;
    setRefreshBtn(false);
    resetCountdown();
  }
}

function setRefreshBtn(loading) {
  const btn = $('#btn-refresh'), icon = $('#refresh-icon'), label = $('#refresh-label');
  if (!btn) return;
  btn.disabled = !!loading;
  icon.classList.toggle('spin', !!loading);
  icon.textContent = loading ? 'progress_activity' : 'refresh';
  label.textContent = loading ? '刷新中…' : '立即刷新';
}

function setOnline(ok) {
  STATE.offline = !ok;
  const dot = $('#live-dot'), txt = $('#live-text');
  dot.classList.toggle('offline', !ok);
  txt.textContent = ok ? '自动回读运行中' : '离线，使用上次数据';
  $('#pill-online').title = ok
    ? `每 ${STATE.interval} 秒回读 ./data.json`
    : '最近一次回读 ./data.json 失败，页面继续展示上一次成功获取的数据';
}

function resetCountdown() {
  STATE.countdown = STATE.interval;
  $('#pill-countdown').textContent = STATE.countdown;
}

function startLoop() {
  clearInterval(STATE.timer); clearInterval(STATE.tick);
  resetCountdown();
  STATE.tick = setInterval(() => {
    STATE.countdown = Math.max(0, STATE.countdown - 1);
    const el = $('#pill-countdown');
    if (el) el.textContent = STATE.countdown;
  }, 1000);
  STATE.timer = setInterval(() => fetchData(false), STATE.interval * 1000);
}

/* =========================================================
   渲染：meta / 状态条 / Hero
   ========================================================= */
function renderMeta(d) {
  const m = d.meta || {};
  $('#pill-version').textContent = m.data_version || 'v–';
  $('#pill-updated').textContent = fmtDateTime(m.updated_at);
  $('#snap-capture').textContent = m.capture_date || '—';
  $('#snap-version').textContent = m.data_version || '—';
  $('#snap-items').textContent = m.item_count || m.product_count || '—';
  $('#snap-sources').textContent = m.source_count || '—';
  $('#snap-note').innerHTML = T(m.refresh_note || '');
  $('#snap-next').textContent = m.next_review || '—';
  $('#foot-sources').textContent = m.source_count || '—';
  $('#foot-items').textContent = m.item_count || m.product_count || '—';
  $('#foot-updated').textContent = fmtDateTime(m.updated_at);
  $('#foot-render').textContent = nowStr();
  $('#foot-interval').textContent = STATE.interval;
  if (m.report_url) {
    $('#hero-report').href = m.report_url;
    $('#foot-report').href = m.report_url;
  }
}

/* =========================================================
   渲染：KPI
   ========================================================= */
function renderKPIs(d) {
  const box = $('#kpi-grid');
  box.innerHTML = (d.kpis || []).map((k, i) => `
    <a class="card kpi reveal" href="${esc(k.url || '#')}" target="_blank" rel="noopener" style="animation-delay:${i * 55}ms">
      <div class="flex items-start justify-between gap-2">
        <div class="kpi-label">${T(k.label)}</div>
        <span class="material-symbols-outlined kpi-arrow">north_east</span>
      </div>
      <div class="flex items-end gap-1 mt-1.5">
        <span class="kpi-value serif-num" data-num="${esc(k.value)}">0</span>
        <span class="kpi-unit">${T(k.unit || '')}</span>
      </div>
      <div class="mt-2 flex flex-wrap items-center gap-2">
        <span class="kpi-delta ${esc(k.tone || 'flat')}">
          <span class="material-symbols-outlined" style="font-size:14px">${k.tone === 'up' ? 'trending_up' : k.tone === 'down' ? 'trending_down' : 'remove'}</span>
          ${T(k.delta || '')}
        </span>
      </div>
      <div class="kpi-note mt-1.5">${T(k.note || '')}</div>
    </a>`).join('');

  // 进入视口时启动数字滚动
  const nums = $$('.kpi-value', box);
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((ents) => {
      ents.forEach(en => {
        if (!en.isIntersecting) return;
        const el = en.target, raw = el.dataset.num || '0';
        const dec = (raw.split('.')[1] || '').length;
        countUp(el, parseFloat(raw) || 0, dec);
        io.unobserve(el);
      });
    }, { threshold: 0.4 });
    nums.forEach(n => io.observe(n));
    // 兜底：若 0.8 秒后仍未进入视口（例如整页截图场景），直接显示终值
    setTimeout(() => nums.forEach(n => { if (n.textContent === '0') n.textContent = n.dataset.num; }), 800);
  } else {
    nums.forEach(n => { n.textContent = n.dataset.num; });
  }
}

/* =========================================================
   渲染：五平台 + 价格带图 + 三条路径
   ========================================================= */
const ACCESS_TEXT = { high: '数据可直连', medium: '需第三方转述', low: '仅能间接推断' };
const ACCESS_ICON = { high: 'verified', medium: 'help', low: 'lock' };

function renderPlatforms(d) {
  const box = $('#platform-grid');
  box.innerHTML = (d.platforms || []).map((p, i) => {
    const lv = p.accessLevel || 'medium';
    const hero = lv === 'high';
    return `
    <div class="card p-5 reveal ${hero ? 'ring-1' : ''}" style="animation-delay:${i * 50}ms;${hero ? 'border-color:#CBD9B4;background:linear-gradient(180deg,#F7FAF0,#fff 45%)' : ''}">
      <div class="flex items-start justify-between gap-2 mb-1.5">
        <div>
          <h3 class="text-[17px]">${T(p.name)}</h3>
          <span class="tag tag-terra mt-1.5">${T(p.tag)}</span>
        </div>
        <span class="tag access-${esc(lv)}" title="${T(p.access)}">
          <span class="material-symbols-outlined" style="font-size:14px">${ACCESS_ICON[lv] || 'help'}</span>${T(ACCESS_TEXT[lv] || '')}
        </span>
      </div>
      ${hero ? '<div class="text-[13px] font-bold mb-1" style="color:#3F5A32">★ 唯一可直接访问公开榜单页的平台</div>' : ''}
      <div class="meta-row"><span class="material-symbols-outlined">sell</span><span><b>价格带：</b>${T(p.band)}</span></div>
      <div class="meta-row"><span class="material-symbols-outlined">emoji_events</span><span><b>头部结构：</b>${T(p.top)}</span></div>
      <div class="meta-row"><span class="material-symbols-outlined">bolt</span><span><b>爆款驱动：</b>${T(p.driver)}</span></div>
      <div class="heat-box mt-2"><b>数据可得性：</b>${T(p.access)}</div>
      <a class="btn btn-ghost mt-3 self-start" href="${esc(p.url)}" target="_blank" rel="noopener">
        <span class="material-symbols-outlined" style="font-size:16px">open_in_new</span>来源页
      </a>
    </div>`;
  }).join('');

  // 数据可得性速览
  const LV_W = { high: 100, medium: 60, low: 28 };
  const LV_C = { high: 'var(--olive)', medium: 'var(--bronze)', low: 'var(--wine)' };
  const asBox = $('#access-summary');
  if (asBox) {
    asBox.innerHTML = (d.platforms || []).map(p => {
      const lv = p.accessLevel || 'medium';
      return `
      <div class="flex items-center gap-2.5 text-[13px]">
        <span style="width:96px;font-weight:700;color:var(--ink-2)">${T(p.name)}</span>
        <span style="flex:1;height:10px;border-radius:10px;background:var(--bg-warm);display:inline-block;overflow:hidden">
          <span style="display:block;height:100%;width:${LV_W[lv]}%;background:${LV_C[lv]};border-radius:10px"></span>
        </span>
        <span class="tag access-${esc(lv)}" style="min-width:96px;justify-content:center">${T(ACCESS_TEXT[lv])}</span>
      </div>`;
    }).join('');
  }

  const pb = d.priceBand;
  if (pb) {
    $('#priceband-title').textContent = pangu(pb.title || '');
    $('#priceband-sub').textContent = pangu('两平台的高价段厚度差异，直接决定同一款货该往哪个平台推。来源时点：' + (pb.source || ''));
    const src = $('#priceband-src');
    src.href = pb.url || '#';
    src.textContent = pangu(pb.source || '来源');
    const names = (pb.series || []).map(s => s.name);
    mkChart('chart-priceband', {
      grid: { left: 8, right: 58, top: 14, bottom: 6, containLabel: true },
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' },
        formatter: (ps) => {
          const s = (pb.series || [])[ps[0].dataIndex] || {};
          return `<b>${ps[0].name}</b><br/>${s.label || ''}：<b>${s.value}%</b>`;
        } },
      xAxis: Object.assign({ type: 'value', max: 50, axisLabel: { formatter: '{value}%', color: '#4A423C', fontSize: 13 } }, AXIS_STYLE),
      yAxis: Object.assign({ type: 'category', data: names, axisLabel: { fontSize: 13.5, fontWeight: 600, color: '#1F1B18' } }, AXIS_STYLE, { splitLine: { show: false } }),
      series: [{
        type: 'bar', barWidth: 30,
        data: (pb.series || []).map((s, i) => ({
          value: s.value,
          itemStyle: {
            borderRadius: [0, 8, 8, 0],
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: i === 0 ? '#D9835C' : '#8C9A63' },
              { offset: 1, color: i === 0 ? '#C2542F' : '#6E7A4F' }
            ])
          }
        })),
        label: { show: true, position: 'right', formatter: '{c}%', fontSize: 14, fontWeight: 700, color: '#1F1B18' }
      }]
    });
  }

  $('#paths-grid').innerHTML = (d.paths || []).map((p, i) => `
    <div class="card p-5 reveal" style="animation-delay:${i * 60}ms">
      <div class="flex items-center gap-2 mb-2">
        <span class="serif-num text-[26px] font-extrabold" style="color:var(--line-strong)">0${i + 1}</span>
        <div>
          <h4 class="text-[16px]">${T(p.name)}</h4>
          <span class="tag tag-bronze mt-1">${T(p.scope)}</span>
        </div>
      </div>
      <p class="text-[13.5px]" style="color:var(--ink-2)">${T(p.desc)}</p>
      <a class="btn btn-ghost mt-3" href="${esc(p.url)}" target="_blank" rel="noopener">
        <span class="material-symbols-outlined" style="font-size:16px">link</span>证据来源
      </a>
    </div>`).join('');
}

/* =========================================================
   渲染：三品类爆款清单（Tab + 筛选 + 图表 + 卖点四层）
   ========================================================= */
const TIER_CLASS = {
  '平台官方': 'tag-olive', '品牌官网': 'tag-olive',
  '第三方监控': 'tag-bronze', '第三方榜单': 'tag-bronze',
  '媒体报道': 'tag-wine', '报告解读': 'tag-wine', '批发平台': 'tag'
};

function catById(d, id) { return (d.categories || []).find(c => c.id === id); }

function renderCategories(d) {
  const cats = d.categories || [];
  if (!cats.length) return;
  if (!STATE.activeCat || !catById(d, STATE.activeCat)) STATE.activeCat = cats[0].id;

  $('#cat-tabs').innerHTML = cats.map(c => `
    <button class="tab ${c.id === STATE.activeCat ? 'active' : ''}" data-cat="${esc(c.id)}">
      <span class="material-symbols-outlined">${esc(c.icon || 'category')}</span>${T(c.name)}
      <span style="opacity:.6;font-weight:600">${(c.items || []).length}</span>
    </button>`).join('');

  $$('#cat-tabs .tab').forEach(b => b.addEventListener('click', () => {
    STATE.activeCat = b.dataset.cat;
    $$('#cat-tabs .tab').forEach(x => x.classList.toggle('active', x === b));
    renderCatPanel(STATE.data);
    document.getElementById('list').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));

  renderCatPanel(d);
}

function renderCatPanel(d) {
  const cat = catById(d, STATE.activeCat);
  if (!cat) return;
  if (!STATE.filters[cat.id]) STATE.filters[cat.id] = { platforms: new Set(), kw: '' };
  const f = STATE.filters[cat.id];

  const platforms = [];
  (cat.items || []).forEach(it => { if (!platforms.includes(it.platform)) platforms.push(it.platform); });

  $('#cat-count').textContent = pangu(`当前品类 ${(cat.items || []).length} 条清单 · ${platforms.length} 种平台归属 · ${(cat.layers || []).length} 层卖点拆解`);

  $('#cat-panel').innerHTML = `
    <div class="card p-5 sm:p-6 mb-4 reveal">
      <div class="flex items-start gap-3">
        <span class="material-symbols-outlined" style="font-size:30px;color:var(--terra)">${esc(cat.icon || 'category')}</span>
        <div>
          <h3 class="text-[clamp(17px,2vw,21px)] leading-snug mb-1.5">${T(cat.headline)}</h3>
          <p class="text-[14px]" style="color:var(--ink-2);max-width:88ch">${T(cat.summary)}</p>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap items-center gap-2.5 mb-4 reveal">
      <span class="text-[13px] font-bold mr-1" style="color:var(--ink-3)">平台筛选</span>
      <div class="flex flex-wrap gap-2" id="chips"></div>
      <div class="search-box ml-auto">
        <span class="material-symbols-outlined" style="font-size:18px;color:var(--ink-3)">search</span>
        <input id="kw" type="search" placeholder="搜品牌 / 商品 / 材质 / 卖点…" value="${esc(f.kw)}" />
      </div>
    </div>

    <div class="grid xl:grid-cols-[1.62fr_1fr] gap-5 items-start">
      <div>
        <div class="flex items-center justify-between mb-2.5">
          <span class="text-[13px] font-bold" style="color:var(--ink-3)">爆款清单 <b id="hit-count" style="color:var(--terra-dark)"></b></span>
          <span class="text-[13px]" style="color:var(--ink-3)">链接均为榜单页 / 官网 / 监控页</span>
        </div>
        <div class="grid sm:grid-cols-2 gap-4" id="item-grid"></div>
      </div>

      <div class="grid gap-4">
        <div class="card p-5 reveal">
          <h4 class="text-[16px] mb-0.5" id="cat-chart-title">品类结构</h4>
          <p class="text-[13px] mb-1" style="color:var(--ink-3)" id="cat-chart-sub"></p>
          <div class="chart" id="chart-cat"></div>
        </div>
        <div class="reveal">
          <h4 class="text-[16px] mb-2 flex items-center gap-2">
            <span class="material-symbols-outlined" style="font-size:19px;color:var(--bronze)">layers</span>卖点四层拆解
          </h4>
          <div id="layer-list"></div>
        </div>
      </div>
    </div>`;

  // chips
  const chipBox = $('#chips');
  chipBox.innerHTML = [`<button class="chip ${f.platforms.size === 0 ? 'on' : ''}" data-p="__all">全部 <span class="cnt">${(cat.items || []).length}</span></button>`]
    .concat(platforms.map(p => {
      const n = (cat.items || []).filter(it => it.platform === p).length;
      return `<button class="chip ${f.platforms.has(p) ? 'on' : ''}" data-p="${esc(p)}">${T(p)} <span class="cnt">${n}</span></button>`;
    })).join('');

  $$('.chip', chipBox).forEach(btn => btn.addEventListener('click', () => {
    const p = btn.dataset.p;
    if (p === '__all') f.platforms.clear();
    else { f.platforms.has(p) ? f.platforms.delete(p) : f.platforms.add(p); }
    $$('.chip', chipBox).forEach(b => {
      b.classList.toggle('on', b.dataset.p === '__all' ? f.platforms.size === 0 : f.platforms.has(b.dataset.p));
    });
    renderItems(cat);
  }));

  const kwInput = $('#kw');
  kwInput.addEventListener('input', () => { f.kw = kwInput.value.trim(); renderItems(cat); });

  renderItems(cat);
  renderLayers(cat);
  renderCatChart(cat);
  bindReveal();
}

function renderItems(cat) {
  const f = STATE.filters[cat.id];
  const kw = (f.kw || '').toLowerCase();
  const hits = (cat.items || []).filter(it => {
    if (f.platforms.size && !f.platforms.has(it.platform)) return false;
    if (!kw) return true;
    const hay = [it.platform, it.brand, it.name, it.spec, it.price, it.heat, (it.points || []).join(' ')].join(' ').toLowerCase();
    return hay.indexOf(kw) >= 0;
  });

  $('#hit-count').textContent = `${hits.length} / ${(cat.items || []).length}`;

  const box = $('#item-grid');
  if (!hits.length) {
    box.innerHTML = `<div class="card-flat p-6 text-center sm:col-span-2 text-[14px]" style="color:var(--ink-3)">
      <span class="material-symbols-outlined" style="font-size:30px;color:var(--line-strong)">search_off</span>
      <div class="mt-1">没有匹配的商品，试试减少平台筛选或换个关键词。</div></div>`;
    return;
  }

  box.innerHTML = hits.map((it, i) => {
    const tier = (it.link && it.link.tier) || '';
    const tc = TIER_CLASS[tier] || 'tag';
    return `
    <div class="card item-card ${it.star ? 'star' : ''}" style="animation:fadeIn .4s ease ${i * 20}ms both">
      ${it.star ? '<span class="badge-star"><span class="material-symbols-outlined">star</span>重点关注</span>' : ''}
      <div class="flex flex-wrap items-center gap-2">
        <span class="tag tag-olive"><span class="material-symbols-outlined" style="font-size:14px">storefront</span>${T(it.platform)}</span>
        <span class="item-brand">${T(it.brand)}</span>
      </div>
      <div class="item-name">${T(it.name)}</div>
      <div class="meta-row"><span class="material-symbols-outlined">texture</span><span>${T(it.spec)}</span></div>
      <div class="meta-row"><span class="material-symbols-outlined">payments</span><span><b>${T(it.price)}</b></span></div>
      <div class="heat-box"><b>热度信号：</b>${T(it.heat)}</div>
      <div class="flex flex-wrap gap-1.5">${(it.points || []).map(p => `<span class="tag tag-terra">${T(p)}</span>`).join('')}</div>
      <div class="flex items-center gap-2 mt-1 flex-wrap">
        <a class="btn btn-ghost" href="${esc(it.link && it.link.url || '#')}" target="_blank" rel="noopener">
          <span class="material-symbols-outlined" style="font-size:16px">open_in_new</span>${T(it.link && it.link.text || '来源')}
        </a>
        ${tier ? `<span class="tag ${tc}">${T(tier)}</span>` : ''}
      </div>
    </div>`;
  }).join('');
}

function renderLayers(cat) {
  $('#layer-list').innerHTML = (cat.layers || []).map((l, i) => `
    <details class="acc" ${i === 0 ? 'open' : ''}>
      <summary>
        <span class="serif-num text-[15px] font-extrabold" style="color:var(--terra)">L${i + 1}</span>
        <span>${T(l.layer)}</span>
        <span class="tag tag-bronze" style="margin-left:6px">${T(l.role)}</span>
        <span class="material-symbols-outlined chev">expand_more</span>
      </summary>
      <div class="acc-body">
        <p class="mb-2">${T(l.content)}</p>
        <div class="notice"><b>判断：</b>${T(l.verdict)}</div>
      </div>
    </details>`).join('');
}

function renderCatChart(cat) {
  if (cat.id === 'pillow' && cat.brandShare) {
    $('#cat-chart-title').textContent = '线上枕头品牌份额（2026 Q1 全渠道）';
    $('#cat-chart-sub').textContent = pangu('一超多追：第一名 26.8%，第二名仅 2.8%');
    mkChart('chart-cat', {
      tooltip: { trigger: 'item', formatter: '{b}<br/>份额 <b>{c}%</b>（{d}%）' },
      legend: { bottom: 0, itemWidth: 9, itemHeight: 9, textStyle: { fontSize: 13, color: '#4A423C' } },
      series: [{
        type: 'pie', radius: ['46%', '70%'], center: ['50%', '43%'],
        avoidLabelOverlap: true,
        itemStyle: { borderColor: '#fff', borderWidth: 2 },
        label: { show: true, formatter: '{b}\n{c}%', fontSize: 13, color: '#4A423C', lineHeight: 16 },
        labelLine: { length: 8, length2: 8, lineStyle: { color: '#D9CDBC' } },
        data: cat.brandShare.map((b, i) => ({
          name: b.name, value: b.value,
          itemStyle: { color: b.name === '其他' ? '#E3D9CB' : PALETTE[i % PALETTE.length] }
        }))
      }]
    });
  } else if (cat.id === 'quilt' && cat.bandSplit) {
    $('#cat-chart-title').textContent = '被芯的两段式价格结构';
    $('#cat-chart-sub').textContent = pangu('99 元以下与 339 元以上两端并存，几乎没有中间态');
    const s = cat.bandSplit;
    mkChart('chart-cat', {
      grid: { left: 6, right: 6, top: 30, bottom: 66, containLabel: true },
      tooltip: { trigger: 'item', formatter: (p) => `${p.seriesName}<br/><b>${p.value}%</b><br/>${(s[p.seriesIndex] || {}).note || ''}` },
      legend: { bottom: 0, itemWidth: 9, itemHeight: 9, textStyle: { fontSize: 13, color: '#4A423C' }, type: 'scroll', width: '96%' },
      xAxis: Object.assign({ type: 'value', max: 100, show: false }, AXIS_STYLE),
      yAxis: Object.assign({ type: 'category', data: ['被芯销量结构'], axisLabel: { fontSize: 13, fontWeight: 700 } }, AXIS_STYLE, { splitLine: { show: false } }),
      series: s.map((b, i) => ({
        name: b.name, type: 'bar', stack: 'x', barWidth: 62,
        itemStyle: {
          color: i === 0
            ? new echarts.graphic.LinearGradient(0, 0, 1, 0, [{ offset: 0, color: '#9AA86F' }, { offset: 1, color: '#6E7A4F' }])
            : new echarts.graphic.LinearGradient(0, 0, 1, 0, [{ offset: 0, color: '#D9835C' }, { offset: 1, color: '#9E3F20' }]),
          borderRadius: i === 0 ? [8, 0, 0, 8] : [0, 8, 8, 0]
        },
        label: { show: true, formatter: '{c}%', fontSize: 16, fontWeight: 800, color: '#fff' },
        data: [b.value]
      }))
    });
  } else if (cat.id === 'set' && cat.weightMatrix) {
    $('#cat-chart-title').textContent = '套件：面料 / 美学 / 组合 的权重迁移';
    $('#cat-chart-sub').textContent = pangu('价格带越高，美学权重越大；越低，组合权重越大（3 = 决定性，1 = 弱）');
    const wm = cat.weightMatrix;
    mkChart('chart-cat', {
      grid: { left: 6, right: 16, top: 34, bottom: 58, containLabel: true },
      tooltip: {
        trigger: 'axis', axisPointer: { type: 'shadow' },
        formatter: (ps) => {
          const rep = (wm[ps[0].dataIndex] || {}).rep || '';
          return `<b>${ps[0].name}</b><br/>` + ps.map(p => `${p.marker}${p.seriesName}：<b>${p.value}</b>`).join('<br/>') + `<br/><span style="opacity:.75">代表：${rep}</span>`;
        }
      },
      legend: { bottom: 0, itemWidth: 9, itemHeight: 9, textStyle: { fontSize: 13, color: '#4A423C' } },
      xAxis: Object.assign({ type: 'category', data: wm.map(w => w.band), axisLabel: { fontSize: 12.5, interval: 0, rotate: 18, color: '#4A423C' } }, AXIS_STYLE, { splitLine: { show: false } }),
      yAxis: Object.assign({ type: 'value', max: 9, name: '权重合计', nameTextStyle: { fontSize: 12.5, color: '#7B7169' } }, AXIS_STYLE),
      series: [
        { name: '面料参数（入场券）', type: 'bar', stack: 'w', barWidth: 34, data: wm.map(w => w.fabric), itemStyle: { color: '#6E7A4F' } },
        { name: '花型美学（溢价源）', type: 'bar', stack: 'w', data: wm.map(w => w.aesthetic), itemStyle: { color: '#C2542F' } },
        { name: '套装组合（转化器）', type: 'bar', stack: 'w', data: wm.map(w => w.bundle), itemStyle: { color: '#A98149', borderRadius: [6, 6, 0, 0] } }
      ]
    });
  } else {
    $('#cat-chart-title').textContent = '品类结构';
    $('#cat-chart-sub').textContent = '本品类暂无结构化图表数据';
    document.getElementById('chart-cat').innerHTML = '';
  }
}

/* =========================================================
   渲染：小红书内容风向
   ========================================================= */
function renderXhs(d) {
  const x = d.xhs || {};
  const ov = x.overview || {};
  $('#xhs-note').innerHTML = `${T(ov.note || '')} <span style="color:var(--ink-3)">（口径：${T(ov.period || '')} ${T(ov.source || '')}）</span>`;

  $('#xhs-overview').innerHTML = (ov.stats || []).map((s, i) => `
    <a class="card p-5 reveal block" href="${esc(ov.url || '#')}" target="_blank" rel="noopener" style="animation-delay:${i * 55}ms">
      <div class="flex items-center gap-2 mb-1">
        <span class="material-symbols-outlined" style="font-size:20px;color:var(--wine)">${esc(s.icon || 'insights')}</span>
        <span class="text-[13.5px] font-bold" style="color:var(--ink-2)">${T(s.label)}</span>
      </div>
      <div class="stat-mini"><b class="serif-num" style="color:var(--wine)">${T(s.value)}</b><span class="text-[14px] font-bold" style="color:var(--ink-3)">${T(s.unit)}</span></div>
      <div class="text-[13px] mt-1" style="color:var(--ink-3)">${T(ov.period)} · ${T(ov.source)}</div>
    </a>`).join('');

  $('#xhs-cats').innerHTML = (x.categories || []).map((c, i) => `
    <div class="card p-5 reveal" style="animation-delay:${i * 60}ms">
      <div class="flex items-center gap-2 mb-2">
        <span class="material-symbols-outlined" style="font-size:22px;color:var(--terra)">${esc(c.icon || 'category')}</span>
        <h4 class="text-[17px]">${T(c.name)}</h4>
      </div>
      <div class="card-flat p-3 mb-3">
        <div class="flex items-baseline gap-1.5">
          <b class="serif-num text-[24px]" style="color:var(--terra-dark)">${T(c.volume.metric)}</b>
          <span class="text-[13px] font-bold" style="color:var(--ink-3)">${T(c.volume.metricUnit)}</span>
        </div>
        <div class="text-[13px]" style="color:var(--ink-2)">${T(c.volume.text)}</div>
        <a class="text-[13px]" href="${esc(c.volume.url)}" target="_blank" rel="noopener">来源：${T(c.volume.source)} ↗</a>
      </div>

      <div class="text-[13px] font-bold mb-1.5" style="color:var(--ink-3)">高热选题方向</div>
      <div class="flex flex-wrap gap-1.5 mb-3">${(c.topics || []).map(t => `<span class="tag tag-olive">${T(t)}</span>`).join('')}</div>

      <div class="text-[13px] font-bold mb-1.5" style="color:var(--ink-3)">典型标题句式</div>
      <ul class="mb-3 space-y-1.5">${(c.titles || []).map(t => `
        <li class="text-[13.5px]" style="color:var(--ink-2)">
          <span class="material-symbols-outlined" style="font-size:15px;color:var(--bronze);vertical-align:-3px">format_quote</span>
          ${T(t.text)} <a href="${esc(t.url)}" target="_blank" rel="noopener" class="text-[13px]">${T(t.source)} ↗</a>
        </li>`).join('')}</ul>

      <div class="text-[13px] font-bold mb-1.5" style="color:var(--bad)">用户吐槽词（内容与卖点防御的靶心）</div>
      <div class="flex flex-wrap gap-1.5">${(c.complaints || []).map(w => `
        <a class="tag tag-red" href="${esc(w.url)}" target="_blank" rel="noopener" title="${T(w.source)}">${T(w.word)}</a>`).join('')}</div>
    </div>`).join('');

  const aw = x.attentionWeights || {};
  $('#aw-title').textContent = pangu(aw.title || '用户关注权重');
  $('#aw-sub').innerHTML = `${T(aw.period || '')} · <a href="${esc(aw.url || '#')}" target="_blank" rel="noopener">${T(aw.source || '')} ↗</a>`;
  $('#aw-note').innerHTML = T(aw.note || '');
  if ((aw.items || []).length) {
    mkChart('chart-attention', {
      tooltip: { trigger: 'item', formatter: '{b}<br/>关注权重 <b>{c}%</b>' },
      series: [{
        type: 'pie', radius: ['52%', '76%'], center: ['50%', '50%'], startAngle: 96,
        itemStyle: { borderColor: '#fff', borderWidth: 3 },
        label: { formatter: '{b}\n{c}%', fontSize: 13, lineHeight: 16, color: '#4A423C' },
        labelLine: { length: 10, length2: 10, lineStyle: { color: '#D9CDBC' } },
        data: (aw.items || []).map((it, i) => ({ name: it.name, value: it.value, itemStyle: { color: [ '#C2542F', '#6E7A4F', '#A98149' ][i] || '#8C7B6B' } }))
          .concat([{ name: '其他（风格美学等）', value: Math.max(0, 100 - (aw.items || []).reduce((s, i2) => s + i2.value, 0)), itemStyle: { color: '#E3D9CB' } }])
      }]
    });
  }

  $('#xhs-signals').innerHTML = (x.signals || []).map((s, i) => `
    <div class="card p-5 reveal" style="animation-delay:${i * 55}ms">
      <div class="flex items-start gap-3">
        <span class="material-symbols-outlined" style="font-size:24px;color:var(--olive)">${esc(s.icon || 'insights')}</span>
        <div class="flex-1">
          <h4 class="text-[16px] mb-1">${T(s.title)}</h4>
          <div class="flex flex-wrap gap-1.5 mb-2">${(s.metrics || []).map(m => `<span class="tag tag-bronze">${T(m)}</span>`).join('')}</div>
          ${s.tags ? `<div class="flex flex-wrap gap-1.5 mb-2">${s.tags.map(t => `<span class="tag tag-wine">${esc(t)}</span>`).join('')}</div>` : ''}
          ${s.pyramid ? `<div class="mb-2 space-y-1">${s.pyramid.map(p => `
            <div class="flex items-center gap-2 text-[13px]">
              <span style="width:74px;color:var(--ink-2);font-weight:600">${T(p.name)}</span>
              <span style="flex:1;height:9px;border-radius:9px;background:var(--bg-warm);overflow:hidden;display:inline-block">
                <span style="display:block;height:100%;width:${p.value}%;background:linear-gradient(90deg,var(--olive),var(--bronze));border-radius:9px"></span>
              </span>
              <b class="serif-num" style="width:34px;text-align:right">${p.value}%</b>
              <span style="color:var(--ink-3)">${T(p.role)}</span>
            </div>`).join('')}</div>` : ''}
          <p class="text-[13.5px] mb-1.5" style="color:var(--ink-2)">${T(s.detail)}</p>
          <div class="flex flex-wrap gap-2 text-[13px]">${(s.sources || []).map(so => `<a href="${esc(so.url)}" target="_blank" rel="noopener">${T(so.text)} ↗</a>`).join('')}</div>
        </div>
      </div>
    </div>`).join('');
}

/* =========================================================
   渲染：错位地图
   ========================================================= */
function renderMismatch(d) {
  const mm = d.mismatch || {};
  $('#mm-title').textContent = pangu(mm.title || '错位地图');
  $('#mm-insight').innerHTML = T((d.xhs && d.xhs.keyInsight) || '');

  $('#mm-table').innerHTML = `
    <thead><tr>
      <th style="width:24%">电商详情页主推</th>
      <th style="width:24%">小红书真实讨论</th>
      <th style="width:16%">错位性质</th>
      <th style="width:36%">由此产生的机会</th>
    </tr></thead>
    <tbody>${(mm.rows || []).map(r => `
      <tr>
        <td class="mm-detail">${T(r.detail)}</td>
        <td class="mm-xhs">${T(r.xhs)}${r.source ? `<br/><a class="text-[13px]" href="${esc(r.source.url)}" target="_blank" rel="noopener">${T(r.source.text)} ↗</a>` : ''}</td>
        <td class="mm-type">${T(r.type)}</td>
        <td class="mm-opp">${T(r.opportunity)}</td>
      </tr>`).join('')}</tbody>`;

  const cp = mm.counterpoint || {};
  $('#mm-counter').innerHTML = `
    <div class="flex items-center gap-2 mb-2">
      <span class="material-symbols-outlined" style="font-size:21px;color:var(--wine)">balance</span>
      <h3 class="text-[16.5px]">${T(cp.title || '')}</h3>
    </div>
    <div class="notice notice-ink mb-3"><b>最强反驳：</b>${T(cp.argument || '')}</div>
    <div class="text-[14px] font-bold mb-2" style="color:var(--terra-dark)">${T(cp.verdict || '')}</div>
    <ul class="space-y-1.5 mb-3">${(cp.points || []).map(p => `
      <li class="text-[13.5px] flex gap-2" style="color:var(--ink-2)">
        <span class="material-symbols-outlined" style="font-size:16px;color:var(--bronze);margin-top:3px">chevron_right</span><span>${T(p)}</span>
      </li>`).join('')}</ul>
    ${cp.source ? `<a class="text-[13px]" href="${esc(cp.source.url)}" target="_blank" rel="noopener">来源：${T(cp.source.text)} ↗</a>` : ''}`;
}

/* =========================================================
   渲染：落地动作
   ========================================================= */
function renderActions(d) {
  $('#action-list').innerHTML = (d.actions || []).map((a, i) => `
    <div class="card action-row reveal" style="animation-delay:${i * 45}ms">
      <div class="action-idx serif-num">${i + 1}</div>
      <div class="flex-1">
        <div class="flex flex-wrap items-center gap-2 mb-1">
          <span class="pri pri-${esc(a.priority || 'P1')}">${esc(a.priority || '')}</span>
          <span class="tag tag-bronze"><span class="material-symbols-outlined" style="font-size:14px">event</span>${T(a.timing)}</span>
          ${(a.tags || []).map(t => `<span class="tag">${T(t)}</span>`).join('')}
        </div>
        <h4 class="text-[16px] mb-1">${T(a.title)}</h4>
        <p class="text-[13.5px]" style="color:var(--ink-2)">${T(a.desc)}</p>
      </div>
    </div>`).join('');
}

/* =========================================================
   渲染：刷新机制 + 数据口径 + 链接层级
   ========================================================= */
const CAV_ICON = { critical: 'report', warn: 'warning', info: 'info' };
function renderRefreshAndCaveats(d) {
  const rm = d.refreshMechanism || {};
  if (rm.title) $('#rm-title').textContent = pangu(rm.title);
  $('#rm-honest-text').innerHTML = `<b>${T(rm.honestNote || '')}</b>`;

  $('#rm-layers').innerHTML = (rm.layers || []).map((l, i) => `
    <div class="card layer-card layer-${esc(l.statusTone || 'mid')} reveal" style="animation-delay:${i * 60}ms">
      <div class="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
        <h4 class="text-[15.5px]">${T(l.level)}</h4>
        <span class="layer-status">${T(l.status)}</span>
      </div>
      <p class="text-[13.5px]" style="color:var(--ink-2)">${T(l.desc)}</p>
    </div>`).join('');

  const cv = d.caveats || {};
  $('#cav-count').textContent = (cv.items || []).length;
  $('#cav-headline').innerHTML = `<b>一句话：</b>${T(cv.headline || '')}`;
  $('#cav-list').innerHTML = (cv.items || []).map(c => `
    <div class="card-flat p-4 cav-${esc(c.level || 'info')}">
      <div class="flex items-start gap-2 mb-1">
        <span class="material-symbols-outlined" style="font-size:18px;color:${c.level === 'critical' ? 'var(--bad)' : c.level === 'warn' ? 'var(--mid)' : 'var(--olive)'}">${CAV_ICON[c.level] || 'info'}</span>
        <b class="text-[14px]">${T(c.title)}</b>
      </div>
      <p class="text-[13px]" style="color:var(--ink-2)">${T(c.desc)}</p>
    </div>`).join('');

  $('#tier-table').innerHTML = `
    <thead><tr><th style="width:26%">链接类型</th><th style="width:38%">出现位置</th><th>可用于</th></tr></thead>
    <tbody>${(cv.linkTiers || []).map(t => `
      <tr><td><b style="color:var(--ink)">${T(t.type)}</b></td><td>${T(t.where)}</td><td>${T(t.use)}</td></tr>`).join('')}</tbody>`;

  $('#no-sku').innerHTML = `<span class="material-symbols-outlined" style="font-size:19px;vertical-align:-4px">block</span> <b>${T(cv.noSkuNotice || '')}</b>`;
}

/* =========================================================
   总渲染
   ========================================================= */
function renderAll(d) {
  try {
    renderMeta(d);
    renderKPIs(d);
    renderPlatforms(d);
    renderCategories(d);
    renderXhs(d);
    renderMismatch(d);
    renderActions(d);
    renderRefreshAndCaveats(d);
    bindReveal();
    setTimeout(() => Object.values(STATE.charts).forEach(c => c && c.resize()), 120);
  } catch (e) {
    console.error('[dashboard] 渲染出错：', e);
    toast('部分区块渲染异常，详见控制台', true);
  }
}

/* =========================================================
   启动
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  bindReveal();
  setOnline(true);
  $('#btn-refresh').addEventListener('click', () => fetchData(true));
  document.addEventListener('visibilitychange', () => { if (!document.hidden) fetchData(false); });
  fetchData('init');
  startLoop();
  console.info(`[dashboard] 自动回读已启动：每 ${STATE.interval} 秒 fetch ./data.json（可用 ?refresh=NN 自定义，最小 ${MIN_INTERVAL} 秒）`);
});
