/* ============================================================================
   她私护 · SHE CARE —— app_playbook.js
   Tab 3「玩法拆解」(play) + Tab 5「可复制 Learning」(learn)

   数据来源：window.PLAYBOOK / window.LEARNING
   注册方式：MXTRACK.reg('play' | 'learn', {render, resize})

   口径红线：抖音电商直客（品牌直营）口径，聚合口径一律表述为
            「名单内 31 个女性私处洗护品牌合计」，不得外推为平台/行业规模。
   数据诚实：同比缺失 → 「新增 · 无同期」中性灰；统计量 ρ/p/n 如实展示；
            不显著明确标注；小样本（n<10）必须提示。
   ========================================================================== */
(function () {
  'use strict';

  var PB = window.PLAYBOOK || null;
  var LN = window.LEARNING || null;

  /* echarts 实例表：resize 时逐个 .resize() */
  var EC = { play: {}, learn: {} };

  var GENRES = (PB && PB.genres && PB.genres.length) ? PB.genres : ['自播', '达播', '短视频', '商品卡'];
  var GKEY = { '自播': 'zb', '达播': 'db', '短视频': 'sp', '商品卡': 'sk' };

  /* ---------------------------------------------------------------- utils */
  function has(o) { return o !== null && o !== undefined; }
  function q(s) {
    if (!has(s)) return '';
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function isNum(v) { return typeof v === 'number' && isFinite(v); }
  function fx(v, d) { return isNum(v) ? v.toFixed(has(d) ? d : 1) : '—'; }
  /* 大数千分位 */
  function grp(s) { return String(s).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }

  /* 同比 / 变化率：极端值（|v|>=1000%）取整展示，不做任何美化或截断 */
  function pctTxt(v, d) {
    if (!isNum(v)) return null;
    var a = Math.abs(v);
    var s = a >= 1000 ? grp(String(Math.round(v))) : v.toFixed(has(d) ? d : 1);
    return (v > 0 ? '+' : '') + s + '%';
  }
  function ppTxt(v, d) {
    if (!isNum(v)) return null;
    return (v > 0 ? '+' : '') + v.toFixed(has(d) ? d : 1) + 'pp';
  }
  /* 同比 HTML：null → 「新增 · 无同期」中性灰，绝不写 0% */
  function yoyHTML(v, cls) {
    var c = cls || 'mp-yoy';
    if (!isNum(v)) return '<span class="' + c + ' na">新增 · 无同期</span>';
    return '<span class="' + c + (v >= 0 ? ' up' : ' dn') + '">' + pctTxt(v) + '</span>';
  }
  function ppHTML(v) {
    if (!isNum(v)) return '<span class="mp-yoy na">无同期</span>';
    if (Math.abs(v) < 0.05) return '<span class="mp-yoy na">±0.0pp</span>';
    return '<span class="mp-yoy ' + (v > 0 ? 'up' : 'dn') + '">' + ppTxt(v) + '</span>';
  }
  function sortNum(a, b, dir) {
    var an = isNum(a), bn = isNum(b);
    if (!an && !bn) return 0;
    if (!an) return 1;               /* null 恒排最后 */
    if (!bn) return -1;
    return dir > 0 ? a - b : b - a;
  }
  function median(arr) {
    var v = arr.filter(isNum).slice().sort(function (x, y) { return x - y; });
    if (!v.length) return null;
    var m = Math.floor(v.length / 2);
    return v.length % 2 ? v[m] : (v[m - 1] + v[m]) / 2;
  }
  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }

  /* 主题色实时读取（站点支持 5 套配色，图表需跟随换肤） */
  function T() {
    var cs = window.getComputedStyle(document.documentElement);
    function v(k, f) { var x = cs.getPropertyValue(k); return (x && x.trim()) || f; }
    return {
      ink: v('--ink', '#1A1A18'), ink2: v('--ink-2', '#3D3D3B'), ink3: v('--ink-3', '#6E6E6B'),
      ink4: v('--ink-4', '#8F8F8B'), ink5: v('--ink-5', '#A5A5A2'),
      line: v('--line', '#EAEAE8'), line3: v('--line-3', '#D8D8D4'),
      paper: v('--paper', '#FFF'), paper2: v('--paper-2', '#F6F6F4'), paper3: v('--paper-3', '#EEEEEC'),
      surface: v('--surface', '#FFF'),
      accent: v('--accent', '#002FA7'), accentLine: v('--accent-line', 'rgba(0,47,167,.26)'),
      accentWash: v('--accent-wash', 'rgba(0,47,167,.065)'),
      pos: v('--pos', '#4F6552'), neg: v('--neg', '#9C4A44'), warn: v('--warn', '#8B2E2E'),
      serif: v('--serif', 'Noto Serif SC,serif'),
      sans: v('--sans', 'system-ui,sans-serif')
    };
  }
  function gColors(t) { return [t.ink2, t.accent, t.ink4, t.line3]; }  /* 自播 达播 短视频 商品卡 */

  /* 增速配色：正=pos 负=neg 缺失=灰；极端值不参与色阶强度，只区分方向 */
  function yoyColor(v, t) {
    if (!isNum(v)) return t.ink5;
    return v >= 0 ? t.pos : t.neg;
  }

  function mkChart(scope, key, dom, option) {
    if (!dom || !window.echarts) return null;
    try {
      var inst = echarts.init(dom);
      inst.setOption(option);
      EC[scope][key] = inst;
      return inst;
    } catch (e) { return null; }
  }
  function baseGrid(l, r, t2, b) { return { left: l, right: r, top: t2, bottom: b, containLabel: true }; }
  function tipBase(t) {
    return {
      backgroundColor: t.surface, borderColor: t.line, borderWidth: 1,
      padding: [9, 12], extraCssText: 'box-shadow:0 6px 24px -12px rgba(0,0,0,.3);border-radius:4px;',
      textStyle: { color: t.ink2, fontSize: 12, fontFamily: t.sans }
    };
  }

  /* --------------------------------------------------------- 共享浮动提示 */
  var TIP = null;
  function tipEl() {
    if (TIP) return TIP;
    TIP = document.createElement('div');
    TIP.className = 'mp-float-tip';
    document.body.appendChild(TIP);
    return TIP;
  }
  function bindWarnTips(root) {
    if (!root) return;
    root.addEventListener('mouseover', function (e) {
      var el = e.target;
      while (el && el !== root && !(el.getAttribute && el.getAttribute('data-tip'))) el = el.parentNode;
      if (!el || el === root) return;
      var tp = tipEl();
      tp.innerHTML = el.getAttribute('data-tip');
      tp.style.display = 'block';
      var r = el.getBoundingClientRect();
      var w = 300;
      var left = clamp(r.left + r.width / 2 - w / 2, 10, Math.max(10, window.innerWidth - w - 10));
      tp.style.width = w + 'px';
      tp.style.left = left + 'px';
      var top = r.top + window.pageYOffset - tp.offsetHeight - 10;
      if (r.top < 120) top = r.bottom + window.pageYOffset + 10;
      tp.style.top = top + 'px';
    });
    root.addEventListener('mouseout', function (e) {
      var el = e.target;
      while (el && el !== root && !(el.getAttribute && el.getAttribute('data-tip'))) el = el.parentNode;
      if (!el || el === root) return;
      if (TIP) TIP.style.display = 'none';
    });
  }

  /* -------------------------------------------------------------- 迷你堆叠条 */
  function stackBar(mix, opt) {
    var o = opt || {};
    var h = o.h || 9;
    if (!mix) return '<div class="mp-stack na" style="height:' + h + 'px"><span>无体裁数据</span></div>';
    var html = '<div class="mp-stack" style="height:' + h + 'px">';
    for (var i = 0; i < GENRES.length; i++) {
      var g = GENRES[i], v = mix[g];
      if (!isNum(v) || v <= 0) continue;
      html += '<i class="g-' + GKEY[g] + '" style="width:' + v.toFixed(2) + '%" title="' + q(g) + ' ' + fx(v) + '%"></i>';
    }
    return html + '</div>';
  }
  function legendGenres(extra) {
    var h = '<div class="mp-legend">';
    for (var i = 0; i < GENRES.length; i++) {
      h += '<span class="mp-lg"><i class="g-' + GKEY[GENRES[i]] + '"></i>' + q(GENRES[i]) + '</span>';
    }
    if (extra) h += '<span class="mp-lg-note">' + extra + '</span>';
    return h + '</div>';
  }

  /* ------------------------------------------------------------------ CSS */
  function injectCSS() {
    if (document.getElementById('mxplay-css')) return;
    var s = document.createElement('style');
    s.id = 'mxplay-css';
    s.textContent = [
      /* ---- 版式骨架 ---- */
      '.mp-sec{padding:54px 0 0;}',
      '.mp-sec.bd{border-top:1px solid var(--line);margin-top:54px;}',
      '.mp-eyebrow{letter-spacing:.24em;font-size:10px;font-weight:600;color:var(--ink-4);text-transform:uppercase;}',
      '.mp-h1{font-family:var(--serif);font-weight:500;color:var(--ink);font-size:clamp(26px,3.4vw,40px);line-height:1.16;letter-spacing:-.01em;margin:14px 0 0;}',
      '.mp-h2{font-family:var(--serif);font-weight:500;color:var(--ink);font-size:21px;line-height:1.3;margin:9px 0 0;letter-spacing:.005em;}',
      '.mp-h3{font-family:var(--serif);font-weight:500;color:var(--ink);font-size:15px;margin:0;}',
      '.mp-sub{font-size:13px;line-height:1.78;color:var(--ink-3);max-width:860px;margin-top:11px;}',
      '.mp-sub b{font-weight:600;color:var(--ink-2);}',
      '.mp-sub .em{color:var(--accent-deep);font-weight:600;}',
      '.mp-sechead{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;flex-wrap:wrap;}',
      '.mp-chips{display:flex;flex-wrap:wrap;gap:7px;margin-top:16px;}',
      '.mp-chip{display:inline-flex;align-items:center;gap:5px;border:1px solid var(--line);border-radius:2px;padding:4px 9px;font-size:10.5px;color:var(--ink-3);white-space:nowrap;}',
      '.mp-chip .ms{font-size:13px;color:var(--ink-4);}',
      '.mp-chip.k{border-color:var(--accent-line);color:var(--accent-deep);background:var(--accent-wash);}',
      '.mp-hr{height:1px;background:var(--line);margin:26px 0 0;}',
      '.mp-foot{margin:56px 0 12px;padding-top:16px;border-top:1px solid var(--line);font-size:10.5px;line-height:1.85;color:var(--ink-4);}',
      '.mp-foot b{color:var(--ink-3);font-weight:600;}',
      /* ---- 说明 / 提示块 ---- */
      '.mp-note{border:1px solid var(--line);background:var(--surface);border-radius:var(--r);padding:18px 20px;}',
      '.mp-note.wash{background:var(--paper-2);}',
      '.mp-note-h{display:flex;align-items:center;gap:7px;font-size:10.5px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-4);}',
      '.mp-note-h .ms{font-size:15px;color:var(--ink-4);}',
      '.mp-note p{margin:9px 0 0;font-size:12.5px;line-height:1.85;color:var(--ink-3);}',
      '.mp-note p b{color:var(--ink-2);font-weight:600;}',
      '.mp-note code{font-family:var(--serif);font-size:12px;color:var(--accent-deep);background:var(--accent-wash);padding:1px 5px;border-radius:2px;}',
      '.mp-warnbox{border:1px solid var(--warn-line);background:var(--warn-wash);border-radius:var(--r);padding:18px 20px;}',
      '.mp-warnbox .mp-note-h,.mp-warnbox .mp-note-h .ms{color:var(--warn);}',
      '.mp-warnbox p{margin:9px 0 0;font-size:12.5px;line-height:1.85;color:var(--ink-2);}',
      /* ---- 通用小组件 ---- */
      '.mp-yoy{font-size:12px;font-weight:600;white-space:nowrap;font-variant-numeric:tabular-nums;}',
      '.mp-yoy.up{color:var(--pos);} .mp-yoy.dn{color:var(--neg);} .mp-yoy.na{color:var(--ink-4);font-weight:400;}',
      '.mp-tag{display:inline-flex;align-items:center;gap:4px;border:1px solid var(--line);border-radius:2px;padding:2px 7px;font-size:10px;color:var(--ink-3);white-space:nowrap;line-height:1.5;}',
      '.mp-tag.acc{border-color:var(--accent-line);color:var(--accent-deep);}',
      '.mp-tag.mut{color:var(--ink-4);}',
      '.mp-num{font-family:var(--serif);font-weight:500;color:var(--ink);letter-spacing:-.01em;font-variant-numeric:tabular-nums;}',
      '.mp-warn-ic{display:inline-flex;align-items:center;cursor:help;color:var(--warn);opacity:.72;}',
      '.mp-warn-ic .ms{font-size:14px;}',
      '.mp-warn-ic:hover{opacity:1;}',
      '.mp-float-tip{position:absolute;z-index:400;display:none;background:var(--surface);border:1px solid var(--warn-line);border-radius:4px;padding:10px 12px;font-size:11.5px;line-height:1.7;color:var(--ink-2);box-shadow:0 10px 34px -14px rgba(0,0,0,.34);pointer-events:none;}',
      /* ---- 体裁配色 ---- */
      '.mp-stack{display:flex;width:100%;overflow:hidden;border-radius:1px;background:var(--paper-3);}',
      '.mp-stack i{display:block;height:100%;}',
      '.mp-stack.na{align-items:center;justify-content:center;background:transparent;border:1px dashed var(--line-3);}',
      '.mp-stack.na span{font-size:9px;color:var(--ink-5);line-height:1;}',
      '.g-zb{background:var(--ink-2);} .g-db{background:var(--accent);} .g-sp{background:var(--ink-4);} .g-sk{background:var(--line-3);}',
      '.mp-legend{display:flex;flex-wrap:wrap;align-items:center;gap:14px;margin-top:12px;}',
      '.mp-lg{display:inline-flex;align-items:center;gap:6px;font-size:11px;color:var(--ink-3);}',
      '.mp-lg i{width:11px;height:11px;border-radius:2px;display:block;}',
      '.mp-lg-note{font-size:10.5px;color:var(--ink-4);}',
      /* ---- 基准结构条 ---- */
      '.mp-base{margin-top:16px;}',
      '.mp-base-row{display:flex;align-items:center;gap:12px;flex-wrap:wrap;}',
      '.mp-base-lab{font-size:10.5px;letter-spacing:.1em;color:var(--ink-4);white-space:nowrap;}',
      '.mp-base .mp-stack{flex:1 1 320px;min-width:220px;}',
      '.mp-base-vals{display:flex;flex-wrap:wrap;gap:12px;margin-top:9px;}',
      '.mp-base-vals span{font-size:11px;color:var(--ink-3);}',
      '.mp-base-vals b{font-family:var(--serif);font-weight:500;color:var(--ink);margin-left:3px;}',
      /* ---- 原型卡 ---- */
      '.mp-arch-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,270px),1fr));gap:16px;margin-top:22px;}',
      '.mp-ac{border:1px solid var(--line);background:var(--surface);border-radius:var(--r);padding:18px 18px 16px;display:flex;flex-direction:column;gap:12px;transition:border-color .3s;}',
      '.mp-ac:hover{border-color:var(--line-3);}',
      '.mp-ac.hi{border-color:var(--accent-line);background:var(--accent-wash);}',
      '.mp-ac-top{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;}',
      '.mp-ac-name{font-family:var(--serif);font-size:17px;font-weight:500;color:var(--ink);line-height:1.25;}',
      '.mp-ac-n{font-size:10.5px;color:var(--ink-4);margin-top:4px;letter-spacing:.04em;}',
      '.mp-ac-rank{font-family:var(--serif);font-size:11px;color:var(--ink-4);border:1px solid var(--line);border-radius:2px;padding:1px 6px;white-space:nowrap;}',
      '.mp-ac.hi .mp-ac-rank{border-color:var(--accent-line);color:var(--accent-deep);}',
      '.mp-ac-main{display:flex;align-items:baseline;gap:6px;}',
      '.mp-ac-main .v{font-family:var(--serif);font-size:29px;font-weight:500;line-height:1;letter-spacing:-.01em;}',
      '.mp-ac-main .u{font-size:11px;color:var(--ink-4);}',
      '.mp-ac-kv{display:grid;grid-template-columns:1fr 1fr;gap:10px 12px;border-top:1px solid var(--line-2);padding-top:11px;}',
      '.mp-ac-kv div{min-width:0;}',
      '.mp-ac-kv .k{font-size:10px;color:var(--ink-4);letter-spacing:.04em;}',
      '.mp-ac-kv .v{font-family:var(--serif);font-size:15px;font-weight:500;color:var(--ink);margin-top:3px;}',
      '.mp-ac-brands{font-size:11px;line-height:1.85;color:var(--ink-3);border-top:1px solid var(--line-2);padding-top:11px;}',
      '.mp-ac-brands em{font-style:normal;color:var(--ink-4);font-size:10px;letter-spacing:.06em;display:block;margin-bottom:4px;}',
      /* ---- 表格 ---- */
      '.mp-tools{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-top:22px;}',
      '.mp-seg{display:inline-flex;flex-wrap:wrap;border:1px solid var(--line);border-radius:var(--r-s);padding:2px;gap:2px;background:var(--surface);}',
      '.mp-seg button{border:none;background:transparent;padding:5px 11px;border-radius:2px;font-size:11.5px;font-weight:500;color:var(--ink-3);cursor:pointer;font-family:inherit;white-space:nowrap;transition:.16s;}',
      '.mp-seg button:hover{color:var(--ink);}',
      '.mp-seg button.on{color:var(--paper);background:var(--ink);}',
      '.mp-search{position:relative;flex:0 1 230px;}',
      '.mp-search .ms{position:absolute;left:9px;top:50%;transform:translateY(-50%);color:var(--ink-4);font-size:17px;}',
      '.mp-search input{width:100%;padding:7px 12px 7px 32px;border-radius:var(--r-s);border:1px solid var(--line);background:var(--surface);font-size:12.5px;font-family:inherit;color:var(--ink);outline:none;}',
      '.mp-search input:focus{border-color:var(--accent);box-shadow:0 0 0 2px var(--accent-wash);}',
      '.mp-cnt{margin-left:auto;font-size:11.5px;color:var(--ink-4);white-space:nowrap;}',
      '.mp-cnt b{font-family:var(--serif);color:var(--accent-deep);font-weight:500;}',
      '.mp-tw{margin-top:14px;border:1px solid var(--line);border-radius:var(--r);background:var(--surface);overflow-x:auto;}',
      '.mp-tb{width:100%;min-width:940px;border-collapse:collapse;font-size:12px;}',
      '.mp-tb th{position:sticky;top:0;z-index:2;background:var(--surface);text-align:left;font-weight:600;font-size:10px;letter-spacing:.1em;color:var(--ink-4);padding:10px 10px;border-bottom:1px solid var(--line);white-space:nowrap;}',
      '.mp-tb th.s{cursor:pointer;user-select:none;}',
      '.mp-tb th.s:hover{color:var(--ink-2);}',
      '.mp-tb th .ar{font-size:9px;margin-left:2px;color:var(--accent);}',
      '.mp-tb th.num,.mp-tb td.num{text-align:right;font-variant-numeric:tabular-nums;}',
      '.mp-tb td{padding:9px 10px;border-bottom:1px solid var(--line-2);color:var(--ink-2);vertical-align:middle;}',
      '.mp-tb tbody tr:hover{background:var(--paper-2);}',
      '.mp-tb tbody tr:last-child td{border-bottom:none;}',
      '.mp-tb .bn{font-weight:500;color:var(--ink);display:inline-flex;align-items:center;gap:5px;}',
      '.mp-tb .rk{font-family:var(--serif);color:var(--ink-4);font-size:11.5px;}',
      '.mp-tb .sec{font-size:10.5px;color:var(--ink-4);white-space:nowrap;}',
      '.mp-tb .mixcell{min-width:190px;}',
      '.mp-tb .mixnums{display:flex;gap:8px;margin-top:4px;font-size:9.5px;color:var(--ink-4);font-variant-numeric:tabular-nums;}',
      '.mp-tb .mixnums span{white-space:nowrap;}',
      '.mp-gsort{display:inline-flex;gap:3px;margin-left:6px;}',
      '.mp-gsort b{font-weight:500;cursor:pointer;font-size:9.5px;letter-spacing:0;color:var(--ink-5);border:1px solid var(--line);border-radius:2px;padding:0 3px;}',
      '.mp-gsort b:hover{color:var(--ink-2);}',
      '.mp-gsort b.on{color:var(--paper);background:var(--ink);border-color:var(--ink);}',
      '.mp-empty{padding:40px 0;text-align:center;color:var(--ink-4);font-size:12.5px;}',
      /* ---- 图表容器 ---- */
      '.mp-chart{width:100%;}',
      '.mp-axhead{display:flex;flex-wrap:wrap;gap:6px 18px;font-size:10.5px;color:var(--ink-4);letter-spacing:.03em;margin-bottom:8px;}',
      '.mp-axhead b{color:var(--ink-3);font-weight:600;}',
      '.mp-cardwrap{border:1px solid var(--line);background:var(--surface);border-radius:var(--r);padding:16px 16px 10px;margin-top:18px;}',
      '.mp-cap{font-size:10.5px;color:var(--ink-4);line-height:1.8;margin-top:6px;}',
      /* ---- 迁移 TOP 双栏 ---- */
      '.mp-two{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:18px;}',
      '.mp-mini{border:1px solid var(--line);background:var(--surface);border-radius:var(--r);padding:15px 16px;}',
      '.mp-mini-h{display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;color:var(--ink-2);}',
      '.mp-mini-h .ms{font-size:15px;}',
      '.mp-mini-h .sub{margin-left:auto;font-size:10px;color:var(--ink-4);font-weight:400;}',
      '.mp-ml{list-style:none;margin:11px 0 0;padding:0;}',
      '.mp-ml li{display:flex;align-items:center;gap:9px;padding:6px 0;border-top:1px solid var(--line-2);font-size:11.5px;}',
      '.mp-ml li .nm{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--ink-2);}',
      '.mp-ml li .bar{flex:0 0 74px;height:4px;background:var(--paper-3);position:relative;overflow:hidden;border-radius:1px;}',
      '.mp-ml li .bar i{position:absolute;top:0;bottom:0;left:0;display:block;}',
      '.mp-ml li .vv{flex:0 0 54px;text-align:right;font-variant-numeric:tabular-nums;font-size:11px;}',
      '.mp-ml li .yy{flex:0 0 74px;text-align:right;}',
      /* ---- 达人 ---- */
      '.mp-tal{margin-top:18px;border:1px solid var(--line);border-radius:var(--r);background:var(--surface);overflow:hidden;}',
      '.mp-tal-row{display:flex;align-items:center;gap:14px;padding:10px 16px;border-bottom:1px solid var(--line-2);font-size:12px;flex-wrap:wrap;}',
      '.mp-tal-row:last-child{border-bottom:none;}',
      '.mp-tal-row .nm{flex:0 0 168px;color:var(--ink);font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}',
      '.mp-tal-row .lp{flex:0 0 96px;font-variant-numeric:tabular-nums;color:var(--ink-3);font-size:11px;}',
      '.mp-tal-row .tb{flex:1 1 220px;min-width:160px;}',
      '.mp-tal-row .tg{flex:0 0 210px;font-size:10.5px;color:var(--ink-4);text-align:right;}',
      '.mp-tal .t-a{background:var(--accent);} .mp-tal .t-b{background:var(--line-3);}',
      '.mp-tal-row .tstack{display:inline-block;width:72px;vertical-align:middle;margin-right:8px;}',
      /* ================= LEARNING ================= */
      '.ml-lead{margin-top:26px;border-top:2px solid var(--ink);padding-top:22px;}',
      '.ml-lead .big{font-family:var(--serif);font-weight:500;color:var(--ink);font-size:clamp(22px,3vw,34px);line-height:1.4;letter-spacing:-.005em;max-width:900px;}',
      '.ml-lead .big em{font-style:normal;color:var(--accent-deep);}',
      '.ml-lead .arg{margin-top:16px;font-size:13px;line-height:1.9;color:var(--ink-3);max-width:820px;}',
      '.ml-lead .arg b{color:var(--ink-2);font-weight:600;}',
      '.ml-evi{display:inline-flex;align-items:center;gap:7px;font-size:10px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--accent-deep);border:1px solid var(--accent-line);background:var(--accent-wash);border-radius:2px;padding:3px 9px;}',
      '.ml-tb{width:100%;border-collapse:collapse;font-size:11.5px;margin-top:12px;min-width:520px;}',
      '.ml-tb th{text-align:left;font-weight:600;font-size:9.5px;letter-spacing:.1em;color:var(--ink-4);padding:8px 9px;border-bottom:1px solid var(--line);white-space:nowrap;}',
      '.ml-tb td{padding:7px 9px;border-bottom:1px solid var(--line-2);color:var(--ink-2);vertical-align:top;}',
      '.ml-tb td.num,.ml-tb th.num{text-align:right;font-variant-numeric:tabular-nums;}',
      '.ml-tb tr.ns td{color:var(--ink-4);}',
      '.ml-sig{display:inline-flex;align-items:center;gap:3px;font-size:10px;white-space:nowrap;}',
      '.ml-sig.y{color:var(--accent-deep);} .ml-sig.n{color:var(--ink-4);}',
      /* 哑铃 */
      '.ml-db{margin-top:16px;border:1px solid var(--line);border-radius:var(--r);background:var(--surface);overflow-x:auto;}',
      '.ml-db-row{display:flex;align-items:center;gap:12px;padding:11px 18px;border-bottom:1px solid var(--line-2);min-width:700px;}',
      '.ml-db-row:last-child{border-bottom:none;}',
      '.ml-db-row.top{background:var(--accent-wash);}',
      '.ml-db-row .dim{flex:0 0 176px;font-size:11.5px;color:var(--ink-2);}',
      '.ml-db-row .dim small{display:block;color:var(--ink-4);font-size:9.5px;letter-spacing:.06em;margin-top:2px;}',
      '.ml-db-track{flex:1 1 220px;position:relative;height:20px;min-width:170px;}',
      '.ml-db-track .ax{position:absolute;left:0;right:0;top:9px;height:1px;background:var(--line);}',
      '.ml-db-track .zero{position:absolute;top:1px;bottom:1px;width:1px;background:var(--line-3);}',
      '.ml-db-track .cn{position:absolute;top:9px;height:2px;background:var(--line-3);}',
      '.ml-db-track .pt{position:absolute;top:4px;width:11px;height:11px;border-radius:50%;margin-left:-5.5px;border:1px solid var(--surface);}',
      '.ml-db-track .pt.hi{background:var(--accent);} .ml-db-track .pt.lo{background:var(--ink-4);}',
      '.ml-db-row .vv{flex:0 0 66px;text-align:right;font-size:11.5px;font-variant-numeric:tabular-nums;}',
      '.ml-db-row .vv.hi{color:var(--accent-deep);font-weight:600;} .ml-db-row .vv.lo{color:var(--ink-3);}',
      '.ml-db-row .gp{flex:0 0 86px;text-align:right;font-size:12px;font-weight:600;font-variant-numeric:tabular-nums;}',
      '.ml-db-head{display:flex;align-items:center;gap:12px;padding:9px 18px;border-bottom:1px solid var(--line);font-size:9.5px;letter-spacing:.1em;color:var(--ink-4);min-width:700px;}',
      '.ml-db-head .dim{flex:0 0 176px;} .ml-db-head .sp{flex:1 1 220px;min-width:170px;}',
      '.ml-db-head .vv{flex:0 0 66px;text-align:right;} .ml-db-head .gp{flex:0 0 86px;text-align:right;}',
      /* 组名单 */
      '.ml-grp{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px;}',
      '.ml-gcard{border:1px solid var(--line);border-radius:var(--r);padding:16px 17px;background:var(--surface);}',
      '.ml-gcard.hi{border-color:var(--accent-line);}',
      '.ml-gcard .gh{display:flex;align-items:baseline;gap:8px;}',
      '.ml-gcard .gh .t{font-family:var(--serif);font-size:15px;font-weight:500;color:var(--ink);}',
      '.ml-gcard .gh .n{font-size:10.5px;color:var(--ink-4);}',
      '.ml-gcard .gv{font-family:var(--serif);font-size:26px;font-weight:500;margin-top:8px;letter-spacing:-.01em;}',
      '.ml-gcard .gl{font-size:10.5px;color:var(--ink-4);margin-top:3px;}',
      '.ml-gcard .nms{margin-top:12px;padding-top:11px;border-top:1px solid var(--line-2);font-size:11px;line-height:1.9;color:var(--ink-3);}',
      '.ml-gcard .nms em{font-style:normal;display:block;font-size:9.5px;letter-spacing:.08em;color:var(--ink-4);margin-bottom:4px;}',
      /* 切换效应 */
      '.ml-sw{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,260px),1fr));gap:16px;margin-top:18px;}',
      '.ml-swc{border:1px solid var(--line);border-radius:var(--r);background:var(--surface);padding:16px 17px;}',
      '.ml-swc.sig{border-color:var(--accent-line);}',
      '.ml-swc .sh{display:flex;align-items:center;gap:8px;}',
      '.ml-swc .sh .g{font-family:var(--serif);font-size:16px;font-weight:500;color:var(--ink);}',
      '.ml-swc .sh .st{margin-left:auto;}',
      '.ml-swb{margin-top:13px;}',
      '.ml-swb .r{display:flex;align-items:center;gap:8px;margin-top:8px;font-size:11px;}',
      '.ml-swb .r .lb{flex:0 0 92px;color:var(--ink-3);white-space:nowrap;}',
      '.ml-swb .r .tk{flex:1;height:8px;background:var(--paper-3);position:relative;border-radius:1px;overflow:hidden;}',
      '.ml-swb .r .tk i{position:absolute;left:0;top:0;bottom:0;display:block;}',
      '.ml-swb .r .vl{flex:0 0 64px;text-align:right;font-variant-numeric:tabular-nums;font-weight:600;}',
      '.ml-swc .sf{margin-top:12px;padding-top:10px;border-top:1px solid var(--line-2);font-size:10.5px;color:var(--ink-4);line-height:1.75;}',
      '.ml-swc .sf b{color:var(--ink-2);font-weight:600;}',
      '.ml-swc .small{color:var(--warn);}',
      /* 打法卡 */
      '.ml-pl{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,330px),1fr));gap:18px;margin-top:22px;}',
      '.ml-plc{border:1px solid var(--line);border-radius:var(--r);background:var(--surface);padding:20px 20px 18px;display:flex;flex-direction:column;gap:13px;}',
      '.ml-plc .no{font-family:var(--serif);font-size:11px;color:var(--ink-4);letter-spacing:.1em;}',
      '.ml-plc .cl{font-family:var(--serif);font-size:17.5px;font-weight:500;color:var(--ink);line-height:1.45;}',
      '.ml-plc .blk{border-top:1px solid var(--line-2);padding-top:11px;}',
      '.ml-plc .blk .k{font-size:9.5px;letter-spacing:.12em;color:var(--ink-4);font-weight:600;text-transform:uppercase;}',
      '.ml-plc .blk .t{font-size:12px;line-height:1.85;color:var(--ink-3);margin-top:5px;}',
      '.ml-plc .blk .t b{color:var(--ink-2);font-weight:600;font-variant-numeric:tabular-nums;}',
      '.ml-conf{display:inline-flex;align-items:center;gap:5px;border-radius:2px;padding:2px 8px;font-size:10px;font-weight:600;letter-spacing:.06em;border:1px solid var(--line);color:var(--ink-4);}',
      '.ml-conf.h{border-color:var(--accent-line);color:var(--accent-deep);background:var(--accent-wash);}',
      '.ml-conf.m{border-color:var(--line-3);color:var(--ink-3);}',
      '.ml-conf.l{border-color:var(--warn-line);color:var(--warn);background:var(--warn-wash);}',
      '.ml-lim{margin-top:22px;display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr));gap:16px;}',
      '.ml-limc{border:1px solid var(--warn-line);background:var(--warn-wash);border-radius:var(--r);padding:17px 18px;}',
      '.ml-limc .n{font-family:var(--serif);font-size:11px;color:var(--warn);letter-spacing:.1em;}',
      '.ml-limc .h{font-size:13px;font-weight:600;color:var(--ink);margin-top:6px;line-height:1.5;}',
      '.ml-limc .b{font-size:11.5px;line-height:1.85;color:var(--ink-2);margin-top:7px;}',
      /* ================= LEARNING · 动作与话术 ================= */
      '.lv-sel{border:1px solid var(--line);background:var(--surface);border-radius:var(--r-s);padding:7px 10px;font-size:12px;font-family:inherit;color:var(--ink-2);outline:none;max-width:260px;cursor:pointer;}',
      '.lv-sel:focus{border-color:var(--accent);box-shadow:0 0 0 2px var(--accent-wash);}',
      '.lv-soc{display:inline-flex;align-items:center;gap:4px;border:1px solid var(--warn-line);background:var(--warn-wash);color:var(--warn);border-radius:2px;padding:2px 7px;font-size:10px;line-height:1.5;white-space:nowrap;}',
      '.lv-soc .ms{font-size:12px;}',
      '.lv-nolink{font-size:11px;color:var(--ink-4);}',
      /* 观点卡 */
      '.sv-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,410px),1fr));gap:18px;margin-top:20px;align-items:start;}',
      '.sv-c{border:1px solid var(--line);background:var(--surface);border-radius:var(--r);padding:20px 20px 18px;display:flex;flex-direction:column;gap:13px;transition:border-color .3s;}',
      '.sv-c:hover{border-color:var(--line-3);}',
      '.sv-c.soc{border-left:2px solid var(--warn-line);}',
      '.sv-top{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}',
      '.sv-id{font-family:var(--serif);font-size:11px;letter-spacing:.12em;color:var(--ink-4);}',
      '.sv-view{font-family:var(--serif);font-size:19px;font-weight:500;color:var(--ink);line-height:1.5;margin:0;letter-spacing:-.005em;}',
      '.sv-blk{border-top:1px solid var(--line-2);padding-top:11px;}',
      '.sv-blk .k{font-size:9.5px;letter-spacing:.12em;font-weight:600;color:var(--ink-4);text-transform:uppercase;}',
      '.sv-brands{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;}',
      '.sv-say{list-style:none;margin:9px 0 0;padding:0;display:flex;flex-direction:column;gap:7px;}',
      '.sv-say li{background:var(--paper-2);border-left:2px solid var(--accent-line);border-radius:2px;padding:8px 11px;font-family:var(--serif);font-size:13.5px;line-height:1.7;color:var(--ink);}',
      '.sv-raw{margin-top:8px;font-size:10.5px;line-height:1.8;color:var(--ink-4);}',
      '.sv-src{display:flex;flex-direction:column;gap:5px;margin-top:8px;}',
      '.sv-src a{display:inline-flex;align-items:center;gap:5px;font-size:11px;color:var(--ink-3);text-decoration:none;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}',
      '.sv-src a .ms{font-size:13px;color:var(--ink-4);flex:0 0 auto;}',
      '.sv-src a:hover{color:var(--accent-deep);} .sv-src a:hover .ms{color:var(--accent-deep);}',
      /* 打法模板 */
      '.pb-list{display:flex;flex-direction:column;gap:18px;margin-top:22px;}',
      '.pb-c{border:1px solid var(--line);background:var(--surface);border-radius:var(--r);padding:22px 22px 20px;}',
      '.pb-h{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;}',
      '.pb-h .no{font-family:var(--serif);font-size:11px;letter-spacing:.12em;color:var(--ink-4);}',
      '.pb-h .lb{font-family:var(--serif);font-size:20px;font-weight:500;color:var(--ink);}',
      '.pb-sum{margin:10px 0 0;font-size:13px;line-height:1.85;color:var(--ink-2);max-width:920px;}',
      '.pb-body{display:grid;grid-template-columns:1.4fr 1fr;gap:22px;margin-top:16px;}',
      '.pb-k{font-size:9.5px;letter-spacing:.12em;font-weight:600;color:var(--ink-4);text-transform:uppercase;}',
      '.pb-steps{list-style:none;counter-reset:pbs;margin:8px 0 0;padding:0;}',
      '.pb-steps li{counter-increment:pbs;position:relative;padding:10px 0 10px 32px;border-top:1px solid var(--line-2);font-size:12.5px;line-height:1.85;color:var(--ink-2);}',
      '.pb-steps li:before{content:counter(pbs,decimal-leading-zero);position:absolute;left:0;top:10px;font-family:var(--serif);font-size:12px;color:var(--accent-deep);letter-spacing:.06em;}',
      '.pb-cases{list-style:none;margin:8px 0 0;padding:0;}',
      '.pb-cases li{padding:9px 0;border-top:1px solid var(--line-2);}',
      '.pb-cases .bd{display:flex;align-items:center;gap:7px;flex-wrap:wrap;}',
      '.pb-cases .bn{font-size:12px;font-weight:600;color:var(--ink);}',
      '.pb-cases .dt{font-size:10.5px;color:var(--ink-4);font-variant-numeric:tabular-nums;}',
      '.pb-cases .ti{margin-top:4px;}',
      '.pb-cases a{display:inline-flex;align-items:center;gap:5px;font-size:11.5px;line-height:1.7;color:var(--ink-3);text-decoration:none;}',
      '.pb-cases a .ms{font-size:13px;color:var(--ink-4);flex:0 0 auto;}',
      '.pb-cases a:hover{color:var(--accent-deep);}',
      '.pb-cav{margin-top:16px;display:flex;gap:9px;border:1px solid var(--warn-line);background:var(--warn-wash);border-radius:var(--r-s);padding:12px 14px;font-size:11.5px;line-height:1.8;color:var(--ink-2);}',
      '.pb-cav .ms{font-size:15px;color:var(--warn);flex:0 0 auto;}',
      '.pb-cav b{color:var(--warn);font-weight:600;}',
      /* 数据侧佐证折叠 */
      '.de-wrap{margin-top:20px;border:1px solid var(--line);border-radius:var(--r);background:var(--paper-2);}',
      '.de-wrap>summary{list-style:none;cursor:pointer;display:flex;align-items:center;gap:9px;padding:15px 18px;font-size:12.5px;color:var(--ink-2);}',
      '.de-wrap>summary::-webkit-details-marker{display:none;}',
      '.de-wrap>summary:hover{color:var(--ink);}',
      '.de-wrap>summary .ms{font-size:18px;color:var(--ink-4);transition:transform .2s;}',
      '.de-wrap[open]>summary .ms{transform:rotate(90deg);}',
      '.de-wrap>summary .tail{margin-left:auto;font-size:10.5px;color:var(--ink-4);text-align:right;}',
      '.de-body{padding:0 18px 20px;}',
      '.de-h{margin-top:20px;font-size:11px;font-weight:600;letter-spacing:.1em;color:var(--ink-3);}',
      '.de-body .mp-tw{margin-top:10px;background:var(--surface);}',
      '.de-body .ml-tb{min-width:560px;}',
      /* ---- 响应式 ---- */
      '@media(max-width:1024px){.mp-two{grid-template-columns:1fr;} .ml-grp{grid-template-columns:1fr;} .pb-body{grid-template-columns:1fr;gap:16px;}}',
      '@media(max-width:760px){.mp-sec{padding-top:40px;} .mp-sec.bd{margin-top:40px;}',
      ' .mp-tal-row .nm{flex:0 0 100%;} .mp-tal-row .tg{flex:1 1 100%;text-align:left;} .mp-tal-row .lp{flex:0 0 auto;}',
      ' .mp-cnt{margin-left:0;flex:1 1 100%;} .mp-search{flex:1 1 100%;}',
      ' .sv-grid{grid-template-columns:1fr;} .sv-view{font-size:17px;} .lv-sel{max-width:100%;flex:1 1 100%;}',
      ' .pb-c{padding:18px 16px 16px;} .de-wrap>summary .tail{display:none;}',
      ' .ml-lead .big{font-size:22px;} .mp-ml li .yy{display:none;}}'
    ].join('\n');
    document.head.appendChild(s);
  }

  /* ======================================================================
     TAB 1 · 玩法拆解
     ==================================================================== */
  function renderPlay(el) {
    injectCSS();
    if (!PB || !PB.brands || !PB.brands.length) {
      el.innerHTML = '<div class="wrap"><div class="mp-sec"><div class="mp-note">' +
        '<div class="mp-note-h"><span class="ms">error_outline</span>数据未就绪</div>' +
        '<p>未检测到 <code>window.PLAYBOOK</code> 数据，本 Tab 暂不可用。请确认 <code>playbook.js</code> 已正确加载。</p>' +
        '</div></div></div>';
      return;
    }
    var M = PB.meta || {};
    var brands = PB.brands.slice();
    var pool = brands.filter(function (b) { return isNum(b.ytd) && b.ytd >= 0.5; });
    var archs = (PB.archetypes || []).slice().sort(function (a, b) { return sortNum(a.yoy_med, b.yoy_med, -1); });

    var html = [];
    html.push('<div class="wrap">');

    /* ---------- 页头 ---------- */
    html.push('<div class="mp-sec">');
    html.push('<div class="mp-eyebrow">Playbook · 玩法拆解</div>');
    html.push('<h1 class="mp-h1">她们各自在用什么<br>把生意做出来</h1>');
    html.push('<p class="mp-sub">把每个品牌的 GMV 拆成 <b>自播 / 达播 / 短视频 / 商品卡</b> 四条渠道，' +
      '叠加<b>广告流量占比</b>与<b>千川 takerate</b>两个投放刻度，得到一张可逐品牌对照的「玩法指纹」。' +
      '本页只描述<span class="em">结构与迁移</span>；哪种迁移方向真的带来增长，见第 5 个 Tab「可复制 Learning」的统计检验。</p>');
    html.push('<div class="mp-chips">');
    html.push('<span class="mp-chip k"><span class="ms">group</span>名单内 ' + (M.brand_n || brands.length) + ' 个女性私处洗护品牌</span>');
    html.push('<span class="mp-chip"><span class="ms">event</span>业务期 ' + q(M.biz_start) + ' ~ ' + q(M.biz_end) + '</span>');
    html.push('<span class="mp-chip"><span class="ms">history</span>同期对比 ' + q(M.prev_start) + ' ~ ' + q(M.prev_end) + '</span>');
    html.push('<span class="mp-chip"><span class="ms">database</span>快照 p_date=' + q(M.p_date) + '</span>');
    html.push('<span class="mp-chip"><span class="ms">shield</span>抖音电商直客（品牌直营）口径</span>');
    html.push('</div>');
    html.push('</div>');

    /* ---------- §0 口径与判定规则 ---------- */
    html.push('<div class="mp-sec">');
    html.push('<div class="mp-note">');
    html.push('<div class="mp-note-h"><span class="ms">rule</span>渠道定义与玩法原型判定规则</div>');
    html.push('<p><b>四条渠道</b>来自数据集 5841790 的「电商体裁（经分定义）」字段，取值为 <code>自播</code>（品牌自营直播）、' +
      '<code>达播</code>（达人直播间）、<code>短视频</code>（含挂载短视频成交）、<code>商品卡</code>（货架/搜索/店铺等非内容场）。' +
      '每个品牌的四项占比之和为 100%（四舍五入后可能为 99.9%~100.1%）。</p>');
    html.push('<p><b>玩法原型判定</b>：把品牌自己的体裁占比，逐项除以下方「名单基准结构」的同体裁占比，得到<b>超配倍数</b>；' +
      '取超配倍数最高的那个体裁，若其倍数 <code>≥ 1.3</code> 则该品牌归为对应原型，否则归为<b>均衡多元型</b>。' +
      '例：某品牌达播占比 20.8%，基准 9.2%，超配 2.26 倍 → 达播驱动型。</p>');
    /* 基准结构条 */
    var cm = PB.cohort_mix || null;
    html.push('<div class="mp-base">');
    html.push('<div class="mp-base-row"><span class="mp-base-lab">名单基准结构 · ' + (M.brand_n || brands.length) + ' 品牌合计</span>' + stackBar(cm, { h: 12 }) + '</div>');
    if (cm) {
      html.push('<div class="mp-base-vals">');
      for (var gi = 0; gi < GENRES.length; gi++) {
        html.push('<span>' + q(GENRES[gi]) + '<b>' + fx(cm[GENRES[gi]]) + '%</b></span>');
      }
      html.push('</div>');
    }
    html.push(legendGenres('阈值 1.3 倍为经验值，非统计推导，改阈值会改变原型归属'));
    html.push('</div>');
    html.push('</div>');
    html.push('</div>');

    /* ---------- §1 原型总览 ---------- */
    html.push('<div class="mp-sec bd">');
    html.push('<div class="mp-eyebrow">01 · Archetypes</div>');
    html.push('<h2 class="mp-h2">四类玩法原型：增速最高的那一类，投放也最省</h2>');
    html.push('<p class="mp-sub">下列原型口径为<b>统计池 ' + (LN && LN.pool_n ? LN.pool_n : 59) + ' 个品牌</b>' +
      '（YTD ≥ 0.5 亿且有 2025 年同期基数），与下方 ' + brands.length + ' 品牌的指纹矩阵口径不同，请勿直接相加。按增速中位数从高到低排列。</p>');

    if (archs.length) {
      html.push('<div class="mp-arch-grid">');
      for (var ai = 0; ai < archs.length; ai++) {
        var a = archs[ai];
        var hi = ai === 0;
        html.push('<div class="mp-ac' + (hi ? ' hi' : '') + '">');
        html.push('<div class="mp-ac-top"><div><div class="mp-ac-name">' + q(a.arch) + '</div>' +
          '<div class="mp-ac-n">n = ' + a.n + ' 个品牌 · 合计 ' + fx(a.gmv, 2) + ' 亿</div></div>' +
          '<span class="mp-ac-rank">增速 No.' + (ai + 1) + '</span></div>');
        html.push('<div class="mp-ac-main"><span class="v" style="color:' +
          (isNum(a.yoy_med) && a.yoy_med >= 0 ? 'var(--pos)' : 'var(--neg)') + '">' +
          (pctTxt(a.yoy_med, 2) || '—') + '</span><span class="u">YTD 同比 · 中位数</span></div>');
        html.push('<div class="mp-ac-kv">');
        html.push('<div><div class="k">千川 takerate 中位</div><div class="v">' + fx(a.tr_med, 2) + '%</div></div>');
        html.push('<div><div class="k">广告流量占比 中位</div><div class="v">' + fx(a.ad_med, 2) + '%</div></div>');
        html.push('</div>');
        var bl = (a.brands || []).slice(0, 8);
        html.push('<div class="mp-ac-brands"><em>代表品牌（GMV 前 ' + bl.length + '）</em>' + q(bl.join(' · ')) + '</div>');
        html.push('</div>');
      }
      html.push('</div>');

      /* 反直觉发现 + 口径诚实说明 */
      var top = archs[0];
      var trMin = archs.slice().sort(function (x, y) { return sortNum(x.tr_med, y.tr_med, 1); })[0];
      html.push('<div class="mp-note" style="margin-top:20px">');
      html.push('<div class="mp-note-h"><span class="ms">lightbulb</span>反直觉发现</div>');
      html.push('<p><b>' + q(top.arch) + '</b>（n=' + top.n + '）同时拿下「增速中位数最高」' +
        '（<b>' + (pctTxt(top.yoy_med, 2) || '—') + '</b>）和「takerate 最低」（<b>' + fx(top.tr_med, 2) + '%</b>' +
        (trMin && trMin.arch === top.arch ? '，四型中最低' : '') + '）。' +
        '也就是说，这一类品牌<b>花在千川上的钱只占 GMV 的 ' + fx(top.tr_med, 2) + '%</b>，却跑出了最快的同比。' +
        '这与「加大投放换增长」的直觉相反 —— 但 n=' + top.n + ' 属于中小样本，且此处只是分组描述性统计，' +
        '<b>没有做组间显著性检验</b>，不能当作因果结论。相关的检验与反向因果讨论见 Tab 5。</p>');
      html.push('</div>');
    } else {
      html.push('<div class="mp-empty">原型汇总数据缺失。</div>');
    }

    /* 第 5 型的诚实交代 */
    var archCount = {};
    for (var bi = 0; bi < brands.length; bi++) {
      var k = brands[bi].arch || '未标注';
      archCount[k] = (archCount[k] || 0) + 1;
    }
    var listedArch = {};
    for (var li = 0; li < archs.length; li++) listedArch[archs[li].arch] = 1;
    var missing = [];
    for (var mk in archCount) {
      if (!listedArch[mk]) missing.push(mk + ' ' + archCount[mk] + ' 个');
    }
    html.push('<div class="mp-note wash" style="margin-top:16px">');
    html.push('<div class="mp-note-h"><span class="ms">fact_check</span>为什么这里只有 4 型，而规则定义了 5 型</div>');
    html.push('<p>判定规则可产出 5 类原型，但在 ' + brands.length + ' 个品牌里，各类实际分布为：');
    var distTxt = [];
    for (var dk in archCount) distTxt.push(q(dk) + ' <b>' + archCount[dk] + '</b>');
    html.push(distTxt.join(' · ') + '。');
    html.push('其中' + (missing.length ? '<b>' + q(missing.join('、')) + '</b>' : '部分类别') +
      '未出现在上方卡片中 —— 因为卡片只统计 YTD ≥ 0.5 亿且有同期基数的品牌池，' +
      '这些品牌规模过小或缺少 2025 年基数，<b>被排除在原型汇总之外，而不是不存在</b>。此处如实列出，避免造成「名单里没有自播主导型品牌」的误读。</p>');
    html.push('</div>');
    html.push('</div>');

    /* ---------- §2 玩法指纹矩阵 ---------- */
    var sectors = [];
    var seen = {};
    for (var si = 0; si < brands.length; si++) {
      var sc = brands[si].sector || '未分类';
      if (!seen[sc]) { seen[sc] = 1; sectors.push(sc); }
    }
    html.push('<div class="mp-sec bd">');
    html.push('<div class="mp-eyebrow">02 · Fingerprint Matrix</div>');
    html.push('<h2 class="mp-h2">玩法指纹矩阵 · ' + brands.length + ' 个品牌逐一对照</h2>');
    html.push('<p class="mp-sub">每一行是一个品牌的四体裁占比。可按赛道筛选、按任意列排序、按名称搜索。' +
      '带 <span class="mp-warn-ic"><span class="ms">warning</span></span> 的品牌存在口径提示，鼠标悬停可查看 —— ' +
      '这些品牌有一部分直客 GMV 来自本赛道之外（本页只统计赛道内 GMV），解读时需要额外说明。</p>');

    html.push('<div class="mp-tools">');
    html.push('<div class="mp-seg" id="mpSec"><button class="on" data-v="__all">全部赛道</button>');
    for (var sj = 0; sj < sectors.length; sj++) {
      html.push('<button data-v="' + q(sectors[sj]) + '">' + q(sectors[sj]) + '</button>');
    }
    html.push('</div>');
    html.push('<div class="mp-seg" id="mpPool"><button class="on" data-v="all">全部 ' + brands.length + '</button>' +
      '<button data-v="pool">统计池 ' + pool.length + '（YTD≥0.5亿）</button></div>');
    html.push('<div class="mp-search"><span class="ms">search</span><input id="mpQ" type="text" placeholder="搜索品牌名…"></div>');
    html.push('<div class="mp-cnt" id="mpCnt"></div>');
    html.push('</div>');

    html.push('<div class="mp-tw"><table class="mp-tb"><thead><tr>');
    html.push('<th class="s num" data-k="rank" style="width:52px">排名</th>');
    html.push('<th class="s" data-k="name">品牌</th>');
    html.push('<th class="s" data-k="sector">赛道</th>');
    html.push('<th class="s num" data-k="ytd">YTD 亿</th>');
    html.push('<th class="s num" data-k="yoy">同比</th>');
    html.push('<th class="s" data-k="arch">玩法原型</th>');
    html.push('<th style="min-width:200px">体裁结构 %<span class="mp-gsort" id="mpGS">' +
      '<b data-g="自播">自</b><b data-g="达播">达</b><b data-g="短视频">视</b><b data-g="商品卡">卡</b></span></th>');
    html.push('<th class="s num" data-k="adshare26">广告流量%</th>');
    html.push('<th class="s num" data-k="tr26">takerate%</th>');
    html.push('</tr></thead><tbody id="mpBody"></tbody></table></div>');
    html.push(legendGenres('takerate = 千川消耗 / 支付GMV；广告流量% = 广告来源 GMV 占比。空值以「—」表示，不以 0 填充'));
    html.push('</div>');

    /* ---------- §3 玩法迁移 ---------- */
    html.push('<div class="mp-sec bd">');
    html.push('<div class="mp-eyebrow">03 · Migration ' + (M.prev_year || 2025) + ' → ' + (M.cur_year || 2026) + '</div>');
    html.push('<h2 class="mp-h2">玩法迁移方向图：谁在往达播走，谁在把货收回自播</h2>');
    html.push('<p class="mp-sub">横轴＝<b>达播占比同比变化（pp）</b>，纵轴＝<b>自播占比同比变化（pp）</b>，' +
      '气泡大小＝YTD 规模，颜色＝YTD 同比（绿=正 / 红=负 / 灰=无同期）。' +
      '<b>右下象限</b>＝往达播加码、同时降低自播依赖；<b>左上象限</b>＝把份额收回自播。' +
      '这两个方向的增速差异在 Tab 5 中经过了显著性检验。</p>');
    html.push('<div class="mp-tools" style="margin-top:16px">');
    html.push('<div class="mp-seg" id="mpMigScope"><button class="on" data-v="pool">统计池 ' + pool.length + '</button>' +
      '<button data-v="all">全部（含微规模品牌）</button></div>');
    html.push('<span class="mp-cnt" id="mpMigCnt"></span></div>');
    html.push('<div class="mp-cardwrap"><div class="mp-axhead">' +
      '<span>横轴 <b>达播占比同比变化 pp</b></span><span>纵轴 <b>自播占比同比变化 pp</b></span>' +
      '<span>气泡 <b>YTD 规模</b></span><span>颜色 <b>YTD 同比</b>（绿正 / 红负 / 灰无同期）</span></div>' +
      '<div class="mp-chart" id="mpMig" style="height:440px"></div>');
    html.push('<div class="mp-cap" id="mpMigCap"></div></div>');

    html.push('<div class="mp-two">');
    html.push('<div class="mp-mini"><div class="mp-mini-h"><span class="ms" style="color:var(--accent)">trending_up</span>达播加码 TOP10<span class="sub">占比变化 pp</span></div><ul class="mp-ml" id="mpTopDb"></ul></div>');
    html.push('<div class="mp-mini"><div class="mp-mini-h"><span class="ms" style="color:var(--ink-3)">undo</span>份额收回自播 TOP10<span class="sub">占比变化 pp</span></div><ul class="mp-ml" id="mpTopZb"></ul></div>');
    html.push('</div>');
    html.push('</div>');

    /* ---------- §4 投放依赖度象限 ---------- */
    html.push('<div class="mp-sec bd">');
    html.push('<div class="mp-eyebrow">04 · Ad Dependency</div>');
    html.push('<h2 class="mp-h2">投放依赖度象限：谁在用更少的钱换更快的增长</h2>');
    html.push('<p class="mp-sub">横轴＝<b>广告流量 GMV 占比</b>，纵轴＝<b>千川 takerate</b>（千川消耗 / 支付 GMV），' +
      '气泡＝YTD 规模，颜色＝YTD 同比。虚线为统计池中位数。<b>左下象限</b>＝低广告依赖 + 低投放强度，' +
      '若同时为绿色气泡，即「省钱且在增长」的理想区。</p>');
    html.push('<div class="mp-tools" style="margin-top:16px">');
    html.push('<div class="mp-seg" id="mpQuadScope"><button class="on" data-v="pool">统计池 ' + pool.length + '</button>' +
      '<button data-v="all">全部</button></div>');
    html.push('<span class="mp-cnt" id="mpQuadCnt"></span></div>');
    html.push('<div class="mp-cardwrap"><div class="mp-axhead">' +
      '<span>横轴 <b>广告流量 GMV 占比 %</b></span><span>纵轴 <b>千川 takerate %</b></span>' +
      '<span>气泡 <b>YTD 规模</b></span><span>颜色 <b>YTD 同比</b>（绿正 / 红负 / 灰无同期）</span>' +
      '<span>虚线 <b>统计池中位数</b></span></div>' +
      '<div class="mp-chart" id="mpQuad" style="height:460px"></div>');
    html.push('<div class="mp-cap" id="mpQuadCap"></div></div>');
    html.push('</div>');

    /* ---------- §5 达人策略 ---------- */
    var talBrands = brands.filter(function (b) { return isNum(b.livepct) && b.livepct >= 10 && b.talent && b.talent.length; })
      .sort(function (x, y) { return sortNum(x.livepct, y.livepct, -1); });
    var tagSet = {}, tagList = [];
    for (var ti = 0; ti < brands.length; ti++) {
      var tl = brands[ti].talent || [];
      for (var tj = 0; tj < tl.length; tj++) { if (!tagSet[tl[tj].tag]) { tagSet[tl[tj].tag] = 1; tagList.push(tl[tj].tag); } }
    }
    html.push('<div class="mp-sec bd">');
    html.push('<div class="mp-eyebrow">05 · Talent Mix</div>');
    html.push('<h2 class="mp-h2">达人策略：达播占比 ≥10% 的 ' + talBrands.length + ' 个品牌</h2>');
    html.push('<p class="mp-sub">按达播 GMV 占比从高到低排列，右侧为该品牌达播 GMV 的<b>达人标签构成</b>。' +
      '先看结论：<b>这个字段目前几乎没有区分度</b>，原因见下方数据质量提示。</p>');

    html.push('<div class="mp-warnbox" style="margin-top:18px">');
    html.push('<div class="mp-note-h"><span class="ms">report_problem</span>数据质量提示：达人标签字段区分度不足</div>');
    html.push('<p>当前数据集中「达人标签」只有 <b>' + q(tagList.join(' / ')) + '</b> ' + tagList.length + ' 个取值，' +
      '且几乎所有品牌都是 <b>纯达人 98%~100%</b>、未标记不足 2%。它<b>无法区分达人层级（头部/腰部/尾部）、达人类型（垂类/泛娱乐）或机构属性</b>。' +
      '因此本区块只如实呈现字段现状，<b>不从中推导任何达人选品/分层策略结论</b>。若要做达人策略拆解，需要在数据层补充星图达人分层字段后重做。</p>');
    html.push('</div>');

    if (talBrands.length) {
      var lpMax = 0;
      for (var lm0 = 0; lm0 < talBrands.length; lm0++) lpMax = Math.max(lpMax, talBrands[lm0].livepct);
      html.push('<div class="mp-tal">');
      for (var tb = 0; tb < talBrands.length; tb++) {
        var B = talBrands[tb];
        html.push('<div class="mp-tal-row">');
        html.push('<span class="nm">' + q(B.name) + (B.warn ? ' <span class="mp-warn-ic" data-tip="' + q(B.warn) + '"><span class="ms">warning</span></span>' : '') + '</span>');
        html.push('<span class="lp">达播 ' + fx(B.livepct) + '%</span>');
        /* 主视觉用「达播 GMV 占比」（有区分度），达人标签构成用右侧细条 + 原值文字如实呈现 */
        html.push('<span class="tb"><span class="mp-stack" style="height:9px"><i class="g-db" style="width:' +
          (lpMax > 0 ? (B.livepct / lpMax * 100).toFixed(2) : '0') + '%"></i></span></span>');
        var tt = B.talent || [];
        html.push('<span class="tg"><span class="tstack"><span class="mp-stack" style="height:5px">');
        for (var tk = 0; tk < tt.length; tk++) {
          var w = isNum(tt[tk].pct) ? tt[tk].pct : 0;
          if (w <= 0) continue;
          html.push('<i class="' + (tk === 0 ? 't-a' : 't-b') + '" style="width:' + w.toFixed(2) + '%"></i>');
        }
        html.push('</span></span>');
        var tgs = [];
        for (var tq = 0; tq < tt.length; tq++) tgs.push(q(tt[tq].tag) + ' ' + fx(tt[tq].pct, 2) + '%');
        html.push(tgs.join(' · ') + '</span>');
        html.push('</div>');
      }
      html.push('</div>');
      html.push('<div class="mp-legend"><span class="mp-lg"><i class="g-db"></i>达播 GMV 占比（相对本区块最大值 ' + fx(lpMax) + '% 归一）</span>' +
        '<span class="mp-lg"><i style="background:var(--accent)"></i>纯达人</span>' +
        '<span class="mp-lg"><i style="background:var(--line-3)"></i>未标记</span></div>');
      html.push('<div class="mp-cap">达播占比 &lt;10% 的品牌未列出（达播体量过小时，标签构成的抽样噪声过大）。' +
        '名单内共 ' + brands.filter(function (b) { return !b.talent || !b.talent.length; }).length + ' 个品牌没有任何达播达人标签数据。</div>');
    } else {
      html.push('<div class="mp-empty">没有达播占比 ≥10% 且带达人标签的品牌。</div>');
    }
    html.push('</div>');

    /* ---------- 脚注 ---------- */
    html.push('<div class="mp-foot">');
    html.push('<b>口径</b>：' + q(M.caliber || '') + '<br>');
    html.push('<b>聚合表述</b>：本页所有合计数均为「名单内 ' + (M.brand_n || brands.length) + ' 个女性私处洗护品牌合计（赛道内 GMV）」，' +
      '不代表抖音电商任何层级的行业规模或市场规模，请勿外推。<br>');
    html.push('<b>缺失处理</b>：同比无同期基数一律显示「新增 · 无同期」，不以 0% 代替；体裁/投放字段缺失显示「—」。' +
      '页面生成于 ' + q(M.generated_at || '') + '。');
    html.push('</div>');

    html.push('</div>');  /* /wrap */
    el.innerHTML = html.join('');

    /* ================= 交互：指纹矩阵 ================= */
    var state = { sector: '__all', pool: 'all', qs: '', k: 'rank', dir: 1, g: null };
    var body = el.querySelector('#mpBody');
    var cnt = el.querySelector('#mpCnt');

    function rowsOf() {
      var out = [];
      for (var i = 0; i < brands.length; i++) {
        var b = brands[i];
        if (state.sector !== '__all' && (b.sector || '未分类') !== state.sector) continue;
        if (state.pool === 'pool' && !(isNum(b.ytd) && b.ytd >= 0.5)) continue;
        if (state.qs) {
          var nm = ((b.name || '') + ' ' + (b.b || '')).toLowerCase();
          if (nm.indexOf(state.qs) < 0) continue;
        }
        out.push(b);
      }
      var k = state.k, d = state.dir;
      out.sort(function (x, y) {
        if (k === '__genre') {
          var gv1 = x.mix26 ? x.mix26[state.g] : null, gv2 = y.mix26 ? y.mix26[state.g] : null;
          return sortNum(gv1, gv2, d);
        }
        if (k === 'name' || k === 'sector' || k === 'arch') {
          var s1 = String(x[k] || ''), s2 = String(y[k] || '');
          return d > 0 ? s1.localeCompare(s2, 'zh') : s2.localeCompare(s1, 'zh');
        }
        return sortNum(x[k], y[k], d);
      });
      return out;
    }

    function drawTable() {
      var rows = rowsOf();
      if (!rows.length) {
        body.innerHTML = '<tr><td colspan="9"><div class="mp-empty">没有符合条件的品牌。</div></td></tr>';
        cnt.innerHTML = '<b>0</b> / ' + brands.length + ' 个品牌';
        return;
      }
      var h = [];
      for (var i = 0; i < rows.length; i++) {
        var b = rows[i];
        h.push('<tr>');
        h.push('<td class="num"><span class="rk">' + (isNum(b.rank) ? b.rank : '—') + '</span></td>');
        h.push('<td><span class="bn">' + q(b.name) +
          (b.warn ? '<span class="mp-warn-ic" data-tip="' + q(b.warn) + '"><span class="ms">warning</span></span>' : '') +
          '</span></td>');
        h.push('<td><span class="sec">' + q(b.sector || '未分类') + '</span></td>');
        h.push('<td class="num">' + (isNum(b.ytd) ? '<span class="mp-num">' + fx(b.ytd, 2) + '</span>' : '—') + '</td>');
        h.push('<td class="num">' + yoyHTML(b.yoy) + '</td>');
        var atag = b.arch || '—';
        var isMul = atag === '均衡多元型' || atag === '数据不足';
        h.push('<td><span class="mp-tag ' + (isMul ? 'mut' : 'acc') + '">' + q(atag) +
          (isNum(b.archr) && b.archg ? ' ' + b.archr.toFixed(2) + '×' : '') + '</span></td>');
        h.push('<td class="mixcell">' + stackBar(b.mix26, { h: 9 }));
        if (b.mix26) {
          h.push('<div class="mixnums">');
          for (var gz = 0; gz < GENRES.length; gz++) {
            h.push('<span>' + q(GENRES[gz].charAt(0)) + ' ' + fx(b.mix26[GENRES[gz]]) + '</span>');
          }
          h.push('</div>');
        }
        h.push('</td>');
        h.push('<td class="num">' + (isNum(b.adshare26) ? fx(b.adshare26, 1) : '—') + '</td>');
        h.push('<td class="num">' + (isNum(b.tr26) ? fx(b.tr26, 2) : '—') + '</td>');
        h.push('</tr>');
      }
      body.innerHTML = h.join('');
      cnt.innerHTML = '<b>' + rows.length + '</b> / ' + brands.length + ' 个品牌';
    }

    function markSort() {
      var ths = el.querySelectorAll('.mp-tb th.s');
      for (var i = 0; i < ths.length; i++) {
        var kk = ths[i].getAttribute('data-k');
        var lab = ths[i].getAttribute('data-lab');
        if (!lab) { lab = ths[i].innerHTML; ths[i].setAttribute('data-lab', lab); }
        ths[i].innerHTML = lab + (state.k === kk ? '<span class="ar">' + (state.dir > 0 ? '▲' : '▼') + '</span>' : '');
      }
      var gb = el.querySelectorAll('#mpGS b');
      for (var j = 0; j < gb.length; j++) {
        var on = state.k === '__genre' && state.g === gb[j].getAttribute('data-g');
        gb[j].className = on ? 'on' : '';
      }
    }

    var thAll = el.querySelectorAll('.mp-tb th.s');
    for (var t1 = 0; t1 < thAll.length; t1++) {
      (function (th) {
        th.addEventListener('click', function () {
          var kk = th.getAttribute('data-k');
          if (state.k === kk) state.dir = -state.dir;
          else { state.k = kk; state.dir = (kk === 'rank' || kk === 'name' || kk === 'sector' || kk === 'arch') ? 1 : -1; }
          markSort(); drawTable();
        });
      })(thAll[t1]);
    }
    var gbtn = el.querySelectorAll('#mpGS b');
    for (var t2 = 0; t2 < gbtn.length; t2++) {
      (function (bt) {
        bt.addEventListener('click', function (e) {
          e.stopPropagation();
          var g = bt.getAttribute('data-g');
          if (state.k === '__genre' && state.g === g) state.dir = -state.dir;
          else { state.k = '__genre'; state.g = g; state.dir = -1; }
          markSort(); drawTable();
        });
      })(gbtn[t2]);
    }
    function segBind(id, fn) {
      var wrap2 = el.querySelector(id);
      if (!wrap2) return;
      wrap2.addEventListener('click', function (e) {
        var b = e.target;
        while (b && b !== wrap2 && b.tagName !== 'BUTTON') b = b.parentNode;
        if (!b || b === wrap2) return;
        var bs2 = wrap2.querySelectorAll('button');
        for (var i = 0; i < bs2.length; i++) bs2[i].className = '';
        b.className = 'on';
        fn(b.getAttribute('data-v'));
      });
    }
    segBind('#mpSec', function (v) { state.sector = v; drawTable(); });
    segBind('#mpPool', function (v) { state.pool = v; drawTable(); });
    var qbox = el.querySelector('#mpQ');
    if (qbox) {
      qbox.addEventListener('input', function () { state.qs = String(qbox.value || '').toLowerCase().trim(); drawTable(); });
    }
    markSort();
    drawTable();
    bindWarnTips(el);

    /* ================= 迁移散点 ================= */
    var migScope = 'pool';
    function migData() {
      var src = migScope === 'pool' ? pool : brands;
      return src.filter(function (b) { return b.shift && isNum(b.shift['达播']) && isNum(b.shift['自播']); });
    }
    function sizeOf(ytd, maxY) {
      if (!isNum(ytd) || ytd <= 0) return 6;
      var r = Math.sqrt(ytd / (maxY || 1));
      return 7 + r * 27;
    }
    function drawMig() {
      var t = T();
      var ds = migData();
      var maxY = 0;
      for (var i = 0; i < ds.length; i++) if (isNum(ds[i].ytd) && ds[i].ytd > maxY) maxY = ds[i].ytd;
      var pts = ds.map(function (b) {
        return {
          value: [b.shift['达播'], b.shift['自播'], isNum(b.ytd) ? b.ytd : 0],
          name: b.name,
          _b: b,
          symbolSize: sizeOf(b.ytd, maxY),
          itemStyle: {
            color: yoyColor(b.yoy, t),
            opacity: isNum(b.yoy) ? 0.62 : 0.4,
            borderColor: yoyColor(b.yoy, t), borderWidth: 1
          }
        };
      });
      var dom = el.querySelector('#mpMig');
      if (EC.play.mig) { try { EC.play.mig.dispose(); } catch (e0) { } EC.play.mig = null; }
      mkChart('play', 'mig', dom, {
        animation: false,
        grid: baseGrid(52, 34, 26, 30),
        tooltip: Object.assign({
          trigger: 'item',
          formatter: function (p) {
            var b = p.data._b;
            var s = '<div style="font-family:' + t.serif + ';font-size:13px;color:' + t.ink + ';margin-bottom:5px">' + q(b.name) + '</div>';
            s += '<div style="font-size:11px;color:' + t.ink3 + ';line-height:1.8">';
            s += (b.sector || '') + ' · YTD ' + fx(b.ytd, 2) + ' 亿 · 同比 ' + (pctTxt(b.yoy) || '新增·无同期') + '<br>';
            for (var gi2 = 0; gi2 < GENRES.length; gi2++) {
              var g2 = GENRES[gi2];
              s += g2 + '：' + fx(b.mix26 ? b.mix26[g2] : null) + '%（' + (ppTxt(b.shift[g2]) || '—') + '）<br>';
            }
            s += '原型：' + (b.arch || '—') + '</div>';
            return s;
          }
        }, tipBase(t)),
        xAxis: {
          type: 'value',
          axisLine: { lineStyle: { color: t.line } }, axisTick: { show: false },
          axisLabel: { color: t.ink4, fontSize: 10 },
          splitLine: { lineStyle: { color: t.line, type: 'dotted' } }
        },
        yAxis: {
          type: 'value',
          axisLine: { lineStyle: { color: t.line } }, axisTick: { show: false },
          axisLabel: { color: t.ink4, fontSize: 10 },
          splitLine: { lineStyle: { color: t.line, type: 'dotted' } }
        },
        series: [{
          type: 'scatter', data: pts,
          emphasis: { itemStyle: { opacity: 0.95 }, label: { show: true, formatter: function (p) { return p.data.name; }, color: t.ink, fontSize: 11 } },
          markLine: {
            silent: true, symbol: 'none',
            lineStyle: { color: t.line3, type: 'solid', width: 1 },
            label: { show: false },
            data: [{ xAxis: 0 }, { yAxis: 0 }]
          }
        }]
      });
      var cap = el.querySelector('#mpMigCap');
      var scopeN = (migScope === 'pool' ? pool.length : brands.length);
      if (cap) {
        cap.innerHTML = '当前口径共 ' + scopeN + ' 个品牌，其中 <b>' + ds.length + '</b> 个有 ' + (M.prev_year || 2025) + '/' + (M.cur_year || 2026) +
          ' 两期体裁结构可比，' + (scopeN - ds.length) + ' 个因缺少同期体裁数据未入图。' +
          (migScope === 'all'
            ? '<b style="color:var(--warn)">当前含微规模品牌</b>：YTD 不足 0.5 亿的品牌，其占比变化会出现 ±60pp 以上的极端值（分母极小所致），会明显拉伸坐标轴，解读时请以气泡大小判断权重。'
            : '当前仅显示统计池（YTD≥0.5 亿），与 Tab 5 的检验口径一致。');
      }
      var mc = el.querySelector('#mpMigCnt');
      if (mc) mc.innerHTML = '<b>' + ds.length + '</b> / ' + scopeN + ' 个品牌在图内';
    }
    segBind('#mpMigScope', function (v) { migScope = v; drawMig(); });

    /* 迁移 TOP 列表 */
    function drawTopList(id, genre, dir) {
      var ul = el.querySelector(id);
      if (!ul) return;
      var src = pool.filter(function (b) { return b.shift && isNum(b.shift[genre]); });
      src.sort(function (x, y) { return sortNum(x.shift[genre], y.shift[genre], dir); });
      var top10 = src.slice(0, 10);
      var mx = 0;
      for (var i = 0; i < top10.length; i++) mx = Math.max(mx, Math.abs(top10[i].shift[genre]));
      var h = [];
      for (var j = 0; j < top10.length; j++) {
        var b = top10[j];
        var v = b.shift[genre];
        var w = mx > 0 ? Math.abs(v) / mx * 100 : 0;
        var col = dir > 0 ? 'var(--ink-3)' : 'var(--accent)';
        h.push('<li><span class="nm">' + q(b.name) + '</span>' +
          '<span class="bar"><i style="width:' + w.toFixed(1) + '%;background:' + col + '"></i></span>' +
          '<span class="vv">' + (ppTxt(v) || '—') + '</span>' +
          '<span class="yy">' + yoyHTML(b.yoy) + '</span></li>');
      }
      if (!h.length) h.push('<li><span class="nm" style="color:var(--ink-4)">无数据</span></li>');
      ul.innerHTML = h.join('');
    }
    drawTopList('#mpTopDb', '达播', -1);
    drawTopList('#mpTopZb', '自播', -1);

    /* ================= 投放象限 ================= */
    var quadScope = 'pool';
    function drawQuad() {
      var t = T();
      var src = quadScope === 'pool' ? pool : brands;
      var ds = src.filter(function (b) { return isNum(b.adshare26) && isNum(b.tr26); });
      var maxY = 0;
      for (var i = 0; i < ds.length; i++) if (isNum(ds[i].ytd) && ds[i].ytd > maxY) maxY = ds[i].ytd;
      var adMed = median(ds.map(function (b) { return b.adshare26; }));
      var trMed = median(ds.map(function (b) { return b.tr26; }));
      var pts = ds.map(function (b) {
        return {
          value: [b.adshare26, b.tr26, isNum(b.ytd) ? b.ytd : 0], name: b.name, _b: b,
          symbolSize: sizeOf(b.ytd, maxY),
          itemStyle: { color: yoyColor(b.yoy, t), opacity: isNum(b.yoy) ? 0.62 : 0.4, borderColor: yoyColor(b.yoy, t), borderWidth: 1 }
        };
      });
      var dom = el.querySelector('#mpQuad');
      if (EC.play.quad) { try { EC.play.quad.dispose(); } catch (e1) { } EC.play.quad = null; }
      mkChart('play', 'quad', dom, {
        animation: false,
        grid: baseGrid(50, 30, 34, 30),
        tooltip: Object.assign({
          trigger: 'item',
          formatter: function (p) {
            var b = p.data._b;
            var s = '<div style="font-family:' + t.serif + ';font-size:13px;color:' + t.ink + ';margin-bottom:5px">' + q(b.name) + '</div>';
            s += '<div style="font-size:11px;color:' + t.ink3 + ';line-height:1.8">';
            s += '广告流量占比 ' + fx(b.adshare26, 2) + '%（' + (M.prev_year || 2025) + ' 年 ' + fx(b.adshare25, 2) + '%）<br>';
            s += '千川 takerate ' + fx(b.tr26, 2) + '%（' + (M.prev_year || 2025) + ' 年 ' + fx(b.tr25, 2) + '%）<br>';
            s += 'YTD ' + fx(b.ytd, 2) + ' 亿 · 同比 ' + (pctTxt(b.yoy) || '新增·无同期') + '<br>';
            s += '原型：' + (b.arch || '—') + '</div>';
            return s;
          }
        }, tipBase(t)),
        xAxis: {
          type: 'value', min: 0,
          axisLine: { lineStyle: { color: t.line } }, axisTick: { show: false },
          axisLabel: { color: t.ink4, fontSize: 10 },
          splitLine: { lineStyle: { color: t.line, type: 'dotted' } }
        },
        yAxis: {
          type: 'value', min: 0,
          axisLine: { lineStyle: { color: t.line } }, axisTick: { show: false },
          axisLabel: { color: t.ink4, fontSize: 10 },
          splitLine: { lineStyle: { color: t.line, type: 'dotted' } }
        },
        series: [{
          type: 'scatter', data: pts,
          emphasis: { itemStyle: { opacity: 0.95 }, label: { show: true, formatter: function (p) { return p.data.name; }, color: t.ink, fontSize: 11 } },
          markArea: {
            silent: true,
            itemStyle: { color: t.accentWash },
            label: { show: true, position: 'insideBottomLeft', color: t.accent, fontSize: 10, offset: [6, -6], formatter: '低投放区（双低于中位）' },
            data: [[{ xAxis: 0, yAxis: 0 }, { xAxis: adMed, yAxis: trMed }]]
          },
          markLine: {
            silent: true, symbol: 'none',
            lineStyle: { color: t.line3, type: 'dashed', width: 1 },
            label: { color: t.ink4, fontSize: 10, formatter: function (p) { return p.name; } },
            data: [
              { xAxis: adMed, name: '广告占比中位 ' + fx(adMed, 1) + '%', label: { position: 'insideEndTop' } },
              { yAxis: trMed, name: 'takerate 中位 ' + fx(trMed, 2) + '%', label: { position: 'insideStartTop' } }
            ]
          }
        }]
      });
      var lowGood = ds.filter(function (b) {
        return b.adshare26 < adMed && b.tr26 < trMed && isNum(b.yoy) && b.yoy > 0;
      }).sort(function (x, y) { return sortNum(x.ytd, y.ytd, -1); });
      var cap = el.querySelector('#mpQuadCap');
      if (cap) {
        cap.innerHTML = '左下「低投放区」中同比为正的品牌共 <b>' + lowGood.length + '</b> 个：' +
          q(lowGood.slice(0, 12).map(function (b) { return b.name; }).join(' · ')) +
          (lowGood.length > 12 ? ' 等' : '') + '。' +
          '<br>takerate 为千川消耗 / 支付 GMV，可能 &gt;100%（投放期或极小分母），本图不做截断。' +
          (quadScope === 'all' ? '<b style="color:var(--warn)">当前含全部品牌，微规模品牌 takerate 可达 150%+，会压缩其余点位。</b>' : '') +
          '<br><b>注意</b>：象限位置只是描述性分布，不代表因果 —— 高 takerate 也可能是「增长失速后加投救场」的结果，详见 Tab 5 的反向因果说明。';
      }
      var qc = el.querySelector('#mpQuadCnt');
      if (qc) qc.innerHTML = '<b>' + ds.length + '</b> / ' + src.length + ' 个品牌在图内（缺投放字段的 ' + (src.length - ds.length) + ' 个不入图）';
    }
    segBind('#mpQuadScope', function (v) { quadScope = v; drawQuad(); });

    drawMig();
    drawQuad();
  }

  /* ======================================================================
     TAB 2 · 可复制 Learning
     ----------------------------------------------------------------------
     自上而下四段：
       ① 页头 —— 这一页是「别人已经在做、可以直接照抄」的做法与话术
       ② 主区块一 · 女性向种草观点   LEARNING.seeding_views（全渲染）
       ③ 主区块二 · 四类动作打法模板 LEARNING.playbooks（4 个）
       ④ 主区块三 · 数据侧佐证（旧口径） LEARNING.data_evidence（默认折叠）
     所有文案只渲染 learning.js 里已有的字段，不改写、不补写、不做二次归纳。
     ==================================================================== */
  var LV_CONF_TXT = { high: '高', medium: '中', low: '低' };
  var LV_CONF_CLS = { high: 'h', medium: 'm', low: 'l' };

  /* 置信度徽章：confidence_basis 作为悬浮 tooltip（bindWarnTips 统一接管） */
  function lvConf(conf, basis, prefix) {
    var cls = LV_CONF_CLS[conf] || 'm';
    var txt = LV_CONF_TXT[conf] || String(conf || '—');
    return '<span class="ml-conf ' + cls + '"' + (basis ? ' data-tip="' + q(basis) + '"' : '') +
      '>' + (prefix || '证据置信度') + ' ' + txt + '</span>';
  }
  /* 信源链接：无 url 时如实标注，不伪造链接 */
  function lvLink(title, url) {
    var t2 = q(title || url || '未命名信源');
    if (!url) return '<span class="lv-nolink">' + t2 + ' · 无公开链接</span>';
    return '<a href="' + q(url) + '" target="_blank" rel="noopener noreferrer">' +
      '<span class="ms">open_in_new</span>' + t2 + '</a>';
  }
  function lvP(p) {
    if (!isNum(p)) return '—';
    return p < 0.001 ? 'p&lt;0.001' : 'p=' + p.toFixed(4);
  }
  function lvSig(sig) {
    return sig ? '<span class="ml-sig y">显著 p&lt;0.05</span>' : '<span class="ml-sig n">不显著</span>';
  }

  function renderLearn(el) {
    injectCSS();
    var SV = (LN && LN.seeding_views) ? LN.seeding_views.slice() : [];
    var PBS = (LN && LN.playbooks) ? LN.playbooks.slice() : [];
    var DE = (LN && LN.data_evidence) ? LN.data_evidence : null;
    if (!LN || !SV.length) {
      el.innerHTML = '<div class="wrap"><div class="mp-sec"><div class="mp-note">' +
        '<div class="mp-note-h"><span class="ms">error_outline</span>数据未就绪</div>' +
        '<p>未检测到 <code>window.LEARNING.seeding_views</code> 数据，本 Tab 暂不可用。请确认 <code>learning.js</code> 已正确加载。</p>' +
        '</div></div></div>';
      return;
    }
    var M = LN.meta || {};
    var socN = 0, i, j;
    for (i = 0; i < SV.length; i++) if (SV[i].social_only) socN++;

    /* 品牌下拉：按出现次数降序，其次按名称 */
    var bCnt = {};
    for (i = 0; i < SV.length; i++) {
      var bs = SV[i].brands || [];
      for (j = 0; j < bs.length; j++) bCnt[bs[j]] = (bCnt[bs[j]] || 0) + 1;
    }
    var bList = Object.keys(bCnt).sort(function (a, b) {
      return bCnt[b] - bCnt[a] || (a < b ? -1 : 1);
    });

    var h = [];
    h.push('<div class="wrap">');

    /* ---------------------------------------------------------- ① 页头 */
    h.push('<div class="mp-sec">');
    h.push('<div class="mp-eyebrow">Learning · 照抄清单</div>');
    h.push('<h1 class="mp-h1">别人已经在做的事：<br>可以直接照抄的做法与话术</h1>');
    h.push('<p class="mp-sub">这一页只回答一件事 —— <b>品牌具体做了什么、在种草里对她讲了什么话</b>：' +
      '上半页是 <b>' + SV.length + ' 条女性向种草观点</b>（谁在讲、原话怎么说、信源在哪），' +
      '下半页是 <b>' + PBS.length + ' 个动作打法模板</b>（明星营销 / 达人进播 / 新货组 / 种草观点，按步骤照着做）。' +
      '统计相关性结论已降级收进页尾折叠区，它<b>不能替代具体动作</b>。</p>');
    h.push('<div class="mp-chips">');
    h.push('<span class="mp-chip k"><span class="ms">event</span>数据窗口 ' + q(LN.window || '') + '</span>');
    h.push('<span class="mp-chip"><span class="ms">travel_explore</span>信源性质：公开信息检索（每条附可点链接）</span>');
    h.push('<span class="mp-chip"><span class="ms">format_quote</span>种草观点 ' + SV.length + ' 条 · 其中仅见社媒 ' + socN + ' 条</span>');
    h.push('<span class="mp-chip"><span class="ms">list_alt</span>打法模板 ' + PBS.length + ' 类</span>');
    h.push('<span class="mp-chip"><span class="ms">update</span>生成于 ' + q(LN.generated_at || '') + '</span>');
    h.push('</div>');
    h.push('<div class="mp-note wash" style="margin-top:22px">' +
      '<div class="mp-note-h"><span class="ms">source</span>来源与边界</div>' +
      '<p><b>来源</b>：' + q(LN.source || '') + '。所有观点与案例均来自<b>公开信息检索</b>，不是站内数据统计结果，' +
      '页面只做展示、不做改写。</p>' +
      '<p><b>读法</b>：观点与话术可直接照抄进 brief；带「仅见社媒讨论」标记的条目<b>不是品牌官方口径</b>，' +
      '引用前请自行核实。</p>' +
      '</div>');
    h.push('</div>');

    /* -------------------------------------------- ② 主区块一 · 种草观点 */
    h.push('<div class="mp-sec bd">');
    h.push('<div class="mp-sechead"><div>');
    h.push('<div class="mp-eyebrow">Section 01 · 种草观点</div>');
    h.push('<h2 class="mp-h2">女性向种草观点 · ' + SV.length + ' 条：她们对女性讲了什么新说法</h2>');
    h.push('</div></div>');
    h.push('<p class="mp-sub">' + q(LN.seeding_views_note || '') + '</p>');

    /* 工具条：搜索 + 品牌筛选 + 信源性质 */
    h.push('<div class="mp-tools">');
    h.push('<div class="mp-search"><span class="ms">search</span>' +
      '<input id="lvQ" type="search" placeholder="搜观点 / 话术 / 品牌" autocomplete="off"></div>');
    h.push('<select id="lvBrand" class="lv-sel"><option value="">全部品牌（' + bList.length + '）</option>');
    for (i = 0; i < bList.length; i++) {
      h.push('<option value="' + q(bList[i]) + '">' + q(bList[i]) + '（' + bCnt[bList[i]] + '）</option>');
    }
    h.push('</select>');
    h.push('<div class="mp-seg" id="lvSoc">' +
      '<button class="on" data-soc="all">全部 ' + SV.length + '</button>' +
      '<button data-soc="off">非社媒来源 ' + (SV.length - socN) + '</button>' +
      '<button data-soc="on">仅见社媒 ' + socN + '</button></div>');
    h.push('<div class="mp-cnt">显示 <b id="lvCnt">' + SV.length + '</b> / ' + SV.length + ' 条</div>');
    h.push('</div>');

    h.push('<div class="sv-grid" id="lvGrid">');
    for (i = 0; i < SV.length; i++) {
      var V = SV[i];
      var vb = V.brands || [], vp = V.phrasing || [], ve = V.evidence || [];
      var key = [V.id, V.view, vb.join(' '), vp.join(' '), V.brands_raw, V.phrasing_raw].join(' ').toLowerCase();
      h.push('<article class="sv-c' + (V.social_only ? ' soc' : '') + '" data-sv="' + q(V.id) + '"' +
        ' data-soc="' + (V.social_only ? '1' : '0') + '"' +
        ' data-brands="' + q('|' + vb.join('|') + '|') + '"' +
        ' data-key="' + q(key) + '">');
      h.push('<div class="sv-top"><span class="sv-id">' + q(V.id) + '</span>' +
        lvConf(V.confidence, V.confidence_basis) +
        (V.social_only ? '<span class="lv-soc"><span class="ms">forum</span>仅见社媒讨论，未见官方口径</span>' : '') +
        '</div>');
      h.push('<h3 class="sv-view">' + q(V.view) + '</h3>');

      h.push('<div class="sv-blk"><div class="k">谁在讲</div>');
      h.push('<div class="sv-brands"' + (V.brands_raw ? ' data-tip="原文：' + q(V.brands_raw) + '"' : '') + '>');
      for (j = 0; j < vb.length; j++) h.push('<span class="mp-tag">' + q(vb[j]) + '</span>');
      h.push('</div></div>');

      h.push('<div class="sv-blk"><div class="k">典型表达 · 可直接照抄</div>');
      h.push('<ul class="sv-say">');
      for (j = 0; j < vp.length; j++) h.push('<li>「' + q(vp[j]) + '」</li>');
      h.push('</ul>');
      if (V.phrasing_raw && V.phrasing_raw.replace(/[「」\s]/g, '') !== vp.join('').replace(/\s/g, '')) {
        h.push('<div class="sv-raw">原文整句：' + q(V.phrasing_raw) + '</div>');
      }
      h.push('</div>');

      h.push('<div class="sv-blk"><div class="k">信源 · ' + ve.length + '</div><div class="sv-src">');
      for (j = 0; j < ve.length; j++) h.push(lvLink(ve[j].title, ve[j].url));
      h.push('</div></div>');
      h.push('</article>');
    }
    h.push('</div>');
    h.push('<div class="mp-empty" id="lvEmpty" style="display:none">没有符合筛选条件的观点，试试清空搜索或切回「全部」。</div>');
    h.push('</div>');

    /* -------------------------------------------- ③ 主区块二 · 打法模板 */
    h.push('<div class="mp-sec bd">');
    h.push('<div class="mp-eyebrow">Section 02 · 打法模板</div>');
    h.push('<h2 class="mp-h2">四类动作打法模板 · ' + PBS.length + ' 个：步骤 + 真实案例</h2>');
    h.push('<p class="mp-sub">' + q(LN.playbooks_note || '') +
      ' 步骤里点名的品牌与做法均来自动作明细，案例日期按信源原文给出，<b>部分仅精确到月</b>。</p>');
    h.push('<div class="pb-list">');
    for (i = 0; i < PBS.length; i++) {
      var P = PBS[i];
      var st = P.steps || [], cs = P.cases || [];
      h.push('<section class="pb-c" data-pb="' + q(P.type) + '">');
      h.push('<div class="pb-h"><span class="no">PLAYBOOK ' + (i + 1 < 10 ? '0' : '') + (i + 1) + '</span>' +
        '<span class="lb">' + q(P.label) + '</span>' +
        '<span class="mp-tag mut">该类动作 ' + (isNum(P.n_actions) ? P.n_actions : '—') + ' 条</span></div>');
      h.push('<p class="pb-sum">' + q(P.summary || '') + '</p>');
      h.push('<div class="pb-body">');
      h.push('<div><div class="pb-k">照着做 · ' + st.length + ' 步</div><ol class="pb-steps">');
      for (j = 0; j < st.length; j++) h.push('<li>' + q(st[j]) + '</li>');
      h.push('</ol></div>');
      h.push('<div><div class="pb-k">真实案例 · ' + cs.length + '</div><ul class="pb-cases">');
      for (j = 0; j < cs.length; j++) {
        var CA = cs[j];
        h.push('<li><div class="bd"><span class="bn">' + q(CA.brand) + '</span>' +
          '<span class="dt">' + q(CA.date || '') + '</span>' +
          (CA.confidence ? lvConf(CA.confidence, null, '置信度') : '') + '</div>' +
          '<div class="ti">' + lvLink(CA.title, CA.url) + '</div></li>');
      }
      h.push('</ul></div>');
      h.push('</div>');
      if (P.caveat) {
        h.push('<div class="pb-cav"><span class="ms">info</span><div><b>局限</b>：' + q(P.caveat) + '</div></div>');
      }
      h.push('</section>');
    }
    h.push('</div>');
    h.push('</div>');

    /* ------------------------------------ ④ 主区块三 · 数据侧佐证（折叠） */
    h.push('<div class="mp-sec bd">');
    h.push('<div class="mp-eyebrow">Section 03 · 数据侧佐证（旧口径）</div>');
    h.push('<h2 class="mp-h2">统计相关性：只作背景参考，不能替代具体动作</h2>');
    h.push('<p class="mp-sub">下面是基于 GMV 与玩法结构的<b>统计相关性 / 分组对照</b>结论（原口径保留）。' +
      '它们描述的是「什么样的品牌跑得快」，<b>回答不了「今天该做哪个动作、该讲哪句话」</b>；' +
      '而且<b>相关不等于因果</b>，同一时间窗的横截面无法区分先后。默认折叠，需要时再展开。</p>');
    if (DE) {
      h.push('<details class="de-wrap" id="lvDE">');
      h.push('<summary id="lvDEsum"><span class="ms">chevron_right</span>' +
        '<b>展开数据侧佐证</b><span class="tail">统计池 n=' + (isNum(DE.pool_n) ? DE.pool_n : '—') +
        ' · 相关性 ' + ((DE.correlations || []).length) + ' 项 · 相关≠因果</span></summary>');
      h.push('<div class="de-body" id="lvDEbody">');
      h.push('<div class="mp-warnbox"><div class="mp-note-h"><span class="ms">warning_amber</span>使用须知</div>' +
        '<p>' + q(LN.data_evidence_note || '') + '</p>' +
        '<p><b>不要</b>把这里的 ρ / 组间差异写成「某动作带来 X% 增长」，也不要用它替换上方的动作与话术。</p></div>');

      var COR = DE.correlations || [];
      if (COR.length) {
        h.push('<div class="de-h">相关性（Spearman ρ · 对 YTD 同比增速）</div>');
        h.push('<div class="mp-tw"><table class="ml-tb"><thead><tr><th>因子</th><th class="num">ρ</th>' +
          '<th class="num">p</th><th class="num">n</th><th>结论</th><th>口径说明</th></tr></thead><tbody>');
        for (i = 0; i < COR.length; i++) {
          var C2 = COR[i];
          h.push('<tr class="' + (C2.sig ? '' : 'ns') + '"><td>' + q(C2.factor) + '</td>' +
            '<td class="num" style="font-weight:600;color:' + (C2.sig ? (C2.rho > 0 ? 'var(--pos)' : 'var(--neg)') : 'var(--ink-4)') + '">' +
            (isNum(C2.rho) ? (C2.rho > 0 ? '+' : '') + C2.rho.toFixed(3) : '—') + '</td>' +
            '<td class="num">' + lvP(C2.p) + '</td><td class="num">' + q(C2.n) + '</td>' +
            '<td>' + lvSig(C2.sig) + '</td><td>' + q(C2.note || '') + '</td></tr>');
        }
        h.push('</tbody></table></div>');
      }

      var GC2 = DE.group_compare || null;
      if (GC2) {
        h.push('<div class="de-h">高增长组 vs 低增长组（中位数对照）</div>');
        h.push('<p class="mp-cap">高增长组 n=' + q(GC2.hi_n) + '，增速中位 ' + (pctTxt(GC2.hi_yoy_med, 2) || '—') +
          '；低增长组 n=' + q(GC2.lo_n) + '，增速中位 ' + (pctTxt(GC2.lo_yoy_med, 2) || '—') +
          '。组内品牌为展示样例：高增长 ' + q((GC2.hi_names || []).join(' · ')) +
          '；低增长 ' + q((GC2.lo_names || []).join(' · ')) + '。</p>');
        var GR = GC2.rows || [];
        if (GR.length) {
          h.push('<div class="mp-tw"><table class="ml-tb"><thead><tr><th>维度</th><th class="num">高增长组</th>' +
            '<th class="num">低增长组</th><th class="num">差值</th></tr></thead><tbody>');
          for (i = 0; i < GR.length; i++) {
            h.push('<tr><td>' + q(GR[i].dim) + '</td><td class="num">' + fx(GR[i].hi, 2) + '</td>' +
              '<td class="num">' + fx(GR[i].lo, 2) + '</td>' +
              '<td class="num" style="color:' + (isNum(GR[i].gap) ? (GR[i].gap > 0 ? 'var(--pos)' : 'var(--neg)') : 'var(--ink-4)') + '">' +
              (isNum(GR[i].gap) ? (GR[i].gap > 0 ? '+' : '') + GR[i].gap.toFixed(2) : '—') + '</td></tr>');
          }
          h.push('</tbody></table></div>');
        }
      }

      var SW2 = DE.switch_effect || [];
      if (SW2.length) {
        h.push('<div class="de-h">玩法切换方向效应（Mann-Whitney U）</div>');
        h.push('<div class="mp-tw"><table class="ml-tb"><thead><tr><th>体裁</th><th class="num">加码组 n</th>' +
          '<th class="num">加码组增速中位</th><th class="num">收缩组 n</th><th class="num">收缩组增速中位</th>' +
          '<th class="num">p</th><th>结论</th></tr></thead><tbody>');
        for (i = 0; i < SW2.length; i++) {
          var S2 = SW2[i];
          h.push('<tr class="' + (S2.sig ? '' : 'ns') + '"><td>' + q(S2.genre) + '</td>' +
            '<td class="num">' + q(S2.inc_n) + '</td><td class="num">' + (pctTxt(S2.inc_med, 2) || '—') + '</td>' +
            '<td class="num">' + q(S2.dec_n) + '</td><td class="num">' + (pctTxt(S2.dec_med, 2) || '—') + '</td>' +
            '<td class="num">' + lvP(S2.p) + '</td><td>' + lvSig(S2.sig) +
            ((S2.inc_n < 10 || S2.dec_n < 10) ? ' <span class="ml-sig n">⚠ 小样本</span>' : '') + '</td></tr>');
        }
        h.push('</tbody></table></div>');
      }

      var AE2 = DE.arch_effect || [];
      if (AE2.length) {
        h.push('<div class="de-h">玩法原型 × 增速 × 投放强度</div>');
        h.push('<div class="mp-tw"><table class="ml-tb"><thead><tr><th>玩法原型</th><th class="num">品牌数 n</th>' +
          '<th class="num">合计 GMV 亿</th><th class="num">增速中位</th><th class="num">takerate 中位</th>' +
          '</tr></thead><tbody>');
        for (i = 0; i < AE2.length; i++) {
          var A2 = AE2[i];
          h.push('<tr><td>' + q(A2.arch) + (A2.n < 10 ? ' <span class="ml-sig n">⚠ n&lt;10</span>' : '') + '</td>' +
            '<td class="num">' + q(A2.n) + '</td><td class="num">' + fx(A2.gmv, 2) + '</td>' +
            '<td class="num">' + (pctTxt(A2.yoy_med, 2) || '—') + '</td>' +
            '<td class="num">' + fx(A2.tr_med, 2) + '%</td></tr>');
        }
        h.push('</tbody></table></div>');
      }
      h.push('</div></details>');
    } else {
      h.push('<div class="mp-empty">数据侧佐证缺失。</div>');
    }
    h.push('</div>');

    /* ---------------------------------------------------------- 脚注 */
    h.push('<div class="mp-foot">');
    h.push('<b>本页内容</b>：种草观点与打法模板 100% 来自公开信息检索（' + q(LN.source || '') + '），' +
      '页面不新增、不改写任何一条；' + SV.length + ' 条观点全部展示，含置信度与信源链接。<br>');
    h.push('<b>数据侧口径</b>：' + q(M.caliber || '') + '<br>');
    h.push('<b>提醒</b>：折叠区的统计结论为相关性描述，不构成因果归因，也不代表抖音电商任何层级的行业规模，请勿外推。' +
      '数据窗口 ' + q(LN.window || '') + '，页面生成于 ' + q(LN.generated_at || '') + '。');
    h.push('</div>');

    h.push('</div>');
    el.innerHTML = h.join('');
    bindWarnTips(el);

    /* ------------------------------------------------ 观点筛选（纯 DOM 显隐） */
    var grid = el.querySelector('#lvGrid');
    if (!grid) return;
    var cards = grid.querySelectorAll('.sv-c');
    var inQ = el.querySelector('#lvQ');
    var selB = el.querySelector('#lvBrand');
    var segS = el.querySelector('#lvSoc');
    var cntEl = el.querySelector('#lvCnt');
    var emptyEl = el.querySelector('#lvEmpty');
    var socMode = 'all';

    function applyFilter() {
      var kw = (inQ && inQ.value ? inQ.value : '').trim().toLowerCase();
      var bd = selB ? selB.value : '';
      var shown = 0;
      for (var n = 0; n < cards.length; n++) {
        var cd = cards[n];
        var ok = true;
        if (kw && cd.getAttribute('data-key').indexOf(kw) < 0) ok = false;
        if (ok && bd && cd.getAttribute('data-brands').indexOf('|' + bd + '|') < 0) ok = false;
        if (ok && socMode === 'on' && cd.getAttribute('data-soc') !== '1') ok = false;
        if (ok && socMode === 'off' && cd.getAttribute('data-soc') !== '0') ok = false;
        cd.style.display = ok ? '' : 'none';
        if (ok) shown++;
      }
      if (cntEl) cntEl.textContent = String(shown);
      if (emptyEl) emptyEl.style.display = shown ? 'none' : '';
    }
    if (inQ) inQ.addEventListener('input', applyFilter);
    if (selB) selB.addEventListener('change', applyFilter);
    if (segS) {
      segS.addEventListener('click', function (ev) {
        var btn = ev.target;
        while (btn && btn !== segS && btn.tagName !== 'BUTTON') btn = btn.parentNode;
        if (!btn || btn === segS) return;
        var bs2 = segS.querySelectorAll('button');
        for (var m = 0; m < bs2.length; m++) bs2[m].className = '';
        btn.className = 'on';
        socMode = btn.getAttribute('data-soc') || 'all';
        applyFilter();
      });
    }
  }


  /* ======================================================================
     注册
     ==================================================================== */
  function resizeScope(scope) {
    return function () {
      var m = EC[scope];
      for (var k in m) {
        if (!m[k]) continue;
        try { m[k].resize(); } catch (e) { }
      }
    };
  }

  MXTRACK.reg('play', {
    render: function (el) {
      try { renderPlay(el); }
      catch (e) {
        el.innerHTML = '<div class="wrap" style="padding:60px 0;color:var(--ink-3);font-size:13px">' +
          '「玩法拆解」渲染失败：' + q(e && e.message ? e.message : String(e)) + '</div>';
        if (window.console && console.error) console.error('[playbook]', e);
      }
    },
    resize: resizeScope('play')
  });

  MXTRACK.reg('learn', {
    render: function (el) {
      try { renderLearn(el); }
      catch (e) {
        el.innerHTML = '<div class="wrap" style="padding:60px 0;color:var(--ink-3);font-size:13px">' +
          '「可复制 Learning」渲染失败：' + q(e && e.message ? e.message : String(e)) + '</div>';
        if (window.console && console.error) console.error('[learning]', e);
      }
    },
    resize: resizeScope('learn')
  });

  /* 窗口缩放时同步（仅对已创建实例生效） */
  var rt = null;
  window.addEventListener('resize', function () {
    if (rt) clearTimeout(rt);
    rt = setTimeout(function () { resizeScope('play')(); resizeScope('learn')(); }, 180);
  });
})();
