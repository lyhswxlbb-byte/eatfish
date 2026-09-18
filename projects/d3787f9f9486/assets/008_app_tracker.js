/* ============================================================================
   她私护 · SHE CARE —— 追踪版模块 app_tracker.js
   ----------------------------------------------------------------------------
   注册三个 Tab：
     track  本周追踪台   —— 每周一打开就知道「发生了什么」
     trend  趋势追踪     —— 20 个月 / 31 周的长期走势与结构
     radar  动作雷达     —— 品牌做了什么具体动作（明星营销 / 达人进播 / 新货组 / 种草观点）

   数据来源（均由 index.html 在本文件之前加载）：
     window.TRACKER / window.TREND / window.ACTIONS
   口径：抖音电商直客（品牌直营），名单内 31 个女性私处洗护品牌合计。
   —— 页面上不得出现「全平台 / 大盘 / 行业总规模 / 市场规模」等表述。
   —— radar 的动作事实 100% 来自公开信息检索（见 male/pipeline/OUT_SCHEMA_ACTIONS.md），
      仅 biz（动作前后各 4 周 GMV）来自数据侧，且只表示时间相邻，不构成因果归因。
   ========================================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------------------ *
   * 0. 通用工具
   * ------------------------------------------------------------------ */

  var CHARTS = { track: [], trend: [], radar: [] };

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function isNum(v) { return typeof v === 'number' && isFinite(v); }

  /* 亿元：数据源已是 2 位小数，照抄不美化 */
  function gm(v, unit) {
    if (!isNum(v)) return '—';
    return v.toFixed(2) + (unit === false ? '' : '亿');
  }
  function gmRaw(v) { return isNum(v) ? String(v) : '—'; }

  /* 百分数：带符号；d 位小数；title 里给出未截断原值 */
  function pctTxt(v, d) {
    if (!isNum(v)) return '—';
    var n = v.toFixed(d == null ? 1 : d);
    return (v > 0 ? '+' : '') + n + '%';
  }
  function cls(v) { return !isNum(v) ? 'mt-flat' : (v > 0 ? 'mt-up' : (v < 0 ? 'mt-dn' : 'mt-flat')); }

  /* 同比/环比渲染：null → 「新增 · 无同期」中性灰，绝不写 0% */
  function pctHTML(v, d, extra) {
    if (!isNum(v)) {
      return '<span class="mt-na" title="去年同期该项无数据（新增品牌 / 新增维度），无法计算同比，故不显示为 0%">新增 · 无同期</span>';
    }
    var t = ' title="精确值 ' + (v > 0 ? '+' : '') + v + '%' + (extra ? ' · ' + esc(extra) : '') + '"';
    return '<span class="' + cls(v) + '"' + t + '>' + pctTxt(v, d) + '</span>';
  }

  /* 极端同比（基期极小）提示 */
  function extremeMark(v) {
    if (isNum(v) && Math.abs(v) >= 1000) {
      return '<span class="mt-warnmark" title="去年同期基数极小，同比倍数会被放大失真，仅作方向参考，不宜直接引用">基期极小</span>';
    }
    return '';
  }

  function ymTxt(ym) {
    var s = String(ym);
    return s.slice(0, 4) + '-' + s.slice(4, 6);
  }
  function ymShort(ym) {
    var s = String(ym), m = s.slice(4, 6);
    return (m === '01' ? s.slice(2, 4) + '年\n' : '') + (+m) + '月';
  }
  function mdTxt(d) { return String(d || '').slice(5); }

  /* 周一 → 该周区间 "08-24 ~ 08-30" */
  function weekSpan(mon) {
    if (!mon) return '—';
    var p = String(mon).split('-');
    var dt = new Date(+p[0], +p[1] - 1, +p[2]);
    dt.setDate(dt.getDate() + 6);
    var mm = ('0' + (dt.getMonth() + 1)).slice(-2), dd = ('0' + dt.getDate()).slice(-2);
    return mdTxt(mon) + ' ~ ' + mm + '-' + dd;
  }
  function daysBetween(a, b) {
    try {
      var pa = String(a).split('-'), pb = String(b).split('-');
      var da = new Date(+pa[0], +pa[1] - 1, +pa[2]), db = new Date(+pb[0], +pb[1] - 1, +pb[2]);
      return Math.round((db - da) / 86400000);
    } catch (e) { return null; }
  }
  function todayStr() {
    var d = new Date();
    return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
  }

  /* CSS 变量读取（跟随站点主题切换） */
  function cv(n, fb) {
    try {
      var v = getComputedStyle(document.documentElement).getPropertyValue(n);
      v = v ? v.replace(/^\s+|\s+$/g, '') : '';
      return v || fb;
    } catch (e) { return fb; }
  }
  function P() {
    return {
      ink: cv('--ink', '#1A1A18'), ink2: cv('--ink-2', '#3D3D3B'), ink3: cv('--ink-3', '#6E6E6B'),
      ink4: cv('--ink-4', '#8F8F8B'), ink5: cv('--ink-5', '#A5A5A2'),
      line: cv('--line', '#EAEAE8'), line2: cv('--line-2', '#F1F1EE'), line3: cv('--line-3', '#D8D8D4'),
      surface: cv('--surface', '#FFFFFF'), paper2: cv('--paper-2', '#F6F6F4'), paper3: cv('--paper-3', '#EEEEEC'),
      accent: cv('--accent', '#B0295C'), accentWash: cv('--accent-wash', 'rgba(0,47,167,.065)'),
      pos: cv('--pos', '#4F6552'), neg: cv('--neg', '#9C4A44'), warn: cv('--warn', '#8B2E2E')
    };
  }

  /* 赛道 / 体裁 / 原型 配色（低饱和，编辑感） */
  var SECTOR_C = {
    '卫生巾': '#B0295C', '安睡裤': '#8C4A7A', '护垫': '#C4787E', '卫生棉条': '#A2647F',
    '私处洗液': '#4F7A6B', '私处保养': '#A0703A', '妇科凝胶': '#6B6FA8', '其他': '#8F8F8B'
  };
  var GENRE_C = { '自播': '#B0295C', '达播': '#6B4E71', '短视频': '#A0703A', '商品卡': '#7A7A76' };
  var GENRES = ['自播', '达播', '短视频', '商品卡'];
  var LINE_C = ['#B0295C', '#4F7A6B', '#8C4A7A', '#A0703A', '#6B6FA8', '#C4787E', '#5E7C8C', '#3D3D3B'];
  function sc(s) { return SECTOR_C[s] || '#8F8F8B'; }

  /* 图表工厂 */
  function mk(tab, dom, opt) {
    if (!dom || !window.echarts) return null;
    var c;
    try { c = echarts.init(dom); c.setOption(opt); } catch (e) { return null; }
    CHARTS[tab].push(c);
    return c;
  }
  function baseTip(p) {
    return {
      backgroundColor: p.surface, borderColor: p.line3, borderWidth: 1,
      padding: [9, 12], textStyle: { color: p.ink2, fontSize: 12, lineHeight: 19 },
      extraCssText: 'box-shadow:0 6px 22px -12px rgba(0,0,0,.28);border-radius:4px;'
    };
  }
  function axText(p) { return { color: p.ink4, fontSize: 11 }; }

  var _rzT = null;
  function resizeAll() {
    ['track', 'trend', 'radar'].forEach(function (k) {
      CHARTS[k].forEach(function (c) { try { c.resize(); } catch (e) { } });
    });
  }
  try {
    window.addEventListener('resize', function () {
      if (_rzT) clearTimeout(_rzT);
      _rzT = setTimeout(resizeAll, 160);
    });
  } catch (e) { }

  function resizer(tab) {
    return function () {
      setTimeout(function () {
        CHARTS[tab].forEach(function (c) { try { c.resize(); } catch (e) { } });
      }, 40);
    };
  }

  function fail(el, name) {
    el.innerHTML = '<div class="wrap" style="padding:80px 0;color:var(--ink-3);font-size:14px;line-height:2">'
      + '<div style="font-family:var(--serif);font-size:20px;color:var(--ink);margin-bottom:8px">数据未加载</div>'
      + '本模块依赖 <code>window.' + esc(name) + '</code>，当前页面未能读取到该数据文件，面板已降级为空态。</div>';
  }

  /* 口径脚注 */
  function caliber(meta, note) {
    var m = meta || {};
    return '<div class="mt-cal">'
      + '<div class="mt-cal-t"><span class="ms">policy</span>口径说明</div>'
      + '<div>' + esc(m.caliber || '') + '</div>'
      + '<div>本页所有聚合数字均为「名单内 ' + (m.brand_n || '—') + ' 个女性私处洗护品牌合计（赛道内 GMV）」，'
      + '不代表任何平台级、行业级的总量；直客口径不含经销 / 分销及非直营店铺成交；且只统计【个人护理 &gt; 私处洗护】赛道内成交（已剔除「男士私处护理」）。</div>'
      + (note ? '<div>' + note + '</div>' : '')
      + '<div class="mt-cal-m">快照 p_date=' + esc(m.p_date || '—')
      + ' · 业务日期 ' + esc(m.biz_start || '—') + '~' + esc(m.biz_end || '—')
      + ' vs ' + esc(m.prev_start || '—') + '~' + esc(m.prev_end || '—')
      + ' · 生成于 ' + esc(m.generated_at || '—') + '</div>'
      + '</div>';
  }

  /* 四体裁迷你结构条 */
  function mixBar(mix, h) {
    if (!mix) return '';
    var s = '<div class="mt-mix" style="height:' + (h || 6) + 'px">';
    GENRES.forEach(function (g) {
      var v = mix[g];
      if (!isNum(v) || v <= 0) return;
      s += '<i style="width:' + v + '%;background:' + GENRE_C[g] + '" title="' + g + ' ' + v + '%"></i>';
    });
    return s + '</div>';
  }
  function mixLegend() {
    var s = '<div class="mt-mixlg">';
    GENRES.forEach(function (g) {
      s += '<span><i style="background:' + GENRE_C[g] + '"></i>' + g + '</span>';
    });
    return s + '</div>';
  }

  /* HTML 图例：可换行，窄屏不会像 echarts 滚动图例那样截断文字；点击可切换系列显隐 */
  function fillLegend(id, items, chart) {
    var box = document.getElementById(id);
    if (!box) return;
    box.innerHTML = items.map(function (it) {
      return '<button type="button" data-n="' + esc(it.name) + '"><i style="background:' + it.color + '"></i>'
        + esc(it.name) + '</button>';
    }).join('');
    bindLegend(id, chart);
  }
  function bindLegend(id, chart) {
    var box = document.getElementById(id);
    if (!box || !chart) return;
    box.addEventListener('click', function (e) {
      var b = e.target;
      while (b && b !== box && !b.getAttribute('data-n')) b = b.parentNode;
      if (!b || b === box) return;
      var n = b.getAttribute('data-n');
      b.className = (b.className === 'off' ? '' : 'off');
      try { chart.dispatchAction({ type: 'legendToggleSelect', name: n }); } catch (err) { }
    });
  }

  /* 排名变化：rank_chg > 0 表示名次前进 */
  function rankHTML(rank, prev, chg) {
    var t = '近 4 周名次 #' + rank + '，前 4 周 #' + prev;
    var arrow = '';
    if (isNum(chg) && chg > 0) arrow = '<i class="mt-up">▲' + chg + '</i>';
    else if (isNum(chg) && chg < 0) arrow = '<i class="mt-dn">▼' + Math.abs(chg) + '</i>';
    else arrow = '<i class="mt-flat">—</i>';
    return '<div class="mt-rk" title="' + t + '"><b>#' + rank + '</b>' + arrow + '</div>';
  }

  /* driver 贡献：口径为「近 4 周 vs 前 4 周」的环比增量分解，可能 >100% 或 <0，如实展示 + 解释 */
  function contribHTML(d) {
    if (!d) return '';
    var c = d.contrib, odd = isNum(c) && (c > 100 || c < 0);
    var tip = '口径：「' + (d.genre || '') + '」渠道在近 4 周相对前 4 周的 GMV 增量 ÷ 该品牌近 4 周整体环比增量。'
      + '注意这是【环比】分解，不是同比分解。'
      + '其他渠道同时下滑时，单渠道贡献可 >100%；整体增量与该渠道方向相反时会出现负值；'
      + '整体增量为负时，正贡献代表「跌得更少/仍在拉动」。'
      + '本项为占比口径，绝对值为该渠道环比增量 '
      + (isNum(d.delta) ? (d.delta > 0 ? '+' : '') + d.delta + ' 亿' : '—') + '。';
    return '<span class="mt-drv' + (odd ? ' odd' : '') + '" title="' + esc(tip) + '">'
      + '环比主推 <b>' + esc(d.genre || '—') + '</b> · 贡献 ' + (isNum(c) ? pctTxt(c, 1) : '—')
      + (odd ? '<span class="ms">help</span>' : '') + '</span>';
  }

  /* ------------------------------------------------------------------ *
   * 1. 样式（只注入一次，全部 mt- 前缀）
   * ------------------------------------------------------------------ */
  function injectCSS() {
    if (document.getElementById('mxtrack-css')) return;
    var st = document.createElement('style');
    st.id = 'mxtrack-css';
    st.textContent = [
      /* —— 版式骨架 —— */
      '.mt-hero{padding:44px 0 0}',
      '.mt-eyebrow{letter-spacing:.26em;font-size:10.5px;font-weight:600;color:var(--ink-4);text-transform:uppercase}',
      '.mt-title{font-family:var(--serif);font-weight:500;color:var(--ink);font-size:clamp(27px,4vw,42px);line-height:1.14;letter-spacing:-.01em;margin:16px 0 0}',
      '.mt-lede{font-size:13.5px;line-height:1.85;color:var(--ink-3);margin-top:13px;max-width:790px}',
      '.mt-lede b{font-weight:600;color:var(--ink-2)}',
      '.mt-lede .em{color:var(--accent-deep);font-weight:600}',
      '.mt-sec{margin-top:60px}',
      '.mt-sech{display:flex;align-items:flex-end;gap:14px;flex-wrap:wrap;border-bottom:1px solid var(--line);padding-bottom:11px}',
      '.mt-h{font-family:var(--serif);font-weight:500;font-size:clamp(19px,2.2vw,25px);line-height:1.25;color:var(--ink);margin:0}',
      '.mt-hn{font-family:var(--sans);font-size:10px;font-weight:700;letter-spacing:.16em;color:var(--ink-5);text-transform:uppercase;padding-bottom:4px}',
      '.mt-hx{margin-left:auto;font-size:11px;color:var(--ink-4);padding-bottom:3px}',
      '.mt-sub{font-size:12.5px;line-height:1.8;color:var(--ink-3);margin-top:12px;max-width:900px}',
      '.mt-sub b{color:var(--ink-2);font-weight:600}',
      /* —— 状态条 —— */
      '.mt-status{display:flex;flex-wrap:wrap;border-top:1px solid var(--line);border-bottom:1px solid var(--line);margin-top:26px}',
      '.mt-st{padding:13px 24px 12px 0;margin-right:24px;min-width:96px}',
      '.mt-st+.mt-st{border-left:1px solid var(--line);padding-left:24px}',
      '.mt-st .k{font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-5);font-weight:600}',
      '.mt-st .v{font-size:13.5px;color:var(--ink-2);margin-top:7px;font-weight:500;display:flex;align-items:center;gap:6px}',
      '.mt-st .v .ms{font-size:15px;color:var(--ink-4)}',
      '.mt-fresh{display:inline-flex;align-items:center;gap:5px;font-size:10.5px;font-weight:600;color:var(--pos);border:1px solid var(--line);border-radius:2px;padding:1px 6px}',
      '.mt-fresh i{width:5px;height:5px;border-radius:50%;background:var(--pos);display:block}',
      /* —— 指标卡 —— */
      '.mt-kpis{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1px;background:var(--line);border:1px solid var(--line);margin-top:26px}',
      '.mt-kpi{background:var(--surface);padding:19px 20px 17px;min-width:0}',
      '.mt-kpi .k{font-size:10px;letter-spacing:.13em;text-transform:uppercase;color:var(--ink-4);font-weight:600}',
      '.mt-kpi .n{font-family:var(--serif);font-weight:500;font-size:clamp(26px,3vw,34px);line-height:1.05;color:var(--ink);letter-spacing:-.01em;margin-top:12px;display:flex;align-items:baseline;gap:3px;flex-wrap:wrap}',
      '.mt-kpi .n small{font-size:13px;font-weight:400;color:var(--ink-4)}',
      '.mt-kpi .d{font-size:11.5px;color:var(--ink-4);margin-top:9px;line-height:1.7}',
      '.mt-kpi .d b{font-weight:600}',
      '.mt-kpi .big{font-size:15px;font-weight:600;font-family:var(--serif)}',
      '.mt-caution{margin-top:11px;font-size:11px;line-height:1.75;color:var(--warn);background:var(--warn-wash);border-left:2px solid var(--warn-line);padding:7px 9px}',
      '.mt-mixrow{margin-top:13px}',
      '.mt-mixlg{display:flex;flex-wrap:wrap;gap:4px 12px;margin-top:9px;font-size:10.5px;color:var(--ink-4)}',
      '.mt-mixlg span{display:inline-flex;align-items:center;gap:4px}',
      '.mt-mixlg i{width:7px;height:7px;display:block;border-radius:1px}',
      '.mt-lg{display:flex;flex-wrap:wrap;gap:5px 14px;margin-top:12px}',
      '.mt-lg button{display:inline-flex;align-items:center;gap:5px;border:none;background:none;padding:2px 0;cursor:pointer;font-family:inherit;font-size:11px;color:var(--ink-3);transition:.15s}',
      '.mt-lg button i{width:9px;height:9px;border-radius:1px;display:block;flex:none}',
      '.mt-lg button:hover{color:var(--ink)}',
      '.mt-lg button.off{color:var(--ink-5);text-decoration:line-through}',
      '.mt-lg button.off i{opacity:.28}',
      '.mt-mix{display:flex;width:100%;background:var(--paper-3);overflow:hidden;border-radius:1px}',
      '.mt-mix i{display:block;height:100%}',
      /* —— 三件事 —— */
      '.mt-3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:22px}',
      '.mt-thing{border:1px solid var(--line);border-radius:var(--r);background:var(--surface);padding:17px 18px 16px;display:flex;flex-direction:column;gap:10px;min-width:0}',
      '.mt-thing .no{font-family:var(--serif);font-size:12px;color:var(--accent-deep);letter-spacing:.1em;display:flex;align-items:center;gap:7px}',
      '.mt-thing .no i{flex:1;height:1px;background:var(--accent-line);display:block;font-style:normal}',
      '.mt-thing .tt{font-family:var(--serif);font-size:17px;line-height:1.4;color:var(--ink);font-weight:500}',
      '.mt-thing .bd{font-size:12.5px;line-height:1.85;color:var(--ink-3)}',
      '.mt-thing .bd b{color:var(--ink);font-weight:600}',
      '.mt-thing .kv{display:flex;flex-wrap:wrap;gap:0;margin-top:auto;padding-top:11px;border-top:1px solid var(--line-2)}',
      '.mt-thing .kv div{padding-right:15px;margin-right:15px;border-right:1px solid var(--line-2);min-width:0}',
      '.mt-thing .kv div:last-child{border-right:none;padding-right:0;margin-right:0}',
      '.mt-thing .kv .kk{font-size:9.5px;color:var(--ink-5);letter-spacing:.08em}',
      '.mt-thing .kv .vv{font-family:var(--serif);font-size:16px;color:var(--ink);margin-top:4px;white-space:nowrap}',
      /* —— 榜单 —— */
      '.mt-two{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:28px;margin-top:22px}',
      '.mt-panel{border:1px solid var(--line);border-radius:var(--r);background:var(--surface);padding:0 18px 8px;min-width:0}',
      '.mt-ph{display:flex;align-items:center;gap:9px;padding:15px 0 11px;border-bottom:1px solid var(--line)}',
      '.mt-ph .ms{font-size:17px}',
      '.mt-ph .t{font-family:var(--serif);font-size:16px;color:var(--ink);font-weight:500}',
      '.mt-ph .c{margin-left:auto;font-size:10.5px;color:var(--ink-4)}',
      '.mt-lrow{display:grid;grid-template-columns:52px minmax(0,1fr) auto;column-gap:12px;row-gap:7px;padding:12px 2px;border-top:1px solid var(--line-2);align-items:baseline}',
      '.mt-lrow:first-of-type{border-top:none}',
      '.mt-lrow:hover{background:var(--paper-2)}',
      '.mt-rk{display:flex;flex-direction:column;gap:3px;font-size:11px}',
      '.mt-rk b{font-family:var(--serif);font-weight:500;font-size:14px;color:var(--ink-3)}',
      '.mt-rk i{font-style:normal;font-size:10px;font-weight:600}',
      '.mt-nm{min-width:0}',
      '.mt-nm .b{font-size:14px;font-weight:600;color:var(--ink);line-height:1.35;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
      '.mt-nm .s{font-size:10.5px;color:var(--ink-4);margin-top:3px;display:flex;align-items:center;gap:6px;flex-wrap:wrap}',
      '.mt-nm .s em{font-style:normal;display:inline-flex;align-items:center;gap:3px}',
      '.mt-nm .s em::before{content:"";width:6px;height:6px;border-radius:1px;background:currentColor;opacity:.55;display:block}',
      '.mt-big{text-align:right;white-space:nowrap}',
      '.mt-big .p{font-family:var(--serif);font-size:19px;font-weight:600;line-height:1.1}',
      '.mt-big .g{font-size:11px;color:var(--ink-3);margin-top:4px}',
      '.mt-l2{grid-column:2/-1;display:flex;flex-wrap:wrap;gap:5px 10px;align-items:center;font-size:10.5px;color:var(--ink-4)}',
      '.mt-tag{display:inline-flex;align-items:center;border:1px solid var(--line);border-radius:2px;padding:1px 6px;font-size:10px;color:var(--ink-3);white-space:nowrap}',
      '.mt-drv{display:inline-flex;align-items:center;gap:3px;font-size:10.5px;color:var(--ink-3);border-bottom:1px dotted var(--line-3);cursor:help}',
      '.mt-drv b{color:var(--accent-deep);font-weight:600}',
      '.mt-drv.odd{color:var(--warn);border-bottom-color:var(--warn-line)}',
      '.mt-drv.odd b{color:var(--warn)}',
      '.mt-drv .ms{font-size:12px;opacity:.7}',
      '.mt-warnmark{display:inline-flex;align-items:center;font-size:9.5px;font-weight:600;color:var(--warn);border:1px solid var(--warn-line);background:var(--warn-wash);border-radius:2px;padding:0 4px;margin-left:4px;cursor:help;white-space:nowrap}',
      /* —— 通用色 / 空值 —— */
      '.mt-up{color:var(--pos)}.mt-dn{color:var(--neg)}.mt-flat{color:var(--ink-4)}',
      '.mt-na{color:var(--ink-4);font-weight:500;font-size:10.5px;background:var(--paper-2);border:1px dashed var(--line-3);border-radius:2px;padding:1px 5px;white-space:nowrap;cursor:help}',
      '.mt-note{font-size:11px;line-height:1.85;color:var(--ink-4);margin-top:13px;padding-left:11px;border-left:2px solid var(--line-3)}',
      '.mt-note b{color:var(--ink-3);font-weight:600}',
      '.mt-chart{width:100%;min-width:0}',
      /* —— 表格 —— */
      '.mt-tblw{overflow-x:auto;margin-top:18px;-webkit-overflow-scrolling:touch}',
      '.mt-tbl{width:100%;min-width:640px;border-collapse:collapse;font-size:12px}',
      '.mt-tbl th{font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-5);font-weight:600;text-align:right;padding:0 0 9px;border-bottom:1px solid var(--line-3);white-space:nowrap}',
      '.mt-tbl th:first-child,.mt-tbl td:first-child{text-align:left;padding-left:0}',
      '.mt-tbl th:not(:first-child),.mt-tbl td:not(:first-child){padding-left:16px}',
      '.mt-tbl td{padding:10px 0;border-bottom:1px solid var(--line-2);text-align:right;color:var(--ink-2);white-space:nowrap}',
      '.mt-tbl tbody tr:hover{background:var(--paper-2)}',
      '.mt-tbl .nm{font-weight:600;color:var(--ink)}',
      '.mt-tbl .num{font-family:var(--serif);font-size:13.5px}',
      /* —— 控件 —— */
      '.mt-bar{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-top:20px}',
      '.mt-seg{display:inline-flex;border:1px solid var(--line);border-radius:var(--r-s,3px);padding:2px;gap:2px;background:var(--surface)}',
      '.mt-seg button{border:none;background:transparent;padding:6px 12px;border-radius:2px;font-size:12px;font-weight:500;color:var(--ink-3);cursor:pointer;font-family:inherit;white-space:nowrap;transition:.18s}',
      '.mt-seg button:hover{color:var(--ink)}',
      '.mt-seg button.on{color:var(--surface);background:var(--ink)}',
      '.mt-seg button[disabled]{color:var(--ink-5);cursor:not-allowed}',
      '.mt-inp{position:relative;flex:0 1 220px}',
      '.mt-inp .ms{position:absolute;left:9px;top:50%;transform:translateY(-50%);color:var(--ink-4);font-size:16px}',
      '.mt-inp input{width:100%;padding:8px 12px 8px 31px;border-radius:var(--r-s,3px);border:1px solid var(--line);background:var(--surface);font-size:12.5px;font-family:inherit;color:var(--ink);outline:none}',
      '.mt-inp input:focus{border-color:var(--accent);box-shadow:0 0 0 2px var(--accent-wash)}',
      '.mt-sel{padding:8px 10px;border:1px solid var(--line);border-radius:var(--r-s,3px);background:var(--surface);font-size:12.5px;font-family:inherit;color:var(--ink-2);outline:none;cursor:pointer;max-width:190px}',
      '.mt-cnt{margin-left:auto;font-size:11px;color:var(--ink-4);white-space:nowrap}',
      '.mt-cnt b{font-family:var(--serif);color:var(--accent-deep);font-weight:500}',
      '.mt-lnk{background:none;border:none;font-family:inherit;font-size:11.5px;color:var(--ink-3);cursor:pointer;text-decoration:underline;text-underline-offset:3px;padding:4px 2px}',
      '.mt-lnk:hover{color:var(--accent-deep)}',
      /* —— 品牌选择器 —— */
      '.mt-chips{display:flex;flex-wrap:wrap;gap:7px;margin-top:13px;min-height:26px}',
      '.mt-chip{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--line-3);border-radius:2px;padding:3px 6px 3px 9px;font-size:11.5px;color:var(--ink-2);background:var(--surface)}',
      '.mt-chip i{width:7px;height:7px;border-radius:1px;display:block}',
      '.mt-chip button{border:none;background:none;cursor:pointer;color:var(--ink-4);font-size:13px;line-height:1;padding:1px 2px;font-family:inherit}',
      '.mt-chip button:hover{color:var(--warn)}',
      '.mt-chips .none{font-size:11.5px;color:var(--ink-4)}',
      '.mt-blist{margin-top:12px;border:1px solid var(--line);border-radius:var(--r);background:var(--surface);max-height:196px;overflow-y:auto;display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,210px),1fr));gap:1px;background:var(--line-2)}',
      '.mt-bi{background:var(--surface);border:none;text-align:left;padding:8px 11px;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:8px;min-width:0;transition:.15s}',
      '.mt-bi:hover{background:var(--paper-2)}',
      '.mt-bi .bx{width:11px;height:11px;border:1px solid var(--line-3);border-radius:1px;flex:none;display:block}',
      '.mt-bi.on .bx{background:var(--accent);border-color:var(--accent)}',
      '.mt-bi .tx{min-width:0;flex:1}',
      '.mt-bi .n1{font-size:12px;color:var(--ink-2);font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
      '.mt-bi.on .n1{color:var(--ink);font-weight:600}',
      '.mt-bi .n2{font-size:10px;color:var(--ink-5);margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
      /* —— 事件流 —— */
      '.mt-evs{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,318px),1fr));gap:16px;margin-top:20px}',
      '.mt-ev{border:1px solid var(--line);border-radius:var(--r);background:var(--surface);padding:14px 15px 13px;display:flex;flex-direction:column;gap:10px;min-width:0}',
      '.mt-ev:hover{border-color:var(--line-3);box-shadow:var(--sh)}',
      '.mt-ev .wk{font-size:10px;letter-spacing:.1em;color:var(--ink-5);display:flex;align-items:center;gap:8px}',
      '.mt-ev .wk .z{margin-left:auto;font-size:10px;color:var(--ink-4);border:1px solid var(--line);border-radius:2px;padding:0 5px;cursor:help}',
      '.mt-ev .hd{display:flex;align-items:flex-start;gap:8px}',
      '.mt-ev .hd .bn{font-size:14.5px;font-weight:600;color:var(--ink);line-height:1.35;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
      '.mt-typ{flex:none;font-size:9.5px;font-weight:700;letter-spacing:.06em;border-radius:2px;padding:2px 6px;white-space:nowrap}',
      '.mt-typ.up{color:var(--pos);border:1px solid var(--pos);background:transparent}',
      '.mt-typ.dn{color:var(--neg);border:1px solid var(--neg)}',
      '.mt-ev .fig{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap}',
      '.mt-ev .fig .g1{font-family:var(--serif);font-size:22px;color:var(--ink);line-height:1}',
      '.mt-ev .fig .g2{font-size:11px;color:var(--ink-4)}',
      '.mt-ev .fig .w{font-size:13px;font-weight:600}',
      '.mt-ev .ln{font-size:11px;color:var(--ink-3);line-height:1.7;border-top:1px solid var(--line-2);padding-top:9px}',
      '.mt-ev .lb{font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-5);margin-bottom:6px}',
      /* —— 玩法切换 —— */
      '.mt-sw{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr) auto;gap:14px 18px;align-items:center;padding:14px 2px;border-top:1px solid var(--line-2)}',
      '.mt-sw .mv{font-size:12px;color:var(--ink-3);display:flex;align-items:center;gap:7px;flex-wrap:wrap}',
      '.mt-sw .mv b{font-family:var(--serif);font-size:16px;font-weight:600}',
      '.mt-sw .cmp{display:flex;flex-direction:column;gap:6px;min-width:0}',
      '.mt-sw .cmp .r{display:flex;align-items:center;gap:8px}',
      '.mt-sw .cmp .yr{font-size:9.5px;color:var(--ink-5);width:30px;flex:none;letter-spacing:.04em}',
      '.mt-sw .cmp .mt-mix{flex:1;height:9px}',
      '.mt-sw .rt{text-align:right;white-space:nowrap;font-size:11px;color:var(--ink-4)}',
      '.mt-sw .rt .p{font-family:var(--serif);font-size:15px;font-weight:600;display:block;margin-bottom:3px}',
      /* —— 类目扩张 —— */
      '.mt-cats{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,340px),1fr));gap:16px;margin-top:20px}',
      '.mt-cat{border:1px solid var(--line);border-radius:var(--r);background:var(--surface);padding:14px 15px}',
      '.mt-cat .hd{display:flex;align-items:baseline;gap:8px;padding-bottom:10px;border-bottom:1px solid var(--line-2);margin-bottom:10px}',
      '.mt-cat .hd .bn{font-size:14px;font-weight:600;color:var(--ink);min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
      '.mt-cat .hd .yy{margin-left:auto;font-size:11px;white-space:nowrap}',
      '.mt-crow{display:grid;grid-template-columns:minmax(0,1fr) 96px 66px;gap:8px;align-items:center;padding:5px 0;font-size:11.5px}',
      '.mt-crow .cn{color:var(--ink-2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
      '.mt-dv{position:relative;height:8px;background:var(--paper-3);border-radius:1px}',
      '.mt-dv .mid{position:absolute;left:50%;top:-2px;bottom:-2px;width:1px;background:var(--line-3)}',
      '.mt-dv i{position:absolute;top:0;bottom:0;display:block;border-radius:1px}',
      '.mt-crow .pv{text-align:right;font-size:11px;color:var(--ink-4);white-space:nowrap}',
      '.mt-crow .pv b{font-weight:600}',
      /* —— 动作雷达：概览条 —— */
      '.mt-ovs{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,186px),1fr));gap:1px;background:var(--line);border:1px solid var(--line);margin-top:26px}',
      '.mt-ov{background:var(--surface);padding:16px 17px 15px;min-width:0}',
      '.mt-ov .k{font-size:9.5px;letter-spacing:.13em;text-transform:uppercase;color:var(--ink-5);font-weight:600}',
      '.mt-ov .n{font-family:var(--serif);font-weight:500;font-size:27px;line-height:1.05;color:var(--ink);margin-top:10px;display:flex;align-items:baseline;gap:4px;flex-wrap:wrap}',
      '.mt-ov .n small{font-size:12px;font-weight:400;color:var(--ink-4);font-family:var(--sans)}',
      '.mt-ov .d{font-size:11px;color:var(--ink-4);margin-top:8px;line-height:1.7}',
      '.mt-ov .d b{font-weight:600;color:var(--ink-3)}',
      '.mt-tyrow{display:flex;align-items:center;gap:7px;font-size:12px;color:var(--ink-2);padding:4px 0;line-height:1.5}',
      '.mt-tyrow i{width:8px;height:8px;border-radius:1px;display:block;flex:none}',
      '.mt-tyrow b{font-family:var(--serif);font-size:15px;font-weight:600;margin-left:auto;color:var(--ink)}',
      '.mt-cav{margin-top:9px;font-size:10.5px;line-height:1.7;color:var(--warn);background:var(--warn-wash);border-left:2px solid var(--warn-line);padding:6px 8px;cursor:help}',
      /* —— 动作雷达：筛选器 —— */
      '.mt-fb{display:flex;flex-direction:column;gap:11px;margin-top:20px;padding:14px 16px 15px;border:1px solid var(--line);border-radius:var(--r);background:var(--paper-2)}',
      '.mt-fr{display:flex;flex-wrap:wrap;gap:8px 10px;align-items:center}',
      '.mt-flb{font-size:9.5px;letter-spacing:.13em;text-transform:uppercase;color:var(--ink-5);font-weight:700;flex:none;width:58px}',
      '.mt-ck{border:1px solid var(--line-3);background:var(--surface);border-radius:2px;padding:5px 10px;font-size:11.5px;font-family:inherit;color:var(--ink-3);cursor:pointer;display:inline-flex;align-items:center;gap:6px;transition:.15s;white-space:nowrap}',
      '.mt-ck:hover{color:var(--ink);border-color:var(--ink-4)}',
      '.mt-ck i{width:8px;height:8px;border-radius:1px;display:block;flex:none;opacity:.3;background:currentColor}',
      '.mt-ck.on{color:var(--ink);border-color:var(--ink);font-weight:600}',
      '.mt-ck.on i{opacity:1}',
      '.mt-ck .cn{font-family:var(--serif);font-size:12px;color:var(--ink-4)}',
      '.mt-ck.on .cn{color:var(--ink-2)}',
      /* —— 动作雷达：卡片流 —— */
      '.mt-acs{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,352px),1fr));gap:16px;margin-top:20px;align-items:start}',
      '.mt-ac{border:1px solid var(--line);border-radius:var(--r);background:var(--surface);padding:15px 16px 13px;display:flex;flex-direction:column;gap:10px;min-width:0}',
      '.mt-ac:hover{border-color:var(--line-3);box-shadow:var(--sh)}',
      '.mt-ac .top{display:flex;align-items:center;gap:8px;flex-wrap:wrap}',
      '.mt-ac .bn{font-size:13.5px;font-weight:600;color:var(--ink);line-height:1.35;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
      '.mt-tb{flex:none;font-size:9.5px;font-weight:700;letter-spacing:.06em;border-radius:2px;padding:2px 7px;white-space:nowrap;border:1px solid currentColor;background:transparent}',
      '.mt-ac .dt{margin-left:auto;font-size:10.5px;color:var(--ink-4);display:inline-flex;align-items:center;gap:5px;white-space:nowrap}',
      '.mt-ac .dt em{font-style:normal;font-size:9.5px;color:var(--ink-5);border:1px dashed var(--line-3);border-radius:2px;padding:0 4px;cursor:help}',
      '.mt-ac .tt{font-family:var(--serif);font-size:17.5px;line-height:1.45;color:var(--ink);font-weight:500}',
      '.mt-ac .bd{font-size:12.5px;line-height:1.85;color:var(--ink-3)}',
      '.mt-ma{display:flex;gap:9px;background:var(--accent-wash);border-left:2px solid var(--accent);padding:8px 10px}',
      '.mt-ma .lb{flex:none;font-size:9.5px;font-weight:700;letter-spacing:.1em;color:var(--accent-deep);line-height:1.9;white-space:nowrap}',
      '.mt-ma .tx{font-size:12px;line-height:1.75;color:var(--ink-2)}',
      '.mt-cf{display:inline-flex;align-items:center;gap:4px;font-size:9.5px;font-weight:700;letter-spacing:.05em;border-radius:2px;padding:1px 6px;cursor:help;white-space:nowrap;border:1px solid currentColor}',
      '.mt-cf.h{color:var(--pos)}.mt-cf.m{color:var(--ink-4)}.mt-cf.l{color:var(--warn);background:var(--warn-wash)}',
      '.mt-evd{display:flex;flex-wrap:wrap;gap:5px 10px;font-size:11px;align-items:center}',
      '.mt-evd a{color:var(--ink-3);text-decoration:none;border-bottom:1px solid var(--line-3);max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:inline-block;line-height:1.6}',
      '.mt-evd a:hover{color:var(--accent-deep);border-bottom-color:var(--accent)}',
      '.mt-evd .ms{font-size:13px;color:var(--ink-5)}',
      '.mt-evd .none{color:var(--ink-5)}',
      '.mt-bz{border-top:1px solid var(--line-2);padding-top:10px;font-size:11.5px;line-height:1.75;color:var(--ink-3)}',
      '.mt-bz .lb{font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-5);margin-bottom:5px;font-weight:600}',
      '.mt-bz .fg{display:flex;align-items:baseline;gap:7px;flex-wrap:wrap}',
      '.mt-bz .fg b{font-family:var(--serif);font-size:14.5px;font-weight:600;color:var(--ink-2)}',
      '.mt-bz .fg .ar{color:var(--ink-5)}',
      '.mt-bz .fg .pc{font-family:var(--serif);font-size:15px;font-weight:600}',
      '.mt-bz .wk{font-size:10.5px;color:var(--ink-5);margin-top:5px;line-height:1.65}',
      '.mt-bz .nd{font-size:11px;color:var(--ink-4);line-height:1.7;background:var(--paper-2);border-left:2px solid var(--line-3);padding:6px 8px;margin-top:4px}',
      '.mt-dcl{border-top:1px dashed var(--line-2);padding-top:8px;font-size:10px;line-height:1.6;color:var(--ink-5)}',
      /* —— 动作雷达：诚实区块 / 折叠 —— */
      '.mt-zero{margin-top:18px;border:1px solid var(--warn-line);background:var(--warn-wash);border-radius:var(--r);padding:14px 16px}',
      '.mt-zero .t{font-size:12.5px;font-weight:600;color:var(--warn);margin-bottom:7px}',
      '.mt-zero .l{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:8px}',
      '.mt-zero .l span{border:1px solid var(--warn-line);border-radius:2px;padding:2px 8px;font-size:11.5px;color:var(--ink-2);background:var(--surface)}',
      '.mt-zero .n{font-size:11px;line-height:1.8;color:var(--ink-4)}',
      '.mt-fold{margin-top:18px;border:1px solid var(--line);border-radius:var(--r);background:var(--surface)}',
      '.mt-fold>summary{cursor:pointer;padding:13px 16px;font-size:12.5px;color:var(--ink-2);font-weight:600;display:flex;align-items:center;gap:9px;list-style:none}',
      '.mt-fold>summary::-webkit-details-marker{display:none}',
      '.mt-fold>summary .c{font-size:11px;font-weight:400;color:var(--ink-4)}',
      '.mt-fold>summary .hint{margin-left:auto;font-size:11px;font-weight:400;color:var(--ink-4)}',
      '.mt-fold>summary .hint::after{content:"展开 ▾"}',
      '.mt-fold[open]>summary{border-bottom:1px solid var(--line)}',
      '.mt-fold[open]>summary .hint::after{content:"收起 ▴"}',
      '.mt-foldb{padding:4px 16px 14px}',
      /* —— 口径脚注 —— */
      '.mt-cal{margin-top:52px;padding:15px 0 44px;border-top:1px solid var(--line);font-size:11px;color:var(--ink-4);line-height:1.95}',
      '.mt-cal-t{display:flex;align-items:center;gap:6px;font-size:9.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-5);margin-bottom:7px}',
      '.mt-cal-t .ms{font-size:14px}',
      '.mt-cal-m{margin-top:6px;color:var(--ink-5);font-size:10.5px}',
      '.mt-empty{padding:44px 12px;text-align:center;color:var(--ink-4);font-size:12.5px;border:1px dashed var(--line-3);border-radius:var(--r);margin-top:18px}',
      /* —— 响应式 —— */
      '@media(max-width:1120px){',
      '.mt-kpis{grid-template-columns:repeat(2,minmax(0,1fr))}',
      '.mt-3{grid-template-columns:1fr;gap:14px}',
      '.mt-two{grid-template-columns:1fr;gap:20px}',
      '.mt-sw{grid-template-columns:minmax(0,1fr) minmax(0,1fr);}',
      '.mt-sw .rt{grid-column:1/-1;text-align:left}',
      '}',
      '@media(max-width:760px){',
      '.mt-hero{padding:30px 0 0}',
      '.mt-sec{margin-top:44px}',
      '.mt-kpis{grid-template-columns:1fr}',
      '.mt-st{padding-right:16px;margin-right:16px}',
      '.mt-st+.mt-st{padding-left:16px}',
      '.mt-sw{grid-template-columns:1fr;gap:10px}',
      '.mt-lrow{grid-template-columns:44px minmax(0,1fr) auto;column-gap:9px}',
      '.mt-panel{padding:0 13px 6px}',
      '.mt-inp{flex:1 1 100%}',
      '.mt-cnt{margin-left:0}',
      '.mt-crow{grid-template-columns:minmax(0,1fr) 72px 58px}',
      '.mt-flb{width:100%}',
      '.mt-ac .dt{margin-left:0;width:100%}',
      '}'
    ].join('\n');
    document.head.appendChild(st);
  }

  /* ================================================================== *
   * 2. Tab「本周追踪台」track
   * ================================================================== */

  function trackThings(T) {
    var out = [];
    var ups = [], dns = [], i;
    for (i = 0; i < T.up.length; i++) if (isNum(T.up[i].yoy4)) ups.push(T.up[i]);
    for (i = 0; i < T.down.length; i++) if (isNum(T.down[i].yoy4)) dns.push(T.down[i]);

    /* ① 加速最快的品牌 */
    if (ups.length) {
      var u = ups[0], d = u.driver || {};
      var inc = isNum(u.l4) && isNum(u.l4ly) ? +(u.l4 - u.l4ly).toFixed(2) : null;
      var winc = isNum(u.l4) && isNum(u.p4) ? +(u.l4 - u.p4).toFixed(2) : null;
      var bd = '近 4 周做到 <b>' + gm(u.l4) + '</b>，去年同期 ' + gm(u.l4ly)
        + (isNum(inc) ? '，同比净增 <b>' + (inc > 0 ? '+' : '') + inc + ' 亿</b>' : '') + '。'
        + '环比前 4 周（' + gm(u.p4) + '）' + (isNum(winc) ? (winc >= 0 ? '增加 ' : '减少 ') + Math.abs(winc) + ' 亿' : '—')
        + '，这部分环比变化里 <b>' + esc(d.genre || '—') + '</b> 渠道占 '
        + (isNum(d.contrib) ? pctTxt(d.contrib, 1) : '—')
        + '（环比分解口径，可越界、可为负）。';
      /* 诚实补一句：规模 / 环比 / 基数 的反向信号 */
      if (isNum(u.wow4) && u.wow4 < 0) {
        bd += ' 注意：环比是 <b class="mt-dn">' + pctTxt(u.wow4, 1) + '</b>——高同比来自去年同期低基数（'
          + gm(u.l4ly) + '），不等于当下还在提速。';
      } else if (isNum(u.l4ly) && u.l4ly < 0.5) {
        bd += ' 去年同期基数仅 ' + gm(u.l4ly) + '，同比弹性天然偏大，需结合绝对体量看。';
      }
      out.push({
        no: '01', tag: '加速最快',
        tt: esc(u.name) + ' 近 4 周同比 ' + pctTxt(u.yoy4, 1),
        bd: bd,
        kv: [['近4周 GMV', gm(u.l4)], ['同比', pctTxt(u.yoy4, 1), cls(u.yoy4)],
        ['名次', '#' + u.rank_prev + ' → #' + u.rank, cls(u.rank_chg)]]
      });
    }

    /* ② 减速最明显的品牌 */
    if (dns.length) {
      var w = dns[0], dd = w.driver || {};
      var lose = isNum(w.l4) && isNum(w.l4ly) ? +(w.l4 - w.l4ly).toFixed(2) : null;
      var bd2 = '近 4 周 <b>' + gm(w.l4) + '</b>，去年同期 ' + gm(w.l4ly)
        + (isNum(lose) ? '，' + (lose < 0 ? '少了 <b class="mt-dn">' + Math.abs(lose) + ' 亿</b>' : '多了 ' + lose + ' 亿') : '') + '。';
      if (isNum(w.yoy) && w.yoy > 0 && w.yoy4 < 0) {
        bd2 += ' 全年 YTD 同比仍是 <b class="mt-up">' + pctTxt(w.yoy, 1) + '</b>，说明掉头发生在近 4 周，属于「年内领先、当下失速」，值得单独拉一次周度看。';
      } else if (isNum(w.yoy)) {
        bd2 += ' YTD 同比 <b class="' + cls(w.yoy) + '">' + pctTxt(w.yoy, 1) + '</b>，与近 4 周方向一致，是持续性走弱。';
      }
      bd2 += ' 玩法原型为<b>' + esc(w.arch || '—') + '</b>，近 4 周环比变化中占比最大的渠道是 ' + esc(dd.genre || '—') + '。';
      out.push({
        no: '02', tag: '减速最明显',
        tt: esc(w.name) + ' 近 4 周同比 ' + pctTxt(w.yoy4, 1),
        bd: bd2,
        kv: [['近4周 GMV', gm(w.l4)], ['同比', pctTxt(w.yoy4, 1), cls(w.yoy4)],
        ['YTD 同比', isNum(w.yoy) ? pctTxt(w.yoy, 1) : '—', cls(w.yoy)]]
      });
    }

    /* ③ 赛道分化（排除体量过小的赛道，避免小分母误导） */
    var big = [], j;
    for (j = 0; j < T.sectors.length; j++) {
      var s = T.sectors[j];
      if (isNum(s.yoy4) && isNum(s.l4) && s.l4 >= 0.5) big.push(s);
    }
    if (big.length >= 2) {
      var hi = big[0], lo = big[0];
      for (j = 1; j < big.length; j++) {
        if (big[j].yoy4 > hi.yoy4) hi = big[j];
        if (big[j].yoy4 < lo.yoy4) lo = big[j];
      }
      var gap = +(hi.yoy4 - lo.yoy4).toFixed(1);
      out.push({
        no: '03', tag: '赛道分化',
        tt: esc(hi.sector) + ' 与 ' + esc(lo.sector) + ' 相差 ' + gap + ' pp',
        bd: '近 4 周 <b>' + esc(hi.sector) + '</b> 做到 ' + gm(hi.l4) + '，同比 <b class="' + cls(hi.yoy4) + '">'
          + pctTxt(hi.yoy4, 1) + '</b>；同期 <b>' + esc(lo.sector) + '</b> 体量更大（' + gm(lo.l4)
          + '）但同比 <b class="' + cls(lo.yoy4) + '">' + pctTxt(lo.yoy4, 1) + '</b>。'
          + '名单里增速最高与最低的赛道差 <b>' + gap + ' pp</b>，说明这一轮增长是结构性的、不是普涨——'
          + '看单品牌表现前，先确认它所在赛道的水位（仅统计近 4 周 ≥0.5 亿的 ' + big.length + ' 个赛道）。',
        kv: [[hi.sector, pctTxt(hi.yoy4, 1), cls(hi.yoy4)], [lo.sector, pctTxt(lo.yoy4, 1), cls(lo.yoy4)],
        ['名单整体', pctTxt(T.totals.yoy4, 1), cls(T.totals.yoy4)]]
      });
    }
    return out;
  }

  function rankList(rows, kind) {
    if (!rows || !rows.length) return '<div class="mt-empty">该榜单无数据</div>';
    var s = '', i;
    for (i = 0; i < rows.length; i++) {
      var r = rows[i], d = r.driver || {};
      s += '<div class="mt-lrow">'
        + rankHTML(r.rank, r.rank_prev, r.rank_chg)
        + '<div class="mt-nm"><div class="b" title="' + esc(r.name) + '">' + esc(r.name) + '</div>'
        + '<div class="s"><em style="color:' + sc(r.sector) + '">' + esc(r.sector) + '</em>'
        + '<span>近4周 ' + gm(r.l4) + '</span>'
        + '<span title="去年同期 4 周">LY ' + gm(r.l4ly) + '</span></div></div>'
        + '<div class="mt-big"><div class="p ' + cls(r.yoy4) + '">'
        + (isNum(r.yoy4) ? pctTxt(r.yoy4, 1) : '') + '</div>'
        + (isNum(r.yoy4) ? '' : '<div class="p">' + pctHTML(r.yoy4) + '</div>')
        + '<div class="g">环比 <span class="' + cls(r.wow4) + '">'
        + (isNum(r.wow4) ? pctTxt(r.wow4, 1) : '—') + '</span></div></div>'
        + '<div class="mt-l2"><span class="mt-tag">' + esc(r.arch || '—') + '</span>'
        + contribHTML(d)
        + '<span title="2026 YTD 同比">YTD ' + (isNum(r.yoy) ? pctTxt(r.yoy, 1) : '新增·无同期') + '</span>'
        + extremeMark(r.yoy)
        + '</div></div>';
    }
    return s;
  }

  function renderTrack(el) {
    if (!window.TRACKER || !TRACKER.meta || !TRACKER.totals) { fail(el, 'TRACKER'); return; }
    injectCSS();
    var T = TRACKER, m = T.meta, t = T.totals, p = P();
    var lag = daysBetween(m.biz_end, todayStr());
    var l4a = (m.l4_weeks && m.l4_weeks.length) ? m.l4_weeks[0] : m.l4_from;

    var h = '<div class="wrap">';

    /* —— HERO + 状态条 —— */
    h += '<section class="mt-hero">'
      + '<div class="mt-eyebrow">Weekly Tracker · 本周追踪台</div>'
      + '<h1 class="mt-title">这一周，名单里的女性私护品牌<br>发生了什么</h1>'
      + '<p class="mt-lede">名单内 <b>' + m.brand_n + '</b> 个女性私处洗护品牌（抖音电商直客口径）的周度追踪。'
      + '本页只回答三个问题：<span class="em">数据新不新</span>、<span class="em">谁在加速谁在失速</span>、'
      + '<span class="em">增量是从哪个渠道来的</span>。所有同比均对齐 ' + m.prev_year + ' 年同期，'
      + '缺同期的一律标注「新增 · 无同期」，不补 0。</p>'
      + '<div class="mt-status">'
      + '<div class="mt-st"><div class="k">数据截止</div><div class="v">' + esc(m.biz_end)
      + (isNum(lag) ? '<span class="mt-fresh" title="今天 ' + todayStr() + '，业务数据滞后 ' + lag + ' 天"><i></i>T-' + lag + '</span>' : '')
      + '</div></div>'
      + '<div class="mt-st"><div class="k">快照 p_date</div><div class="v">' + esc(m.p_date) + '</div></div>'
      + '<div class="mt-st" title="数据每周一 09:00（北京时间）自动重跑并重新部署；角标「周更」表示本次数据由周更管线产出"><div class="k">最后更新</div><div class="v">' + esc(m.generated_at)
      + (m.auto_update ? '<span class="mt-fresh" title="' + esc(m.auto_update) + '"><i></i>周更</span>' : '<span class="mt-fresh" style="opacity:.62"><i></i>每周一 09:00</span>')
      + '</div></div>'
      + '<div class="mt-st"><div class="k">覆盖品牌</div><div class="v">' + m.brand_n + ' 个</div></div>'
      + '<div class="mt-st"><div class="k">近 4 周窗口</div><div class="v">' + esc(l4a) + ' ~ ' + esc(m.last_week_end) + '</div></div>'
      + '<div class="mt-st"><div class="k">最近完整周</div><div class="v">' + esc(weekSpan(m.last_week)) + '</div></div>'
      + '</div></section>';

    /* —— 指标卡 —— */
    var mix = t.cohort_mix || {};
    var mixOrder = GENRES.slice().sort(function (a, b) { return (mix[b] || 0) - (mix[a] || 0); });
    h += '<section class="mt-sec" style="margin-top:34px"><div class="mt-kpis">'
      + '<div class="mt-kpi"><div class="k">' + m.cur_year + ' YTD 合计</div>'
      + '<div class="n">' + t.ytd.toFixed(2) + '<small>亿元</small></div>'
      + '<div class="d">同比 <b class="' + cls(t.yoy) + ' big">' + pctTxt(t.yoy, 2) + '</b><br>'
      + m.prev_year + ' 同期 ' + gm(t.prv) + ' · 窗口 ' + esc(m.biz_start) + '~' + esc(m.biz_end) + '</div></div>'

      + '<div class="mt-kpi"><div class="k">近 4 周合计</div>'
      + '<div class="n">' + t.l4.toFixed(2) + '<small>亿元</small></div>'
      + '<div class="d">同比 <b class="' + cls(t.yoy4) + ' big">' + pctTxt(t.yoy4, 2) + '</b><br>'
      + '去年同 4 周 ' + gm(t.l4ly) + '（' + esc((m.l4_ly_weeks || [])[0] || '—') + ' 起）</div>'
      + '<div class="mt-note" style="margin-top:10px;font-size:10.5px">同比才是这块看板的主指标：它已经消掉了季节性。</div></div>'

      + '<div class="mt-kpi"><div class="k">近 4 周环比</div>'
      + '<div class="n ' + cls(t.wow4) + '">' + pctTxt(t.wow4, 2) + '</div>'
      + '<div class="d">近 4 周 ' + gm(t.l4) + ' vs 前 4 周 ' + gm(t.p4) + '</div>'
      + '<div class="mt-caution"><b>别按环比读增长。</b>前 4 周落在 7 月——名单历史上的季节性低谷，'
      + '低基数会把环比抬到 ' + pctTxt(t.wow4, 1) + '，而同期同比只有 ' + pctTxt(t.yoy4, 2) + '。'
      + '判断真实动能请看同比。</div></div>'

      + '<div class="mt-kpi"><div class="k">名单基准玩法结构</div>'
      + '<div class="n">' + (mix[mixOrder[0]] || 0) + '<small>% ' + mixOrder[0] + '</small></div>'
      + '<div class="mt-mixrow">' + mixBar(mix, 9) + mixLegend() + '</div>'
      + '<div class="d" style="margin-top:8px">'
      + mixOrder.map(function (g) { return g + ' ' + (isNum(mix[g]) ? mix[g] : '—') + '%'; }).join(' · ')
      + '<br>该结构为名单合计基准线，单品牌偏离度即其玩法特征。</div></div>'
      + '</div></section>';

    /* —— 本周值得看的 3 件事 —— */
    var things = trackThings(T);
    h += '<section class="mt-sec"><div class="mt-sech"><span class="mt-hn">01</span>'
      + '<h2 class="mt-h">本周值得看的 ' + things.length + ' 件事</h2>'
      + '<span class="mt-hx">由近 4 周同比 / 环比 / 赛道分化自动计算，随每次刷新变化</span></div>'
      + '<div class="mt-3">';
    things.forEach(function (x) {
      h += '<article class="mt-thing"><div class="no">' + x.no + ' · ' + esc(x.tag) + '<i></i></div>'
        + '<div class="tt">' + x.tt + '</div><div class="bd">' + x.bd + '</div><div class="kv">';
      x.kv.forEach(function (kv) {
        h += '<div><div class="kk">' + esc(kv[0]) + '</div><div class="vv ' + (kv[2] || '') + '">' + esc(kv[1]) + '</div></div>';
      });
      h += '</div></article>';
    });
    h += '</div></section>';

    /* —— 加速榜 / 减速榜 —— */
    h += '<section class="mt-sec"><div class="mt-sech"><span class="mt-hn">02</span>'
      + '<h2 class="mt-h">加速榜 / 减速榜</h2>'
      + '<span class="mt-hx">近 4 周（' + esc(l4a) + ' ~ ' + esc(m.last_week_end) + '）同比排序 · 各 '
      + T.up.length + ' 条</span></div>'
      + '<div class="mt-sub">主指标是<b>近 4 周同比 yoy4</b>（大字），环比为参考（小字灰）。'
      + '「环比主推 · 贡献」是<b>环比增量分解</b>：该渠道近 4 周相对前 4 周的增量 ÷ 品牌整体环比增量，'
      + '<b>与同比无关</b>，用于回答「这 4 周的短期变化是谁带来的」。'
      + '它是占比而非绝对额，其他渠道下滑时会 <b>&gt;100%</b>、方向相反时会 <b>为负</b>，'
      + '页面如实展示、不做截断，悬停可看完整口径与绝对增量。</div>'
      + '<div class="mt-two">'
      + '<div class="mt-panel"><div class="mt-ph"><span class="ms mt-up">trending_up</span>'
      + '<span class="t">加速榜</span><span class="c">按近 4 周同比降序</span></div>'
      + rankList(T.up, 'up') + '</div>'
      + '<div class="mt-panel"><div class="mt-ph"><span class="ms mt-dn">trending_down</span>'
      + '<span class="t">减速榜</span><span class="c">按近 4 周同比升序</span></div>'
      + rankList(T.down, 'down') + '</div>'
      + '</div></section>';

    /* —— 赛道近 4 周 —— */
    h += '<section class="mt-sec"><div class="mt-sech"><span class="mt-hn">03</span>'
      + '<h2 class="mt-h">赛道近 4 周表现</h2><span class="mt-hx">' + T.sectors.length + ' 个赛道 · 近 4 周 vs 去年同 4 周</span></div>'
      + '<div id="mtSecChart" class="mt-chart" style="height:' + (T.sectors.length * 42 + 76) + 'px;margin-top:16px"></div>'
      + '<div class="mt-tblw"><table class="mt-tbl"><thead><tr>'
      + '<th>赛道</th><th>近4周 GMV</th><th>前4周</th><th>环比</th><th>去年同4周</th><th>同比</th><th>占近4周合计</th>'
      + '</tr></thead><tbody>';
    T.sectors.forEach(function (s) {
      var share = isNum(s.l4) && isNum(t.l4) && t.l4 ? (s.l4 / t.l4 * 100) : null;
      h += '<tr><td class="nm" style="border-left:3px solid ' + sc(s.sector) + ';padding-left:9px">' + esc(s.sector) + '</td>'
        + '<td class="num">' + gm(s.l4) + '</td><td>' + gm(s.p4) + '</td>'
        + '<td class="' + cls(s.wow4) + '">' + (isNum(s.wow4) ? pctTxt(s.wow4, 1) : pctHTML(s.wow4)) + '</td>'
        + '<td>' + gm(s.l4ly) + '</td>'
        + '<td class="num ' + cls(s.yoy4) + '">' + (isNum(s.yoy4) ? pctTxt(s.yoy4, 2) : pctHTML(s.yoy4)) + '</td>'
        + '<td>' + (isNum(share) ? share.toFixed(1) + '%' : '—') + '</td></tr>';
    });
    h += '</tbody></table></div>'
      + '<div class="mt-note"><b>脚注：</b>3C数码近 4 周仅 ' + gm((function () {
        var v = null; T.sectors.forEach(function (s) { if (s.sector === '3C数码') v = s.l4; }); return v;
      })()) + '、家电家居 ' + gm((function () {
        var v = null; T.sectors.forEach(function (s) { if (s.sector === '家电家居') v = s.l4; }); return v;
      })()) + '——在<b>直客（品牌直营）口径</b>下，3C / 家电头部多走经销、分销，不计入本名单，'
      + '因此这两个赛道<b>只能看趋势方向，不能看绝对体量，也不能与其他赛道横向比大小</b>。'
      + '同理，赛道同比在小分母上波动会被放大（如 3C数码近 4 周 0.01 亿，环比 -50% 实为 0.02→0.01 亿的绝对量变化）。</div>'
      + '</section>';

    /* —— 名单合计周度曲线 —— */
    h += '<section class="mt-sec"><div class="mt-sech"><span class="mt-hn">04</span>'
      + '<h2 class="mt-h">名单合计 · 周度曲线</h2>'
      + '<span class="mt-hx">' + T.weeks.length + ' 周 · ' + esc(T.weeks[0]) + ' ~ ' + esc(m.last_week_end) + '</span></div>'
      + '<div class="mt-sub">每个点是该自然周（周一起算）名单内 ' + m.brand_n + ' 个品牌的支付 GMV 合计，'
      + '阴影区为本页近 4 周窗口。序列自 ' + esc(T.weeks[0]) + ' 起，早于该周的周次不完整、未纳入。</div>'
      + '<div id="mtWeekChart" class="mt-chart" style="height:340px;margin-top:14px"></div>'
      + '</section>';

    h += caliber(m, '「近 4 周」= ' + esc(l4a) + ' ~ ' + esc(m.last_week_end)
      + '，其去年同期对齐 ' + esc((m.l4_ly_weeks || [])[0] || '—') + ' 起的 4 个自然周（按周对齐，非按日历日对齐）。');
    h += '</div>';
    el.innerHTML = h;

    /* ---- 图 1：赛道横向柱 ---- */
    var secs = T.sectors.slice().reverse();
    mk('track', document.getElementById('mtSecChart'), {
      animationDuration: 520,
      grid: { left: 92, right: 122, top: 34, bottom: 28, containLabel: false },
      tooltip: Object.assign({
        trigger: 'axis', axisPointer: { type: 'shadow' },
        formatter: function (ps) {
          if (!ps || !ps.length) return '';
          var name = ps[0].name, o = null;
          secs.forEach(function (s) { if (s.sector === name) o = s; });
          if (!o) return name;
          return '<b>' + name + '</b><br/>近 4 周 ' + gm(o.l4) + '<br/>去年同 4 周 ' + gm(o.l4ly)
            + '<br/>同比 ' + (isNum(o.yoy4) ? pctTxt(o.yoy4, 2) : '新增 · 无同期')
            + '<br/>环比前 4 周 ' + (isNum(o.wow4) ? pctTxt(o.wow4, 2) : '—');
        }
      }, baseTip(p)),
      legend: {
        top: 2, right: 0, itemWidth: 12, itemHeight: 8, itemGap: 14,
        textStyle: { color: p.ink3, fontSize: 11 }
      },
      xAxis: {
        type: 'value', min: 0, name: 'GMV（亿元）', nameLocation: 'end', nameGap: 10,
        nameTextStyle: { color: p.ink5, fontSize: 10, align: 'right' },
        axisLine: { show: false }, axisTick: { show: false },
        axisLabel: axText(p), splitLine: { lineStyle: { color: p.line2 } }
      },
      yAxis: {
        type: 'category', data: secs.map(function (s) { return s.sector; }),
        axisLine: { lineStyle: { color: p.line } }, axisTick: { show: false },
        axisLabel: { color: p.ink2, fontSize: 12 }
      },
      series: [
        {
          name: '去年同 4 周', type: 'bar', barWidth: 9, barGap: '20%',
          itemStyle: { color: p.ink5, opacity: .55 },
          data: secs.map(function (s) { return s.l4ly; })
        },
        {
          name: '近 4 周', type: 'bar', barWidth: 9,
          itemStyle: {
            color: function (o) { return sc(secs[o.dataIndex].sector); }
          },
          label: {
            show: true, position: 'right', distance: 8, fontSize: 11,
            formatter: function (o) {
              var s = secs[o.dataIndex];
              return '{a|' + gm(s.l4) + '}  {' + (isNum(s.yoy4) ? (s.yoy4 > 0 ? 'u' : (s.yoy4 < 0 ? 'd' : 'n')) : 'n') + '|'
                + (isNum(s.yoy4) ? pctTxt(s.yoy4, 1) : '无同期') + '}';
            },
            rich: {
              a: { color: p.ink2, fontSize: 11.5, fontWeight: 'bold' },
              u: { color: p.pos, fontSize: 11.5 }, d: { color: p.neg, fontSize: 11.5 },
              n: { color: p.ink4, fontSize: 11 }
            }
          },
          data: secs.map(function (s) { return s.l4; })
        }
      ]
    });

    /* ---- 图 2：周度曲线 ---- */
    var l4set = {}; (m.l4_weeks || []).forEach(function (w) { l4set[w] = 1; });
    var wIdx = [];
    T.weeks.forEach(function (w, i) { if (l4set[w]) wIdx.push(i); });
    mk('track', document.getElementById('mtWeekChart'), {
      animationDuration: 620,
      grid: { left: 56, right: 26, top: 30, bottom: 52 },
      tooltip: Object.assign({
        trigger: 'axis',
        formatter: function (ps) {
          if (!ps || !ps.length) return '';
          var i = ps[0].dataIndex;
          return '<b>' + weekSpan(T.weeks[i]) + '</b>（周一 ' + T.weeks[i] + '）<br/>名单合计 '
            + gm(T.cohort_week[i]) + (l4set[T.weeks[i]] ? '<br/><span style="color:' + p.accent + '">· 属于近 4 周窗口</span>' : '');
        }
      }, baseTip(p)),
      xAxis: {
        type: 'category', data: T.weeks, boundaryGap: false,
        axisLine: { lineStyle: { color: p.line3 } }, axisTick: { show: false },
        axisLabel: {
          color: p.ink4, fontSize: 10, interval: 'auto', rotate: 38, hideOverlap: true,
          formatter: function (v) { return mdTxt(v); }
        }
      },
      yAxis: {
        type: 'value', min: 0, name: '亿元', nameTextStyle: { color: p.ink5, fontSize: 10 },
        axisLine: { show: false }, axisTick: { show: false }, axisLabel: axText(p),
        splitLine: { lineStyle: { color: p.line2 } }
      },
      series: [{
        name: '名单合计', type: 'line', smooth: false, showSymbol: false, symbolSize: 6,
        lineStyle: { color: p.accent, width: 1.8 },
        itemStyle: { color: p.accent },
        areaStyle: { color: p.paper2 },
        data: T.cohort_week,
        markArea: wIdx.length ? {
          silent: true,
          itemStyle: { color: p.accentWash },
          label: {
            show: true, position: 'insideTop', color: p.accent, fontSize: 10,
            formatter: '近 4 周窗口'
          },
          data: [[{ xAxis: T.weeks[wIdx[0]] }, { xAxis: T.weeks[wIdx[wIdx.length - 1]] }]]
        } : null,
        markLine: {
          silent: true, symbol: 'none',
          lineStyle: { color: p.ink5, type: 'dashed', width: 1 },
          label: { formatter: '31 周均值 {c} 亿', color: p.ink4, fontSize: 10, position: 'insideEndTop' },
          data: [{
            yAxis: +(T.cohort_week.reduce(function (a, b) { return a + b; }, 0) / T.cohort_week.length).toFixed(2)
          }]
        }
      }]
    });
  }

  /* ================================================================== *
   * 3. Tab「趋势追踪」trend
   * ================================================================== */

  function renderTrend(el) {
    if (!window.TREND || !TREND.meta || !TREND.brands) { fail(el, 'TREND'); return; }
    injectCSS();
    var D = TREND, m = D.meta, p = P();
    var BR = D.brands, i;

    /* 名单整体同比（优先取 TRACKER 的口径一致数字） */
    var cohortYoY = (window.TRACKER && TRACKER.totals && isNum(TRACKER.totals.yoy)) ? TRACKER.totals.yoy : null;
    var sumYtd = 0, sumPrv = 0;
    D.sectors.forEach(function (s) { sumYtd += s.ytd || 0; sumPrv += s.prv || 0; });
    if (!isNum(cohortYoY) && sumPrv) cohortYoY = +((sumYtd / sumPrv - 1) * 100).toFixed(2);

    /* 大促月识别：仅在已发生的月份中标注 10/11/12 月 */
    var promo = [];
    D.months.forEach(function (ym) {
      var mm = String(ym).slice(4, 6);
      if (mm === '10' || mm === '11' || mm === '12') promo.push(ym);
    });

    var h = '<div class="wrap">';

    h += '<section class="mt-hero">'
      + '<div class="mt-eyebrow">Trend · 趋势追踪</div>'
      + '<h1 class="mt-title">把单周的波动<br>放回 20 个月的曲线里</h1>'
      + '<p class="mt-lede">名单内 <b>' + m.brand_n + '</b> 个品牌的长期走势：'
      + '<span class="em">' + ymTxt(D.months[0]) + ' ~ ' + ymTxt(D.months[D.months.length - 1]) + '</span> 共 '
      + D.months.length + ' 个月的月度序列、' + D.weeks.length + ' 周的周度序列，'
      + '以及规模 × 增速的分布、赛道走势与 TOP15 名次变化。'
      + '所有曲线均为名单内品牌合计或单品牌自身，不是平台或行业总量。</p>'
      + '</section>';

    /* —— 1. 名单合计月度曲线 —— */
    h += '<section class="mt-sec" style="margin-top:40px"><div class="mt-sech"><span class="mt-hn">01</span>'
      + '<h2 class="mt-h">名单合计 · ' + D.months.length + ' 个月曲线</h2>'
      + '<span class="mt-hx">' + ymTxt(D.months[0]) + ' ~ ' + ymTxt(D.months[D.months.length - 1]) + '</span></div>'
      + '<div class="mt-sub">灰底区间为 <b>Q4 大促季（10/11/12 月）</b>：' + m.prev_year + ' 年 10 月 '
      + gm(D.cohort_month[D.months.indexOf(202510)]) + '、11 月 ' + gm(D.cohort_month[D.months.indexOf(202511)])
      + '、12 月 ' + gm(D.cohort_month[D.months.indexOf(202512)])
      + '，是全序列最高的三个月。' + m.cur_year + ' 年数据到 ' + ymTxt(D.months[D.months.length - 1])
      + ' 为止，尚未进入 Q4，<b>跨年比较请务必按同月对齐</b>。</div>'
      + '<div id="mtMonChart" class="mt-chart" style="height:360px;margin-top:14px"></div>'
      + '</section>';

    /* —— 2. 品牌多选对比 —— */
    var sectorList = [];
    D.sectors.forEach(function (s) { sectorList.push(s.sector); });
    h += '<section class="mt-sec"><div class="mt-sech"><span class="mt-hn">02</span>'
      + '<h2 class="mt-h">品牌趋势对比</h2>'
      + '<span class="mt-hx">共 ' + BR.length + ' 个品牌 · 最多同时对比 8 个</span></div>'
      + '<div class="mt-sub">默认选中 YTD 规模 TOP5。月度序列覆盖 ' + ymTxt(D.months[0]) + ' ~ '
      + ymTxt(D.months[D.months.length - 1]) + '；<b>周度序列仅覆盖 ' + esc(D.weeks[0]) + ' ~ '
      + esc(m.last_week_end) + '（' + D.weeks.length + ' 周，' + m.cur_year + ' 年内）</b>，'
      + '早于该周的周次不完整，未纳入，因此周度视图看不到去年同期。</div>'
      + '<div class="mt-bar">'
      + '<div class="mt-seg" id="mtGran"><button class="on" data-g="m">月度</button><button data-g="w">周度</button></div>'
      + '<div class="mt-inp"><span class="ms">search</span><input id="mtBSearch" type="text" placeholder="搜索品牌名…" autocomplete="off"></div>'
      + '<select class="mt-sel" id="mtBSector"><option value="">全部赛道</option>'
      + sectorList.map(function (s) { return '<option value="' + esc(s) + '">' + esc(s) + '</option>'; }).join('')
      + '</select>'
      + '<button class="mt-lnk" id="mtBTop5">恢复 TOP5</button>'
      + '<button class="mt-lnk" id="mtBClear">清空</button>'
      + '<span class="mt-cnt" id="mtBCnt"></span></div>'
      + '<div class="mt-chips" id="mtBChips"></div>'
      + '<div class="mt-blist" id="mtBList"></div>'
      + '<div id="mtBrandChart" class="mt-chart" style="height:400px;margin-top:20px"></div>'
      + '</section>';

    /* —— 3. 四象限散点 —— */
    var YMAX = 300;
    var pool = [], out = [], dropNull = 0;
    for (i = 0; i < BR.length; i++) {
      var b = BR[i];
      if (!isNum(b.ytd) || b.ytd < 0.5) continue;
      if (!isNum(b.yoy)) { dropNull++; continue; }
      if (Math.abs(b.yoy) > YMAX) { out.push(b); continue; }
      pool.push(b);
    }
    var ytds = pool.map(function (x) { return x.ytd; }).sort(function (a, b2) { return a - b2; });
    var medYtd = ytds.length ? (ytds.length % 2 ? ytds[(ytds.length - 1) / 2]
      : +((ytds[ytds.length / 2 - 1] + ytds[ytds.length / 2]) / 2).toFixed(2)) : 0;

    h += '<section class="mt-sec"><div class="mt-sech"><span class="mt-hn">03</span>'
      + '<h2 class="mt-h">增长动能四象限</h2>'
      + '<span class="mt-hx">YTD ≥ 0.5 亿的品牌 · n = ' + pool.length + '</span></div>'
      + '<div class="mt-sub">横轴 = ' + m.cur_year + ' YTD 规模（亿元，<b>对数轴</b>，用于容纳 0.5 ~ '
      + (ytds.length ? ytds[ytds.length - 1] : 0) + ' 亿的跨度）；纵轴 = YTD 同比 %；'
      + '气泡面积 = 近 4 周 GMV；颜色 = 赛道。'
      + '分界线：纵向为入选品牌<b>规模中位数 ' + medYtd + ' 亿</b>，横向为<b>名单合计同比 '
      + (isNum(cohortYoY) ? pctTxt(cohortYoY, 2) : '—') + '</b>（跑赢/跑输名单整体）。</div>'
      + '<div id="mtQuadLg" class="mt-lg"></div>'
      + '<div id="mtQuadChart" class="mt-chart" style="height:450px;margin-top:6px"></div>'
      + '<div class="mt-note"><b>样本与剔除说明（n = ' + pool.length + '）：</b>'
      + '全名单 ' + BR.length + ' 个品牌中，YTD &lt; 0.5 亿的 '
      + (BR.length - pool.length - out.length - dropNull) + ' 个不入图（小分母下同比不稳定）；'
      + (dropNull ? '另有 ' + dropNull + ' 个品牌去年同期无数据、同比不可计算，未入图；' : '')
      + (out.length ? '还有 ' + out.length + ' 个品牌同比超出 ±' + YMAX + '% 的显示范围，'
        + '为避免压扁其余 ' + pool.length + ' 个点的坐标，单独列出：'
        + out.map(function (x) {
          return '<b>' + esc(x.name) + '</b>（YTD ' + gm(x.ytd) + '，同比 ' + pctTxt(x.yoy, 2) + '，'
            + m.prev_year + ' 同期 ' + gm(x.prv) + '，基期极小）';
        }).join('、') + '。' : '')
      + '象限判断只用于分组视角，不构成对单个品牌的评价。</div>'
      + '</section>';

    /* —— 4. 赛道月度趋势 —— */
    h += '<section class="mt-sec"><div class="mt-sech"><span class="mt-hn">04</span>'
      + '<h2 class="mt-h">赛道月度趋势</h2><span class="mt-hx">' + D.sectors.length + ' 个赛道 · '
      + D.months.length + ' 个月</span></div>'
      + '<div class="mt-sub">图例可点击隐藏/显示单条赛道。3C数码与家电家居在直客口径下体量极小，'
      + '曲线贴近 0 属正常，<b>只看方向不看高低</b>。</div>'
      + '<div id="mtSecLg" class="mt-lg"></div>'
      + '<div id="mtSecTrend" class="mt-chart" style="height:390px;margin-top:6px"></div>'
      + '<div class="mt-tblw"><table class="mt-tbl"><thead><tr><th>赛道</th><th>' + m.cur_year + ' YTD</th>'
      + '<th>' + m.prev_year + ' 同期</th><th>同比</th><th>占名单 YTD</th>'
      + (window.TRACKER && TRACKER.sectors ? '<th>近4周</th><th>近4周同比</th>' : '')
      + '</tr></thead><tbody>';
    var trkSec = {};
    if (window.TRACKER && TRACKER.sectors) TRACKER.sectors.forEach(function (s) { trkSec[s.sector] = s; });
    D.sectors.forEach(function (s) {
      var sh = sumYtd ? (s.ytd / sumYtd * 100) : null;
      var ts = trkSec[s.sector];
      h += '<tr><td class="nm" style="border-left:3px solid ' + sc(s.sector) + ';padding-left:9px">' + esc(s.sector) + '</td>'
        + '<td class="num">' + gm(s.ytd) + '</td><td>' + gm(s.prv) + '</td>'
        + '<td class="num ' + cls(s.yoy) + '">' + (isNum(s.yoy) ? pctTxt(s.yoy, 2) : pctHTML(s.yoy)) + '</td>'
        + '<td>' + (isNum(sh) ? sh.toFixed(1) + '%' : '—') + '</td>'
        + (window.TRACKER && TRACKER.sectors
          ? '<td>' + (ts ? gm(ts.l4) : '—') + '</td><td class="' + (ts ? cls(ts.yoy4) : '') + '">'
          + (ts && isNum(ts.yoy4) ? pctTxt(ts.yoy4, 2) : '—') + '</td>' : '')
        + '</tr>';
    });
    h += '</tbody></table></div></section>';

    /* —— 5. bump chart —— */
    var bp = D.bump || { months: [], top: [], names: {}, data: [] };
    var maxRank = 1;
    bp.data.forEach(function (d) {
      bp.top.forEach(function (k) { var v = d.r[k]; if (isNum(v) && v > maxRank) maxRank = v; });
    });
    h += '<section class="mt-sec"><div class="mt-sech"><span class="mt-hn">05</span>'
      + '<h2 class="mt-h">TOP15 品牌名次变化</h2>'
      + '<span class="mt-hx">按 ' + m.cur_year + ' YTD 取前 15 · 逐月名次</span></div>'
      + '<div class="mt-sub">纵轴为该月在<b>名单内 ' + m.brand_n + ' 个品牌</b>中的 GMV 名次（1 在最上）。'
      + '名次只反映名单内部相对位置，与平台排名无关；名次越靠后波动越大（当月体量小、易被单场大促带动）。'
      + '鼠标悬停某条线可高亮该品牌。</div>'
      + '<div id="mtBumpLg" class="mt-lg"></div>'
      + '<div id="mtBumpChart" class="mt-chart" style="height:640px;margin-top:6px"></div>'
      + '</section>';

    h += caliber(m, '本页月度序列为自然月，周度序列为自然周（周一起算）；'
      + '单品牌曲线为该品牌自身 GMV，未做任何平滑或插值，缺月即为该月无成交。');
    h += '</div>';
    el.innerHTML = h;

    /* ---------------- 图 1：名单合计月度 ---------------- */
    var promoIdx = [];
    promo.forEach(function (ym) { var k = D.months.indexOf(ym); if (k >= 0) promoIdx.push(k); });
    var pArea = [];
    if (promoIdx.length) {
      var st = promoIdx[0], pv = promoIdx[0], k2;
      for (k2 = 1; k2 <= promoIdx.length; k2++) {
        if (k2 === promoIdx.length || promoIdx[k2] !== pv + 1) {
          pArea.push([{ xAxis: ymTxt(D.months[st]), name: 'Q4 大促季' }, { xAxis: ymTxt(D.months[pv]) }]);
          if (k2 < promoIdx.length) st = promoIdx[k2];
        }
        pv = promoIdx[k2];
      }
    }
    var maxM = Math.max.apply(null, D.cohort_month), maxMi = D.cohort_month.indexOf(maxM);
    mk('trend', document.getElementById('mtMonChart'), {
      animationDuration: 620,
      grid: { left: 58, right: 26, top: 34, bottom: 46 },
      tooltip: Object.assign({
        trigger: 'axis',
        formatter: function (ps) {
          if (!ps || !ps.length) return '';
          var idx = ps[0].dataIndex, cur = D.cohort_month[idx], lastY = idx >= 12 ? D.cohort_month[idx - 12] : null;
          var s = '<b>' + ymTxt(D.months[idx]) + '</b><br/>名单合计 ' + gm(cur);
          if (isNum(lastY) && lastY) s += '<br/>去年同月 ' + gm(lastY) + ' · 同比 ' + pctTxt((cur / lastY - 1) * 100, 1);
          return s;
        }
      }, baseTip(p)),
      xAxis: {
        type: 'category', data: D.months.map(ymTxt), boundaryGap: false,
        axisLine: { lineStyle: { color: p.line3 } }, axisTick: { show: false },
        axisLabel: { color: p.ink4, fontSize: 10, interval: 'auto', rotate: 42, hideOverlap: true }
      },
      yAxis: {
        type: 'value', min: 0, name: '亿元', nameTextStyle: { color: p.ink5, fontSize: 10 },
        axisLine: { show: false }, axisTick: { show: false }, axisLabel: axText(p),
        splitLine: { lineStyle: { color: p.line2 } }
      },
      series: [{
        type: 'line', name: '名单合计', showSymbol: true, symbolSize: 5, smooth: false,
        lineStyle: { color: p.accent, width: 1.9 }, itemStyle: { color: p.accent },
        areaStyle: { color: p.accentWash },
        data: D.cohort_month,
        markArea: pArea.length ? {
          silent: true, itemStyle: { color: p.paper2 },
          label: { show: true, position: 'insideTop', color: p.ink4, fontSize: 10, formatter: 'Q4 大促季' },
          data: pArea
        } : null,
        markPoint: {
          symbol: 'pin', symbolSize: 44, itemStyle: { color: p.surface, borderColor: p.line3, borderWidth: 1 },
          label: { color: p.ink2, fontSize: 10, formatter: function (o) { return o.value; } },
          data: [{ name: '峰值', coord: [ymTxt(D.months[maxMi]), maxM], value: maxM }]
        }
      }]
    });

    /* ---------------- 图 2：品牌对比（交互） ---------------- */
    var top5 = [0, 1, 2, 3, 4].slice(0, Math.min(5, BR.length));
    var sel = top5.slice(), gran = 'm', MAXSEL = 8;
    var elChips = document.getElementById('mtBChips'), elList = document.getElementById('mtBList'),
      elCnt = document.getElementById('mtBCnt'), elSearch = document.getElementById('mtBSearch'),
      elSector = document.getElementById('mtBSector');
    var brandChart = mk('trend', document.getElementById('mtBrandChart'), { series: [] });

    function selColor(idx) { return LINE_C[sel.indexOf(idx) % LINE_C.length]; }

    function paintChips() {
      if (!elChips) return;
      if (!sel.length) { elChips.innerHTML = '<span class="none">未选择品牌 —— 从下方列表点选，或点「恢复 TOP5」</span>'; return; }
      elChips.innerHTML = sel.map(function (ix) {
        var b = BR[ix];
        return '<span class="mt-chip"><i style="background:' + selColor(ix) + '"></i>' + esc(b.name)
          + '<button data-x="' + ix + '" title="移除">×</button></span>';
      }).join('');
    }
    function paintList() {
      if (!elList) return;
      var q = (elSearch && elSearch.value ? elSearch.value : '').toLowerCase().replace(/^\s+|\s+$/g, '');
      var sf = elSector ? elSector.value : '';
      var html = '', n = 0, k;
      for (k = 0; k < BR.length; k++) {
        var b = BR[k];
        if (sf && b.sector !== sf) continue;
        if (q && (b.name + ' ' + b.b).toLowerCase().indexOf(q) < 0) continue;
        n++;
        var on = sel.indexOf(k) >= 0;
        html += '<button class="mt-bi' + (on ? ' on' : '') + '" data-i="' + k + '">'
          + '<span class="bx"' + (on ? ' style="background:' + selColor(k) + ';border-color:' + selColor(k) + '"' : '') + '></span>'
          + '<span class="tx"><span class="n1">' + esc(b.name) + '</span>'
          + '<span class="n2">' + esc(b.sector) + ' · YTD ' + gm(b.ytd) + ' · 同比 '
          + (isNum(b.yoy) ? pctTxt(b.yoy, 1) : '新增·无同期') + '</span></span></button>';
      }
      elList.innerHTML = html || '<div style="padding:22px;color:var(--ink-4);font-size:12px;background:var(--surface)">没有匹配的品牌</div>';
      if (elCnt) elCnt.innerHTML = '已选 <b>' + sel.length + '</b> / ' + MAXSEL + ' · 列表 <b>' + n + '</b> 个品牌';
    }
    function paintChart() {
      if (!brandChart) return;
      var xs = gran === 'm' ? D.months.map(ymTxt) : D.weeks.map(mdTxt);
      var series = sel.map(function (ix) {
        var b = BR[ix];
        return {
          name: b.name, type: 'line', smooth: false, showSymbol: gran === 'm', symbolSize: 4,
          lineStyle: { width: 1.8, color: selColor(ix) }, itemStyle: { color: selColor(ix) },
          emphasis: { focus: 'series' },
          data: (gran === 'm' ? b.series : b.wseries).slice()
        };
      });
      brandChart.setOption({
        animationDuration: 480,
        grid: { left: 58, right: 26, top: 26, bottom: gran === 'm' ? 52 : 56 },
        legend: { show: false },
        tooltip: Object.assign({
          trigger: 'axis',
          formatter: function (ps) {
            if (!ps || !ps.length) return '';
            var i2 = ps[0].dataIndex;
            var head = gran === 'm' ? ymTxt(D.months[i2]) : (weekSpan(D.weeks[i2]) + '（周）');
            var rows = ps.slice().sort(function (a, b2) { return (b2.value || 0) - (a.value || 0); });
            return '<b>' + head + '</b><br/>' + rows.map(function (o) {
              return o.marker + o.seriesName + '　<b>' + gm(o.value) + '</b>';
            }).join('<br/>');
          }
        }, baseTip(p)),
        xAxis: {
          type: 'category', data: xs, boundaryGap: false,
          axisLine: { lineStyle: { color: p.line3 } }, axisTick: { show: false },
          axisLabel: { color: p.ink4, fontSize: 10, interval: 'auto', rotate: 42, hideOverlap: true }
        },
        yAxis: {
          type: 'value', min: 0, name: '亿元', nameTextStyle: { color: p.ink5, fontSize: 10 },
          axisLine: { show: false }, axisTick: { show: false }, axisLabel: axText(p),
          splitLine: { lineStyle: { color: p.line2 } }
        },
        series: series.length ? series : [{ type: 'line', data: [] }]
      }, true);
    }
    function repaint() { paintChips(); paintList(); paintChart(); }

    if (elList) elList.addEventListener('click', function (e) {
      var b = e.target;
      while (b && b !== elList && !b.getAttribute('data-i')) b = b.parentNode;
      if (!b || b === elList) return;
      var ix = +b.getAttribute('data-i'), at = sel.indexOf(ix);
      if (at >= 0) sel.splice(at, 1);
      else {
        if (sel.length >= MAXSEL) {
          if (elCnt) elCnt.innerHTML = '<span class="mt-dn">最多同时对比 ' + MAXSEL + ' 个品牌，请先移除一个</span>';
          return;
        }
        sel.push(ix);
      }
      repaint();
    });
    if (elChips) elChips.addEventListener('click', function (e) {
      var x = e.target.getAttribute && e.target.getAttribute('data-x');
      if (x == null) return;
      var at = sel.indexOf(+x);
      if (at >= 0) { sel.splice(at, 1); repaint(); }
    });
    if (elSearch) elSearch.addEventListener('input', paintList);
    if (elSector) elSector.addEventListener('change', paintList);
    var elTop5 = document.getElementById('mtBTop5'), elClear = document.getElementById('mtBClear');
    if (elTop5) elTop5.addEventListener('click', function () { sel = top5.slice(); repaint(); });
    if (elClear) elClear.addEventListener('click', function () { sel = []; repaint(); });
    var elGran = document.getElementById('mtGran');
    if (elGran) elGran.addEventListener('click', function (e) {
      var g = e.target.getAttribute && e.target.getAttribute('data-g');
      if (!g || g === gran) return;
      gran = g;
      var bs = elGran.getElementsByTagName('button'), q;
      for (q = 0; q < bs.length; q++) bs[q].className = (bs[q].getAttribute('data-g') === g ? 'on' : '');
      paintChart();
    });
    repaint();

    /* ---------------- 图 3：四象限散点 ---------------- */
    var bySec = {};
    pool.forEach(function (b) { (bySec[b.sector] = bySec[b.sector] || []).push(b); });
    var scSeries = [];
    D.sectors.forEach(function (s) {
      var arr = bySec[s.sector];
      if (!arr || !arr.length) return;
      scSeries.push({
        name: s.sector, type: 'scatter',
        symbolSize: function (v) { return 7 + Math.sqrt(Math.max(0, v[2])) * 8; },
        itemStyle: { color: sc(s.sector), opacity: .78, borderColor: '#fff', borderWidth: .6 },
        emphasis: { focus: 'series', itemStyle: { opacity: 1 } },
        data: arr.map(function (b) { return [b.ytd, b.yoy, b.l4, b.name, b.sector, b.arch, b.rank]; })
      });
    });
    scSeries.push({
      name: '__quad', type: 'scatter', data: [], silent: true, legendHoverLink: false,
      markLine: {
        silent: true, symbol: 'none',
        lineStyle: { color: p.line3, type: 'dashed', width: 1 },
        label: { color: p.ink4, fontSize: 10 },
        data: [
          { xAxis: medYtd, label: { formatter: '规模中位数 ' + medYtd + ' 亿', position: 'end' } },
          { yAxis: isNum(cohortYoY) ? cohortYoY : 0, label: { formatter: '名单合计同比 ' + (isNum(cohortYoY) ? pctTxt(cohortYoY, 2) : '—'), position: 'insideStartTop' } }
        ]
      },
      markArea: {
        silent: true, itemStyle: { color: 'transparent' },
        label: { color: p.ink5, fontSize: 11, fontWeight: 'bold' },
        data: [
          [{ xAxis: medYtd, yAxis: isNum(cohortYoY) ? cohortYoY : 0, label: { position: 'insideTopRight', formatter: '规模领先 · 高增长' } }, { xAxis: 'max', yAxis: 'max' }],
          [{ xAxis: 'min', yAxis: isNum(cohortYoY) ? cohortYoY : 0, label: { position: 'insideTopLeft', formatter: '小而快' } }, { xAxis: medYtd, yAxis: 'max' }],
          [{ xAxis: medYtd, yAxis: 'min', label: { position: 'insideBottomRight', formatter: '大而稳 / 滞涨' } }, { xAxis: 'max', yAxis: isNum(cohortYoY) ? cohortYoY : 0 }],
          [{ xAxis: 'min', yAxis: 'min', label: { position: 'insideBottomLeft', formatter: '待观察' } }, { xAxis: medYtd, yAxis: isNum(cohortYoY) ? cohortYoY : 0 }]
        ]
      }
    });
    var quadChart = mk('trend', document.getElementById('mtQuadChart'), {
      animationDuration: 520,
      grid: { left: 66, right: 34, top: 26, bottom: 66 },
      legend: {
        show: false,
        data: scSeries.filter(function (s) { return s.name !== '__quad'; }).map(function (s) { return s.name; })
      },
      tooltip: Object.assign({
        trigger: 'item',
        formatter: function (o) {
          var v = o.value;
          if (!v || v.length < 4) return '';
          return '<b>' + esc(v[3]) + '</b> <span style="color:' + sc(v[4]) + '">' + esc(v[4]) + '</span>'
            + '<br/>YTD ' + gm(v[0]) + ' · 名单内第 ' + v[6] + ' 位'
            + '<br/>YTD 同比 ' + pctTxt(v[1], 2)
            + '<br/>近 4 周 ' + gm(v[2]) + '（气泡大小）'
            + '<br/>玩法原型 ' + esc(v[5] || '—');
        }
      }, baseTip(p)),
      xAxis: {
        type: 'log', logBase: 10, min: 0.4, name: 'YTD 规模（亿元 · 对数）', nameLocation: 'middle', nameGap: 34,
        nameTextStyle: { color: p.ink4, fontSize: 11 },
        axisLine: { lineStyle: { color: p.line3 } }, axisTick: { show: false },
        axisLabel: { color: p.ink4, fontSize: 10, formatter: function (v) { return v >= 1 ? v : v.toFixed(1); } },
        splitLine: { lineStyle: { color: p.line2 } }
      },
      yAxis: {
        type: 'value', name: 'YTD 同比 %', nameTextStyle: { color: p.ink4, fontSize: 11 },
        axisLine: { show: false }, axisTick: { show: false },
        axisLabel: { color: p.ink4, fontSize: 10, formatter: '{value}%' },
        splitLine: { lineStyle: { color: p.line2 } }
      },
      series: scSeries
    });
    fillLegend('mtQuadLg', scSeries.filter(function (x) { return x.name !== '__quad'; })
      .map(function (x) { return { name: x.name, color: sc(x.name) }; }), quadChart);

    /* ---------------- 图 4：赛道月度多折线 ---------------- */
    var secChart = mk('trend', document.getElementById('mtSecTrend'), {
      animationDuration: 560,
      grid: { left: 58, right: 26, top: 22, bottom: 52 },
      legend: { show: false, data: D.sectors.map(function (s) { return s.sector; }) },
      tooltip: Object.assign({
        trigger: 'axis',
        formatter: function (ps) {
          if (!ps || !ps.length) return '';
          var rows = ps.slice().sort(function (a, b2) { return (b2.value || 0) - (a.value || 0); });
          return '<b>' + ymTxt(D.months[ps[0].dataIndex]) + '</b><br/>' + rows.map(function (o) {
            return o.marker + o.seriesName + '　<b>' + gm(o.value) + '</b>';
          }).join('<br/>');
        }
      }, baseTip(p)),
      xAxis: {
        type: 'category', data: D.months.map(ymTxt), boundaryGap: false,
        axisLine: { lineStyle: { color: p.line3 } }, axisTick: { show: false },
        axisLabel: { color: p.ink4, fontSize: 10, interval: 'auto', rotate: 42, hideOverlap: true }
      },
      yAxis: {
        type: 'value', min: 0, name: '亿元', nameTextStyle: { color: p.ink5, fontSize: 10 },
        axisLine: { show: false }, axisTick: { show: false }, axisLabel: axText(p),
        splitLine: { lineStyle: { color: p.line2 } }
      },
      series: D.sectors.map(function (s) {
        return {
          name: s.sector, type: 'line', showSymbol: false, smooth: false,
          lineStyle: { width: 1.7, color: sc(s.sector) }, itemStyle: { color: sc(s.sector) },
          emphasis: { focus: 'series' }, data: s.series.slice()
        };
      })
    });
    fillLegend('mtSecLg', D.sectors.map(function (x) { return { name: x.sector, color: sc(x.sector) }; }), secChart);

    /* ---------------- 图 5：bump chart ---------------- */
    if (bp.top.length) {
      var bumpSeries = bp.top.map(function (k, ix) {
        var col = LINE_C[ix % LINE_C.length];
        return {
          name: bp.names[k] || k, type: 'line', smooth: false, symbol: 'circle', symbolSize: 5,
          lineStyle: { width: 1.6, color: col }, itemStyle: { color: col },
          emphasis: { focus: 'series', lineStyle: { width: 3 } },
          endLabel: {
            show: true, color: col, fontSize: 10, distance: 7,
            formatter: function (o) { return o.seriesName; }
          },
          labelLayout: { moveOverlap: 'shiftY' },
          data: bp.data.map(function (d) { var v = d.r[k]; return isNum(v) ? v : null; })
        };
      });
      var bumpChart = mk('trend', document.getElementById('mtBumpChart'), {
        animationDuration: 620,
        grid: { left: 52, right: 132, top: 26, bottom: 52 },
        legend: { show: false, data: bumpSeries.map(function (s) { return s.name; }) },
        tooltip: Object.assign({
          trigger: 'axis',
          formatter: function (ps) {
            if (!ps || !ps.length) return '';
            var rows = ps.slice().filter(function (o) { return isNum(o.value); })
              .sort(function (a, b2) { return a.value - b2.value; });
            return '<b>' + ymTxt(bp.months[ps[0].dataIndex]) + ' 名单内名次</b><br/>'
              + rows.map(function (o) { return o.marker + '第 ' + o.value + ' 位　' + o.seriesName; }).join('<br/>');
          }
        }, baseTip(p)),
        xAxis: {
          type: 'category', data: bp.months.map(ymTxt), boundaryGap: false,
          axisLine: { lineStyle: { color: p.line3 } }, axisTick: { show: false },
          axisLabel: { color: p.ink4, fontSize: 10, interval: 'auto', rotate: 42, hideOverlap: true }
        },
        yAxis: {
          type: 'value', inverse: true, min: 1, max: maxRank, interval: maxRank > 20 ? 5 : 2,
          name: '名次', nameTextStyle: { color: p.ink5, fontSize: 10 },
          axisLine: { show: false }, axisTick: { show: false },
          axisLabel: { color: p.ink4, fontSize: 10, formatter: function (v) { return '#' + v; } },
          splitLine: { lineStyle: { color: p.line2 } }
        },
        series: bumpSeries
      });
      fillLegend('mtBumpLg', bumpSeries.map(function (x, ix) {
        return { name: x.name, color: LINE_C[ix % LINE_C.length] };
      }), bumpChart);
    }
  }

  /* ================================================================== *
   * 4. Tab「动作雷达」radar
   *    数据：window.ACTIONS（新契约，见 male/pipeline/OUT_SCHEMA_ACTIONS.md）
   *      items         123 条真实品牌动作（明星营销 / 达人进播 / 新货组 / 种草观点）
   *      biz           动作所在月前后各 4 周的该品牌直客 GMV 对比（仅时间相邻，非因果）
   *      legacy_events 46 条旧口径 z-score 异动，降级折叠收纳
   * ================================================================== */

  /* 千分位 */
  function grp(v) { return String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }

  /* 元 → 可读金额；完整原值放 title */
  function yuan(v) {
    if (!isNum(v)) return '—';
    var a = Math.abs(v);
    if (a >= 1e8) return grp((v / 1e8).toFixed(2)) + ' 亿元';
    if (a >= 1e4) return grp((v / 1e4).toFixed(1)) + ' 万元';
    return grp(Math.round(v)) + ' 元';
  }
  function yuanFull(v) { return isNum(v) ? grp(v.toFixed(2)) + ' 元' : '—'; }

  /* 四类动作配色（沿用站点低饱和编辑感色板） */
  var ACT_C = { star: '#6B4E71', talent: '#8A6D3B', product: '#002FA7', seeding: '#4F6552' };
  /* 置信度：标签 + 悬停解释 */
  var CONF_L = {
    high: { t: '可核验', c: 'h', d: 'high · 可核验：信源为品牌官方或权威媒体，动作事实可直接核对' },
    medium: { t: '部分可核验', c: 'm', d: 'medium · 部分可核验：有公开报道支撑，但时间、规格等细节未必完整' },
    low: { t: '仅社媒线索', c: 'l', d: 'low · 仅社媒线索：证据主要来自社媒 / 达人内容，只能当线索，不得写成品牌官方主张' }
  };
  var CONF_ORDER = ['high', 'medium', 'low'];

  function renderRadar(el) {
    if (!window.ACTIONS || !ACTIONS.items || !ACTIONS.items.length) { fail(el, 'ACTIONS'); return; }
    injectCSS();
    var A = ACTIONS, m = A.meta || {}, cov = A.coverage || {}, TM = A.type_meta || {};
    var SPEC = A.biz_spec || {}, SCOV = SPEC.coverage || {};
    var LEG = A.legacy_events || [];

    /* 按 date 倒序；仅精确到月的按当月起点排（不伪造成当月 1 日） */
    function sk(it) { return it.date_precision === 'month' ? it.date + '-00' : it.date; }
    var ITEMS = A.items.slice().sort(function (a, b) {
      var x = sk(a), y = sk(b);
      return x < y ? 1 : (x > y ? -1 : (a.brand < b.brand ? -1 : 1));
    });

    /* 现场统计（不写死任何数字） */
    var nType = {}, nConf = {}, nMale = 0, nDelta = 0, brandN = {};
    ITEMS.forEach(function (it) {
      nType[it.type] = (nType[it.type] || 0) + 1;
      nConf[it.confidence] = (nConf[it.confidence] || 0) + 1;
      if (it.confidence === 'high') nMale++;
      if (it.biz && isNum(it.biz.delta_pct)) nDelta++;
      brandN[it.brand] = (brandN[it.brand] || 0) + 1;
    });
    var TYPES = Object.keys(TM).filter(function (t) { return nType[t]; })
      .sort(function (a, b) { return nType[b] - nType[a]; });
    /* 品牌下拉：动作条数降序，同条数按名称 */
    var BRANDS = Object.keys(brandN).sort(function (a, b) {
      return brandN[b] - brandN[a] || (a < b ? -1 : (a > b ? 1 : 0));
    });
    var zero = cov.brands_zero || [];

    var h = '<div class="wrap">';

    /* —— HERO —— */
    h += '<section class="mt-hero">'
      + '<div class="mt-eyebrow">Action Radar · 动作雷达</div>'
      + '<h1 class="mt-title">品牌具体做了什么<br>明星 · 达人 · 新货组 · 种草观点</h1>'
      + '<p class="mt-lede">这一页只回答一件事：<span class="em">窗口内这些品牌到底做了哪些看得见的动作</span>——'
      + '谁官宣了代言人、谁进了直播间、上了什么新货组、在种草里对她讲了什么新说法。'
      + '共 <b>' + grp(ITEMS.length) + '</b> 条动作，<b>全部来自公开信息检索</b>，每条都附可点信源。'
      + '每条动作都挂上<b>动作所在月前后各 4 周的该品牌直客 GMV 对比</b>作为生意侧参照，'
      + '<b>这只是时间相邻关系，不构成因果归因</b>。</p>';

    /* —— 顶部概览条 —— */
    h += '<div class="mt-ovs">'
      + '<div class="mt-ov"><div class="k">动作总数</div>'
      + '<div class="n">' + grp(ITEMS.length) + '<small>条</small></div>'
      + '<div class="d">时间窗口 <b>' + esc(A.window || '—') + '</b><br>生成于 ' + esc(A.generated_at || '—') + '</div></div>'

      + '<div class="mt-ov" style="grid-column:span 2"><div class="k">四类动作分布</div>'
      + '<div style="margin-top:9px">';
    TYPES.forEach(function (t) {
      var tm = TM[t] || {};
      h += '<div class="mt-tyrow" title="' + esc(tm.desc || '') + '">'
        + '<i style="background:' + (ACT_C[t] || '#8F8F8B') + '"></i>' + esc(tm.label || t)
        + '<b>' + grp(nType[t]) + '</b></div>';
    });
    h += '</div>';
    if (TM.talent && TM.talent.caveat) {
      h += '<div class="mt-cav" title="' + esc(TM.talent.caveat) + '"><b>达人进播仅 '
        + grp(nType.talent || 0) + ' 条：</b>' + esc(TM.talent.caveat) + '</div>';
    }
    h += '</div>'

      + '<div class="mt-ov"><div class="k">覆盖品牌</div>'
      + '<div class="n">' + grp(cov.brands_with_action != null ? cov.brands_with_action : '—')
      + '<small>/ ' + grp(cov.brands_total != null ? cov.brands_total : '—') + ' 个</small></div>'
      + '<div class="d">另有 <b>' + zero.length + '</b> 个品牌本期未查到公开动作，已在页尾如实列出</div></div>'

      + '<div class="mt-ov"><div class="k">可核验动作</div>'
      + '<div class="n">' + grp(nMale) + '<small>/ ' + grp(ITEMS.length) + ' 条</small></div>'
      + '<div class="d">其余 <b>' + grp(ITEMS.length - nMale)
      + '</b> 条为 medium / low 信源，可用筛选器只看可核验动作</div></div>'

      + '<div class="mt-ov"><div class="k">生意佐证可算</div>'
      + '<div class="n">' + grp(SCOV.delta_not_null != null ? SCOV.delta_not_null : nDelta)
      + '<small>/ ' + grp(ITEMS.length) + ' 条</small></div>'
      + '<div class="d">其余动作太靠前或太靠后，<b>前后 4 周窗口不足</b>，一律标注不计算，不显示 0%</div></div>'
      + '</div></section>';

    /* —— 筛选器 + 卡片流 —— */
    h += '<section class="mt-sec"><div class="mt-sech"><span class="mt-hn">01</span>'
      + '<h2 class="mt-h">动作卡片流</h2>'
      + '<span class="mt-hx">按动作日期倒序 · 筛选为纯前端，不发请求</span></div>'
      + '<div class="mt-sub">卡片里的<b>标题即「做了什么事」</b>，正文是动作细节，'
      + ''
      + '置信度与信源链接用于自行核验；底部为生意侧参照。</div>'
      + '<div class="mt-fb" id="mtAcFb">'
      + '<div class="mt-fr"><span class="mt-flb">动作类型</span>'
      + '<button type="button" class="mt-ck on" data-ty="">全部 <span class="cn">' + grp(ITEMS.length) + '</span></button>';
    TYPES.forEach(function (t) {
      var tm = TM[t] || {};
      h += '<button type="button" class="mt-ck" data-ty="' + esc(t) + '" title="' + esc(tm.desc || '') + '">'
        + '<i style="color:' + (ACT_C[t] || '#8F8F8B') + '"></i>' + esc(tm.label || t)
        + ' <span class="cn">' + grp(nType[t]) + '</span></button>';
    });
    h += '</div>'
      + '<div class="mt-fr"><span class="mt-flb">置信度</span>'
      + '<button type="button" class="mt-ck on" data-cf="">全部</button>';
    CONF_ORDER.forEach(function (c) {
      if (!nConf[c]) return;
      h += '<button type="button" class="mt-ck" data-cf="' + c + '" title="' + esc(CONF_L[c].d) + '">'
        + esc(CONF_L[c].t) + ' <span class="cn">' + grp(nConf[c]) + '</span></button>';
    });
    h += '</div>'
      + '<div class="mt-fr"><span class="mt-flb">品牌 / 关键词</span>'
      + '<select class="mt-sel" id="mtAcBrand"><option value="">全部品牌（' + BRANDS.length + '）</option>'
      + BRANDS.map(function (b) {
        return '<option value="' + esc(b) + '">' + esc(b) + '（' + brandN[b] + '）</option>';
      }).join('') + '</select>'
      + '<div class="mt-inp"><span class="ms">search</span>'
      + '<input id="mtAcQ" type="text" placeholder="搜标题 / 细节 / 品牌…" autocomplete="off"></div>'
      + '<button type="button" class="mt-ck" data-act="male" title="只保留 confidence=high 的动作：信源为品牌官方 / 上市公司公告 / 监管公示 / 权威媒体">'
      + '<i style="color:var(--accent)"></i>只看可核验动作 <span class="cn">' + grp(nMale) + '</span></button>'
      + '<button type="button" class="mt-lnk" data-act="reset">重置筛选</button>'
      + '<span class="mt-cnt" id="mtAcCnt"></span></div>'
      + '</div>'
      + '<div class="mt-acs" id="mtAcList"></div>'
      + '</section>';

    /* —— 星图种草洞察（子模块，见 app_seeding.js；容器在此预留，渲染后再初始化） —— */
    h += '<section class="mt-sec" id="mtSeedHost"></section>';

    /* —— 底部诚实区块 —— */
    h += '<section class="mt-sec"><div class="mt-sech"><span class="mt-hn">03</span>'
      + '<h2 class="mt-h">这页的边界</h2><span class="mt-hx">查不到的、算不出的，都写在这里</span></div>';

    h += '<div class="mt-zero"><div class="t">本期未查到公开动作的品牌 · ' + zero.length + ' 个</div>'
      + '<div class="l">' + (zero.length
        ? zero.map(function (b) { return '<span>' + esc(b) + '</span>'; }).join('')
        : '<span>无</span>') + '</div>'
      + (cov.brands_zero_note ? '<div class="n">' + esc(cov.brands_zero_note) + '</div>' : '')
      + '</div>';

    h += '<div class="mt-note" style="margin-top:16px"><b>动作事实的来源：</b>'
      + esc(A.note || '')
      + '<br><b>调研库：</b>' + esc(A.source || '')
      + '<br><b>为什么不能从数据里挖：</b>数据集最细只到三级类目，'
      + '<b>没有达人姓名、商品名、直播场次、视频标题</b>字段，'
      + '因此明星营销 / 达人进播 / 新货组 / 种草观点四类动作<b>均来自公开信息检索</b>，'
      + '脚本不新增、不改写任何一条。</div>';

    h += '<div class="mt-note" style="margin-top:12px"><b>生意佐证口径（' + esc(SPEC.metric || '—') + '）：</b>'
      + esc(SPEC.rule || '') + '<br><b>诚实处理：</b>' + esc(SPEC.honesty || '')
      + '<br>周度数据范围 ' + esc(SPEC.data_range || '—')
      + '，剔除不完整自然周 ' + esc((SPEC.excluded_weeks || []).join('、') || '无')
      + '；' + esc(SPEC.gap || '') + '</div>';

    /* legacy：旧口径 z-score 异动，默认收起 */
    h += '<details class="mt-fold"><summary>数据侧异动（旧口径）'
      + '<span class="c">' + grp(LEG.length) + ' 条 z-score 爆发 / 回落 · 不是品牌动作</span>'
      + '<span class="hint"></span></summary><div class="mt-foldb">'
      + '<div class="mt-note" style="margin-top:10px;border-left-color:var(--line-3)">' + esc(A.legacy_note || '') + '</div>'
      + '<div class="mt-tblw"><table class="mt-tbl"><thead><tr><th>周</th><th>品牌</th><th>赛道</th>'
      + '<th>类型</th><th>当周 GMV</th><th>上周</th><th>周环比</th><th>z</th><th>主推渠道</th>'
      + '</tr></thead><tbody>';
    LEG.forEach(function (e) {
      h += '<tr><td class="nm">' + esc(weekSpan(e.week)) + '</td>'
        + '<td>' + esc(e.name) + '</td>'
        + '<td style="color:' + sc(e.sector) + '">' + esc(e.sector) + '</td>'
        + '<td class="' + (e.type === '回落' ? 'mt-dn' : 'mt-up') + '">' + esc(e.type) + '</td>'
        + '<td class="num">' + gm(e.gmv) + '</td><td>' + gm(e.prev) + '</td>'
        + '<td class="' + cls(e.wow) + '">' + (isNum(e.wow) ? pctTxt(e.wow, 1) : '—') + '</td>'
        + '<td>' + (isNum(e.z) ? e.z : '—') + '</td>'
        + '<td>' + esc(e.driver || '—') + '</td></tr>';
    });
    h += '</tbody></table></div></div></details>';
    h += '</section>';

    h += caliber(m, '本页的动作事实来自公开信息检索，不来自交易数据；'
      + '仅 biz（动作前后各 4 周直客 GMV）为数据侧计算，且只表示时间相邻，不构成因果归因。');
    h += '</div>';
    el.innerHTML = h;

    /* ---------------- 星图种草洞察子模块（app_seeding.js） ----------------
       图表实例通过回调 push 进 CHARTS['radar']，与本文件既有的 resize 机制共用；
       该子模块随 radar Tab 首次激活一起渲染，不另起懒加载。               */
    try {
      if (window.MXSEED && typeof MXSEED.render === 'function') {
        MXSEED.render(document.getElementById('mtSeedHost'), function (c) {
          if (c) CHARTS.radar.push(c);
        });
      }
    } catch (eSeed) {
      var seedHost = document.getElementById('mtSeedHost');
      if (seedHost) {
        seedHost.innerHTML = '<div class="mt-empty">星图种草洞察子模块渲染失败：'
          + esc(eSeed && eSeed.message || eSeed) + '（不影响本页其余区块）</div>';
      }
      try { console.error('[MXSEED]', eSeed); } catch (e0) { }
    }

    /* ---------------- 卡片渲染 ---------------- */
    function evLink(e) {
      return '<a href="' + esc(e.url) + '" target="_blank" rel="noopener noreferrer" title="'
        + esc(e.title) + ' · ' + esc(e.url) + '"><span class="ms">link</span> ' + esc(e.title) + '</a>';
    }
    function bizHTML(b) {
      var s = '<div class="mt-bz"><div class="lb">生意佐证 · 动作前后各 4 周直客 GMV</div>';
      if (!b) {
        return s + '<div class="nd">该动作的品牌未能对齐到数据侧品牌名，无法计算前后 4 周对比。</div></div>';
      }
      if (isNum(b.delta_pct)) {
        s += '<div class="fg" title="' + esc(b.note || '') + '">'
          + '<b title="' + esc(yuanFull(b.before_4w)) + '">' + yuan(b.before_4w) + '</b>'
          + '<span class="ar">→</span>'
          + '<b title="' + esc(yuanFull(b.after_4w)) + '">' + yuan(b.after_4w) + '</b>'
          + '<span class="pc ' + cls(b.delta_pct) + '">' + pctTxt(b.delta_pct, 1) + '</span></div>'
          + '<div class="wk" title="前置周：' + esc((b.weeks_before_list || []).join('、'))
          + ' ｜ 后置周：' + esc((b.weeks_after_list || []).join('、')) + '">'
          + '前置 ' + b.weeks_before + ' 周 · 后置 ' + b.weeks_after + ' 周（悬停看参与计算的周一日期）</div>';
      } else {
        s += '<div class="fg">'
          + (b.weeks_before > 0
            ? '<span>动作前 ' + b.weeks_before + ' 周 <b title="' + esc(yuanFull(b.before_4w)) + '">' + yuan(b.before_4w) + '</b></span>'
            : '<span class="ar">动作前：无完整自然周</span>')
          + '<span class="ar">→</span>'
          + (b.weeks_after > 0
            ? '<span>动作后 ' + b.weeks_after + ' 周 <b title="' + esc(yuanFull(b.after_4w)) + '">' + yuan(b.after_4w) + '</b></span>'
            : '<span class="ar">动作后：无完整自然周</span>')
          + '<span class="mt-na" title="前后窗口周数不等或一侧为 0，求和不可比，故不计算变化率，也不写成 0%">窗口不足 · 未计算</span></div>'
          + '<div class="nd">' + esc(b.note || '') + '</div>';
      }
      return s + '</div>';
    }
    function card(it) {
      var col = ACT_C[it.type] || '#8F8F8B', tm = TM[it.type] || {};
      var cf = CONF_L[it.confidence] || { t: it.confidence, c: 'm', d: '' };
      var ev = it.evidence || [];
      var s = '<article class="mt-ac" data-id="' + esc(it.id) + '">'
        + '<div class="top"><span class="bn" title="' + esc(it.brand) + '">' + esc(it.brand) + '</span>'
        + '<span class="mt-tb" style="color:' + col + '" title="' + esc(tm.desc || '') + '">'
        + esc(tm.label || it.type) + '</span>'
        + '<span class="dt">' + esc(it.date)
        + (it.date_precision === 'month'
          ? '<em title="信源只披露到月份，未给出具体日期；这里不把它渲染成当月 1 日">仅精确到月</em>' : '')
        + '</span></div>'
        + '<div class="tt">' + esc(it.title) + '</div>'
        + '<div class="bd">' + esc(it.detail) + '</div>';
      if (it.fem_angle) {
        s += '<div class="mt-ma"><span class="lb">女性向角度</span><span class="tx">' + esc(it.fem_angle) + '</span></div>';
      }
      s += '<div class="mt-evd"><span class="mt-cf ' + cf.c + '" title="' + esc(cf.d) + '">' + esc(cf.t) + '</span>';
      if (!ev.length) s += '<span class="none">未附公开信源链接</span>';
      else {
        s += ev.slice(0, 3).map(evLink).join('');
        if (ev.length > 3) {
          s += '<details class="mt-fold" style="margin:0;border:none;background:none;width:100%">'
            + '<summary style="padding:4px 0;font-size:11px;font-weight:400">其余 ' + (ev.length - 3)
            + ' 条信源<span class="hint"></span></summary>'
            + '<div class="mt-evd" style="padding:4px 0 0">' + ev.slice(3).map(evLink).join('') + '</div></details>';
        }
      }
      s += '</div>' + bizHTML(it.biz)
        + '<div class="mt-dcl">动作与生意变化为时间相邻关系，不构成因果归因</div>'
        + '</article>';
      return s;
    }

    /* ---------------- 筛选交互（纯前端） ---------------- */
    var F = { ty: {}, cf: {}, brand: '', male: false, q: '' };
    var elList = document.getElementById('mtAcList'), elCnt = document.getElementById('mtAcCnt');
    var elFb = document.getElementById('mtAcFb');
    var elBrand = document.getElementById('mtAcBrand'), elQ = document.getElementById('mtAcQ');

    function anyOn(o) { var x; for (x in o) { if (o[x]) return true; } return false; }
    function hit(it) {
      if (anyOn(F.ty) && !F.ty[it.type]) return false;
      if (anyOn(F.cf) && !F.cf[it.confidence]) return false;
      if (F.brand && it.brand !== F.brand) return false;
      if (F.male && it.confidence !== 'high') return false;
      if (F.q) {
        var s = (it.brand + ' ' + it.title + ' ' + it.detail).toLowerCase();
        if (s.indexOf(F.q) < 0) return false;
      }
      return true;
    }
    function syncBtn() {
      if (!elFb) return;
      var bs = elFb.getElementsByTagName('button'), i2, b, v;
      for (i2 = 0; i2 < bs.length; i2++) {
        b = bs[i2];
        if (b.className.indexOf('mt-ck') < 0) continue;
        v = b.getAttribute('data-ty');
        if (v != null) { b.className = 'mt-ck' + ((v === '' ? !anyOn(F.ty) : !!F.ty[v]) ? ' on' : ''); continue; }
        v = b.getAttribute('data-cf');
        if (v != null) { b.className = 'mt-ck' + ((v === '' ? !anyOn(F.cf) : !!F.cf[v]) ? ' on' : ''); continue; }
        if (b.getAttribute('data-act') === 'male') b.className = 'mt-ck' + (F.male ? ' on' : '');
      }
    }
    function paint() {
      if (!elList) return;
      var out = [], i2;
      for (i2 = 0; i2 < ITEMS.length; i2++) { if (hit(ITEMS[i2])) out.push(card(ITEMS[i2])); }
      elList.innerHTML = out.length ? out.join('')
        : '<div class="mt-empty" style="grid-column:1/-1">当前筛选条件下没有动作，请放宽条件</div>';
      if (elCnt) {
        elCnt.innerHTML = '当前 <b>' + grp(out.length) + '</b> 条 / 共 ' + grp(ITEMS.length) + ' 条'
          + (out.length > 0 && out.length < 10
            ? ' <span class="mt-dn" title="样本量偏小，结论不宜外推">· 样本较小 (n&lt;10)</span>' : '');
      }
      syncBtn();
    }

    if (elFb) elFb.addEventListener('click', function (e) {
      var b = e.target, v;
      while (b && b !== elFb && !(b.getAttribute && (b.getAttribute('data-ty') != null
        || b.getAttribute('data-cf') != null || b.getAttribute('data-act') != null))) b = b.parentNode;
      if (!b || b === elFb) return;
      v = b.getAttribute('data-ty');
      if (v != null) {
        if (v === '') F.ty = {}; else F.ty[v] = !F.ty[v];
        paint(); return;
      }
      v = b.getAttribute('data-cf');
      if (v != null) {
        if (v === '') F.cf = {}; else F.cf[v] = !F.cf[v];
        paint(); return;
      }
      v = b.getAttribute('data-act');
      if (v === 'male') { F.male = !F.male; paint(); return; }
      if (v === 'reset') {
        F = { ty: {}, cf: {}, brand: '', male: false, q: '' };
        if (elBrand) elBrand.value = '';
        if (elQ) elQ.value = '';
        paint();
      }
    });
    if (elBrand) elBrand.addEventListener('change', function () { F.brand = elBrand.value; paint(); });
    if (elQ) elQ.addEventListener('input', function () {
      F.q = String(elQ.value || '').toLowerCase().replace(/^\s+|\s+$/g, '');
      paint();
    });
    paint();
  }

  /* ================================================================== *
   * 5. 注册
   * ================================================================== */
  if (window.MXTRACK && typeof MXTRACK.reg === 'function') {
    MXTRACK.reg('track', { render: renderTrack, resize: resizer('track') });
    MXTRACK.reg('trend', { render: renderTrend, resize: resizer('trend') });
    MXTRACK.reg('radar', { render: renderRadar, resize: resizer('radar') });
  }
})();
