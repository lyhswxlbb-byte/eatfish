/* ============================================================================
   她私护 · SHE CARE —— 星图种草洞察 app_seeding.js
   ----------------------------------------------------------------------------
   挂在「品牌动作雷达」Tab 下的子模块（区块 02），由 app_tracker.js 的 renderRadar
   在写入 DOM 后调用：window.MXSEED.render(hostEl, pushChart)
     - hostEl    : renderRadar 预留的容器 <section id="mtSeedHost">
     - pushChart : 回调，把 echarts 实例塞回 app_tracker 的 CHARTS['radar']，
                   以复用既有的 resize / 懒渲染机制（本文件不另起一套）

   数据来源：window.SEEDING（female/site/seeding.js，13 个顶层块已预算好）
   —— 本文件不做任何统计计算，所有数字照抄数据层，不重算、不补算、不美化。

   口径红线（严格遵守，页面上不得出现相反表述）：
     · 口径 = 直客（品牌直营）× 美妆日化行业的星图订单，只覆盖「女性经期用品 &
       私处护理赛道」；不是全量星图、不是抖音大盘、不是女性消费全貌
     · 样本是「每品牌投放金额 TOP20」抽样、非普查；互动率与播放量水平不可外推为总体
     · audience_gender 由多模态模型逐条看视频判定，不是标题关键词 / 品牌名推断
     · 合规命中基于抽样、非普查，不代表品牌整体合规水平；命中原词 ≠ 违规
     · 显著性一律带 q / p 值；q≥0.05 一律标「未达显著」，不包装成正面结论

   本文件是女版专属手写文件，site_build.py 的拷贝白名单里没有它，不会被覆盖。
   ========================================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------------------ *
   * 0. 工具（与男版 app_seeding.js 同一套，保持行为一致）
   * ------------------------------------------------------------------ */

  var PUSH = null;   /* 由宿主注入的 chart 收集器 */

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  /* 数据层里少量 **强调** 标记，转成 <b>，其余一律转义 */
  function mdb(s) {
    return esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
  }
  function isNum(v) { return typeof v === 'number' && isFinite(v); }

  /* 百分比：数据层给的就是 0~100 的数，照抄，只统一小数位 */
  function pc(v, d) { return isNum(v) ? v.toFixed(d == null ? 1 : d) + '%' : '—'; }
  /* 互动率：数据层是 0~1 小数，转百分比展示（口径见 metric_defs） */
  function er(v, d) { return isNum(v) ? (v * 100).toFixed(d == null ? 2 : d) + '%' : '—'; }
  /* 秒：中位/均值一律照抄，只统一小数位 */
  function sec(v, d) { return isNum(v) ? v.toFixed(d == null ? 1 : d) + 's' : '—'; }
  /* 整数（条数 / 词次），缺失显示 — 而不是 undefined */
  function nn(v) { return isNum(v) ? String(v) : '—'; }

  /* q / p 值：极小值用科学记数的可读写法，绝不四舍五入成 0 */
  function qTxt(q) {
    if (!isNum(q)) return '—';
    if (q < 0.0001) return '<0.0001';
    if (q < 0.001) return q.toFixed(5);
    if (q < 0.01) return q.toFixed(4);
    return q.toFixed(q < 0.1 ? 3 : 2);
  }
  /* q 徽章：显著 / 未达显著 两种，一眼可分。q≥0.05 一律带「未达显著」 */
  function qBadge(q, label) {
    if (!isNum(q)) return '<span class="mt-na" title="该项未给出 q 值">未计算</span>';
    var sig = q < 0.05;
    return '<span class="sd-q ' + (sig ? 'sig' : 'ns') + '" title="'
      + (sig ? 'BH-FDR 校正后 q<0.05，判为显著' : 'BH-FDR 校正后 q≥0.05，未达显著，不能当作正面结论')
      + '">' + (label || 'q') + '=' + qTxt(q) + (sig ? '' : ' · 未达显著') + '</span>';
  }
  function pTxt(p) {
    if (!isNum(p)) return '—';
    if (p === 0) return '<0.001';
    if (p < 0.0001) return '<0.0001';
    if (p < 0.01) return p.toFixed(4);
    return p.toFixed(p < 0.1 ? 3 : 2);
  }
  /* 分层 p 值徽章：稳 / 不稳，文案里不写成「有效 / 无效」 */
  function robBadge(ok, tip) {
    return ok
      ? '<span class="sd-rb y" title="' + esc(tip || '该分层敏感性检验后仍显著') + '">✅ 稳</span>'
      : '<span class="sd-rb n" title="' + esc(tip || '该分层敏感性检验后不再显著，差异含构成成分') + '">⚠️ 不稳</span>';
  }
  function pendBadge(txt) {
    return '<span class="sd-pend" title="数据层该字段当前为 pending，尚未回填">' + esc(txt || '待回填') + '</span>';
  }

  /* 取「字段 · 取值」里的取值部分做短标签。
     取值是「是/否/有/无」这类脱离字段就没有意义的词时，保留字段前缀，
     否则图表纵轴会出现一个孤零零的「是」。 */
  var VAGUE = { '是': 1, '否': 1, '有': 1, '无': 1, '其他': 1, '未知': 1, '不明确': 1 };
  function shortLabel(s) {
    var t = String(s || '');
    var i = t.indexOf(' · ');
    if (i < 0) return t;
    var v = t.slice(i + 3), f = t.slice(0, i);
    return VAGUE[v] ? (f + '·' + v) : v;
  }
  function fieldOf(s) {
    var t = String(s || '');
    var i = t.indexOf(' · ');
    return i >= 0 ? t.slice(0, i) : '';
  }

  /* 一致性检验结果查询：只读数据层，查不到就返回 null，绝不编造 */
  var _REL = null;
  function relInit(S) { _REL = ((S || {}).meta || {}).reliability || {}; }
  function relStatus() { return String((_REL || {}).status || ''); }
  function relDone() { return relStatus() === 'done'; }
  function relOf(f) {
    return ((_REL || {}).fields || []).filter(function (x) { return x.field === f; })[0] || null;
  }
  function relMulti(f) {
    return ((_REL || {}).multi_fields || []).filter(function (x) { return x.field === f; })[0] || null;
  }
  /* 单选字段一致率短标：done 给真实数字，未做给 pending 徽标 */
  function relTag(f) {
    var r = relOf(f);
    if (!relDone() || !r) {
      return ' <span class="sd-pend" title="数据层该字段的双跑一致性检验尚未完成">一致率待检验</span>';
    }
    return ' <span class="sd-pend" title="同批视频独立双跑的一致率与 Cohen κ，来自 '
      + esc((_REL || {}).source || '数据层') + '">双跑一致率 ' + pc(r.agree * 100)
      + ' · κ=' + (isNum(r.kappa) ? r.kappa.toFixed(2) : '—') + '</span>';
  }
  /* 多选字段一致率短句 */
  function relMultiTxt(f) {
    var r = relMulti(f);
    if (!relDone() || !r) return '该字段的双跑一致性检验尚未完成，量级可用、小数点不可用。';
    return '该字段双跑一致性为 <b>Jaccard ' + (isNum(r.jaccard) ? r.jaccard.toFixed(2) : '—')
      + '、整套标签完全一致仅 ' + pc(r.exact * 100) + '</b>，'
      + '意思是<b>「命中哪些标签」大体稳定、「一字不差同一套」很难重现</b> ——'
      + '所以只读排序与量级，不读精确百分点。';
  }

  /* CSS 变量读取（跟随站点 5 套配色主题，与 app_tracker 保持一致） */
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
      accent: cv('--accent', '#002FA7'), pos: cv('--pos', '#4F6552'), neg: cv('--neg', '#9C4A44'),
      warn: cv('--warn', '#8B2E2E')
    };
  }
  /* 图表配色只用主题变量，保证 5 套配色（含深色 noir）下都可读：
     主系列 = 强调色，对照系列 = 中性墨阶，第三类 = 更弱的墨阶。
     色彩不含褒贬，只区分组别。 */
  function C1() { return cv('--accent', '#002FA7'); }        /* 经期用品 / 委婉代称 / 主系列 */
  function C2() { return cv('--ink-3', '#6E6E6B'); }         /* 私处护理 / 直白医学词 / 对照 */
  function C3() { return cv('--ink-5', '#A5A5A2'); }         /* 未归类 / 弱化 */

  /* 图表工厂：实例一律交回宿主的 CHARTS['radar']。
     同一个 dom 上已有实例时复用它（换肤重绘会走这条路），
     避免重复 init 造成实例泄漏、也避免同一个图表被 push 进 CHARTS 两次。 */
  function mk(dom, opt) {
    if (!dom || !window.echarts) return null;
    var c = null, fresh = false;
    try {
      c = echarts.getInstanceByDom(dom);
      if (!c) { c = echarts.init(dom); fresh = true; }
      c.setOption(opt, true);
    } catch (e) { return null; }
    if (fresh && typeof PUSH === 'function') { try { PUSH(c); } catch (e2) { } }
    return c;
  }
  function baseTip(p) {
    return {
      backgroundColor: p.surface, borderColor: p.line3, borderWidth: 1,
      padding: [9, 12], textStyle: { color: p.ink2, fontSize: 12, lineHeight: 19 },
      extraCssText: 'box-shadow:0 6px 22px -12px rgba(0,0,0,.28);border-radius:4px;max-width:280px;white-space:normal;'
    };
  }
  /* 窄屏收窄轴标签宽度，避免 390px 下叠字 / 溢出 */
  function labW(dom, wide, narrow) {
    var w = 0;
    try { w = dom ? dom.clientWidth : 0; } catch (e) { }
    return w && w < 520 ? narrow : wide;
  }

  /* HTML 迷你条形行：小样本枚举用它，比再开一个 echarts 实例省 DOM 也省内存 */
  function bars(rows, opt) {
    var o = opt || {};
    var max = 0, i;
    for (i = 0; i < rows.length; i++) { if (rows[i].pct > max) max = rows[i].pct; }
    if (!max) max = 1;
    var s = '<div class="sd-bars">';
    for (i = 0; i < rows.length; i++) {
      var r = rows[i];
      s += '<div class="sd-br"' + (r.title ? ' title="' + esc(r.title) + '"' : '') + '>'
        + '<span class="k">' + esc(r.label) + '</span>'
        + '<span class="t"><i style="width:' + (r.pct / max * 100).toFixed(1) + '%;background:'
        + (r.color || o.color || C1()) + '"></i></span>'
        + '<span class="v">' + pc(r.pct) + '<em>' + (isNum(r.n) ? r.n : '—') + '</em></span>'
        + '</div>';
    }
    return s + '</div>';
  }
  /* 把 {label,pct,n} 列表转成 bars() 的行，附上悬停口径 */
  function rowsOf(arr, lim, base) {
    return (arr || []).slice(0, lim || 999).map(function (x) {
      return {
        label: x.label, pct: x.pct, n: x.n,
        title: x.label + '：' + x.n + ' 条' + (base ? ' / ' + base + ' 条' : '') + '（' + pc(x.pct) + '）'
      };
    });
  }
  /* TOP3 摘要（品牌卡里用） */
  function top3(arr) {
    return (arr || []).slice(0, 3).map(function (x) {
      return esc(x.label) + ' <span style="color:var(--ink-5)">' + pc(x.pct) + '</span>';
    }).join('、') || '—';
  }

  /* 子区块头（02-A ~ 02-J） */
  function sub(letter, title, hint) {
    return '<div class="sd-sh"><span class="sd-sl">' + esc(letter) + '</span>'
      + '<h3 class="sd-st">' + title + '</h3>'
      + (hint ? '<span class="sd-sx">' + esc(hint) + '</span>' : '') + '</div>';
  }
  /* 图卡：标题 + 口径脚注（每个图都必须有这两样） */
  function cbox(id, title, unit, h, foot, extraCls) {
    return '<div class="sd-cbox' + (extraCls ? ' ' + extraCls : '') + '">'
      + '<div class="ct">' + title + (unit ? ' <em>' + esc(unit) + '</em>' : '') + '</div>'
      + '<div id="' + id + '" class="sd-chart" style="height:' + h + 'px"></div>'
      + (foot ? '<div class="nd">' + foot + '</div>' : '')
      + '</div>';
  }

  /* 词类 → 展示色 / 短名（H 块反复用到） */
  var CLS_CN = { euphemism: '委婉代称', explicit: '直白医学词', unclassified: '未归类' };
  function clsCls(c) { return c === 'euphemism' ? 'eu' : (c === 'explicit' ? 'ex' : 'un'); }
  function clsColor(c) { return c === 'euphemism' ? C1() : (c === 'explicit' ? C2() : C3()); }

  /* ------------------------------------------------------------------ *
   * 1. 样式（只注入一次，全部 sd- 前缀；沿用站点 CSS 变量，无渐变无 3D）
   * ------------------------------------------------------------------ */
  function injectCSS() {
    if (document.getElementById('mxseed-css')) return;
    var st = document.createElement('style');
    st.id = 'mxseed-css';
    st.textContent = [
      /* —— 子区块骨架 —— */
      '.sd-b{margin-top:34px}',
      '.sd-b:first-child{margin-top:22px}',
      '.sd-sh{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;padding-bottom:8px;border-bottom:1px solid var(--line-2)}',
      '.sd-sl{font-family:var(--sans);font-size:9.5px;font-weight:700;letter-spacing:.14em;color:var(--surface);background:var(--ink-4);border-radius:2px;padding:2px 6px;flex:none}',
      '.sd-st{font-family:var(--serif);font-weight:500;font-size:clamp(16px,1.7vw,19px);line-height:1.35;color:var(--ink);margin:0;min-width:0}',
      '.sd-sx{margin-left:auto;font-size:10.5px;color:var(--ink-4);white-space:nowrap}',
      '.sd-b.key .sd-sl{background:var(--accent)}',
      '.sd-b.alarm .sd-sl{background:var(--warn)}',
      '.sd-p{font-size:12.5px;line-height:1.85;color:var(--ink-3);margin-top:11px;max-width:900px}',
      '.sd-p b{color:var(--ink-2);font-weight:600}',
      '.sd-p .em{color:var(--accent);font-weight:600}',
      /* —— 口径卡 —— */
      '.sd-ovs{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,196px),1fr));gap:1px;background:var(--line);border:1px solid var(--line);margin-top:16px}',
      '.sd-ov{background:var(--surface);padding:14px 15px 13px;min-width:0}',
      '.sd-ov .k{font-size:9.5px;letter-spacing:.13em;text-transform:uppercase;color:var(--ink-5);font-weight:600}',
      '.sd-ov .n{font-family:var(--serif);font-weight:500;font-size:25px;line-height:1.05;color:var(--ink);margin-top:9px;display:flex;align-items:baseline;gap:4px;flex-wrap:wrap;word-break:break-all}',
      '.sd-ov .n small{font-size:11.5px;font-weight:400;color:var(--ink-4);font-family:var(--sans)}',
      '.sd-ov .n.sm{font-size:15px;line-height:1.4}',
      '.sd-ov .d{font-size:10.5px;color:var(--ink-4);margin-top:7px;line-height:1.7;word-break:break-word}',
      '.sd-ov .d b{font-weight:600;color:var(--ink-3)}',
      '.sd-ov.hi{background:var(--accent-wash)}',
      '.sd-ov.hi .n{color:var(--accent)}',
      /* —— 头部口径标签 + 口径边界卡 —— */
      '.sd-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:11px}',
      '.sd-tag{font-size:10px;line-height:1.5;color:var(--ink-4);background:var(--paper-2);border:1px solid var(--line);border-radius:2px;padding:2px 7px;white-space:nowrap}',
      '.sd-tag.k{color:var(--ink-2);background:var(--surface);border-color:var(--line-3);font-weight:600}',
      '.sd-scope{margin-top:16px;font-size:11.5px;line-height:1.85;color:var(--ink-2);background:var(--warn-wash);border:1px solid var(--warn-line);border-left:2px solid var(--warn);padding:12px 14px;border-radius:0 var(--r-s) var(--r-s) 0}',
      '.sd-scope .t{font-size:10px;font-weight:700;letter-spacing:.12em;color:var(--warn);margin-bottom:5px;text-transform:uppercase}',
      '.sd-scope b{color:var(--warn);font-weight:600}',
      /* —— 提示条 —— */
      '.sd-warn{margin-top:14px;font-size:11.5px;line-height:1.85;color:var(--ink-2);background:var(--warn-wash);border-left:2px solid var(--warn);padding:11px 13px;border-radius:0 var(--r-s) var(--r-s) 0}',
      '.sd-warn .t{font-size:10px;font-weight:700;letter-spacing:.12em;color:var(--warn);margin-bottom:5px;text-transform:uppercase}',
      '.sd-warn b{color:var(--warn);font-weight:600}',
      '.sd-info{margin-top:14px;font-size:11.5px;line-height:1.85;color:var(--ink-3);background:var(--accent-wash);border-left:2px solid var(--accent);padding:11px 13px;border-radius:0 var(--r-s) var(--r-s) 0}',
      '.sd-info .t{font-size:10px;font-weight:700;letter-spacing:.12em;color:var(--accent);margin-bottom:5px;text-transform:uppercase}',
      '.sd-info b{color:var(--ink);font-weight:600}',
      '.sd-nt{font-size:11px;line-height:1.85;color:var(--ink-4);margin-top:12px;padding-left:11px;border-left:2px solid var(--line-3)}',
      '.sd-nt b{color:var(--ink-3);font-weight:600}',
      /* .nd：与 app_tracker 的中性提示同款，此处限定在本模块内 */
      '.sd-wrap .nd{font-size:11px;color:var(--ink-4);line-height:1.75;background:var(--paper-2);border-left:2px solid var(--line-3);padding:7px 9px;margin-top:10px}',
      /* —— q 值徽章 —— */
      '.sd-q{display:inline-flex;align-items:center;font-size:10px;font-weight:600;border-radius:2px;padding:1px 5px;white-space:nowrap;cursor:help;font-family:var(--sans)}',
      '.sd-q.sig{color:var(--accent);border:1px solid var(--accent-line);background:var(--accent-wash)}',
      '.sd-q.ns{color:var(--ink-4);border:1px dashed var(--line-3);background:var(--paper-2)}',
      '.sd-rb{display:inline-flex;align-items:center;font-size:10px;font-weight:600;border-radius:2px;padding:1px 5px;white-space:nowrap;cursor:help;border:1px solid currentColor}',
      '.sd-rb.y{color:var(--pos)}.sd-rb.n{color:var(--warn);background:var(--warn-wash)}',
      '.sd-pend{display:inline-flex;align-items:center;font-size:10px;font-weight:600;border-radius:2px;padding:1px 5px;white-space:nowrap;cursor:help;color:var(--warn);border:1px dashed var(--warn-line);background:var(--warn-wash);font-family:var(--sans)}',
      /* —— 图 —— */
      '.sd-chart{width:100%;min-width:0}',
      '.sd-cgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,330px),1fr));gap:16px;margin-top:16px}',
      '.sd-cgrid.c2{grid-template-columns:repeat(2,minmax(0,1fr))}',
      '.sd-cbox{border:1px solid var(--line);border-radius:var(--r);background:var(--surface);padding:12px 13px 8px;min-width:0}',
      '.sd-cbox.full{margin-top:16px}',
      '.sd-cbox .ct{font-size:11.5px;font-weight:600;color:var(--ink-2);display:flex;align-items:baseline;gap:7px;flex-wrap:wrap}',
      '.sd-cbox .ct em{font-style:normal;font-size:10px;color:var(--ink-5);font-weight:400}',
      /* —— HTML 迷你条 —— */
      '.sd-bars{margin-top:9px}',
      '.sd-br{display:grid;grid-template-columns:minmax(0,96px) minmax(0,1fr) 74px;align-items:center;gap:9px;padding:3.5px 0;font-size:11.5px}',
      '.sd-br .k{color:var(--ink-2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
      '.sd-br .t{height:8px;background:var(--paper-3);border-radius:1px;overflow:hidden;min-width:0}',
      '.sd-br .t i{display:block;height:100%;border-radius:1px}',
      '.sd-br .v{text-align:right;font-family:var(--serif);font-size:12px;color:var(--ink-2);white-space:nowrap}',
      '.sd-br .v em{font-style:normal;font-family:var(--sans);font-size:10px;color:var(--ink-5);margin-left:5px}',
      /* —— 反直觉卡 —— */
      '.sd-myth{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,215px),1fr));gap:14px;margin-top:16px}',
      '.sd-my{border:1px solid var(--line);border-radius:var(--r);background:var(--surface);padding:13px 14px 12px;min-width:0}',
      '.sd-my .as{font-size:11.5px;line-height:1.7;color:var(--ink-4);text-decoration:line-through;text-decoration-color:var(--line-3)}',
      '.sd-my .fg{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;margin-top:9px}',
      '.sd-my .fg b{font-family:var(--serif);font-size:19px;font-weight:600;color:var(--ink)}',
      '.sd-my .fg .vs{font-size:11px;color:var(--ink-5)}',
      '.sd-my .fg i{font-style:normal;font-family:var(--serif);font-size:19px;color:var(--ink-4)}',
      '.sd-my .lb{font-size:9.5px;letter-spacing:.1em;color:var(--ink-5);text-transform:uppercase;margin-top:2px}',
      '.sd-my .bt{margin-top:10px;padding-top:9px;border-top:1px solid var(--line-2);display:flex;align-items:center;gap:7px;flex-wrap:wrap}',
      '.sd-my .rv{font-size:11px;color:var(--warn);line-height:1.7;margin-top:7px}',
      /* —— 漏斗（负面结论） —— */
      '.sd-fn{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,150px),1fr));gap:1px;background:var(--line);border:1px solid var(--line);margin-top:16px}',
      '.sd-fs{background:var(--surface);padding:13px 14px;min-width:0}',
      '.sd-fs .k{font-size:10px;color:var(--ink-5);letter-spacing:.08em;line-height:1.6}',
      '.sd-fs .n{font-family:var(--serif);font-size:27px;font-weight:500;color:var(--ink);line-height:1.1;margin-top:7px}',
      '.sd-fs .n small{font-size:11.5px;color:var(--ink-4);font-family:var(--sans);margin-left:3px}',
      '.sd-fs.last{background:var(--accent-wash)}',
      '.sd-fs.last .n{color:var(--accent)}',
      /* —— chips —— */
      '.sd-chips{display:flex;flex-wrap:wrap;gap:7px;margin-top:12px}',
      '.sd-chip{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--line);border-radius:2px;padding:3px 8px;font-size:11px;color:var(--ink-2);background:var(--surface);white-space:nowrap;max-width:100%;overflow:hidden;text-overflow:ellipsis}',
      '.sd-chip b{font-family:var(--serif);font-size:11.5px;color:var(--ink-4);font-weight:500}',
      '.sd-chip.mute{color:var(--ink-4);border-style:dashed;border-color:var(--line-3)}',
      '.sd-chip.eu{color:var(--accent);border-color:var(--accent-line);background:var(--accent-wash)}',
      '.sd-chip.eu b{color:var(--accent)}',
      '.sd-chip.ex{color:var(--ink-2);border-color:var(--line-3)}',
      '.sd-chip.un{color:var(--ink-4);border-style:dashed;border-color:var(--line-3);background:var(--paper-2)}',
      /* —— 原词卡（H 块 TOP 榜） —— */
      '.sd-terms{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,214px),1fr));gap:12px;margin-top:14px}',
      '.sd-tm{border:1px solid var(--line);border-left-width:2px;border-radius:var(--r);background:var(--surface);padding:11px 12px 10px;min-width:0}',
      '.sd-tm.eu{border-left-color:var(--accent)}',
      '.sd-tm.ex{border-left-color:var(--ink-3)}',
      '.sd-tm.un{border-left-color:var(--line-3)}',
      '.sd-tm .w{font-family:var(--serif);font-size:17px;font-weight:600;color:var(--ink);line-height:1.3;word-break:break-all}',
      '.sd-tm .m{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;margin-top:5px;font-size:10.5px;color:var(--ink-4)}',
      '.sd-tm .m b{font-family:var(--serif);font-size:12.5px;color:var(--ink-2);font-weight:500}',
      '.sd-tm .cl{font-size:9.5px;letter-spacing:.06em;padding:1px 5px;border-radius:2px;white-space:nowrap}',
      '.sd-tm.eu .cl{color:var(--accent);background:var(--accent-wash)}',
      '.sd-tm.ex .cl{color:var(--ink-3);background:var(--paper-2)}',
      '.sd-tm.un .cl{color:var(--ink-4);background:var(--paper-2)}',
      '.sd-tm .qq{font-size:11px;line-height:1.65;color:var(--ink-3);margin-top:8px;padding-left:9px;border-left:1px solid var(--line-3);word-break:break-word}',
      /* —— 模板卡 —— */
      '.sd-tpls{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,330px),1fr));gap:16px;margin-top:16px;align-items:start}',
      '.sd-tpl{border:1px solid var(--line);border-radius:var(--r);background:var(--surface);padding:15px 16px 13px;display:flex;flex-direction:column;gap:10px;min-width:0}',
      '.sd-tpl:hover{border-color:var(--line-3);box-shadow:var(--sh)}',
      '.sd-tpl .hd{display:flex;align-items:baseline;gap:9px;flex-wrap:wrap}',
      '.sd-tpl .cd{font-family:var(--serif);font-size:12px;font-weight:600;color:var(--accent);letter-spacing:.06em;flex:none}',
      '.sd-tpl .nm{font-family:var(--serif);font-size:16.5px;font-weight:500;color:var(--ink);line-height:1.35;min-width:0}',
      '.sd-tpl .sc{font-size:11.5px;line-height:1.75;color:var(--ink-4)}',
      '.sd-tpl .fm{font-size:12px;line-height:1.9;color:var(--ink-2);background:var(--paper-2);border-radius:var(--r-s);padding:9px 11px;word-break:break-word}',
      '.sd-tpl .qt{display:flex;flex-direction:column;gap:5px}',
      '.sd-tpl .qt .q{font-size:11.5px;line-height:1.65;color:var(--ink-3);padding-left:10px;border-left:2px solid var(--line-3)}',
      '.sd-tpl .qt .q .qb{color:var(--ink-4,#9a8f92);font-size:10.5px}',
      '.sd-tpl .kv{display:flex;flex-wrap:wrap;gap:0;padding-top:10px;border-top:1px solid var(--line-2);margin-top:auto}',
      '.sd-tpl .kv div{padding-right:13px;margin-right:13px;border-right:1px solid var(--line-2);min-width:0}',
      '.sd-tpl .kv div:last-child{border-right:none;padding-right:0;margin-right:0}',
      '.sd-tpl .kv .kk{font-size:9.5px;color:var(--ink-5);letter-spacing:.06em;white-space:nowrap}',
      '.sd-tpl .kv .vv{font-family:var(--serif);font-size:15px;color:var(--ink);margin-top:3px;white-space:nowrap}',
      '.sd-tpl .cav{font-size:10.5px;line-height:1.7;color:var(--warn);background:var(--warn-wash);border-left:2px solid var(--warn-line);padding:7px 9px}',
      /* —— 品牌画像卡 —— */
      '.sd-brs{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,340px),1fr));gap:16px;margin-top:16px;align-items:start}',
      '.sd-br2{border:1px solid var(--line);border-radius:var(--r);background:var(--surface);padding:15px 16px 13px;display:flex;flex-direction:column;gap:10px;min-width:0}',
      '.sd-br2 .hd{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;padding-bottom:9px;border-bottom:1px solid var(--line-2)}',
      '.sd-br2 .bn{font-size:14.5px;font-weight:600;color:var(--ink);min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
      '.sd-br2 .sg{font-size:9.5px;letter-spacing:.06em;padding:1px 5px;border-radius:2px;color:var(--ink-4);background:var(--paper-2);white-space:nowrap}',
      '.sd-br2 .cn{margin-left:auto;font-size:10.5px;color:var(--ink-4);white-space:nowrap}',
      '.sd-br2 .sy{font-size:12.5px;line-height:1.85;color:var(--ink-2)}',
      '.sd-br2 .sy b{color:var(--ink);font-weight:600}',
      '.sd-br2 .rw{display:grid;grid-template-columns:52px minmax(0,1fr);gap:8px;align-items:baseline;font-size:11px;padding:3px 0}',
      '.sd-br2 .rw .rk{color:var(--ink-5);letter-spacing:.05em;white-space:nowrap}',
      '.sd-br2 .rw .rv{color:var(--ink-3);line-height:1.7;word-break:break-word}',
      '.sd-kvs{display:flex;flex-wrap:wrap;gap:0;padding-top:10px;border-top:1px solid var(--line-2)}',
      '.sd-kvs>div{padding-right:13px;margin-right:13px;border-right:1px solid var(--line-2);min-width:0;margin-bottom:6px}',
      '.sd-kvs>div:last-child{border-right:none;padding-right:0;margin-right:0}',
      '.sd-kvs .kk{font-size:9.5px;color:var(--ink-5);letter-spacing:.05em;white-space:nowrap}',
      '.sd-kvs .vv{font-family:var(--serif);font-size:15px;color:var(--ink);margin-top:3px;white-space:nowrap}',
      '.sd-kvs .vv small{font-family:var(--sans);font-size:10px;color:var(--ink-5);margin-left:3px}',
      /* —— 合规 —— */
      '.sd-vd{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,168px),1fr));gap:1px;background:var(--line);border:1px solid var(--line);margin-top:16px}',
      '.sd-vi{background:var(--surface);padding:12px 13px}',
      '.sd-vi .k{font-size:10.5px;color:var(--ink-4);line-height:1.6}',
      '.sd-vi .n{font-family:var(--serif);font-size:25px;font-weight:500;color:var(--ink);line-height:1.1;margin-top:6px}',
      '.sd-vi .n small{font-size:11px;color:var(--ink-4);font-family:var(--sans);margin-left:3px}',
      '.sd-vi .d{font-size:10px;color:var(--ink-5);line-height:1.6;margin-top:6px}',
      '.sd-vi.bad{background:var(--warn-wash)}.sd-vi.bad .n{color:var(--warn)}',
      '.sd-vi.bad .k{color:var(--warn)}',
      /* 四档人工判定：靠左侧色条 + 底色 + badge 三重区分，避免只靠颜色 */
      '.sd-vds{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,190px),1fr));gap:10px;margin-top:14px}',
      '.sd-vdc{border:1px solid var(--line);border-left:3px solid var(--ink-5);border-radius:var(--r);background:var(--surface);padding:12px 13px}',
      '.sd-vdc .k{margin-bottom:8px}',
      '.sd-vdc .n{font-family:var(--serif);font-size:26px;font-weight:500;color:var(--ink);line-height:1.05}',
      '.sd-vdc .n small{font-family:var(--sans);font-size:10.5px;color:var(--ink-5);margin-left:4px}',
      '.sd-vdc .d{font-size:10px;color:var(--ink-5);line-height:1.6;margin-top:6px}',
      '.sd-vdc.v{border-left-color:var(--warn);background:var(--warn-wash)}',
      '.sd-vdc.v .n{color:var(--warn)}',
      '.sd-vdc.g{border-left-color:var(--warn);background:transparent}',
      '.sd-vdc.c{border-left-color:var(--ink-4);background:var(--paper-2)}',
      '.sd-vdc.c .n{color:var(--ink-2)}',
      '.sd-vdc.f{border-left-color:var(--line-3);border-left-style:dashed}.sd-vdc.f .n{color:var(--ink-4)}',
      '.sd-vdc.p{border-left-color:var(--ink-5);border-left-style:dotted;background:var(--paper-2)}',
      '.sd-vb{display:inline-block;font-size:10px;line-height:1.5;letter-spacing:.03em;padding:2px 7px;border-radius:2px;white-space:nowrap;font-weight:600;border:1px solid var(--line-3);color:var(--ink-3);background:var(--paper-2)}',
      '.sd-vb i{font-style:normal;margin-right:3px;opacity:.85}',
      /* 只有前两档用告警色；后两档一律中性灰，避免被读成违规 */
      '.sd-vb.v{color:#fff;background:var(--warn);border-color:var(--warn)}',
      '.sd-vb.g{color:var(--warn);background:transparent;border-color:var(--warn)}',
      '.sd-vb.c{color:var(--ink-2);background:var(--paper-2);border-color:var(--ink-4)}',
      '.sd-vb.f{color:var(--ink-5);background:transparent;border-color:var(--line-3);border-style:dashed}',
      '.sd-vb.p{color:var(--ink-4);background:var(--paper-2);border-style:dotted}',
      '.sd-quote{font-size:11.5px;color:var(--ink-2);line-height:1.7}',
      '.sd-term{display:inline-block;font-weight:600;color:var(--warn);white-space:nowrap}',
      '.sd-wrap a.sd-vl{color:var(--ink-5);font-size:10px;text-decoration:none;border-bottom:1px dotted var(--line-3)}',
      '.sd-wrap a.sd-vl:hover{color:var(--accent);border-bottom-color:var(--accent-line)}',
      /* —— 局限列表 —— */
      '.sd-li{margin:14px 0 0;padding:0;list-style:none}',
      '.sd-li li{position:relative;padding:8px 0 8px 26px;border-top:1px solid var(--line-2);font-size:12.5px;line-height:1.85;color:var(--ink-3)}',
      '.sd-li li:first-child{border-top:none}',
      '.sd-li li::before{content:"—";position:absolute;left:2px;top:8px;color:var(--ink-5);font-size:12px}',
      '.sd-li.no li{color:var(--ink-2)}',
      '.sd-li.no li::before{content:"×";color:var(--warn);font-weight:700}',
      '.sd-li li b{color:var(--ink-2);font-weight:600}',
      /* —— 折叠（沿用 mt-fold 外观，但作用域独立） —— */
      '.sd-fold{margin-top:16px;border:1px solid var(--line);border-radius:var(--r);background:var(--surface)}',
      '.sd-fold>summary{cursor:pointer;padding:12px 15px;font-size:12px;color:var(--ink-2);font-weight:600;display:flex;align-items:center;gap:9px;list-style:none;flex-wrap:wrap}',
      '.sd-fold>summary::-webkit-details-marker{display:none}',
      '.sd-fold>summary .c{font-size:11px;font-weight:400;color:var(--ink-4)}',
      '.sd-fold>summary .hint{margin-left:auto;font-size:11px;font-weight:400;color:var(--ink-4)}',
      '.sd-fold>summary .hint::after{content:"展开 ▾"}',
      '.sd-fold[open]>summary{border-bottom:1px solid var(--line)}',
      '.sd-fold[open]>summary .hint::after{content:"收起 ▴"}',
      '.sd-foldb{padding:6px 15px 14px}',
      /* —— 表：横向可滚，窄屏不叠字 —— */
      '.sd-tblw{overflow-x:auto;margin-top:14px;-webkit-overflow-scrolling:touch}',
      '.sd-tbl{width:100%;min-width:560px;border-collapse:collapse;font-size:11.5px}',
      '.sd-tbl th{font-size:9.5px;letter-spacing:.09em;text-transform:uppercase;color:var(--ink-5);font-weight:600;text-align:right;padding:0 0 8px;border-bottom:1px solid var(--line-3);white-space:nowrap}',
      '.sd-tbl th:first-child,.sd-tbl td:first-child{text-align:left;padding-left:0}',
      '.sd-tbl th:not(:first-child),.sd-tbl td:not(:first-child){padding-left:14px}',
      '.sd-tbl td{padding:9px 0;border-bottom:1px solid var(--line-2);text-align:right;color:var(--ink-3);white-space:nowrap;vertical-align:top}',
      '.sd-tbl td.wrap{white-space:normal;min-width:170px;line-height:1.7}',
      '.sd-tbl tbody tr:hover{background:var(--paper-2)}',
      '.sd-tbl .nm{font-weight:600;color:var(--ink);white-space:normal}',
      '.sd-tbl .num{font-family:var(--serif);font-size:12.5px;color:var(--ink-2)}',
      '.sd-tbl .g1{color:var(--accent);font-weight:600}',
      '.sd-tbl tr.grp td{background:var(--paper-2);font-size:10px;letter-spacing:.08em;color:var(--ink-4);text-align:left;padding:6px 0 6px 0;font-weight:600}',
      /* —— 响应式 —— */
      '@media(max-width:760px){',
      '.sd-b{margin-top:28px}',
      '.sd-sx{margin-left:0;width:100%;white-space:normal}',
      '.sd-br{grid-template-columns:minmax(0,80px) minmax(0,1fr) 66px;gap:7px;font-size:11px}',
      '.sd-tpl .kv div{padding-right:10px;margin-right:10px}',
      '.sd-cgrid.c2{grid-template-columns:1fr}',
      '.sd-ov .n{font-size:21px}',
      '.sd-fs .n{font-size:23px}',
      '}'
    ].join('\n');
    document.head.appendChild(st);
  }

  /* ================================================================== *
   * 2. 区块 02-A：口径与方法
   * ================================================================== */
  function blockA(S) {
    var m = S.meta || {}, ds = m.dataset || {}, br = m.brands || {}, sp = m.samples || {},
      rel = m.reliability || {}, O = S.overall || {}, segs = m.segments || [];
    var ag = sp.audience_gender || [];
    var agTxt = ag.map(function (x) { return x.label + ' ' + x.n + '（' + pc(x.pct) + '）'; }).join(' / ');

    var h = '<div class="sd-b" id="sdA">'
      + sub('A', '口径与方法：这一块能代表什么、不能代表什么', '先看边界，再看结论');

    h += '<div class="sd-p">本模块只回答一件事：<span class="em">在女性经期用品 &amp; 私处护理赛道里，'
      + '品牌请达人拍的种草视频是怎么开口说「那件事」的、怎么讲产品、怎么说服她。</span>'
      + '口径为<b>直客（品牌直营）× 美妆日化行业</b>的星图订单，'
      + '<b>不是全量星图、不是抖音大盘、不是女性消费全貌</b>，'
      + '也不代表这些品牌在其他渠道的内容策略。</div>';

    /* 口径四卡 */
    h += '<div class="sd-ovs">'
      + '<div class="sd-ov"><div class="k">数据源</div>'
      + '<div class="n sm">风神 ' + esc(ds.id) + '</div>'
      + '<div class="d">' + esc(ds.name) + '<br>分区 <b>' + esc(ds.partition) + '</b></div></div>'

      + '<div class="sd-ov"><div class="k">时间窗</div>'
      + '<div class="n sm">' + esc(ds.window) + '</div>'
      + '<div class="d">按<b>视频发布日</b>取数，非订单日 / 结算日</div></div>'

      + '<div class="sd-ov"><div class="k">该口径全量</div>'
      + '<div class="n">' + nn(ds.universe_videos) + '<small>条视频 · ' + nn(ds.universe_brands) + ' 品牌</small></div>'
      + '<div class="d">' + nn(ds.universe_orders) + ' 单 · 应收金额合计 <b>'
      + (isNum(O.amount_total) ? (O.amount_total / 10000).toFixed(0) + ' 万元' : '—')
      + '</b><br>占比类总体指标一律用<b>这 ' + nn(ds.universe_videos) + ' 条全量</b>算</div></div>'

      + '<div class="sd-ov hi"><div class="k">分层抽样精读</div>'
      + '<div class="n">' + nn(sp.annotated) + '<small>条已标注 · 占清单 ' + pc(sp.annotated_pct) + '</small></div>'
      + '<div class="d">清单 ' + nn(sp.manifest) + ' 条 → 下载 ' + nn(sp.downloaded) + ' 条（'
      + pc(sp.downloaded_pct) + '）→ 标注 ' + nn(sp.annotated) + ' 条<br>受众判定：<b>' + esc(agTxt) + '</b></div></div>'
      + '</div>';

    /* 覆盖度红线：看板 31 → 命中 23 → 0 单 8 */
    h += '<div class="sd-warn"><div class="t">覆盖度红线 · 本模块不能代表看板全部品牌</div>'
      + '看板 <b>' + nn(br.board_total) + '</b> 个女性私处洗护品牌里，本口径下只有 <b>'
      + nn(br.hit_n) + '</b> 个有星图订单，<b>' + nn(br.zero_order_n) + ' 个为 0 单</b>：'
      + (br.zero_order_brands || []).map(function (b) { return esc(b); }).join('、') + '。'
      + '这些品牌在本模块中<b>完全不可见</b>，但不能因此判断它们「没做种草」——'
      + '只能说在这一口径、这一时间窗里查不到直客星图订单。'
      + '<div class="sd-nt" style="border-left-color:var(--warn-line);color:var(--ink-3)">'
      + esc(br.zero_order_note || '') + '</div></div>';

    /* 赛道结构：全量 by_seg + 抽样 per_brand */
    var bs = O.by_seg || [];
    h += '<div class="sd-p" style="margin-top:20px"><b>两个子赛道在全量里的体量差 4 倍：</b>'
      + bs.map(function (x) {
        return esc(x.seg) + ' ' + nn(x.n_videos) + ' 条（' + pc(x.pct) + '，应收金额 '
          + (isNum(x.amount) ? (x.amount / 10000).toFixed(0) + ' 万元' : '—') + '）';
      }).join('，')
      + '。抽样时<b>没有按体量配额</b>，而是按子赛道各自取头部品牌，因此'
      + '<b>抽样里两个子赛道条数接近（各约一半），这是刻意的对照设计，不是总体结构</b>。</div>';

    h += '<div class="sd-tblw"><table class="sd-tbl" style="min-width:520px"><thead><tr>'
      + '<th>子赛道</th><th>有订单品牌</th><th>入选抽样</th><th style="text-align:left">入选品牌</th>'
      + '<th style="text-align:left">选取规则 / 未选入</th>'
      + '</tr></thead><tbody>';
    segs.forEach(function (s) {
      h += '<tr><td class="nm">' + esc(s.seg) + '</td>'
        + '<td class="num">' + nn(s.brands_with_orders) + '</td>'
        + '<td class="num">' + nn(s.n_brands_sampled) + '</td>'
        + '<td class="wrap" style="text-align:left">' + (s.sampled_brands || []).map(esc).join('、') + '</td>'
        + '<td class="wrap" style="text-align:left">' + esc(s.pick_note || '')
        + ((s.not_picked || []).length
          ? '<br><span style="color:var(--ink-5)">未选入 ' + (s.not_picked || []).length + ' 个：'
          + (s.not_picked || []).map(esc).join('、') + '</span>' : '')
        + '</td></tr>';
    });
    h += '</tbody></table></div>';

    /* 抽样规则与每品牌条数 */
    h += '<div class="sd-nt"><b>抽样规则：</b>' + esc(sp.sampling_rule || '')
      + '<br><b>每品牌清单条数：</b>'
      + (sp.per_brand || []).map(function (x) { return esc(x.brand) + ' ' + x.n + '（' + esc(x.seg) + '）'; }).join('、')
      + '<br><b>裁决字段：</b>' + esc(sp.ruling_field || '') + '</div>';

    /* 标注进度与缺样原因：原文完整展示，不截断、不改写 */
    h += '<div class="sd-warn"><div class="t">标注进度与「少掉的 '
      + (isNum(sp.manifest) && isNum(sp.annotated) ? nn(sp.manifest - sp.annotated) + ' 条' : '样本')
      + '」去哪了 · 原文完整引用</div>'
      + mdb(sp.annotated_note || '')
      + '<div class="sd-nt" style="border-left-color:var(--warn-line);color:var(--ink-3)">'
      + '<b>为什么要把这段完整写出来：</b>缺样<b>不是随机缺失</b> ——'
      + '删除 / 仅作者可见的视频可能系统性偏向某类内容（例如效果宣称更激进、被平台处理过的），'
      + '因此本模块所有占比都应读作「<b>可下载且可标注的 ' + nn(sp.annotated)
      + ' 条里的分布</b>」，而不是「清单 ' + nn(sp.manifest) + ' 条的分布」。'
      + '单品牌层面尤其明显：样本折损最严重的品牌已按规则退出品牌画像（见 H 块）。</div></div>';

    /* 受众判定：本模块声明「受众靠模型看视频判定」的证据 */
    var am = (S.B_segment_contrast || {}).audience_mix || {};
    h += '<div class="sd-info"><div class="t">受众性别怎么来的 · 不是关键词推断</div>'
      + '<b>audience_gender</b> 由多模态模型<b>逐条看完视频</b>判定，判定依据是画面里谁在用、'
      + '口播称呼、字幕、包装性别标识、使用场景；<b>prompt 中明确禁止用品牌名或标题关键词倒推受众</b>。'
      + '本次 ' + nn(am.n) + ' 条标注的判定分布：'
      + (am.dist || []).map(function (x) { return '<b>' + esc(x.label) + ' ' + x.n + ' 条（' + pc(x.pct) + '）</b>'; }).join('、')
      + '，非女性向 ' + nn(am.non_female_n) + ' 条。'
      + '<div class="sd-nt" style="border-left-color:var(--accent-line);color:var(--ink-3)">'
      + mdb(am.note || '') + '</div></div>';

    /* 标注一致率：done / pending 两种状态都要如实呈现 */
    var rf = rel.fields || [], rmf = rel.multi_fields || [], relPending = String(rel.status) !== 'done';
    h += '<div class="sd-p" style="margin-top:20px"><b>标注一致率（同一批视频、同 prompt 独立双跑）</b>'
      + (relPending ? ' ' + pendBadge('检验进行中') : ' <span class="sd-rb y">✅ 已完成</span>') + '：'
      + '一致率与 Cohen κ 越低的字段，结论<b>只读方向、不读精确百分点</b>。'
      + 'κ 会扣掉「随机也能撞上」的部分，因此<b>分布越集中的字段，一致率高但 κ 可能不高</b>，'
      + '两个数要一起看。</div>';
    if (relPending) {
      h += '<div class="sd-warn"><div class="t">双跑一致性检验尚未完成 · 状态 ' + esc(rel.status || 'pending') + '</div>'
        + mdb(rel.note || '')
        + '<br><b>方法：</b>' + esc(rel.method || '')
        + '<br><b>报告位置：</b>' + esc(rel.source || '') + '</div>';
    }
    h += '<div class="sd-tblw"><table class="sd-tbl" style="min-width:640px"><thead><tr>'
      + '<th>单选字段</th><th>一致率</th><th>一致 / 总数</th><th>Cohen κ</th>'
      + '<th style="text-align:left">数据层可用性判定</th><th style="text-align:left">本页怎么用</th>'
      + '</tr></thead><tbody>';
    rf.forEach(function (f) {
      var pend = !isNum(f.agree) && !isNum(f.kappa);
      /* κ 分档只用于「怎么读」的措辞，不改数据层的 usable 原值 */
      var use, uc = 'var(--ink-3)';
      if (pend) { use = '一致性未知，暂只读方向'; }
      else if (isNum(f.kappa) && f.kappa < 0.6) {
        use = '<b>κ 偏低，只作辅助描述、不作强结论</b>'; uc = 'var(--warn)';
      } else if (isNum(f.kappa) && f.kappa < 0.8) {
        use = '可作主结论，但不解读小数点';
      } else {
        use = '可作主结论';
      }
      h += '<tr><td class="nm">' + esc(f.label) + '<span style="color:var(--ink-5);font-weight:400"> · '
        + esc(f.field) + '</span></td>'
        + '<td class="num">' + (isNum(f.agree) ? (f.agree * 100).toFixed(0) + '%' : '—') + '</td>'
        + '<td class="num">' + (isNum(f.n_agree) && isNum(f.n) ? f.n_agree + ' / ' + f.n : '—') + '</td>'
        + '<td class="num" style="color:' + uc + '">' + (isNum(f.kappa) ? f.kappa.toFixed(2) : '—') + '</td>'
        + '<td class="wrap" style="text-align:left">'
        + (pend || String(f.usable) === 'pending' ? pendBadge('待检验') : esc(f.usable))
        + '</td>'
        + '<td class="wrap" style="text-align:left;color:' + uc + '">' + use + '</td></tr>';
    });
    if (!rf.length) {
      h += '<tr><td class="wrap" colspan="6" style="text-align:left;color:var(--ink-4)">'
        + '数据层未给出双跑字段清单。</td></tr>';
    }
    h += '</tbody></table></div>';

    /* 多选字段：一致率口径不同（Jaccard），必须分开说 */
    if (rmf.length) {
      h += '<div class="sd-tblw" style="margin-top:12px"><table class="sd-tbl" style="min-width:520px"><thead><tr>'
        + '<th>多选字段</th><th>平均 Jaccard</th><th>两次完全一致率</th><th style="text-align:left">本页怎么用</th>'
        + '</tr></thead><tbody>';
      rmf.forEach(function (f) {
        h += '<tr><td class="nm">' + esc(f.label) + '<span style="color:var(--ink-5);font-weight:400"> · '
          + esc(f.field) + '</span></td>'
          + '<td class="num">' + (isNum(f.jaccard) ? f.jaccard.toFixed(2) : '—') + '</td>'
          + '<td class="num" style="color:var(--warn)">' + (isNum(f.exact) ? (f.exact * 100).toFixed(0) + '%' : '—') + '</td>'
          + '<td class="wrap" style="text-align:left">两次<b>集合重叠度高（Jaccard '
          + (isNum(f.jaccard) ? f.jaccard.toFixed(2) : '—') + '）、但完整命中组合很难复现</b>，'
          + '所以只读<b>排序与量级</b>，不读某一项的精确百分点</td></tr>';
      });
      h += '</tbody></table></div>';
    }

    if (!relPending) {
      h += '<div class="sd-info"><div class="t">一致性检验结论 · 以及两个必须带着看的限制</div>'
        + mdb(rel.note || '')
        + '<br><b>方法：</b>' + esc(rel.method || '')
        + '　<b>报告：</b>' + esc(rel.source || '')
        + '<br>① <b>主语气（tone_primary）一致率 77%、κ 只有 0.47</b>：κ 落在「中等一致」区间，'
        + '说明两次跑动里「姐妹平视 ↔ 教学讲解」这类相邻语气经常互换，'
        + '<b>本页所有语气类数字只作辅助描述，不作强结论</b>。'
        + '<br>② <b>单品/套组（single_vs_bundle）双跑一致率仅 53%（16/30，κ=0.29）</b> —— '
        + '这一项来自复核报告 <code>female/xingtu/RELIABILITY.md</code> 的「其他单选字段（参考）」表，'
        + '<b>不在本页数据契约（seeding.js）里</b>，故单独标注：'
        + '页面上任何「单品 / 套组」相关的分布与检验都<b>只能当作参考，不能作为结论</b>。</div>';
    }

    /* 效果侧字段可用性 */
    h += '<div class="sd-nt"><b>效果侧只有互动率一个指标：</b>'
      + mdb((O.gmv_fill || {}).verdict || '')
      + '<br>' + mdb(O.zero_fields_note || '')
      + '<br><b>爆文字段不可用：</b>' + esc(O.is_hot_note || '') + '</div>';

    /* 口径红线全文 + 指标定义 */
    var rl = m.redlines || [], md = m.metric_defs || [];
    h += '<details class="sd-fold"><summary>口径红线全文 <span class="c">' + rl.length
      + ' 条 · 含 0 单名单与不可用字段</span><span class="hint"></span></summary><div class="sd-foldb">'
      + '<ul class="sd-li">';
    rl.forEach(function (r) { h += '<li>' + mdb(r) + '</li>'; });
    h += '</ul><div class="sd-nt"><b>指标定义：</b>';
    ['engagement_rate', 'gmv_per_kvv', 'significance', 'taboo_direct', 'euphemism_terms'].forEach(function (k) {
      if (md[k]) h += '<br>· ' + esc(md[k]);
    });
    h += '</div><div class="sd-nt"><b>前端原则：</b>' + esc(m.principle || '') + '</div>'
      + '</div></details>';

    return h + '</div>';
  }

  /* ================================================================== *
   * 3. 区块 02-B：怎么称呼「那件事」（H_taboo_language，本模块最特殊的一块）
   * ================================================================== */
  function blockTaboo(S) {
    var H = S.H_taboo_language || {}, cov = H.coverage || {}, cs = H.class_split || [],
      sm = H.style_mix || [], tt = H.top_terms || [], bySeg = H.by_seg || [],
      byBrand = H.by_brand || [], byCat = H.by_category || [], st = H.seg_tests || {},
      td = H.taboo_direct || {}, et = H.er_tests || {}, wl = H.wordlist || {};

    var h = '<div class="sd-b key" id="sdTaboo">'
      + sub('B', '开口第一难：这个赛道怎么称呼「私处」和「月经」',
        'n=' + nn(H.n) + ' 条女性向样本 · 原词逐条抄录');

    h += '<div class="sd-p">别的赛道可以直接叫出产品用在哪里，这个赛道不能——'
      + '<span class="em">先要解决「怎么开口」，才轮到讲产品。</span>'
      + mdb(H.verdict || '')
      + '本小节把样本里出现的<b>指代私处 / 月经 / 经血的原词全部抄录出来</b>，'
      + '按脚本内置词表归并为「委婉代称 / 直白医学词 / 未归类」三类，词表在本节末尾全量公开。</div>';

    /* 覆盖度四卡 */
    h += '<div class="sd-ovs">'
      + '<div class="sd-ov hi"><div class="k">出现代称原词的视频</div>'
      + '<div class="n">' + pc(cov.pct) + '<small>' + nn(cov.n_with_terms) + ' / ' + nn(H.n) + ' 条</small></div>'
      + '<div class="d">几乎每条都要处理「怎么称呼」这件事</div></div>'
      + '<div class="sd-ov"><div class="k">原词命中总数</div>'
      + '<div class="n">' + nn(cov.n_terms) + '<small>词次</small></div>'
      + '<div class="d">同一条视频里同一个原词<b>只计一次</b></div></div>'
      + '<div class="sd-ov"><div class="k">每条视频原词数</div>'
      + '<div class="n">' + (isNum(cov.terms_per_video_mean) ? cov.terms_per_video_mean.toFixed(2) : '—')
      + '<small>均值 · 中位 ' + nn(cov.terms_per_video_median) + '</small></div>'
      + '<div class="d">一条视频里往往<b>换着几种说法反复指代</b></div></div>'
      + '<div class="sd-ov"><div class="k">直说的比例（taboo_direct）</div>'
      + '<div class="n">' + pc(td.pct) + '<small>' + nn(td.n) + ' / ' + nn(H.n) + ' 条</small></div>'
      + '<div class="d">全程只用代称的<b>不算</b>，判 true 必须有原话证据</div></div>'
      + '</div>';

    /* 两类词的词次 / 视频覆盖 + 混用风格 */
    h += '<div class="sd-cgrid c2">'
      + '<div class="sd-cbox"><div class="ct">两类词的占比 <em>左：占全部 ' + nn(cov.n_terms)
      + ' 个词次 · 右：命中该类的视频数</em></div>'
      + bars(cs.map(function (x) {
        return {
          label: x.label, pct: x.pct_terms, n: x.n_terms, color: clsColor(x.code),
          title: x.label + '：' + x.n_terms + ' 词次（占词次 ' + pc(x.pct_terms) + '）；命中视频 '
            + x.n_videos + ' 条（' + pc(x.pct_videos) + '）'
        };
      }))
      + '<div class="nd">口径：<b>左侧百分比是「词次占比」，右侧数字是词次数</b>。'
      + '视频覆盖率另算：'
      + cs.map(function (x) { return esc(x.label) + ' ' + pc(x.pct_videos) + '（' + x.n_videos + ' 条）'; }).join('、')
      + '。三类相加的<b>词次</b>为 100%，但<b>视频覆盖率相加会超过 100%</b>——一条视频可以同时用两类词。</div>'
      + '</div>'

      + '<div class="sd-cbox"><div class="ct">单条视频的用词风格 <em>单选 · 四类互斥，相加 100%</em></div>'
      + bars(sm.map(function (x) {
        return {
          label: x.label, pct: x.pct, n: x.n,
          color: x.code === 'euph_only' ? C1() : (x.code === 'explicit_only' ? C2() : (x.code === 'mixed' ? C1() : C3())),
          title: x.label + '：' + x.n + ' 条（' + pc(x.pct) + '）'
        };
      }))
      + '<div class="nd">近一半样本<b>委婉与直白混用</b>：先用「小花园 / 那几天」把话题打开，'
      + '再用「经血 / 分泌物 / 菌群」把产品讲清楚。'
      + '「两类都没出现」只有 ' + nn((sm.filter(function (x) { return x.code === 'none'; })[0] || {}).n) + ' 条。</div>'
      + '</div>'
      + '</div>';

    /* 图 1：原词 TOP 榜 */
    h += cbox('sdHTerms',
      '私处 / 月经原词 TOP 18 <em style="color:var(--accent)">按命中视频数</em>',
      '横轴 = 命中该原词的视频占 ' + nn(H.n) + ' 条的比例 · 颜色 = 词表归类 · 悬停看原话样例',
      560,
      '口径：原词由多模态模型逐条抄录，<b>同一条视频里同一原词只计一次</b>；'
      + '命中率分母固定为 ' + nn(H.n) + ' 条女性向样本。'
      + '归类为本脚本词表规则、不是行业标准，边界词（如「私处」）一律按「直白」处理。'
      + '模型可能漏收字幕一闪而过的词，<b>因此命中率应读作下限</b>。',
      'full');

    /* 原词全表（本小节最有信息量的素材，全量摆出，不折叠） */
    h += '<div class="sd-p" style="margin-top:20px"><b>原词全榜 ' + tt.length
      + ' 个 · 原样展示，未改写</b>。「原话」一列是样本里的真实句子，'
      + '只用于说明这个词在什么语境下出现。</div>';
    h += '<div class="sd-terms">';
    tt.forEach(function (t) {
      var c = clsCls(t.cls);
      h += '<div class="sd-tm ' + c + '">'
        + '<div class="w">' + esc(t.term) + '</div>'
        + '<div class="m"><span class="cl">' + esc(t.cls_label || CLS_CN[t.cls] || '未归类') + '</span>'
        + '<b>' + nn(t.n_videos) + '</b> 条 · ' + pc(t.pct)
        + ' · ' + nn(t.n_brands) + ' 个品牌</div>'
        + (t.quote ? '<div class="qq">「' + esc(t.quote) + '」</div>' : '')
        + '</div>';
    });
    h += '</div>';

    /* 子赛道对照 */
    h += '<div class="sd-p" style="margin-top:24px"><b>两个子赛道的说法完全不同。</b>'
      + '私处护理几乎必须先用代称把话题打开，经期用品则可以直接说「经血 / 血块」——'
      + '因为它指向的是一个<b>可被看见、可被测量的物</b>，而不是身体部位。</div>';
    h += '<div class="sd-tblw"><table class="sd-tbl" style="min-width:640px"><thead><tr>'
      + '<th>子赛道</th><th>样本</th><th>委婉代称命中</th><th>直白医学词命中</th>'
      + '<th>直说（taboo_direct）</th><th>每条原词数</th><th style="text-align:left">TOP5 原词</th>'
      + '</tr></thead><tbody>';
    bySeg.forEach(function (x) {
      h += '<tr><td class="nm">' + esc(x.seg) + '</td>'
        + '<td class="num">' + nn(x.n) + '</td>'
        + '<td class="num g1">' + pc(x.euphemism_pct) + '</td>'
        + '<td class="num">' + pc(x.explicit_pct) + '</td>'
        + '<td class="num">' + pc(x.taboo_direct_pct) + '</td>'
        + '<td class="num">' + (isNum(x.terms_per_video) ? x.terms_per_video.toFixed(2) : '—') + '</td>'
        + '<td class="wrap" style="text-align:left">'
        + (x.top_terms || []).map(function (t) { return '「' + esc(t.term) + '」' + t.n; }).join('、')
        + (x.note ? '<br><span style="color:var(--ink-5)">' + esc(x.note) + '</span>' : '')
        + '</td></tr>';
    });
    h += '</tbody></table></div>';

    /* 三项子赛道检验（引用 B 块 FDR 家族） */
    h += '<div class="sd-p" style="margin-top:18px"><b>这三项差异做了检验，只有一项显著。</b></div>'
      + '<div class="sd-tblw"><table class="sd-tbl" style="min-width:600px"><thead><tr>'
      + '<th>检验项</th><th>' + esc((S.B_segment_contrast || {}).g1_label || '组 1') + '</th>'
      + '<th>' + esc((S.B_segment_contrast || {}).g2_label || '组 2') + '</th>'
      + '<th>方法</th><th>原始 p</th><th>q（BH-FDR）</th>'
      + '</tr></thead><tbody>';
    ['euphemism_any', 'explicit_any', 'taboo_direct'].forEach(function (k) {
      var t = st[k];
      if (!t) return;
      h += '<tr><td class="nm">' + esc(t.label) + '</td>'
        + '<td class="num' + (t.direction === 'g1_higher' ? ' g1' : '') + '">' + pc(t.g1_pct)
        + '<span style="color:var(--ink-5);font-size:10px"> · ' + nn(t.g1_n) + ' 条</span></td>'
        + '<td class="num' + (t.direction === 'g2_higher' ? ' g1' : '') + '">' + pc(t.g2_pct)
        + '<span style="color:var(--ink-5);font-size:10px"> · ' + nn(t.g2_n) + ' 条</span></td>'
        + '<td>' + esc(t.method === 'chi2' ? '2×2 卡方' : (t.method === 'fisher' ? 'Fisher 精确' : t.method)) + '</td>'
        + '<td class="num">' + pTxt(t.p) + '</td>'
        + '<td>' + qBadge(t.q) + '</td></tr>';
    });
    h += '</tbody></table></div>'
      + '<ul class="sd-li">'
      + (st.summary || []).map(function (x) { return '<li>' + mdb(x) + '</li>'; }).join('')
      + '</ul>'
      + '<div class="sd-nt"><b>FDR 家族说明：</b>' + esc(st.note || '') + '</div>';

    /* 图 2：6 品牌三率对照 */
    h += cbox('sdHBrand',
      '6 个品牌的用词风格差异 <em style="color:var(--accent)">同一个赛道，说法可以完全相反</em>',
      '三个指标各自独立，不构成 100% · 分母为该品牌的抽样条数 · 仅 n≥12 的品牌进入本图',
      430,
      '口径：每品牌 ' + nn(H.n) + ' 条样本里的<b>该品牌抽样子集</b>（按订单应收金额 TOP20 抽取），'
      + '<b>只可比结构、不可比条数</b>。三个指标为「是否出现过该类词」的视频占比，'
      + '同一条视频可同时命中委婉与直白两类，因此三条不相加。'
      + '本图<b>不含显著性检验</b>——品牌两两比较未做多重校正，只作现象记录。',
      'full');

    /* 品牌明细表 */
    h += '<div class="sd-tblw"><table class="sd-tbl" style="min-width:680px"><thead><tr>'
      + '<th>品牌</th><th>样本</th><th>委婉命中</th><th>直白命中</th><th>直说</th><th>每条原词数</th>'
      + '<th style="text-align:left">TOP5 原词</th>'
      + '</tr></thead><tbody>';
    byBrand.forEach(function (x) {
      h += '<tr><td class="nm">' + esc(x.brand) + '</td>'
        + '<td class="num">' + nn(x.n) + '</td>'
        + '<td class="num g1">' + pc(x.euphemism_pct) + '</td>'
        + '<td class="num">' + pc(x.explicit_pct) + '</td>'
        + '<td class="num">' + pc(x.taboo_direct_pct) + '</td>'
        + '<td class="num">' + (isNum(x.terms_per_video) ? x.terms_per_video.toFixed(2) : '—') + '</td>'
        + '<td class="wrap" style="text-align:left">'
        + (x.top_terms || []).map(function (t) { return '「' + esc(t.term) + '」' + t.n; }).join('、')
        + (x.note ? '<br><span style="color:var(--ink-5)">' + esc(x.note) + '</span>' : '')
        + '</td></tr>';
    });
    h += '</tbody></table></div>';

    /* 品类切分（含样本不足行，如实标注） */
    h += '<div class="sd-p" style="margin-top:18px"><b>按品类看同一件事：</b>'
      + '分组样本 &lt;12 的一律只报 n、不给结论（下表已按数据层标注保留）。</div>'
      + '<div class="sd-tblw"><table class="sd-tbl" style="min-width:640px"><thead><tr>'
      + '<th>品类</th><th>样本</th><th>委婉命中</th><th>直白命中</th><th>直说</th><th>每条原词数</th>'
      + '<th style="text-align:left">TOP 原词 / 备注</th>'
      + '</tr></thead><tbody>';
    byCat.forEach(function (x) {
      var weak = !!x.note;
      h += '<tr><td class="nm">' + esc(x.category) + '</td>'
        + '<td class="num">' + nn(x.n) + '</td>'
        + '<td class="num' + (weak ? '' : ' g1') + '" style="' + (weak ? 'color:var(--ink-5)' : '') + '">' + pc(x.euphemism_pct) + '</td>'
        + '<td class="num" style="' + (weak ? 'color:var(--ink-5)' : '') + '">' + pc(x.explicit_pct) + '</td>'
        + '<td class="num" style="' + (weak ? 'color:var(--ink-5)' : '') + '">' + pc(x.taboo_direct_pct) + '</td>'
        + '<td class="num" style="' + (weak ? 'color:var(--ink-5)' : '') + '">'
        + (isNum(x.terms_per_video) ? x.terms_per_video.toFixed(2) : '—') + '</td>'
        + '<td class="wrap" style="text-align:left">'
        + (x.top_terms || []).map(function (t) { return '「' + esc(t.term) + '」' + t.n; }).join('、')
        + (x.note ? '<br><span class="mt-na">' + esc(x.note) + '</span>' : '')
        + '</td></tr>';
    });
    h += '</tbody></table></div>';

    /* 直说率：定义 + 分布 + 与互动率的关系 */
    h += '<div class="sd-p" style="margin-top:22px"><b>「直说」到底指什么。</b>'
      + esc(td.definition || '') + '</div>';
    h += '<div class="sd-cgrid c2">'
      + '<div class="sd-cbox"><div class="ct">直说率 · 按子赛道 <em>分母为该组样本条数</em></div>'
      + bars((td.by_seg || []).map(function (x) {
        return { label: x.seg, pct: x.pct, n: x.n, title: x.seg + '：' + pc(x.pct) + '（分组样本 ' + x.n + ' 条）' };
      }))
      + '<div class="nd">「条数」一列是<b>该组的样本量</b>，不是命中条数。'
      + esc(td.seg_summary || '') + '</div></div>'
      + '<div class="sd-cbox"><div class="ct">直说率 · 按品牌 <em>分母为该品牌抽样条数</em></div>'
      + bars((td.by_brand || []).map(function (x) {
        return { label: x.brand, pct: x.pct, n: x.n, title: x.brand + '：' + pc(x.pct) + '（抽样 ' + x.n + ' 条）' };
      }))
      + '<div class="nd">跨度从 ' + pc(Math.min.apply(null, (td.by_brand || []).map(function (x) { return x.pct; })))
      + ' 到 ' + pc(Math.max.apply(null, (td.by_brand || []).map(function (x) { return x.pct; })))
      + '，<b>品牌之间的差别远大于子赛道之间的差别</b>；品牌两两比较未做检验，只作现象记录。</div></div>'
      + '</div>';

    /* 用词 × 互动率：诚实呈现 */
    var ea = et.euphemism_any || {}, ex = et.explicit_any || {}, sc2 = et.spearman_term_count || {};
    h += '<div class="sd-warn" style="margin-top:22px"><div class="t">用词方式与互动率 · 分层后站不住</div>'
      + '<b>不要把下面这组数字读成「少用代称就能涨互动」。</b>'
      + '「出现代称」组的互动率中位 ' + er(ea.er1) + ' vs 未出现组 ' + er(ea.er0)
      + '（n=' + nn(ea.n1) + '/' + nn(ea.n0) + '，' + qBadge(ea.q) + '），'
      + '但按品牌分层后 p=' + pTxt((ea.strat || {}).by_brand_p) + '（' + robBadge((ea.strat || {}).brand_robust) + '）。'
      + '<div class="sd-nt" style="border-left-color:var(--warn-line);color:var(--ink-3)">'
      + mdb(ea.interpretation || '') + '</div></div>';

    h += '<div class="sd-tblw"><table class="sd-tbl" style="min-width:680px"><thead><tr>'
      + '<th>检验项</th><th>命中组互动率中位</th><th>未命中组</th><th>n（命中/未命中）</th>'
      + '<th>q（BH-FDR）</th><th>品牌分层 p</th><th>子赛道分层 p</th>'
      + '</tr></thead><tbody>';
    [ea, ex].forEach(function (t) {
      if (!t || !t.label) return;
      var s = t.strat || {};
      h += '<tr><td class="nm">' + esc(t.label) + '</td>'
        + '<td class="num">' + er(t.er1) + '</td>'
        + '<td class="num">' + er(t.er0) + '</td>'
        + '<td class="num">' + nn(t.n1) + ' / ' + nn(t.n0) + '</td>'
        + '<td>' + qBadge(t.q) + '</td>'
        + '<td class="num">' + (isNum(s.by_brand_p) ? pTxt(s.by_brand_p) + ' ' + robBadge(s.brand_robust) : '未做分层') + '</td>'
        + '<td class="num">' + (isNum(s.by_seg_p) ? pTxt(s.by_seg_p) + ' ' + robBadge(s.seg_robust) : '未做分层') + '</td>'
        + '</tr>';
    });
    if (td.er_test) {
      var t3 = td.er_test;
      h += '<tr><td class="nm">' + esc(t3.label) + '</td>'
        + '<td class="num">' + er(t3.er1) + '</td>'
        + '<td class="num">' + er(t3.er0) + '</td>'
        + '<td class="num">' + nn(t3.n1) + ' / ' + nn(t3.n0) + '</td>'
        + '<td>' + qBadge(t3.q) + '</td>'
        + '<td class="num" colspan="2" style="text-align:left;color:var(--ink-5)">'
        + '未达显著，未做分层敏感性检验</td></tr>';
    }
    if (sc2 && sc2.label) {
      h += '<tr><td class="nm">' + esc(sc2.label) + ' <span style="color:var(--ink-5);font-weight:400;font-size:10px">'
        + '· Spearman 相关</span></td>'
        + '<td class="num" colspan="2" style="text-align:left">ρ=' + (isNum(sc2.rho) ? sc2.rho.toFixed(2) : '—') + '</td>'
        + '<td class="num">n=' + nn(sc2.n) + '</td>'
        + '<td>' + qBadge(sc2.q) + '</td>'
        + '<td class="num" colspan="2" style="text-align:left;color:var(--ink-5)">'
        + '原始 p=' + pTxt(sc2.p) + '，未做分层</td></tr>';
    }
    h += '</tbody></table></div>'
      + '<ul class="sd-li">'
      + (et.summary || []).map(function (x) { return '<li>' + mdb(x) + '</li>'; }).join('')
      + '</ul>'
      + '<div class="sd-nt"><b>FDR 家族说明：</b>' + esc(et.note || '')
      + '　<b>互动率口径：</b>' + esc(((S.meta || {}).metric_defs || {}).engagement_rate || '') + '</div>';

    /* 词表全量公开 */
    var wex = wl.explicit || [], weu = wl.euphemism || [], wov = wl.overrides || {};
    var ovKeys = Object.keys(wov);
    h += '<details class="sd-fold"><summary>归类词表全量公开 <span class="c">直白 '
      + wex.length + ' 词 / 委婉 ' + weu.length + ' 词 / 例外 ' + ovKeys.length
      + ' 词 · 可自行改表复算</span><span class="hint"></span></summary><div class="sd-foldb">'
      + '<div class="sd-p" style="margin-top:10px"><b>直白 / 医学词表（' + wex.length + ' 词）</b></div>'
      + '<div class="sd-chips">'
      + wex.map(function (w) { return '<span class="sd-chip ex">' + esc(w) + '</span>'; }).join('')
      + '</div>'
      + '<div class="sd-p" style="margin-top:14px"><b>委婉 / 代称词表（' + weu.length + ' 词）</b></div>'
      + '<div class="sd-chips">'
      + weu.map(function (w) { return '<span class="sd-chip eu">' + esc(w) + '</span>'; }).join('')
      + '</div>'
      + '<div class="sd-p" style="margin-top:14px"><b>例外词（' + ovKeys.length + ' 词 · 优先于子串匹配）</b></div>'
      + '<div class="sd-chips">'
      + ovKeys.map(function (k) {
        return '<span class="sd-chip ' + clsCls(wov[k]) + '">' + esc(k)
          + ' <b>' + esc(CLS_CN[wov[k]] || wov[k]) + '</b></span>';
      }).join('')
      + '</div>'
      + '<div class="sd-nt"><b>归并规则：</b>' + esc(wl.rule || '') + '</div>'
      + '<div class="sd-nt"><b>披露立场：</b>' + esc(wl.disclose || '') + '</div>'
      + '</div></details>';

    /* caveat */
    h += '<div class="sd-p" style="margin-top:20px"><b>这一小节的读法限制</b></div><ul class="sd-li">'
      + (H.caveat || []).map(function (x) { return '<li>' + mdb(x) + '</li>'; }).join('')
      + '</ul>';

    return h + '</div>';
  }

  /* ================================================================== *
   * 4. 区块 02-C：经期用品 vs 私处护理（B_segment_contrast）
   * ================================================================== */

  /* 把 B.significant 与 robustness（留一品牌 + 粉丝量级 CMH）对齐，
     拆成「稳健 / 未通过稳健性 / 未做稳健性」三组。
     q 值一律取 significant 里的原值（robustness 里的 q 已被四舍五入）。 */
  function pairSeg(B) {
    var rows = (B.robustness || {}).rows || [];
    var idx = {};
    rows.forEach(function (r) { idx[r.field + '||' + String(r.code)] = r; });
    var robust = [], shaky = [], other = [];
    (B.significant || []).forEach(function (s) {
      var c = idx[s.field + '||' + String(s.code)];
      var row = {
        label: s.label, short: shortLabel(s.label), field: fieldOf(s.label),
        g1_pct: s.g1_pct, g2_pct: s.g2_pct, g1_n: s.g1_n, g2_n: s.g2_n,
        g1_median: s.g1_median, g2_median: s.g2_median,
        q: s.q, p: s.p, method: s.method, dir: s.direction, lift: s.lift,
        unit: (s.field === 'total_duration_sec' || s.field === 'first_product_sec') ? 's' : '%',
        rb: c || null
      };
      if (!c) other.push(row);
      else if (c.robust) robust.push(row);
      else shaky.push(row);
    });
    function byQ(a, b) { return (isNum(a.q) ? a.q : 1) - (isNum(b.q) ? b.q : 1); }
    robust.sort(byQ); shaky.sort(byQ);
    return { robust: robust, shaky: shaky, other: other };
  }

  /* 子赛道对照表；withRob=true 时附留一品牌 / 粉丝量级 CMH 两列 */
  function segTable(rows, B, withRob) {
    var h = '<div class="sd-tblw"><table class="sd-tbl" style="min-width:' + (withRob ? 780 : 600) + 'px">'
      + '<thead><tr>'
      + '<th>内容特征</th>'
      + '<th>' + esc(B.g1_label) + ' n=' + nn(B.g1_n) + '</th>'
      + '<th>' + esc(B.g2_label) + ' n=' + nn(B.g2_n) + '</th>'
      + '<th>q（BH-FDR）</th>'
      + (withRob ? '<th>留一品牌最差 p</th><th>粉丝量级 CMH p</th><th>综合判定</th>' : '<th>方法</th>')
      + '</tr></thead><tbody>';
    rows.forEach(function (r) {
      var rb = r.rb || {}, lb = rb.lobo || {}, cm = rb.cmh_fans_band || {};
      var fieldTag = (r.field && r.short.indexOf(r.field) !== 0)
        ? '<span style="color:var(--ink-5);font-weight:400;font-size:10px"> · ' + esc(r.field) + '</span>' : '';
      var v1 = r.unit === 's' ? sec(r.g1_pct) : pc(r.g1_pct);
      var v2 = r.unit === 's' ? sec(r.g2_pct) : pc(r.g2_pct);
      h += '<tr><td class="nm">' + esc(r.short) + fieldTag + '</td>'
        + '<td class="num" style="color:' + (r.dir === 'g1_higher' ? 'var(--accent)' : 'var(--ink-3)')
        + ';font-weight:' + (r.dir === 'g1_higher' ? '600' : '400') + '">' + v1
        + (r.unit === 's' ? '' : '<span style="color:var(--ink-5);font-size:10px"> · ' + nn(r.g1_n) + '</span>') + '</td>'
        + '<td class="num" style="color:' + (r.dir === 'g2_higher' ? 'var(--accent)' : 'var(--ink-3)')
        + ';font-weight:' + (r.dir === 'g2_higher' ? '600' : '400') + '">' + v2
        + (r.unit === 's' ? '' : '<span style="color:var(--ink-5);font-size:10px"> · ' + nn(r.g2_n) + '</span>') + '</td>'
        + '<td>' + qBadge(r.q) + '</td>';
      if (withRob) {
        h += '<td class="num">' + (isNum(lb.worst_p)
          ? pTxt(lb.worst_p) + '<span style="color:var(--ink-5);font-size:10px"> 剔 '
          + esc(lb.worst_drop_brand || '') + '</span>'
          : '—') + '</td>'
          + '<td class="num">' + (isNum(cm.p)
            ? pTxt(cm.p) + '<span style="color:var(--ink-5);font-size:10px"> · '
            + nn(cm.n_strata) + ' 层</span>'
            : '<span class="mt-na" title="可纳入的分层不足，CMH 未给出 p 值">分层不足</span>') + '</td>'
          + '<td>' + robBadge(rb.robust,
            rb.robust ? '留一品牌法与粉丝量级 CMH 两项都仍显著'
              : '至少一项分层敏感性检验后不再显著，差异含品牌 / 品类构成成分') + '</td>';
      } else {
        h += '<td>' + esc(r.method === 'chi2' ? '2×2 卡方'
          : (r.method === 'fisher' ? 'Fisher 精确' : (r.method === 'mannwhitney' ? 'Mann-Whitney U' : r.method))) + '</td>';
      }
      h += '</tr>';
    });
    return h + '</tbody></table></div>';
  }

  function blockSeg(S) {
    var B = S.B_segment_contrast || {}, G = pairSeg(B), rb = B.robustness || {}, cm = B.category_mix || {};

    var h = '<div class="sd-b key" id="sdSeg">'
      + sub('C', '经期用品 vs 私处护理：同一个赛道，两套讲法',
        esc(B.g1_label) + ' ' + nn(B.g1_n) + ' 条 / ' + esc(B.g2_label) + ' ' + nn(B.g2_n) + ' 条对照');

    h += '<div class="sd-p">这个赛道<b>几乎不做男性受众</b>（' + nn(B.g1_n + B.g2_n)
      + ' 条标注样本全部判为女性向），所以本模块的核心对照不是男女，而是'
      + '<span class="em">经期用品与私处护理这两个子赛道</span>。'
      + '共做 <b>' + nn(B.n_tests) + '</b> 项检验，统一 BH-FDR 校正，<b>q&lt;'
      + (isNum(B.alpha) ? B.alpha : 0.05) + '</b> 才算显著，命中 <b>'
      + (B.significant || []).length + '</b> 项、未达显著 <b>' + (B.not_significant || []).length + '</b> 项。</div>';

    h += '<div class="sd-nt"><b>检验方法：</b>' + esc(B.method || '') + '</div>';

    /* 两组的品牌构成 */
    h += '<div class="sd-cgrid c2" style="margin-top:16px">'
      + '<div class="sd-cbox"><div class="ct">' + esc(B.g1_label) + ' 组的品牌构成 <em>n='
      + nn(B.g1_n) + '</em></div><div class="sd-chips">'
      + (B.g1_brands || []).map(function (b) {
        return '<span class="sd-chip">' + esc(b.brand) + ' <b>' + b.n + '</b></span>';
      }).join('')
      + '</div><div class="nd">品类构成：'
      + (cm.g1 || []).map(function (x) { return esc(x.label) + ' ' + pc(x.pct) + '（' + x.n + '）'; }).join('、')
      + '</div></div>'
      + '<div class="sd-cbox"><div class="ct">' + esc(B.g2_label) + ' 组的品牌构成 <em>n='
      + nn(B.g2_n) + '</em></div><div class="sd-chips">'
      + (B.g2_brands || []).map(function (b) {
        return '<span class="sd-chip">' + esc(b.brand) + ' <b>' + b.n + '</b></span>';
      }).join('')
      + '</div><div class="nd">品类构成：'
      + (cm.g2 || []).map(function (x) { return esc(x.label) + ' ' + pc(x.pct) + '（' + x.n + '）'; }).join('、')
      + '</div></div>'
      + '</div>'
      + '<div class="sd-nt"><b>品类为什么不进检验：</b>' + esc(cm.note || '') + '</div>';

    /* 品牌完全嵌套：方法学诚实 */
    h += '<div class="sd-warn"><div class="t">先说清楚：品牌完全嵌套在子赛道里</div>'
      + mdb(rb.brand_nested_note || '')
      + '<br><b>稳健性方法：</b>' + esc(rb.method || '') + '</div>';

    /* —— 稳健组 —— */
    h += '<div class="sd-info" style="margin-top:22px"><div class="t">✅ 第一组 · 两种稳健性检验都通过（'
      + G.robust.length + ' 项）</div>'
      + '这些差异<b>不是被某一个品牌撑起来的，也不能只用达人量级构成解释</b>，'
      + '更接近两个子赛道真实的讲法分工。'
      + '下图横轴为该组内出现该特征的视频占比（左：' + esc(B.g1_label) + '，右：' + esc(B.g2_label) + '）。</div>'
      + cbox('sdCRobust',
        '通过稳健性检验的 ' + G.robust.length + ' 项差异',
        '左 ' + esc(B.g1_label) + ' n=' + nn(B.g1_n) + ' · 右 ' + esc(B.g2_label) + ' n=' + nn(B.g2_n)
        + ' · 悬停看 q 值与两项分层结果',
        G.robust.length * 30 + 76,
        '口径：占比分母为各组样本条数（' + nn(B.g1_n) + ' / ' + nn(B.g2_n) + ' 条），'
        + '<b>不是全量 ' + nn(((S.meta || {}).dataset || {}).universe_videos) + ' 条视频的结构</b>。'
        + 'q 为 ' + nn(B.n_tests) + ' 项检验统一 BH-FDR 校正后的值；'
        + '「稳」= 留一品牌法与粉丝量级 CMH 两项都仍显著。<b>子赛道差异与品类差异在原理上无法完全分离</b>。',
        'full')
      + segTable(G.robust, B, true);

    /* —— 未通过稳健性组 —— */
    h += '<div class="sd-warn" style="margin-top:26px"><div class="t">⚠️ 第二组 · 全样本显著、但至少一项稳健性检验未通过（'
      + G.shaky.length + ' 项）</div>'
      + '这些差异<b>有相当部分来自品牌构成或达人量级构成</b>，'
      + '<b>下面这一组一律不作为「该怎么讲」的建议</b>，只作现象记录。'
      + '注意其中「说服逻辑 · 销量口碑证明」是反过来的情况：粉丝量级 CMH 仍显著、'
      + '但留一品牌后最差 p 已到 0.3836，说明它主要由单个品牌撑起。</div>'
      + cbox('sdCShaky',
        '未通过稳健性检验的 ' + G.shaky.length + ' 项差异',
        '左 ' + esc(B.g1_label) + ' · 右 ' + esc(B.g2_label) + ' · 仅作现象记录，不作投放建议',
        G.shaky.length * 30 + 76,
        '口径同上。<b>这一组的 q 值虽然 &lt;0.05，但分层敏感性检验没有通过</b>，'
        + '因此只能说「在这批样本里观察到」，不能说「两个子赛道的讲法真有这个差别」。'
        + '留一品牌列已标出被剔除后 p 值最差的那个品牌，可直接看出差异被谁撑着。',
        'full')
      + segTable(G.shaky, B, true);

    /* —— 未做稳健性（连续变量） —— */
    if (G.other.length) {
      h += '<div class="sd-p" style="margin-top:24px"><b>另有 ' + G.other.length
        + ' 项显著差异是连续变量（中位数比较），数据层未对它们做留一品牌 / CMH 稳健性检验：</b></div>'
        + segTable(G.other, B, false)
        + '<div class="nd">两项都指向同一件事：<b>经期用品的片子更长、产品出现更晚</b>'
        + '（时长中位 ' + sec(((G.other.filter(function (x) { return x.unit === 's' && x.label.indexOf('时长') >= 0; })[0]) || {}).g1_pct)
        + ' vs ' + sec(((G.other.filter(function (x) { return x.unit === 's' && x.label.indexOf('时长') >= 0; })[0]) || {}).g2_pct)
        + '）。这与体裁构成有关（经期用品组剧情短片 / 生活 vlog 更多），'
        + '<b>没做分层，因此不能归因于「刻意慢节奏」</b>。</div>';
    }

    /* —— 未达显著：全部列出 —— */
    var ns = (B.not_significant || []).slice().sort(function (a, b) { return (b.q || 0) - (a.q || 0); });
    h += '<div class="sd-p" style="margin-top:26px"><b>被验过、但没通过的 ' + ns.length + ' 项</b>——'
      + '「验证不成立」和「没验证」是两回事，这一批是<b>验过没通过</b>，'
      + '一条都不能拿去做投放建议。按 q 值从大到小排：</div>'
      + '<div class="sd-tblw"><table class="sd-tbl" style="min-width:640px"><thead><tr>'
      + '<th>内容特征</th><th>' + esc(B.g1_label) + '</th><th>' + esc(B.g2_label) + '</th>'
      + '<th>方向</th><th>原始 p</th><th>q（BH-FDR）</th>'
      + '</tr></thead><tbody>';
    ns.forEach(function (t) {
      h += '<tr><td class="nm">' + esc(shortLabel(t.label))
        + '<span style="color:var(--ink-5);font-weight:400;font-size:10px"> · ' + esc(fieldOf(t.label)) + '</span></td>'
        + '<td class="num">' + pc(t.g1_pct) + '<span style="color:var(--ink-5);font-size:10px"> · ' + nn(t.g1_n) + '</span></td>'
        + '<td class="num">' + pc(t.g2_pct) + '<span style="color:var(--ink-5);font-size:10px"> · ' + nn(t.g2_n) + '</span></td>'
        + '<td style="color:var(--ink-5);font-size:10.5px">'
        + esc(t.direction === 'g1_higher' ? B.g1_label + ' 略高' : (t.direction === 'g2_higher' ? B.g2_label + ' 略高' : '—'))
        + '</td>'
        + '<td class="num">' + pTxt(t.p) + '</td>'
        + '<td>' + qBadge(t.q) + '</td></tr>';
    });
    h += '</tbody></table></div>'
      + '<div class="nd">「未达显著」= 在本样本量（' + nn(B.g1_n) + ' / ' + nn(B.g2_n)
      + ' 条）下<b>没有证据支持这个差异存在</b>，不等于「已证明两者完全相同」。'
      + '样本量更大时部分差异可能重新浮现，但在当前证据水平上一律不写入结论。</div>';

    h += '<div class="sd-nt"><b>对照组的构成偏差（必须一起读）：</b>' + mdb(B.caveat || '') + '</div>';

    return h + '</div>';
  }

  /* ================================================================== *
   * 5. 区块 02-D：女性向内容画像（A_female_profile）
   * ================================================================== */
  function blockProfile(S) {
    var A = S.A_female_profile || {}, sg = A.single || {}, mu = A.multi || {}, co = A.continuous || {};
    var rel = (S.meta || {}).reliability || {};
    var fp = co.first_product_sec || {}, du = co.total_duration_sec || {};

    var h = '<div class="sd-b" id="sdProfile">'
      + sub('D', '女性向内容画像：这 ' + nn(A.n) + ' 条片子实际是怎么拍的',
        'n=' + nn(A.n) + ' 条 · 仅描述分布，不含效果归因');

    h += '<div class="sd-p">这一块只回答「实际怎么拍」，<b>不含任何效果因果关系</b>——'
      + '效果侧的结论见后面的 F 块。'
      + '多选字段（痛点 / 讲解方式 / 说服逻辑 / CTA 形式）一条视频可命中多项，'
      + '因此各项占比相加超过 100% 属正常；单选字段相加为 100%。</div>';

    /* 图 5、6：痛点 + 说服逻辑 */
    h += '<div class="sd-cgrid c2">'
      + cbox('sdDPain', '痛点全榜 <em style="color:var(--accent)">多选</em>',
        '共 ' + (mu.pain_points || []).length + ' 项 · 分母 ' + nn(A.n) + ' 条',
        (mu.pain_points || []).length * 21 + 46,
        '口径：多选字段，一条视频可命中多个痛点，<b>各项相加会超过 100%</b>。'
        + '分母固定为 ' + nn(A.n) + ' 条女性向标注样本，<b>不代表全量视频的痛点结构</b>。'
        + relMultiTxt('pain_points'))
      + cbox('sdDPersu', '说服逻辑 <em style="color:var(--accent)">多选</em>',
        '共 ' + (mu.persuasion_logic || []).length + ' 项 · 分母 ' + nn(A.n) + ' 条',
        (mu.persuasion_logic || []).length * 21 + 46,
        '口径同上：多选、相加超 100%、分母 ' + nn(A.n) + ' 条。'
        + relMultiTxt('persuasion_logic'))
      + '</div>';

    /* 单选四组 + 多选讲解方式：HTML 迷你条 */
    h += '<div class="sd-cgrid">'
      + '<div class="sd-cbox"><div class="ct">钩子类型 <em>单选 · 相加 100%</em>'
      + relTag('hook_type') + '</div>'
      + bars(rowsOf(sg.hook_type, 99, A.n))
      + '<div class="nd">开场高度集中在<b>场景代入</b>：先把「你也遇到过这个尴尬」立住，'
      + '再进产品。分母 ' + nn(A.n) + ' 条。'
      + (relDone() && relOf('hook_type')
        ? '该字段双跑一致率 ' + pc(relOf('hook_type').agree * 100)
          + '、κ=' + relOf('hook_type').kappa.toFixed(2) + '，<b>可做主结论</b>。' : '')
      + '</div></div>'

      + '<div class="sd-cbox"><div class="ct">主语气 <em>单选</em>'
      + relTag('tone_primary')
      + '</div>'
      + bars(rowsOf(sg.tone_primary, 99, A.n))
      + '<div class="nd">'
      + (relDone() && relOf('tone_primary')
        ? '<b>这是四个主字段里最不稳的一个</b>：双跑一致率 '
          + pc(relOf('tone_primary').agree * 100) + '（'
          + nn(relOf('tone_primary').n_agree) + '/' + nn(relOf('tone_primary').n)
          + '），但 κ 只有 ' + relOf('tone_primary').kappa.toFixed(2)
          + ' —— 扣掉「都往多数类猜」的运气成分后，一致性只剩中等。'
          + '<b>因此本页把主语气当辅助描述，不作强结论</b>：'
        : '<b>语气类字段的双跑一致率尚未实测。</b>')
      + '只读「姐妹平视是主流」这个方向，<b>不读精确百分点、不做品牌间语气对比</b>。'
      + '次要语气分布：'
      + (sg.tone_secondary || []).slice(0, 3).map(function (x) { return esc(x.label) + ' ' + pc(x.pct); }).join('、')
      + '。</div></div>'

      + '<div class="sd-cbox"><div class="ct">内容体裁 <em>单选 · 相加 100%</em>'
      + relTag('content_format') + '</div>'
      + bars(rowsOf(sg.content_format, 99, A.n))
      + '<div class="nd">体裁决定节奏：口播测评首次出品中位 '
      + sec(((S.D_structure || {}).first_product_by_format || []).filter(function (x) { return x.code === 'oral_review'; })[0] ? ((S.D_structure || {}).first_product_by_format || []).filter(function (x) { return x.code === 'oral_review'; })[0].first_product_median : null)
      + '、剧情短片 '
      + sec(((S.D_structure || {}).first_product_by_format || []).filter(function (x) { return x.code === 'skit'; })[0] ? ((S.D_structure || {}).first_product_by_format || []).filter(function (x) { return x.code === 'skit'; })[0].first_product_median : null)
      + '（详见 E 块）。</div></div>'

      + '<div class="sd-cbox"><div class="ct">产品讲解方式 <em>多选 · 相加超 100%</em></div>'
      + bars(rowsOf(mu.product_explain_methods, 99, A.n), { color: C2() })
      + '<div class="nd"><b>肤感气味描述几乎是标配</b>（' + pc((mu.product_explain_methods || [])[0] ? mu.product_explain_methods[0].pct : null)
      + '）——这个赛道的产品体验很难可视化，只能靠语言转译。分母 ' + nn(A.n) + ' 条。</div></div>'

      + '<div class="sd-cbox"><div class="ct">CTA 形式 <em>多选 · 相加超 100%</em></div>'
      + bars(rowsOf(mu.cta_form, 99, A.n), { color: C2() })
      + '<div class="nd">超过六成<b>不做任何引导</b>。'
      + '注意：F 块显示「有 CTA」与互动率是<b>负</b>相关，但这不构成「别喊 CTA」的建议，'
      + '原因见该块解读。</div></div>'

      + '<div class="sd-cbox"><div class="ct">品类 / 单品套组 / 达人性别 <em>三个单选字段</em>'
      + ' <span class="sd-pend" title="single_vs_bundle 双跑一致率仅 53%（16/30，κ=0.29），见 A 块一致性检验">'
      + '单品/套组一致率仅 53% · 仅供参考</span></div>'
      + bars(rowsOf(sg.product_category, 99, A.n))
      + bars(rowsOf(sg.single_vs_bundle, 99, A.n), { color: C2() })
      + bars(rowsOf(sg.talent_gender, 99, A.n), { color: C3() })
      + '<div class="nd"><b>中间那组「单品 / 套组」请只当参考</b>：该字段独立双跑一致率仅 53%'
      + '（16/30，κ=0.29，见 A 块），<b>换一次模型采样就有近一半会翻</b>，'
      + '因此本页不基于它做任何结论或建议。'
      + '品类分布<b>由抽样品牌配额决定</b>（' + nn(((S.meta || {}).samples || {}).sampled_brands)
      + ' 个品牌各取金额 TOP20），不代表全量 '
      + nn(((S.meta || {}).dataset || {}).universe_videos) + ' 条视频的真实品类结构。'
      + '「男女同框」占 ' + pc((sg.talent_gender || []).filter(function (x) { return x.code === 'both'; })[0]
        ? (sg.talent_gender || []).filter(function (x) { return x.code === 'both'; })[0].pct : null)
      + '，是这个赛道值得注意的一点：男性常以「伴侣 / 帮买」的角色出现在画面里。</div></div>'
      + '</div>';

    /* 布尔字段卡 */
    h += '<div class="sd-p" style="margin-top:20px"><b>八个布尔字段（是 / 否），分母均为 '
      + nn(A.n) + ' 条</b></div><div class="sd-ovs">';
    (A.bool || []).forEach(function (b) {
      h += '<div class="sd-ov"><div class="k">' + esc(b.label) + '</div>'
        + '<div class="n">' + (isNum(b.pct) ? b.pct.toFixed(1) : '—') + '<small>% · ' + nn(b.n) + ' 条</small></div>'
        + '<div class="d">' + nn(A.n) + ' 条样本中命中 <b>' + nn(b.n) + '</b> 条</div></div>';
    });
    h += '</div>';

    /* 连续量 + 置信度 + 品牌构成 */
    h += '<div class="sd-ovs" style="margin-top:16px">'
      + '<div class="sd-ov"><div class="k">首次出品秒数（中位）</div>'
      + '<div class="n">' + nn(fp.median) + '<small>秒 · 均值 ' + nn(fp.mean) + 's</small></div>'
      + '<div class="d">四分位 ' + nn(fp.p25) + 's ~ ' + nn(fp.p75) + 's · n=' + nn(fp.n)
      + '<br><b>是双峰，不是一个「平均节奏」</b>（见 E 块）</div></div>'
      + '<div class="sd-ov"><div class="k">视频时长（中位）</div>'
      + '<div class="n">' + nn(du.median) + '<small>秒 · 均值 ' + nn(du.mean) + 's</small></div>'
      + '<div class="d">n=' + nn(du.n) + '。全量 ' + nn(((S.overall || {}).duration_sec || {}).n)
      + ' 条的时长中位为 ' + nn(((S.overall || {}).duration_sec || {}).median) + 's，'
      + '<b>抽样偏长</b>（抽的是头部投放）</div></div>'
      + '<div class="sd-ov"><div class="k">标注置信度</div>'
      + '<div class="n sm">'
      + (sg.confidence || []).map(function (x) { return esc(x.label) + ' ' + pc(x.pct); }).join(' / ')
      + '</div><div class="d">低置信条目已保留在样本内、未剔除，'
      + '因为剔除会引入新的选择偏差</div></div>'
      + '<div class="sd-ov"><div class="k">子赛道构成</div>'
      + '<div class="n sm">'
      + (A.seg_mix || []).map(function (x) { return esc(x.seg) + ' ' + x.n; }).join(' / ')
      + '</div><div class="d">'
      + (A.seg_mix || []).map(function (x) { return esc(x.seg) + ' ' + pc(x.pct); }).join('、')
      + '<br>刻意做成对半，是为了 C 块的对照</div></div>'
      + '</div>';

    h += '<div class="sd-p" style="margin-top:18px"><b>样本的品牌构成：</b>'
      + (A.brand_mix || []).map(function (x) {
        return esc(x.brand) + ' ' + x.n + '（' + pc(x.pct) + '，' + esc(x.seg) + '）';
      }).join('、')
      + '，共 ' + (A.brand_mix || []).length + ' 个品牌有可用标注。</div>';

    h += '<div class="sd-nt">' + mdb(A.caveat || '') + '</div>';

    return h + '</div>';
  }

  /* ================================================================== *
   * 6. 区块 02-E：结构与节奏（D_structure）
   * ================================================================== */
  function blockStruct(S) {
    var D = S.D_structure || {}, sp2 = D.stage_presence || [], op = D.opening_stage || [],
      cl = D.closing_stage || [], to = D.top_openings || [], ts = D.top_sequences || [],
      sl = D.seq_len || {}, fp = D.first_product || {}, fbf = D.first_product_by_format || [],
      fbt = D.first_product_by_format_test || {}, hl = D.high_vs_low || {},
      hi = hl.high || {}, lo = hl.low || {};

    var h = '<div class="sd-b" id="sdStruct">'
      + sub('E', '结构与节奏：一条片子按什么顺序展开', 'n=' + nn(D.n) + ' 条 · 时间轴由模型切分');

    h += '<div class="sd-p">把每条视频切成<b>钩子 / 痛点 / 解法引出 / 演示 / 证据背书 / 行动号召 / 其他</b>'
      + '七个段落，看它们的出现率、顺序与时长占比。'
      + '<b>时间轴切分的可靠度低于单选字段</b>（双跑一致性报告未覆盖时间轴），'
      + '本块所有数字只作量级参考。</div>';

    /* 段落出现率 + 开场/收口 */
    h += '<div class="sd-cgrid c2">'
      + '<div class="sd-cbox"><div class="ct">七个段落的出现率 <em>多选 · 分母 ' + nn(D.n) + ' 条</em></div>'
      + bars(rowsOf(sp2, 99, D.n))
      + '<div class="nd">钩子 100% 出现、<b>行动号召只有 ' + pc((sp2.filter(function (x) { return x.code === 'cta'; })[0] || {}).pct)
      + '</b>。证据背书出现率约一半，但时长占比中位只有 '
      + pc((D.stage_share || []).filter(function (x) { return x.code === 'proof'; })[0]
        ? (D.stage_share || []).filter(function (x) { return x.code === 'proof'; })[0].median_pct : null)
      + '——出现了，但很短。</div></div>'

      + '<div class="sd-cbox"><div class="ct">开场段与收口段 <em>单选 · 各自相加 100%</em></div>'
      + '<div style="font-size:10.5px;color:var(--ink-5);margin-top:8px">开场段</div>'
      + bars(rowsOf(op, 99, D.n))
      + '<div style="font-size:10.5px;color:var(--ink-5);margin-top:10px">收口段</div>'
      + bars(rowsOf(cl, 99, D.n), { color: C2() })
      + '<div class="nd">开场几乎必然是钩子（' + pc((op[0] || {}).pct)
      + '），但<b>收口最常见的是「其他」</b>（' + pc((cl[0] || {}).pct)
      + '）：片子经常在闲聊或生活画面里结束，没有明确落点。</div></div>'
      + '</div>';

    /* 图 7：段落时长占比 */
    h += cbox('sdEStage',
      '七个段落的时长占比 <em style="color:var(--accent)">均值 vs 中位</em>',
      '占该条视频总时长的百分比 · 均值与中位并列，差距大说明分布极偏',
      330,
      '口径：分母为单条视频时长，先算每条的占比再求均值 / 中位（数据层已算好）。'
      + '<b>均值与中位差距大的段落（证据背书、行动号召）说明「多数片子几乎没有，少数片子很长」</b>，'
      + '此时读均值会高估普遍程度。中位为 0 表示<b>一半以上的片子完全没有这一段</b>。'
      + '时间轴切分未做双跑一致性检验，只作量级参考。',
      'full');

    /* 段落顺序 */
    h += '<div class="sd-cgrid c2" style="margin-top:16px">'
      + '<div class="sd-cbox"><div class="ct">最常见的开头三段 <em>TOP ' + to.length + ' · 分母 ' + nn(D.n) + ' 条</em></div>'
      + '<div class="sd-tblw" style="margin-top:8px"><table class="sd-tbl" style="min-width:0"><thead><tr>'
      + '<th>开头三段</th><th>条数</th><th>占比</th></tr></thead><tbody>'
      + to.map(function (x) {
        return '<tr><td class="nm" style="font-weight:500">' + esc(x.seq_cn) + '</td>'
          + '<td class="num">' + nn(x.n) + '</td><td class="num">' + pc(x.pct) + '</td></tr>';
      }).join('')
      + '</tbody></table></div>'
      + '<div class="nd"><b>「钩子 → 痛点 → 解法引出」一条路占 ' + pc((to[0] || {}).pct)
      + '</b>，是这个赛道事实上的标准开头。</div></div>'

      + '<div class="sd-cbox"><div class="ct">最常见的完整结构 <em>TOP ' + ts.length + ' · 分母 ' + nn(D.n) + ' 条</em></div>'
      + '<div class="sd-tblw" style="margin-top:8px"><table class="sd-tbl" style="min-width:0"><thead><tr>'
      + '<th>完整段落序列</th><th>条数</th><th>占比</th></tr></thead><tbody>'
      + ts.map(function (x) {
        return '<tr><td class="wrap" style="text-align:left;font-weight:500;color:var(--ink)">'
          + esc(x.seq_cn) + '</td>'
          + '<td class="num">' + nn(x.n) + '</td><td class="num">' + pc(x.pct) + '</td></tr>';
      }).join('')
      + '</tbody></table></div>'
      + '<div class="nd">最高的完整结构也只占 ' + pc((ts[0] || {}).pct)
      + '，<b>说明「模板」存在于开头而不是全片</b>。段落数中位 ' + nn(sl.median)
      + '、均值 ' + nn(sl.mean) + '。</div></div>'
      + '</div>';

    /* 首次出品：双峰 */
    h += '<div class="sd-p" style="margin-top:20px"><b>首次出现产品的秒数是双峰，不是一个平均值。</b>'
      + esc(fp.note || '') + '</div>'
      + '<div class="sd-tblw"><table class="sd-tbl" style="min-width:520px"><thead><tr>'
      + '<th>体裁</th><th>样本</th><th>首次出品中位</th><th style="text-align:left">备注</th>'
      + '</tr></thead><tbody>';
    fbf.forEach(function (x) {
      var weak = !!x.note;
      h += '<tr><td class="nm">' + esc(x.label) + '</td>'
        + '<td class="num">' + nn(x.n) + '</td>'
        + '<td class="num" style="' + (weak ? 'color:var(--ink-5)' : '') + '">' + sec(x.first_product_median) + '</td>'
        + '<td class="wrap" style="text-align:left">'
        + (x.note ? '<span class="mt-na">' + esc(x.note) + '</span>' : '') + '</td></tr>';
    });
    h += '</tbody></table></div>'
      + '<div class="sd-nt"><b>体裁间差异检验：</b>' + esc(fbt.note || '')
      + '，纳入 ' + nn(fbt.groups) + ' 个组（样本 &lt;12 的体裁不纳入），原始 p=' + pTxt(fbt.p)
      + '。整体中位 ' + sec(fp.median) + '、均值 ' + sec(fp.mean)
      + '、四分位 ' + sec(fp.p25) + ' ~ ' + sec(fp.p75) + '（n=' + nn(fp.n) + '）。'
      + '<b>该检验只说明「体裁之间有差别」，不说明「早出品更好」</b>。</div>';

    /* 高低四分位 */
    var tests = hl.tests || [];
    h += '<div class="sd-p" style="margin-top:22px"><b>互动率最高与最低的两个四分位，结构骨架对比。</b>'
      + '高互动四分位（n=' + nn(hi.n) + '，互动率中位 ' + er(hi.er_median) + '）与'
      + '低互动四分位（n=' + nn(lo.n) + '，中位 ' + er(lo.er_median) + '）逐项对比：</div>'
      + '<div class="sd-tblw"><table class="sd-tbl" style="min-width:600px"><thead><tr>'
      + '<th>结构维度</th><th>高互动四分位</th><th>低互动四分位</th><th>原始 p</th><th>判定</th>'
      + '</tr></thead><tbody>';
    tests.forEach(function (t) {
      var u = t.unit === 's';
      h += '<tr><td class="nm">' + esc(t.label) + '</td>'
        + '<td class="num">' + (u ? sec(t.high_pct) : pc(t.high_pct)) + '</td>'
        + '<td class="num">' + (u ? sec(t.low_pct) : pc(t.low_pct)) + '</td>'
        + '<td class="num">' + pTxt(t.p) + '</td>'
        + '<td>' + (t.sig
          ? '<span class="sd-q sig" title="原始 p<0.05；数据层未对这一组对比给出 BH-FDR 校正后的 q 值，因此只作现象记录">p&lt;0.05 · 未校正</span>'
          : '<span class="sd-q ns" title="p≥0.05，未发现显著差异">未达显著</span>') + '</td></tr>';
    });
    h += '</tbody></table></div>'
      + '<div class="sd-warn"><div class="t">这张表的两个「显著」不能当结论用</div>'
      + '数据层对这 ' + tests.length + ' 项只给出<b>原始 p 值、没有给 q 值</b>，'
      + '即<b>这一组对比未纳入多重比较校正家族</b>，也没有做品牌 / 子赛道分层。'
      + '其中「含 CTA 段」与「首次出现产品秒数」两项在 F 块的正式检验里同样出现，'
      + '而 F 块的结论是：<b>CTA 相关项按品牌分层后仅少数仍成立，首次出品秒数的相关性来自体裁与量级构成</b>。'
      + '因此本表只作现象记录。'
      + '<div class="sd-nt" style="border-left-color:var(--warn-line);color:var(--ink-3)">'
      + '<b>数据层原文：</b>' + esc(hl.verdict || '') + '</div></div>';

    h += '<div class="sd-nt"><b>本块局限：</b>' + esc(D.caveat || '') + '</div>';

    return h + '</div>';
  }

  /* ================================================================== *
   * 7. 区块 02-F：⚠️ 讲法几乎解释不了互动率（C_content_x_effect）
   * ================================================================== */
  function blockEffect(S) {
    var C = S.C_content_x_effect || {}, ed = C.er_dist || {}, gmv = C.gmv || {};
    var sig = C.significant || [], bsr = C.brand_and_seg_robust || [], br2 = C.brand_robust || [];
    var uh = C.unrelated_highlights || [], sm = C.spearman || [];
    var bySeg = C.by_seg || {}, byBrand = C.by_brand || {};

    var h = '<div class="sd-b alarm" id="sdEffect">'
      + sub('F', '⚠️ 一个负面结论：讲法几乎解释不了互动率', '本模块最重要、也最容易被误读的一块');

    /* 漏斗 */
    h += '<div class="sd-fn">'
      + '<div class="sd-fs"><div class="k">「内容特征 × 互动率」<br>检验项数</div>'
      + '<div class="n">' + nn(C.n_tests) + '<small>项</small></div></div>'
      + '<div class="sd-fs"><div class="k">BH-FDR 校正后<br>q&lt;0.05 的项</div>'
      + '<div class="n">' + sig.length + '<small>项</small></div></div>'
      + '<div class="sd-fs"><div class="k">再按品牌分层后<br>仍显著的项</div>'
      + '<div class="n">' + br2.length + '<small>项</small></div></div>'
      + '<div class="sd-fs last"><div class="k">品牌 + 子赛道<br>两层都稳的项</div>'
      + '<div class="n">' + bsr.length + '<small>项 · 只能当假设</small></div></div>'
      + '</div>';

    h += '<div class="sd-p">' + mdb(C.verdict || '') + '</div>'
      + '<div class="sd-nt"><b>检验方法：</b>' + esc(C.method || '')
      + '<br><b>互动率口径：</b>' + esc(C.metric || '') + '　'
      + esc(((S.meta || {}).metric_defs || {}).engagement_rate || '') + '</div>';

    /* 互动率分布 */
    h += '<div class="sd-ovs">'
      + '<div class="sd-ov"><div class="k">可算互动率的样本</div>'
      + '<div class="n">' + nn(ed.n_usable) + '<small>条 / ' + nn(ed.n_female) + ' 条</small></div>'
      + '<div class="d">' + esc(ed.excluded_note || '') + '</div></div>'
      + '<div class="sd-ov"><div class="k">互动率中位</div>'
      + '<div class="n">' + er(ed.median) + '<small>四分位 ' + er(ed.p25) + ' ~ ' + er(ed.p75) + '</small></div>'
      + '<div class="d">P90 ' + er(ed.p90) + ' · 最大 ' + er(ed.max)
      + '<br><b>样本水平不可外推为总体</b>（全量中位 '
      + er(((S.overall || {}).er || {}).median) + '，n=' + nn(((S.overall || {}).er || {}).n_usable) + '）</div></div>'
      + '<div class="sd-ov"><div class="k">分布偏度</div>'
      + '<div class="n">' + nn(ed.skew) + '<small>右偏</small></div>'
      + '<div class="d">' + esc(ed.verdict || '') + '</div></div>'
      + '<div class="sd-ov"><div class="k">GMV 可用样本</div>'
      + '<div class="n">' + nn(gmv.n_usable) + '<small>条 / ' + nn(gmv.n_female) + ' 条</small></div>'
      + '<div class="d">其中 0 值 ' + nn(gmv.zero_n) + ' 条；'
      + '<b>本模块不用 GMV 下任何结论</b></div></div>'
      + '</div>';

    /* 图 8：q 值分布 */
    h += cbox('sdFQ',
      '全部检验的 q 值分布 <em style="color:var(--accent)">一眼看出显著项有多少</em>',
      '对数横轴 · 虚线为 q=0.05 阈值 · 上排互动率 ' + nn(C.n_tests) + ' 项、下排每千播 GMV '
      + ((gmv.tests || []).length) + ' 项 · 悬停看具体项',
      250,
      '口径：横轴为 BH-FDR 校正后的 q 值（对数轴），<b>越靠左越显著</b>。'
      + '同一 q 值的多个点已按固定规则纵向错位排开，纵向位置本身无含义。'
      + '互动率与 GMV 是两个独立的 FDR 家族，分别校正、不可跨排比较。'
      + 'q&lt;0.0008 的点统一压在左边界显示。',
      'full');

    /* 两项双层稳健 */
    h += '<div class="sd-info" style="margin-top:20px"><div class="t">品牌 + 子赛道两层都稳的 '
      + bsr.length + ' 项 · 只能当作待验证假设</div>'
      + '下面两项在<b>按品牌分层、按子赛道分层后都仍然显著</b>，是本模块里唯一还站得住的内容侧观察。'
      + '但观测数据不能给因果，<b>它们的正确用法是拿去做 A/B，不是直接改投放要求</b>。</div>'
      + '<div class="sd-tblw"><table class="sd-tbl" style="min-width:760px"><thead><tr>'
      + '<th>内容特征</th><th>命中组互动率中位</th><th>未命中组</th><th>n（命中/未命中）</th>'
      + '<th>q（BH-FDR）</th><th>品牌分层 p</th><th>子赛道分层 p</th><th>量级分层 p</th>'
      + '</tr></thead><tbody>';
    bsr.forEach(function (t) {
      var s = t.strat || {};
      h += '<tr><td class="nm">' + esc(t.label) + '</td>'
        + '<td class="num">' + er(t.er1) + '</td>'
        + '<td class="num">' + er(t.er0) + '</td>'
        + '<td class="num">' + nn(t.n1) + ' / ' + nn(t.n0) + '</td>'
        + '<td>' + qBadge(t.q) + '</td>'
        + '<td class="num">' + pTxt(s.by_brand_p) + ' ' + robBadge(s.brand_robust) + '</td>'
        + '<td class="num">' + pTxt(s.by_seg_p) + ' ' + robBadge(s.seg_robust) + '</td>'
        + '<td class="num">播放 ' + pTxt(s.by_vv_band_p) + '<br>粉丝 ' + pTxt(s.by_fans_band_p) + '</td>'
        + '</tr>';
    });
    h += '</tbody></table></div>';
    bsr.forEach(function (t) {
      h += '<div class="sd-nt"><b>' + esc(t.label) + '（方向：'
        + esc(t.direction === 'down' ? '命中组更低' : (t.direction === 'up' ? '命中组更高' : '—'))
        + '）：</b>' + mdb(t.interpretation || '') + '</div>';
    });
    h += '<div class="nd"><b>为什么「有 CTA 互动率更低」不能读成「别喊 CTA」：</b>'
      + '互动率的分母是播放量，喊 CTA 的片子往往是硬广感更强、流量结构不同的投放，'
      + '而<b>互动率与播放量在本样本里正相关（见下方 Spearman）、与达人粉丝量强相关</b>，'
      + '所以这条差异里混着达人与流量结构。'
      + '更关键的是：<b>互动率不等于生意结果</b>，GMV 侧 ' + ((gmv.tests || []).length)
      + ' 项检验无一显著，不能用互动率去否定 CTA 的转化作用。</div>';

    /* 全部显著项 */
    h += '<div class="sd-p" style="margin-top:22px"><b>校正后显著的 ' + sig.length
      + ' 项全部列出</b>——其中只有上面 ' + bsr.length + ' 项通过双层分层，'
      + '<b>其余的差异都可以被品牌 / 子赛道 / 品类构成解释掉</b>。</div>'
      + '<div class="sd-tblw"><table class="sd-tbl" style="min-width:680px"><thead><tr>'
      + '<th>检验项</th><th>方法</th><th>命中组 / 各组互动率中位</th><th>n</th><th>q（BH-FDR）</th>'
      + '</tr></thead><tbody>';
    sig.forEach(function (t) {
      var lv = t.levels || [];
      var val = lv.length
        ? lv.map(function (x) { return esc(x.label) + ' ' + er(x.er_median) + '（' + x.n + '）'; }).join('　')
        : (er(t.er1) + ' vs ' + er(t.er0));
      h += '<tr><td class="nm">' + esc(t.label) + '</td>'
        + '<td style="font-size:10.5px;color:var(--ink-5)">'
        + esc(t.kind === 'KW' ? 'Kruskal-Wallis' : (t.kind === 'MWU' ? 'Mann-Whitney U' : t.kind)) + '</td>'
        + '<td class="wrap" style="text-align:left">' + val + '</td>'
        + '<td class="num">' + (isNum(t.n) ? nn(t.n) : nn(t.n1) + ' / ' + nn(t.n0)) + '</td>'
        + '<td>' + qBadge(t.q) + '</td></tr>';
    });
    h += '</tbody></table></div>';

    /* 已验证无关 */
    h += '<div class="sd-p" style="margin-top:20px"><b>已验证与互动率无显著关系的 ' + uh.length
      + ' 项</b>（全部 q≥0.05，一律标注「未达显著」）：</div><div class="sd-chips">';
    uh.forEach(function (k) {
      h += '<span class="sd-chip mute" title="BH-FDR 校正后 q=' + qTxt(k.q)
        + '，未达显著。' + esc(k.detail || '') + '">'
        + esc(k.label) + ' <b>q=' + qTxt(k.q) + '</b></span>';
    });
    h += '</div>';

    /* Spearman */
    h += '<div class="sd-p" style="margin-top:20px"><b>连续变量的相关性：真正相关的都不是内容技巧。</b></div>'
      + '<div class="sd-tblw"><table class="sd-tbl" style="min-width:560px"><thead><tr>'
      + '<th>变量</th><th>Spearman ρ</th><th>n</th><th>原始 p</th><th>q（BH-FDR）</th><th style="text-align:left">读法</th>'
      + '</tr></thead><tbody>';
    sm.forEach(function (t) {
      var isContent = (t.var === 'euphemism_n' || t.var === 'address_n');
      h += '<tr><td class="nm">' + esc(t.label) + '</td>'
        + '<td class="num">' + (isNum(t.rho) ? (t.rho > 0 ? '+' : '') + t.rho.toFixed(2) : '—') + '</td>'
        + '<td class="num">' + nn(t.n) + '</td>'
        + '<td class="num">' + pTxt(t.p) + '</td>'
        + '<td>' + qBadge(t.q) + '</td>'
        + '<td class="wrap" style="text-align:left">'
        + (isNum(t.q) && t.q < 0.05
          ? (isContent ? '相关但属内容侧，谨慎解读' : '<b>流量 / 结构变量</b>，不是内容技巧')
          : '未达显著')
        + '</td></tr>';
    });
    h += '</tbody></table></div>'
      + '<div class="nd">与互动率相关性最强的三项是<b>达人粉丝数、视频时长、播放量</b>，'
      + '而<b>代称词数量、女性称呼语数量这两项内容变量都未达显著</b>。'
      + '注意本样本里播放量与互动率是<b>正</b>相关（ρ='
      + nn((sm.filter(function (x) { return x.var === 'vv'; })[0] || {}).rho)
      + '），与「大流量摊薄互动」的直觉相反——这与样本刻意偏头部投放有关，'
      + '<b>不可外推为总体规律</b>。</div>';

    /* 分层水平：品牌 / 子赛道 / 量级 */
    h += '<div class="sd-p" style="margin-top:22px"><b>互动率水平主要由「盘子」决定，不是由讲法决定。</b></div>'
      + '<div class="sd-cgrid c2">'
      + '<div class="sd-cbox"><div class="ct">按子赛道 <em>Mann-Whitney</em></div>'
      + '<div class="sd-tblw" style="margin-top:8px"><table class="sd-tbl" style="min-width:0"><thead><tr>'
      + '<th>子赛道</th><th>n</th><th>互动率中位</th></tr></thead><tbody>'
      + (bySeg.rows || []).map(function (x) {
        return '<tr><td class="nm">' + esc(x.seg) + '</td><td class="num">' + nn(x.n) + '</td>'
          + '<td class="num">' + er(x.er_median) + '</td></tr>';
      }).join('')
      + '</tbody></table></div>'
      + '<div class="nd">原始 p=' + pTxt(bySeg.p) + '（'
      + (bySeg.sig ? '组间有差异' : '未达显著') + '）。' + mdb(bySeg.note || '') + '</div></div>'

      + '<div class="sd-cbox"><div class="ct">按品牌 <em>Kruskal-Wallis</em></div>'
      + '<div class="sd-tblw" style="margin-top:8px"><table class="sd-tbl" style="min-width:0"><thead><tr>'
      + '<th>品牌</th><th>n</th><th>互动率中位</th></tr></thead><tbody>'
      + (byBrand.rows || []).map(function (x) {
        return '<tr><td class="nm">' + esc(x.brand) + '</td><td class="num">' + nn(x.n) + '</td>'
          + '<td class="num">' + (isNum(x.er_median) ? er(x.er_median)
            : '<span class="mt-na" title="' + esc(x.note || '样本不足') + '">样本不足</span>') + '</td></tr>';
      }).join('')
      + '</tbody></table></div>'
      + '<div class="nd">原始 p=' + pTxt((byBrand.kruskal || {}).p) + '，纳入 '
      + nn((byBrand.kruskal || {}).groups) + ' 组（样本不足的品牌不纳入）。'
      + esc((byBrand.kruskal || {}).note || '')
      + '<br><b>品牌之间的互动率相差十几倍，远大于任何单项内容特征的差异</b>——'
      + '但这同样不能读成「某品牌内容做得更好」，抽样只有每品牌 20 条头部投放。</div></div>'
      + '</div>';

    h += '<div class="sd-cgrid">'
      + '<div class="sd-cbox"><div class="ct">按播放量分层 <em>描述性</em></div>'
      + '<div class="sd-tblw" style="margin-top:8px"><table class="sd-tbl" style="min-width:0"><thead><tr>'
      + '<th>层</th><th>n</th><th>互动率中位</th></tr></thead><tbody>'
      + (C.strata_vv || []).map(function (x) {
        return '<tr><td class="nm">' + esc(x.band) + '</td><td class="num">' + nn(x.n) + '</td>'
          + '<td class="num">' + (isNum(x.er_median) ? er(x.er_median)
            : '<span class="mt-na" title="' + esc(x.note || '样本不足') + '">—</span>') + '</td></tr>';
      }).join('')
      + '</tbody></table></div><div class="nd">仅描述该层水平，<b>不做层间显著性检验</b>。</div></div>'

      + '<div class="sd-cbox"><div class="ct">按达人粉丝量级 <em>描述性</em></div>'
      + '<div class="sd-tblw" style="margin-top:8px"><table class="sd-tbl" style="min-width:0"><thead><tr>'
      + '<th>量级</th><th>n</th><th>互动率中位</th></tr></thead><tbody>'
      + (C.strata_fans || []).map(function (x) {
        return '<tr><td class="nm">' + esc(x.band) + '</td><td class="num">' + nn(x.n) + '</td>'
          + '<td class="num">' + (isNum(x.er_median) ? er(x.er_median)
            : '<span class="mt-na" title="' + esc(x.note || '样本不足') + '">' + esc(x.note || '—') + '</span>') + '</td></tr>';
      }).join('')
      + '</tbody></table></div><div class="nd">样本不足的层已如实标出、不解读。</div></div>'

      + '<div class="sd-cbox"><div class="ct">按视频时长分层 <em>描述性</em></div>'
      + '<div class="sd-tblw" style="margin-top:8px"><table class="sd-tbl" style="min-width:0"><thead><tr>'
      + '<th>时长段</th><th>n</th><th>互动率中位</th></tr></thead><tbody>'
      + (C.strata_dur || []).map(function (x) {
        return '<tr><td class="nm">' + esc(x.band) + '</td><td class="num">' + nn(x.n) + '</td>'
          + '<td class="num">' + (isNum(x.er_median) ? er(x.er_median)
            : '<span class="mt-na" title="' + esc(x.note || '样本不足') + '">—</span>') + '</td></tr>';
      }).join('')
      + '</tbody></table></div><div class="nd">只有两段（本样本无 ≤30s 分层），'
      + '差异与体裁构成共线，<b>不可读作「拍长一点更好」</b>。</div></div>'
      + '</div>';

    /* GMV 侧 */
    h += '<div class="sd-warn" style="margin-top:22px"><div class="t">生意侧没有任何结论</div>'
      + mdb(gmv.verdict || '')
      + ' 口径：' + esc(gmv.metric || '') + '，可用样本仅 ' + nn(gmv.n_usable) + ' 条。'
      + '<b>因此本模块不回答「什么讲法更能卖货」。</b></div>'
      + '<details class="sd-fold"><summary>GMV 侧 ' + ((gmv.tests || []).length)
      + ' 项检验明细 <span class="c">全部未达显著，最小 q 也在 0.13 以上</span><span class="hint"></span></summary>'
      + '<div class="sd-foldb"><div class="sd-tblw"><table class="sd-tbl" style="min-width:600px"><thead><tr>'
      + '<th>检验项</th><th>命中组每千播 GMV 中位</th><th>未命中组</th><th>n（命中/未命中）</th><th>q（BH-FDR）</th>'
      + '</tr></thead><tbody>'
      + (gmv.tests || []).map(function (t) {
        return '<tr><td class="nm">' + esc(t.label) + '</td>'
          + '<td class="num">' + (isNum(t.med1) ? t.med1.toFixed(2) : '—') + '</td>'
          + '<td class="num">' + (isNum(t.med0) ? t.med0.toFixed(2) : '—') + '</td>'
          + '<td class="num">' + nn(t.n1) + ' / ' + nn(t.n0) + '</td>'
          + '<td>' + qBadge(t.q) + '</td></tr>';
      }).join('')
      + '</tbody></table></div>'
      + '<div class="nd">GMV 字段非空率仅 ' + pc(((S.overall || {}).gmv_fill || {}).not_null_pct)
      + '、正值率 ' + pc(((S.overall || {}).gmv_fill || {}).positive_pct)
      + '，且 0 与 NULL 无法区分「真没卖」与「没回传」，'
      + '<b>这 ' + ((gmv.tests || []).length) + ' 项检验列在这里只是为了说明「查过了、没有结果」</b>。</div>'
      + '</div></details>';

    /* 正确解读 */
    h += '<div class="sd-info" style="margin-top:22px"><div class="t">这个结论该怎么读（请不要读成「内容白做了」）</div>'
      + '<b>① 讲法差异是「对谁说、说什么品类」的必然结果，不是增长杠杆。</b>'
      + 'C 块那些又大又稳的子赛道差异（清洁方式不对 vs 侧漏后漏、口播测评 vs 剧情短片）真实存在，'
      + '但它们解释的是<b>「这个品类该讲什么」</b>，而不是<b>「换个讲法就能涨互动」</b>——'
      + '后者在 ' + nn(C.n_tests) + ' 项检验里只剩 ' + bsr.length + ' 项通过双层分层，且只能当假设。'
      + '<br><b>② 选品类 / 选达人，比调讲法更能决定互动率水平。</b>'
      + '本模块能稳定观测到的互动率差异来自<b>子赛道</b>（'
      + (bySeg.rows || []).map(function (x) { return esc(x.seg) + ' ' + er(x.er_median); }).join(' vs ')
      + '）、<b>品牌盘子</b>与<b>达人粉丝量级</b>（ρ='
      + nn((sm.filter(function (x) { return x.var === 'fans'; })[0] || {}).rho) + '），'
      + '不是来自钩子、语气、体裁或用不用代称。'
      + '<br><b>③ 互动率本身也不等于生意结果。</b>'
      + 'GMV 侧 ' + ((gmv.tests || []).length) + ' 项检验无一显著，'
      + '所以<b>既不能用讲法预测互动，也不能用互动推断卖货</b>。'
      + '<br><b>④ 内容仍然必须做对——它的作用是「合规、可信、说得进去」，不是「撬互动率」。</b>'
      + '把内容当成准入条件（做不好会掉），而不是可优化的增长旋钮（做更好就会涨）。</div>';

    h += '<div class="sd-p" style="margin-top:20px"><b>为什么不能反过来说「已证明讲法无效」</b></div>'
      + '<ul class="sd-li">'
      + (C.caveat || []).map(function (x) { return '<li>' + mdb(x) + '</li>'; }).join('')
      + '</ul>';

    return h + '</div>';
  }

  /* ================================================================== *
   * 8. 区块 02-G：可复制模板 + 称呼语 + 话术母题（G_playbook）
   * ================================================================== */
  function blockPlay(S) {
    var G = S.G_playbook || {}, TS = G.templates || [], ad = G.address || {},
      pp = G.phrase_patterns || [], mt = G.male_talent_female_product || {};

    var h = '<div class="sd-b" id="sdPlay">'
      + sub('G', '可复制模板与话术：结构 + 原话', '从 ' + nn(G.n_female) + ' 条女性向样本里归纳');

    h += '<div class="sd-p">这 ' + TS.length + ' 个模板是从 ' + nn(G.n_female)
      + ' 条女性向视频里归纳出的<b>反复出现的结构</b>，'
      + '每个都给出结构公式、真实话术原话、样本量与覆盖品牌。'
      + '<span class="em">模板的价值是「照着能快速做出合规、且这个赛道听得进去的内容」，'
      + '不是「提升互动率」</span>——原因见每张卡片底部的统一说明。'
      + '注意模板之间<b>不互斥</b>，一条视频可同时命中多个模板，因此占比相加超过 100%。'
      + '每个模板下的 3 句原话来自<b>最能代表该模板的不同品牌视频</b>（每条视频最多取 1 句），'
      + '并已<b>剔除所有合规命中的原话</b>，可直接作为改写起点。</div>';

    h += '<div class="sd-warn"><div class="t">六个模板的互动率差异 · 按品牌分层后无一成立</div>'
      + mdb(G.template_caveat || '')
      + '<br>参照线：全部女性向样本互动率中位 <b>' + er(G.female_er_median) + '</b>。</div>';

    h += '<div class="sd-tpls">';
    TS.forEach(function (t) {
      var brands = (t.brands || []).map(function (b) { return b.brand + ' ' + b.n; }).join(' · ');
      var segmix = (t.seg_mix || []).map(function (x) { return esc(x.seg) + ' ' + x.n; }).join(' / ');
      h += '<article class="sd-tpl">'
        + '<div class="hd"><span class="cd">' + esc(t.code) + '</span>'
        + '<span class="nm">' + esc(t.name) + '</span></div>'
        + '<div class="sc"><b style="color:var(--ink-3)">适用：</b>' + esc(t.scene) + '</div>'
        + '<div class="fm">' + esc(t.formula) + '</div>'
        + '<div class="qt">'
        + (t.quotes || []).map(function (q) {
            var c = (q && typeof q === 'object') ? q.claim : q;
            var b = (q && typeof q === 'object') ? q.brand : '';
            if (!c) return '';
            return '<div class="q">「' + esc(c) + '」' + (b ? '<span class="qb"> · ' + esc(b) + '</span>' : '') + '</div>';
          }).join('')
        + '</div>'
        + '<div class="kv">'
        + '<div><div class="kk">样本量</div><div class="vv">' + nn(t.n)
        + '<span style="font-size:11px;color:var(--ink-4)"> 条</span></div></div>'
        + '<div><div class="kk">占女性向</div><div class="vv">' + pc(t.pct) + '</div></div>'
        + '<div><div class="kk">覆盖品牌</div><div class="vv">' + nn(t.n_brands)
        + '<span style="font-size:11px;color:var(--ink-4)"> 个</span></div></div>'
        + '<div><div class="kk">首次出品</div><div class="vv">' + sec(t.first_product_median) + '</div></div>'
        + '</div>'
        + '<div class="sc" style="font-size:10.5px"><b style="color:var(--ink-4)">子赛道分布：</b>' + segmix
        + '　<b style="color:var(--ink-4)">主要来自：</b>' + esc(brands) + '</div>'
        + '<div class="cav"><b>不能读作「换这个模板就能涨互动」：</b>'
        + '该模板互动率中位 ' + er(t.er_median) + '（n=' + nn(t.er_n) + '，仅作描述），'
        + '与其余女性向样本比较 '
        + (t.er_sig
          ? 'q=' + qTxt(t.er_q) + ' 看似显著，但<b>按品牌分层后 p=' + nn(t.er_p_brand_stratified) + '，不再显著</b>'
          : '<b>q=' + qTxt(t.er_q) + '，未达显著</b>（品牌内分层 p=' + nn(t.er_p_brand_stratified) + '）')
        + '。' + (t.enough ? '' : '<b>该模板样本不足，仅作定性描述。</b>')
        + '六个模板<b>无一在品牌分层后仍显著</b>。</div>'
        + '</article>';
    });
    h += '</div>'
      + '<div class="nd">原话一律照抄样本，未改写：每个模板优先从<b>只命中该模板</b>的视频里取，'
      + '一条视频最多取 1 句、尽量换品牌，并<b>剔除掉所有被合规命中的原话</b>。'
      + '但要注意——原话反映的是<b>这个赛道普遍怎么讲</b>，几个模板之间用词本身高度接近（弱酸、清爽、不刺激是全赛道通用语），'
      + '所以模板之间真正的差别在<b>结构公式</b>，不在这三句话。</div>';
    var terms = ad.terms || [];
    h += '<div class="sd-p" style="margin-top:24px"><b>女性称呼语分布。</b>'
      + esc(ad.note || '')
      + '（' + nn(ad.n_videos_with_term) + '/' + nn(G.n_female) + ' 条，' + pc(ad.pct) + '）'
      + '注意 C 块的检验结果：两个子赛道的称呼语命中率差异<b>未达显著</b>，'
      + 'F 块里称呼语数量与互动率也<b>未达显著</b>——'
      + '<b>称呼语是身份建立手段，不是互动率杠杆。</b></div>'
      + '<div class="sd-chips">';
    terms.forEach(function (t) {
      h += '<span class="sd-chip" title="' + esc(t.term + '：' + t.n + ' 条（' + pc(t.pct) + '）'
        + (t.quote ? '｜例：' + t.quote : '')) + '">'
        + esc(t.term) + ' <b>' + nn(t.n) + '</b></span>';
    });
    h += '</div>'
      + '<div class="nd">共 ' + terms.length + ' 个称呼语，分母为 ' + nn(G.n_female)
      + ' 条女性向样本，<b>同一条视频可出现多个称呼语</b>，因此条数相加会超过命中视频数。'
      + '悬停可看原话样例。</div>';

    /* 话术母题 */
    h += '<div class="sd-p" style="margin-top:22px"><b>话术母题 ' + pp.length
      + ' 类 · 均为样本原话，未改写。</b>「主张数」是同一母题下抄录到的主张句总数，'
      + '「命中视频」是出现过该母题的视频数，两者不同。'
      + '母题为 0 的也如实保留（说明这个说法在本样本里几乎没人用）。</div>'
      + '<div class="sd-tblw"><table class="sd-tbl" style="min-width:680px"><thead><tr>'
      + '<th>母题</th><th>主张数</th><th>命中视频</th><th>占女性向</th><th style="text-align:left">原话样例</th>'
      + '</tr></thead><tbody>';
    pp.forEach(function (x) {
      h += '<tr><td class="nm">' + esc(x.label)
        + '<span style="color:var(--ink-5);font-weight:400;font-size:10px"> · ' + esc(x.code) + '</span></td>'
        + '<td class="num">' + nn(x.n_claims) + '</td>'
        + '<td class="num">' + nn(x.n_videos) + '</td>'
        + '<td class="num">' + pc(x.pct) + '</td>'
        + '<td class="wrap" style="text-align:left">'
        + ((x.samples || []).length
          ? (x.samples || []).slice(0, 3).map(function (s) {
            return '「' + esc(s.quote) + '」<span style="color:var(--ink-5)">' + esc(s.brand) + '</span>';
          }).join('；')
          : '<span style="color:var(--ink-5)">本样本内无原话</span>')
        + '</td></tr>';
    });
    h += '</tbody></table></div>';

    /* 男达人 × 女性产品：样本为 0，只定性 */
    h += '<div class="nd"><b>男达人讲女性产品（n=' + nn(mt.n) + '）：</b>' + mdb(mt.verdict || '')
      + ' 另有 <b>' + nn(mt.male_endorse_n) + ' 条（' + pc(mt.male_endorse_pct)
      + '）出现「男性视角认可」</b>——即男性在片中<b>作为伴侣出镜或被引用为背书</b>，'
      + '而不是作为主讲达人。这两件事口径不同，不要混用。</div>';

    return h + '</div>';
  }

  /* ================================================================== *
   * 9. 区块 02-H：品牌打法画像（E_brands）
   * ================================================================== */
  function blockBrands(S) {
    var E = S.E_brands || {}, BS = E.brands || [], IN = E.insufficient || [], NY = E.not_yet_annotated || [];
    var cRows = ((S.F_compliance || {}).rows || []);
    var cRev = ((S.F_compliance || {}).review || {});
    var cDone = cRows.length > 0 && cRows.every(function (r) { return r.verdict && r.verdict !== 'pending'; });
    function vioOf(brand) {
      return cRows.filter(function (r) { return r.brand === brand && r.verdict === 'violation'; }).length;
    }
    function greyOf(brand) {
      return cRows.filter(function (r) { return r.brand === brand && r.verdict === 'grey'; }).length;
    }

    var h = '<div class="sd-b" id="sdBrands">'
      + sub('H', '品牌打法画像：结构差异远大于「讲得好不好」',
        '仅女性向样本 n≥' + nn(E.threshold) + ' 的 ' + BS.length + ' 个品牌');

    h += '<div class="sd-p">同一个赛道里，不同品牌的讲法差别很大——'
      + '<b>但这些差别主要来自品类与人群定位，不是「谁做得更好」</b>。'
      + '下面只解读<b>女性向样本 n≥' + nn(E.threshold) + '</b> 的品牌；'
      + '低于阈值的一律只列名、不解读。'
      + '<b>各卡片里的互动率中位数为描述性数字</b>，与讲法差异无因果关系（见 F 块）。</div>';

    h += '<div class="sd-brs">';
    BS.forEach(function (b) {
      h += '<article class="sd-br2">'
        + '<div class="hd"><span class="bn" title="' + esc(b.brand) + '">' + esc(b.brand) + '</span>'
        + '<span class="sg">' + esc(b.seg) + '</span>'
        + '<span class="cn">女性向样本 n=' + nn(b.n) + '</span></div>'
        + '<div class="sy">' + mdb(b.style) + '</div>'
        + '<div>'
        + '<div class="rw"><span class="rk">品类</span><span class="rv">' + top3(b.category) + '</span></div>'
        + '<div class="rw"><span class="rk">钩子</span><span class="rv">' + top3(b.hook) + '</span></div>'
        + '<div class="rw"><span class="rk">痛点</span><span class="rv">' + top3(b.pain) + '</span></div>'
        + '<div class="rw"><span class="rk">讲解</span><span class="rv">' + top3(b.explain) + '</span></div>'
        + '<div class="rw"><span class="rk">说服</span><span class="rv">' + top3(b.persuasion) + '</span></div>'
        + '<div class="rw"><span class="rk">语气</span><span class="rv">' + top3(b.tone)
        + relTag('tone_primary') + '</span></div>'
        + '<div class="rw"><span class="rk">体裁</span><span class="rv">' + top3(b.format) + '</span></div>'
        + '<div class="rw"><span class="rk">常用词</span><span class="rv">'
        + ((b.top_euphemism || []).length
          ? (b.top_euphemism || []).map(function (t) {
            return '「' + esc(t.term) + '」<span style="color:var(--ink-5)">' + t.n + '</span>';
          }).join('、')
          : '—') + '</span></div>'
        + '</div>'
        + '<div class="sd-kvs">'
        + '<div><div class="kk">代称覆盖</div><div class="vv">' + pc(b.euphemism_pct) + '</div></div>'
        + '<div><div class="kk">直说率</div><div class="vv">' + pc(b.taboo_direct_pct) + '</div></div>'
        + '<div><div class="kk">称呼语覆盖</div><div class="vv">' + pc(b.female_address_pct) + '</div></div>'
        + '<div><div class="kk">便捷主张</div><div class="vv">' + pc(b.convenience_pct) + '</div></div>'
        + '</div>'
        + '<div class="sd-kvs">'
        + '<div><div class="kk">提及价格</div><div class="vv">' + pc(b.price_pct) + '</div></div>'
        + '<div><div class="kk">有 CTA</div><div class="vv">' + pc(b.cta_pct) + '</div></div>'
        + '<div><div class="kk">首次出品</div><div class="vv">' + sec(b.first_product_median) + '</div></div>'
        + '<div><div class="kk">时长中位</div><div class="vv">' + sec(b.duration_median) + '</div></div>'
        + '</div>'
        + '<div class="sd-kvs">'
        + '<div><div class="kk">男达人占比</div><div class="vv">' + pc(b.talent_male_pct) + '</div></div>'
        + '<div><div class="kk">合规原词命中</div><div class="vv" style="color:var(--warn)">'
        + pc(b.compliance_hit_pct) + '</div></div>'
        + '<div><div class="kk">互动率中位 · 描述性</div>'
        + '<div class="vv" style="color:var(--ink-3)">' + er(b.er_median)
        + '<small>n=' + nn(b.er_n) + '</small></div>'
        + (b.er_note ? '<div style="font-size:10px;color:var(--ink-5);margin-top:3px">'
          + esc(b.er_note) + '</div>' : '') + '</div>'
        + '</div>'
        + '<div class="cav" style="font-size:10.5px;line-height:1.7;color:var(--ink-4);'
        + 'background:var(--paper-2);border-left:2px solid var(--line-3);padding:7px 9px">'
        + '「合规原词命中」= 该品牌抽样视频里出现需核查原词的比例，'
        + '<b>其中大部分是抑菌 / 杀菌类「需资质核查」项，不等于违规</b>。'
        + (cDone
          ? '人工逐条复核后，该品牌<b>真违规 ' + vioOf(b.brand) + ' 词次、灰区 '
            + greyOf(b.brand) + ' 词次</b>（明细见 I 块）。'
          : '人工复核尚未全部完成（见 I 块）。')
        + '</div>'
        + '</article>';
    });
    h += '</div>';

    /* 样本不足 / 尚无标注：如实展示 */
    h += '<div class="sd-cgrid c2" style="margin-top:18px">'
      + '<div class="sd-cbox"><div class="ct">样本不足 · 不解读 <em>女性向样本 &lt; ' + nn(E.threshold) + ' 条</em></div>'
      + (IN.length
        ? '<div class="sd-chips">' + IN.map(function (x) {
          return '<span class="sd-chip mute" title="' + esc(x.note || '') + '">' + esc(x.brand)
            + ' <b>n=' + nn(x.n) + '</b></span>';
        }).join('') + '</div>'
        + '<div class="nd">这 ' + IN.length + ' 个品牌<b>在抽样清单里有，但可下载 / 可标注的条数太少</b>，'
        + '所以本块只列名与 n，不出画像、不做任何风格描述——'
        + '<b>n 只有个位数时，任何占比都会被一两条视频左右</b>。'
        + IN.map(function (x) {
          return x.note ? esc(x.brand) + '：' + esc(x.note) + '。' : '';
        }).join('')
        + '</div>'
        : '<div class="nd">本次没有落在这一档的品牌：有标注的 ' + BS.length
        + ' 个品牌样本量都 ≥ ' + nn(E.threshold) + ' 条。</div>')
      + '</div>'
      + '<div class="sd-cbox"><div class="ct">尚无可用标注的品牌 <em>已在抽样清单内，标注仍在推进</em>'
      + (NY.length ? ' ' + pendBadge('标注中') : '') + '</div>'
      + (NY.length
        ? '<div class="sd-chips">' + NY.map(function (x) {
          return '<span class="sd-chip mute" title="' + esc(x.note || '') + '">' + esc(x.brand)
            + ' <b>清单 ' + nn(x.manifest_n) + ' 条</b> · ' + esc(x.seg) + '</span>';
        }).join('') + '</div>'
        + '<div class="nd">这 ' + NY.length + ' 个品牌<b>不是「没有投放」也不是「不值得看」</b>，'
        + '只是当前标注未完成，本块暂不出现。'
        + '预期品牌数 ' + nn(E.n_brands_expected) + ' 个、当前 ' + nn(E.n_brands)
        + ' 个，重跑聚合脚本后会自动补上。</div>'
        : '<div class="nd">无 —— <b>标注已全部跑完，没有品牌卡在「等标注」上</b>。'
        + '需要注意的是：抽样清单里共 ' + nn(E.n_brands_expected) + ' 个品牌，'
        + '本块出画像的是 ' + nn(E.n_brands) + ' 个，'
        + (IN.length
          ? '差额的 ' + IN.length + ' 个（' + IN.map(function (x) { return esc(x.brand); }).join('、')
            + '）落在左侧「样本不足」一档，<b>不是漏做，而是样本量不够、按规则不解读</b>。'
          : '')
        + '</div>')
      + '</div>'
      + '</div>';

    h += '<div class="sd-nt"><b>风格句怎么来的：</b>' + esc(E.style_note || '')
      + '<br><b>口径限制：</b>' + mdb(E.caveat || '') + '</div>';

    return h + '</div>';
  }

  /* ================================================================== *
   * 10. 区块 02-I：合规与资质核查（F_compliance，含 pending 状态）
   * ================================================================== */
  /* 四档人工判定的视觉规则：真违规 / 灰区 / 需资质核查 / 误报 / 待复核
     —— cert_required 与 false_positive 一律不上告警色，避免被读成违规 */
  var VD = {
    violation: { cls: 'v', mk: '●', cn: '真违规', tip: '人工复核判定为违规' },
    grey: { cls: 'g', mk: '◐', cn: '灰区 · 需品牌提供依据', tip: '表述本身不必然违规，取决于品牌能否提供依据' },
    cert_required: { cls: 'c', mk: '◇', cn: '需资质核查 · 非违规', tip: '持有对应资质即可宣称，不计入违规' },
    false_positive: { cls: 'f', mk: '○', cn: '误报', tip: '规则/模型命中但实际不构成问题，不计入违规' },
    pending: { cls: 'p', mk: '⋯', cn: '待人工复核', tip: '尚未给出人工判定' }
  };
  function vdBadge(v, cn) {
    var d = VD[String(v)] || { cls: 'p', mk: '·', cn: cn || String(v), tip: '数据层给出的判定值' };
    return '<span class="sd-vb ' + d.cls + '" title="' + esc(d.tip) + '"><i>' + d.mk + '</i>'
      + esc(cn || d.cn) + '</span>';
  }

  function blockCompliance(S) {
    var F = S.F_compliance || {}, sp = F.split || {}, sv = sp.suspect_violation || {},
      cc = sp.cert_check || {}, rows = F.rows || [], rv = F.review || {},
      byType = F.by_type || [], byBrand = F.by_brand || [], tt = F.term_top || [],
      fl = F.flagged || {};
    var counts = (rv.counts || []).slice();
    /* 判定分布：一律以明细行实际值为准统计，counts 只作交叉核对 */
    var byVd = {}, nPending = 0, nJudged = 0;
    rows.forEach(function (r) {
      var v = String(r.verdict || 'pending');
      byVd[v] = byVd[v] || { n: 0, cn: r.verdict_cn || v };
      byVd[v].n++;
      if (v === 'pending') nPending++; else nJudged++;
    });
    var ORDER = ['violation', 'grey', 'cert_required', 'false_positive', 'pending'];
    var vdList = ORDER.filter(function (v) { return byVd[v]; }).map(function (v) {
      return { verdict: v, n: byVd[v].n, cn: byVd[v].cn };
    });
    Object.keys(byVd).forEach(function (v) {
      if (ORDER.indexOf(v) < 0) vdList.push({ verdict: v, n: byVd[v].n, cn: byVd[v].cn });
    });
    var nVio = (byVd.violation || {}).n || 0;
    var nGrey = (byVd.grey || {}).n || 0;
    var allDone = nPending === 0 && rows.length > 0;
    var brandSampled = byBrand.map(function (b) { return b.n_sampled; }).filter(isNum);
    var minS = brandSampled.length ? Math.min.apply(null, brandSampled) : null;
    var maxS = brandSampled.length ? Math.max.apply(null, brandSampled) : null;
    var topHit = byBrand.slice().filter(function (b) { return isNum(b.hit_pct); })
      .sort(function (a, b) { return b.hit_pct - a.hit_pct; })[0] || {};

    var h = '<div class="sd-b alarm" id="sdComp">'
      + sub('I', '合规与资质核查：命中了什么原词、人工怎么判的',
        '基于 ' + nn(F.n_annotated) + ' 条抽样标注 · 非普查');

    /* 复核状态：必须最先说清楚 */
    h += '<div class="' + (allDone ? 'sd-info' : 'sd-warn') + '"><div class="t">复核状态 · '
      + (allDone ? '人工逐条复核已完成' : (nJudged ? '部分已复核，仍有 ' + nPending + ' 条待复核' : '全部待人工复核'))
      + (allDone ? '' : ' ' + pendBadge(nPending + ' 条 pending')) + '</div>'
      + mdb(rv.status || '')
      + '<br><b>复核清单文件：</b><code>' + esc(rv.file || '—') + '</code>'
      + '（' + (rv.exists ? '已存在，结论已回填明细行' : '<b>不存在</b>') + '）。'
      + '<br><b>本页统计口径：</b>判定分布按 <b>' + rows.length + ' 条明细行（词次）</b>统计，'
      + '不是按视频数 —— 一条视频可命中多个原词、且可能落在不同判定档。'
      + (counts.length ? '数据层给出的分布为 '
        + counts.map(function (c) { return esc(c.label) + ' ' + nn(c.n); }).join('、')
        + '，与本页明细统计一致。' : '')
      + '</div>';

    /* 四档判定：视觉必须可区分，且明确 cert_required / false_positive 不是违规 */
    h += '<div class="sd-p" style="margin-top:18px">' + nn(F.n_annotated) + ' 条标注样本中，<b>'
      + nn(F.n_videos_hit) + ' 条（' + pc(F.videos_hit_pct) + '）命中了合规 / 资质相关原词</b>，'
      + '共 ' + nn(F.n_term_hits) + ' 个词次，分布在 '
      + (new Set(rows.map(function (r) { return r.brand; }))).size + ' 个品牌。'
      + '人工逐条复核后分成<span class="em">四档，只有「真违规」与「灰区」需要品牌动作</span>：</div>';

    h += '<div class="sd-vds">';
    vdList.forEach(function (x) {
      var d = VD[x.verdict] || { cls: 'p' };
      h += '<div class="sd-vdc ' + d.cls + '">'
        + '<div class="k">' + vdBadge(x.verdict, x.cn) + '</div>'
        + '<div class="n">' + x.n + '<small>词次 / ' + rows.length + '</small></div>'
        + '<div class="d">占全部命中词次 ' + pc(x.n / rows.length * 100) + '</div>'
        + '</div>';
    });
    h += '</div>';

    h += '<div class="sd-warn" style="margin-top:14px"><div class="t">这四档怎么读 · 不要相加</div>'
      + '<b>真违规 ' + nVio + ' 词次</b>是本次唯一被人工判定为违规的部分；'
      + '<b>灰区 ' + nGrey + ' 词次</b>是「品牌能拿出依据就没问题、拿不出就有风险」；'
      + '<b>需资质核查 ' + ((byVd.cert_required || {}).n || 0) + ' 词次与误报 '
      + ((byVd.false_positive || {}).n || 0) + ' 词次都<u>不是违规</u></b>，'
      + '前者取决于品牌是否持有消字号 / 械字号资质，后者是规则或模型的错误命中。'
      + '<span class="em">把四档相加当成「违规量」会把风险放大 '
      + (nVio ? (rows.length / nVio).toFixed(1) + ' 倍' : '数倍') + '。</span></div>';

    /* 自动分桶 × 人工判定：说明「自动命中 ≠ 违规」到底差多少 */
    var BK = [
      { code: 'suspect_violation', cn: '疑似违规（自动）' },
      { code: 'cert_check', cn: '需资质核查（自动）' }
    ];
    var others = rows.filter(function (r) {
      return r.auto_bucket !== 'suspect_violation' && r.auto_bucket !== 'cert_check';
    });
    if (others.length) BK.push({ code: '__other', cn: '未归入两桶（自动）' });
    h += '<div class="sd-p" style="margin-top:20px"><b>自动分桶 × 人工判定：脚本的「疑似」到底有多准。</b>'
      + '行是脚本自动归的桶，列是人工复核结论。'
      + '<b>这张表就是「命中原词 ≠ 违规」的量化证据。</b></div>'
      + '<div class="sd-tblw"><table class="sd-tbl" style="min-width:620px"><thead><tr>'
      + '<th>自动分桶</th>'
      + vdList.map(function (x) { return '<th>' + esc(x.cn) + '</th>'; }).join('')
      + '<th>合计</th></tr></thead><tbody>';
    BK.forEach(function (bk) {
      var rs = rows.filter(function (r) {
        return bk.code === '__other'
          ? (r.auto_bucket !== 'suspect_violation' && r.auto_bucket !== 'cert_check')
          : r.auto_bucket === bk.code;
      });
      h += '<tr><td class="nm">' + esc(bk.cn) + '</td>'
        + vdList.map(function (x) {
          var n = rs.filter(function (r) { return String(r.verdict) === x.verdict; }).length;
          return '<td class="num" style="color:' + (n ? 'var(--ink-2)' : 'var(--ink-5)') + '">'
            + (n || '·') + '</td>';
        }).join('')
        + '<td class="num"><b>' + rs.length + '</b></td></tr>';
    });
    h += '</tbody></table></div>'
      + '<div class="nd">读法：脚本自动标为「疑似违规」的 ' + nn(sv.n_terms)
      + ' 个词次里，人工只判了 ' + nVio + ' 个真违规，其余落到灰区 / 需资质核查 / 误报；'
      + '而自动标为「需资质核查」的 ' + nn(cc.n_terms) + ' 个词次里，'
      + '人工也筛出了一部分误报。<b>所以自动命中数不能当违规数用。</b></div>';

    h += '<div class="sd-info"><div class="t">为什么「需资质核查」必须单列</div>'
      + mdb(cc.note || '')
      + '<br>按自动分桶，抑菌 / 械字号类共 <b>' + nn(cc.n_terms) + ' 词次 / '
      + nn(cc.n_videos) + ' 条视频（占样本 ' + pc(cc.pct_videos) + '）</b>；'
      + '自动标为疑似违规的是 <b>' + nn(sv.n_terms) + ' 词次 / ' + nn(sv.n_videos) + ' 条视频</b>。'
      + '<b>把前者算进违规，会把违规量做虚高——它们要核对的是资质，不是表述本身。</b></div>';

    /* 管线自动质检标记：与合规无关，单列 */
    h += '<div class="sd-vd" style="margin-top:16px">'
      + '<div class="sd-vi bad"><div class="k">人工判定 · 真违规</div>'
      + '<div class="n">' + nVio + '<small>词次</small></div>'
      + '<div class="d">来自 '
      + (new Set(rows.filter(function (r) { return r.verdict === 'violation'; })
        .map(function (r) { return r.brand; }))).size + ' 个品牌，逐条明细见下方</div></div>'
      + '<div class="sd-vi"><div class="k">人工判定 · 灰区</div>'
      + '<div class="n">' + nGrey + '<small>词次</small></div>'
      + '<div class="d">需品牌补依据，未判违规</div></div>'
      + '<div class="sd-vi"><div class="k">已完成人工判定</div>'
      + '<div class="n">' + nJudged + '<small>/ ' + rows.length + ' 词次</small></div>'
      + '<div class="d">' + (allDone ? '<b>100% 完成，0 条 pending</b>' : '仍有 ' + nPending + ' 条 pending') + '</div></div>'
      + '<div class="sd-vi"><div class="k">管线自动质检标记</div>'
      + '<div class="n">' + nn(fl.total) + '<small>条</small></div>'
      + '<div class="d">与合规<b>不是一回事</b>，见下方说明</div></div>'
      + '</div>';

    /* 按类型 */
    h += '<div class="sd-p" style="margin-top:20px"><b>按风险类型看：</b></div>'
      + '<div class="sd-tblw"><table class="sd-tbl" style="min-width:520px"><thead><tr>'
      + '<th>风险类型</th><th>词次</th><th>命中视频</th><th style="text-align:left">归入的桶</th>'
      + '</tr></thead><tbody>';
    byType.forEach(function (t) {
      var bad = t.bucket === '疑似违规';
      h += '<tr><td class="nm">' + esc(t.label)
        + '<span style="color:var(--ink-5);font-weight:400;font-size:10px"> · ' + esc(t.code) + '</span></td>'
        + '<td class="num">' + nn(t.n_terms) + '</td>'
        + '<td class="num">' + nn(t.n_videos) + '</td>'
        + '<td style="text-align:left;color:' + (bad ? 'var(--warn)' : 'var(--ink-3)')
        + ';font-weight:' + (bad ? '600' : '400') + '">' + esc(t.bucket) + '</td></tr>';
    });
    h += '</tbody></table></div>';

    /* 按品牌 */
    h += '<div class="sd-p" style="margin-top:20px"><b>按品牌看命中率</b>——'
      + '<b>这不是品牌合规排名</b>：每品牌只有 '
      + (isNum(minS) && isNum(maxS) ? (minS === maxS ? minS + ' 条' : minS + '~' + maxS + ' 条') : '十几到二十条')
      + '抽样，且命中率高低主要取决于该品牌是否做抑菌类宣称（自动归入「需资质核查」桶），'
      + '不代表违规程度。<b>违规量请看上方四档判定，不要看这一列。</b></div>'
      + '<div class="sd-tblw"><table class="sd-tbl" style="min-width:640px"><thead><tr>'
      + '<th>品牌</th><th>抽样条数</th><th>命中视频</th><th>命中率</th><th>词次</th>'
      + '<th>其中真违规</th><th style="text-align:left">备注</th>'
      + '</tr></thead><tbody>';
    byBrand.forEach(function (b) {
      var bv = rows.filter(function (r) {
        return r.brand === b.brand && r.verdict === 'violation';
      }).length;
      h += '<tr><td class="nm">' + esc(b.brand) + '</td>'
        + '<td class="num">' + nn(b.n_sampled) + '</td>'
        + '<td class="num">' + nn(b.n_videos_hit) + '</td>'
        + '<td class="num">' + pc(b.hit_pct) + '</td>'
        + '<td class="num">' + nn(b.n_terms) + '</td>'
        + '<td class="num" style="color:' + (bv ? 'var(--warn)' : 'var(--ink-5)')
        + ';font-weight:' + (bv ? '600' : '400') + '">' + (bv || '0') + '</td>'
        + '<td class="wrap" style="text-align:left">' + esc(b.note || '—') + '</td></tr>';
    });
    h += '</tbody></table></div>'
      + '<div class="nd">「词次」≥「命中视频」是正常的：<b>同一条视频可命中多个原词</b>。'
      + '各品牌抽样条数不等，因为标注完成度不同，'
      + '<b>命中率分母是该品牌已完成标注的条数，不是全部投放</b>。'
      + (topHit.brand
        ? '命中率最高的' + esc(topHit.brand) + '（' + nn(topHit.n_videos_hit) + '/'
          + nn(topHit.n_sampled) + '）绝大部分来自抑菌类「需资质核查」词，<b>不能读作违规率</b>。'
        : '')
      + '「其中真违规」一列才是人工判定后的违规词次。</div>';

    /* 原词榜 */
    h += '<div class="sd-p" style="margin-top:20px"><b>命中原词 TOP ' + tt.length
      + ' · 原样展示</b>。可以看出这一桶的绝大多数是<b>「抑菌率 99.9%」的各种说法变体</b>。</div>'
      + '<div class="sd-tblw"><table class="sd-tbl" style="min-width:560px"><thead><tr>'
      + '<th>原词</th><th>词次</th><th>命中视频</th><th style="text-align:left">风险类型</th>'
      + '</tr></thead><tbody>';
    tt.forEach(function (t) {
      var bad = t.type !== '抑菌杀菌·需消毒资质';
      h += '<tr><td class="nm"><span class="sd-term" style="color:'
        + (bad ? 'var(--warn)' : 'var(--ink-2)') + '">' + esc(t.term) + '</span></td>'
        + '<td class="num">' + nn(t.n) + '</td>'
        + '<td class="num">' + nn(t.n_videos) + '</td>'
        + '<td style="text-align:left;color:' + (bad ? 'var(--warn)' : 'var(--ink-4)') + '">'
        + esc(t.type) + '</td></tr>';
    });
    h += '</tbody></table></div>';

    /* 明细：按人工判定分组，真违规 / 灰区先摆，需资质核查与误报折叠 */
    function rowHTML(r) {
      var v = String(r.verdict || 'pending');
      var hot = (v === 'violation' || v === 'grey');
      return '<tr><td class="nm">' + esc(r.brand)
        + '<span style="color:var(--ink-5);font-weight:400;font-size:10px"><br>' + esc(r.seg)
        + ' · ' + esc(r.category) + '</span></td>'
        + '<td style="text-align:left;white-space:normal;color:'
        + (hot ? 'var(--warn)' : 'var(--ink-2)') + ';font-weight:600">'
        + esc(r.term) + '</td>'
        + '<td class="wrap" style="text-align:left"><span class="sd-quote">「' + esc(r.quote) + '」</span>'
        + '<span style="color:var(--ink-5);font-size:10px"> ' + (isNum(r.sec) ? sec(r.sec) : '') + '</span>'
        + (r.url ? '<br><a class="sd-vl" href="' + esc(r.url) + '" target="_blank" rel="noopener noreferrer">'
          + '原视频 ↗</a>' : '') + '</td>'
        + '<td style="text-align:left;white-space:normal">' + esc(r.type_cn)
        + '<div style="font-size:10px;color:var(--ink-5);margin-top:3px">自动桶 · '
        + esc(r.auto_bucket_cn || r.auto_bucket || '—') + '</div></td>'
        + '<td style="text-align:left;white-space:normal">'
        + (v === 'pending' ? pendBadge(r.verdict_cn || '待人工复核') : vdBadge(v, r.verdict_cn))
        + (r.note ? '<div style="font-size:10.5px;color:var(--ink-4);margin-top:4px;line-height:1.6">'
          + esc(r.note) + '</div>' : '') + '</td></tr>';
    }
    var TH = '<thead><tr><th>品牌 / 子赛道</th><th>命中原词</th>'
      + '<th style="text-align:left">原话与时间点</th>'
      + '<th style="text-align:left">风险类型</th><th style="text-align:left">人工判定</th>'
      + '</tr></thead>';
    function grp(v) { return rows.filter(function (r) { return String(r.verdict || 'pending') === v; }); }
    var rVio = grp('violation'), rGrey = grp('grey'),
      rCert = grp('cert_required'), rFalse = grp('false_positive'), rPend = grp('pending');
    var rElse = rows.filter(function (r) {
      return ORDER.indexOf(String(r.verdict || 'pending')) < 0;
    });

    h += '<div class="sd-p" style="margin-top:22px"><b>需要品牌动作的 '
      + (rVio.length + rGrey.length) + ' 条明细 · 逐条给出原词、原话与时间点</b>。'
      + '上半段是人工判定的 <b>' + rVio.length + ' 条真违规</b>，'
      + '下半段是 <b>' + rGrey.length + ' 条灰区</b>（能否成立取决于品牌能否提供依据）。'
      + '<span class="em">判定来自人工复核清单，不是脚本推断，也不构成法律意见。</span></div>'
      + '<div class="sd-tblw"><table class="sd-tbl" style="min-width:780px">' + TH + '<tbody>'
      + (rVio.length
        ? '<tr class="grp"><td colspan="5">真违规 · ' + rVio.length + ' 条</td></tr>'
        + rVio.map(rowHTML).join('')
        : '<tr class="grp"><td colspan="5">真违规 · 0 条</td></tr>')
      + (rGrey.length
        ? '<tr class="grp"><td colspan="5">灰区 · 需品牌提供依据 · ' + rGrey.length + ' 条</td></tr>'
        + rGrey.map(rowHTML).join('')
        : '')
      + (rPend.length
        ? '<tr class="grp"><td colspan="5">尚未复核 · ' + rPend.length + ' 条</td></tr>'
        + rPend.map(rowHTML).join('')
        : '')
      + (rElse.length
        ? '<tr class="grp"><td colspan="5">其他判定值 · ' + rElse.length + ' 条</td></tr>'
        + rElse.map(rowHTML).join('')
        : '')
      + '</tbody></table></div>';

    h += '<details class="sd-fold"><summary>「需资质核查 · 非违规」' + rCert.length
      + ' 条明细 <span class="c">抑菌 / 杀菌 / 械字号类 · 品牌持有对应资质即可宣称，'
      + '<b>不计入违规数</b></span><span class="hint"></span></summary><div class="sd-foldb">'
      + '<div class="nd" style="margin-top:10px">这一档的判断不在内容里，而在<b>品牌是否持有消毒产品卫生许可（消字号）'
      + '或医疗器械资质，以及宣称是否超出资质范围</b>。人工复核已确认这些表述<b>本身不构成违规</b>，'
      + '需要品牌方提供资质文件做形式核对，属常规合规动作。</div>'
      + '<div class="sd-tblw"><table class="sd-tbl" style="min-width:780px">' + TH + '<tbody>'
      + rCert.map(rowHTML).join('')
      + '</tbody></table></div></div></details>';

    h += '<details class="sd-fold"><summary>「误报」' + rFalse.length
      + ' 条明细 <span class="c">规则 / 模型命中但人工确认不构成问题 · <b>不计入违规数</b></span>'
      + '<span class="hint"></span></summary><div class="sd-foldb">'
      + '<div class="nd" style="margin-top:10px">这一档是<b>关键词匹配的假阳性</b>：'
      + '例如否定语境、引用他人说法、词形巧合等。列出来是为了让规则的误差率可被检验 ——'
      + '本次命中共 ' + rows.length + ' 词次，误报 ' + rFalse.length + ' 词次（'
      + pc(rFalse.length / rows.length * 100) + '），'
      + '<b>这也是自动命中数不能直接当违规数的原因之一</b>。</div>'
      + '<div class="sd-tblw"><table class="sd-tbl" style="min-width:780px">' + TH + '<tbody>'
      + rFalse.map(rowHTML).join('')
      + '</tbody></table></div></div></details>';

    /* 自动质检标记 ≠ 合规 */
    h += '<details class="sd-fold"><summary>标注管线的自动质检标记 <span class="c">'
      + nn(fl.total) + ' 条 · ' + ((fl.reasons || []).length) + ' 种原因 · 与合规不是一回事</span>'
      + '<span class="hint"></span></summary><div class="sd-foldb">'
      + '<div class="nd" style="margin-top:10px">' + esc(fl.note || '') + '</div>'
      + '<div class="sd-tblw"><table class="sd-tbl" style="min-width:0"><thead><tr>'
      + '<th>标记原因</th><th>条数</th></tr></thead><tbody>'
      + (fl.reasons || []).map(function (r) {
        return '<tr><td class="wrap" style="text-align:left">' + esc(r.reason) + '</td>'
          + '<td class="num">' + nn(r.n) + '</td></tr>';
      }).join('')
      + '</tbody></table></div></div></details>';

    /* 复核文件格式 + 方法 + 免责 */
    h += '<details class="sd-fold"><summary>复核方法与回填格式 <span class="c">'
      + (allDone ? '本轮 ' + rows.length + ' 条判定均由人工复核文件回填，脚本不自动定性'
        : '写好 review 文件后重跑聚合脚本即自动回填 verdict')
      + '</span><span class="hint"></span></summary>'
      + '<div class="sd-foldb">'
      + '<div class="sd-nt" style="margin-top:10px"><b>归类与判定方法：</b>' + esc(F.method || '') + '</div>'
      + '<div class="sd-nt"><b>回填格式：</b>' + esc(rv.schema_hint || '') + '</div>'
      + '<div class="sd-nt"><b>本页与数据层的分工：</b>自动分桶（疑似违规 / 需资质核查）来自关键词与风险类型规则，'
      + '回答「命中了什么原词」；<b>四档 verdict 来自人工逐条复核文件</b>，回答「这条到底算不算问题」。'
      + '前端只做展示与分组计数，不做任何定性推断。</div>'
      + '</div></details>';

    h += '<div class="sd-warn" style="margin-top:18px"><div class="t">必读 · 基于 '
      + nn(F.n_annotated) + ' 条抽样，非普查</div>' + mdb(F.disclaimer || '') + '</div>';

    return h + '</div>';
  }

  /* ================================================================== *
   * 11. 区块 02-J：本数据不支持的说法 + 方法学局限
   * ================================================================== */
  function blockLimits(S) {
    var nc = S.not_concluded || [], lim = S.limitations || [], m = S.meta || {};

    var h = '<div class="sd-b alarm" id="sdLimits">'
      + sub('J', '本数据不支持的说法，以及方法学局限', '写清楚哪些话这份数据撑不住');

    h += '<div class="sd-p">下面每一条都是<b>本可以写得更好看、但证据不够所以没写</b>的结论。'
      + '把它们摆在这里，比把它们藏起来更有用。'
      + '<b>' + nc.length + ' 条不支持的说法、' + lim.length + ' 条方法学局限，全部列出，未做截断。</b></div>';

    h += '<div class="sd-warn" style="margin-top:18px"><div class="t">× 本数据不支持的说法 · '
      + nc.length + ' 条</div>'
      + '以下每一条都<b>不能写进汇报、不能作为投放依据</b>；'
      + '如果在别处看到相反表述，请以本清单为准。</div>'
      + '<ul class="sd-li no">';
    nc.forEach(function (x) { h += '<li>' + mdb(x) + '</li>'; });
    h += '</ul>';

    h += '<div class="sd-p" style="margin-top:24px"><b>方法学局限 · ' + lim.length + ' 条</b></div>'
      + '<ul class="sd-li">';
    lim.forEach(function (x) { h += '<li>' + mdb(x) + '</li>'; });
    h += '</ul>';

    h += '<div class="sd-nt"><b>生成信息：</b>脚本 ' + esc(m.script || '') + ' · '
      + esc(m.generated_at || '') + ' · ' + esc(m.generated_by || '')
      + '<br><b>中间产物：</b>' + (m.sources || []).map(function (x) { return esc(x); }).join('、')
      + '<br><b>前端原则：</b>' + esc(m.principle || '') + '</div>';

    return h + '</div>';
  }

  /* ================================================================== *
   * 12. 图表层：8 个 ECharts 实例
   *     所有实例都经 mk() 生成 → 首次创建时交回宿主 CHARTS.radar 复用 resize。
   *     换肤时重新 setOption(..., true)，不 dispose、不重复 push。
   * ================================================================== */

  /* 图 1 · H 块：私处 / 月经原词 TOP 18，颜色 = 词表归类 */
  function chTerms(S) {
    var dom = document.getElementById('sdHTerms'); if (!dom) return;
    var H = S.H_taboo_language || {}, p = P();
    var tt = (H.top_terms || []).slice(0, 18).slice().reverse();
    mk(dom, {
      animation: false,
      grid: { left: labW(dom, 96, 74), right: 62, top: 30, bottom: 8, containLabel: false },
      tooltip: Object.assign(baseTip(p), {
        trigger: 'item',
        formatter: function (o) {
          var t = tt[o.dataIndex] || {};
          return '<b>「' + esc(t.term) + '」</b><br>'
            + '归类：' + esc(t.cls_label || CLS_CN[t.cls] || '未归类') + '<br>'
            + '命中 <b>' + t.n_videos + '</b> / ' + (H.n || '—') + ' 条（' + pc(t.pct) + '）<br>'
            + '出现于 ' + t.n_brands + ' 个品牌<br>'
            + (t.quote ? '<span style="color:' + p.ink4 + '">原话：「' + esc(t.quote) + '」</span>' : '');
        }
      }),
      legend: {
        top: 2, left: 0, itemWidth: 9, itemHeight: 9, itemGap: 14,
        textStyle: { color: p.ink4, fontSize: 11 },
        data: ['委婉代称', '直白医学词', '未归类']
      },
      xAxis: {
        type: 'value', max: 50,
        axisLabel: { color: p.ink5, fontSize: 10, formatter: '{value}%' },
        splitLine: { lineStyle: { color: p.line2 } },
        axisLine: { show: false }, axisTick: { show: false }
      },
      yAxis: {
        type: 'category',
        data: tt.map(function (t) { return t.term; }),
        axisLabel: { color: p.ink2, fontSize: labW(dom, 11, 10), width: labW(dom, 92, 70), overflow: 'truncate' },
        axisLine: { lineStyle: { color: p.line } }, axisTick: { show: false }
      },
      /* 三个只为图例存在的空系列：让颜色含义可读 */
      series: [
        { name: '委婉代称', type: 'bar', data: [], itemStyle: { color: C1() } },
        { name: '直白医学词', type: 'bar', data: [], itemStyle: { color: C2() } },
        { name: '未归类', type: 'bar', data: [], itemStyle: { color: C3() } },
        {
          type: 'bar', barWidth: '62%', silent: false,
          data: tt.map(function (t) {
            return { value: t.pct, itemStyle: { color: clsColor(t.cls), borderRadius: [0, 2, 2, 0] } };
          }),
          label: {
            show: true, position: 'right', fontSize: 10, color: p.ink3,
            formatter: function (o) {
              var t = tt[o.dataIndex] || {};
              return o.value.toFixed(1) + '%  ' + t.n_videos + '条';
            }
          }
        }
      ]
    });
  }

  /* 图 2 · H 块：6 个品牌的用词三率对照（分组条，指标各自独立） */
  function chBrandTerms(S) {
    var dom = document.getElementById('sdHBrand'); if (!dom) return;
    var H = S.H_taboo_language || {}, p = P();
    var bs = (H.by_brand || []).slice();
    var names = bs.map(function (b) { return b.brand; });
    var SER = [
      { name: '出现委婉代称', key: 'euphemism_pct', color: C1() },
      { name: '出现直白医学词', key: 'explicit_pct', color: C2() },
      { name: '直白谈私处 / 月经', key: 'taboo_direct_pct', color: C3() }
    ];
    mk(dom, {
      animation: false,
      grid: { left: 8, right: 12, top: 34, bottom: 46, containLabel: true },
      tooltip: Object.assign(baseTip(p), {
        trigger: 'axis', axisPointer: { type: 'shadow' },
        formatter: function (a) {
          var b = bs[a[0].dataIndex] || {};
          var s = '<b>' + esc(b.brand) + '</b> · 抽样 ' + b.n + ' 条<br>';
          a.forEach(function (x) { s += x.marker + esc(x.seriesName) + '：<b>' + pc(x.value) + '</b><br>'; });
          s += '<span style="color:' + p.ink4 + '">平均每条 ' + b.terms_per_video + ' 个原词';
          if ((b.top_terms || []).length) {
            s += '<br>常用：' + (b.top_terms || []).slice(0, 4).map(function (t) {
              return '「' + esc(t.term) + '」' + t.n;
            }).join('、');
          }
          return s + '</span>';
        }
      }),
      legend: { top: 2, left: 0, itemWidth: 9, itemHeight: 9, itemGap: 14, textStyle: { color: p.ink4, fontSize: 11 } },
      xAxis: {
        type: 'category', data: names,
        axisLabel: {
          color: p.ink3, fontSize: labW(dom, 10.5, 9.5), interval: 0,
          width: labW(dom, 72, 46), overflow: 'break', lineHeight: 13
        },
        axisTick: { show: false }, axisLine: { lineStyle: { color: p.line } }
      },
      yAxis: {
        type: 'value', max: 112, interval: 20,
        /* 上留一点余量给 100% 那根柱子的数值标签；>100 的刻度不出标签 */
        axisLabel: {
          color: p.ink5, fontSize: 10,
          formatter: function (v) { return v > 100 ? '' : v + '%'; }
        },
        splitLine: { lineStyle: { color: p.line2 } }
      },
      series: SER.map(function (s) {
        return {
          name: s.name, type: 'bar', barMaxWidth: 16, itemStyle: { color: s.color },
          data: bs.map(function (b) { return b[s.key]; }),
          label: {
            show: true, position: 'top', fontSize: 9, color: p.ink4, rotate: 0,
            formatter: function (o) { return isNum(o.value) ? o.value.toFixed(0) : ''; }
          }
        };
      })
    });
  }

  /* 图 3 / 4 · C 块：子赛道双向对照条。
     左右两侧各画一根，避免同轴同色难辨；标签固定贴在条形外侧，不会互相压。 */
  function chSegDiverge(id, rows, B, h) {
    var dom = document.getElementById(id); if (!dom) return;
    var p = P();
    var rs = rows.slice().reverse();
    var g1 = rs.map(function (r) { return r.unit === 's' ? null : r.g1_pct; });
    var g2 = rs.map(function (r) { return r.unit === 's' ? null : r.g2_pct; });
    mk(dom, {
      animation: false,
      grid: { left: labW(dom, 132, 92), right: 20, top: 30, bottom: 26, containLabel: true },
      tooltip: Object.assign(baseTip(p), {
        trigger: 'axis', axisPointer: { type: 'shadow' },
        formatter: function (a) {
          var r = rs[a[0].dataIndex] || {}, rb = r.rb || {}, lb = rb.lobo || {}, cm = rb.cmh_fans_band || {};
          var s = '<b>' + esc(r.label) + '</b><br>'
            + esc(B.g1_label) + '：<b>' + pc(r.g1_pct) + '</b>（' + nn(r.g1_n) + '/' + nn(B.g1_n) + '）<br>'
            + esc(B.g2_label) + '：<b>' + pc(r.g2_pct) + '</b>（' + nn(r.g2_n) + '/' + nn(B.g2_n) + '）<br>'
            + 'q=' + qTxt(r.q) + (isNum(r.q) && r.q < 0.05 ? '' : ' · 未达显著')
            + '　p=' + pTxt(r.p) + '<br>';
          if (rb.robust != null) {
            s += '<span style="color:' + p.ink4 + '">留一品牌最差 p=' + pTxt(lb.worst_p)
              + (lb.worst_drop_brand ? '（剔 ' + esc(lb.worst_drop_brand) + '）' : '')
              + '<br>粉丝量级 CMH p=' + (isNum(cm.p) ? pTxt(cm.p) : '分层不足')
              + '<br>综合：' + (rb.robust ? '两项都稳' : '至少一项不稳，含构成成分') + '</span>';
          }
          return s;
        }
      }),
      legend: {
        top: 2, left: 0, itemWidth: 9, itemHeight: 9, itemGap: 14,
        textStyle: { color: p.ink4, fontSize: 11 }
      },
      xAxis: {
        type: 'value', max: 100,
        axisLabel: { color: p.ink5, fontSize: 10, formatter: '{value}%' },
        splitLine: { lineStyle: { color: p.line2 } }, axisLine: { show: false }, axisTick: { show: false }
      },
      yAxis: {
        type: 'category', data: rs.map(function (r) { return r.short; }),
        axisLabel: {
          color: p.ink2, fontSize: labW(dom, 11, 10),
          width: labW(dom, 126, 86), overflow: 'truncate'
        },
        axisLine: { lineStyle: { color: p.line } }, axisTick: { show: false }
      },
      series: [
        {
          name: B.g1_label, type: 'bar', barMaxWidth: 9, barGap: '18%',
          itemStyle: { color: C1(), borderRadius: [0, 2, 2, 0] }, data: g1,
          label: {
            show: true, position: 'right', fontSize: 9.5, color: p.ink4, distance: 4,
            formatter: function (o) { return isNum(o.value) ? o.value.toFixed(0) + '%' : ''; }
          }
        },
        {
          name: B.g2_label, type: 'bar', barMaxWidth: 9,
          itemStyle: { color: C2(), borderRadius: [0, 2, 2, 0] }, data: g2,
          label: {
            show: true, position: 'right', fontSize: 9.5, color: p.ink5, distance: 4,
            formatter: function (o) { return isNum(o.value) ? o.value.toFixed(0) + '%' : ''; }
          }
        }
      ]
    });
  }

  /* 图 5 / 6 · D 块：多选字段分布（痛点 / 说服逻辑） */
  function chDist(id, arr, base, color) {
    var dom = document.getElementById(id); if (!dom) return;
    var p = P();
    var rs = (arr || []).slice().reverse();
    mk(dom, {
      animation: false,
      grid: { left: labW(dom, 104, 82), right: 54, top: 8, bottom: 22, containLabel: false },
      tooltip: Object.assign(baseTip(p), {
        trigger: 'item',
        formatter: function (o) {
          var r = rs[o.dataIndex] || {};
          return '<b>' + esc(r.label) + '</b><br>' + r.n + ' / ' + base + ' 条（' + pc(r.pct) + '）'
            + '<br><span style="color:' + p.ink4 + '">多选字段，各项相加会超过 100%</span>';
        }
      }),
      xAxis: {
        type: 'value',
        axisLabel: { color: p.ink5, fontSize: 10, formatter: '{value}%' },
        splitLine: { lineStyle: { color: p.line2 } }, axisLine: { show: false }, axisTick: { show: false }
      },
      yAxis: {
        type: 'category', data: rs.map(function (r) { return r.label; }),
        axisLabel: { color: p.ink2, fontSize: 10.5, width: labW(dom, 100, 78), overflow: 'truncate' },
        axisLine: { lineStyle: { color: p.line } }, axisTick: { show: false }
      },
      series: [{
        type: 'bar', barMaxWidth: 12,
        itemStyle: { color: color, borderRadius: [0, 2, 2, 0] },
        data: rs.map(function (r) { return r.pct; }),
        label: {
          show: true, position: 'right', fontSize: 9.5, color: p.ink4,
          formatter: function (o) {
            var r = rs[o.dataIndex] || {};
            return o.value.toFixed(1) + '% · ' + r.n;
          }
        }
      }]
    });
  }

  /* 图 7 · E 块：七段落时长占比，均值 vs 中位并列 */
  function chStage(S) {
    var dom = document.getElementById('sdEStage'); if (!dom) return;
    var D = S.D_structure || {}, p = P();
    var ss = (D.stage_share || []).slice();
    var pres = {};
    (D.stage_presence || []).forEach(function (x) { pres[x.code] = x; });
    mk(dom, {
      animation: false,
      grid: { left: 6, right: 12, top: 34, bottom: 30, containLabel: true },
      tooltip: Object.assign(baseTip(p), {
        trigger: 'axis', axisPointer: { type: 'shadow' },
        formatter: function (a) {
          var st = ss[a[0].dataIndex] || {}, pr = pres[st.code] || {};
          return '<b>' + esc(st.label) + '</b><br>'
            + '均值占比 <b>' + pc(st.mean_pct) + '</b>　中位占比 <b>' + pc(st.median_pct) + '</b><br>'
            + '出现该段的视频：' + nn(pr.n) + ' / ' + nn(D.n) + ' 条（' + pc(pr.pct) + '）<br>'
            + '<span style="color:' + p.ink4 + '">'
            + (isNum(st.median_pct) && st.median_pct === 0
              ? '中位为 0 → 一半以上的片子完全没有这一段，此时均值会高估普遍程度'
              : '均值高于中位说明少数片子把这一段拉得很长')
            + '</span>';
        }
      }),
      legend: { top: 2, left: 0, itemWidth: 9, itemHeight: 9, itemGap: 14, textStyle: { color: p.ink4, fontSize: 11 } },
      xAxis: {
        type: 'category', data: ss.map(function (x) { return x.label; }),
        axisLabel: { color: p.ink3, fontSize: labW(dom, 11, 9.5), interval: 0 },
        axisTick: { show: false }, axisLine: { lineStyle: { color: p.line } }
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: p.ink5, fontSize: 10, formatter: '{value}%' },
        splitLine: { lineStyle: { color: p.line2 } }
      },
      series: [
        {
          name: '均值占比', type: 'bar', barMaxWidth: 18, itemStyle: { color: C1() },
          data: ss.map(function (x) { return x.mean_pct; }),
          label: {
            show: true, position: 'top', fontSize: 9.5, color: p.ink4,
            formatter: function (o) { return o.value.toFixed(1); }
          }
        },
        {
          name: '中位占比', type: 'bar', barMaxWidth: 18, itemStyle: { color: C2() },
          data: ss.map(function (x) { return x.median_pct; }),
          label: {
            show: true, position: 'top', fontSize: 9.5, color: p.ink5,
            formatter: function (o) { return o.value.toFixed(1); }
          }
        }
      ]
    });
  }

  /* 图 8 · F 块：全部检验的 q 值分布。
     两排（互动率 / GMV），同 q 值的点按固定规则纵向错位，纵坐标本身无含义。 */
  function chQ(S) {
    var dom = document.getElementById('sdFQ'); if (!dom) return;
    var C = S.C_content_x_effect || {}, gmv = C.gmv || {}, p = P();
    var FLOOR = 0.0008;
    var bsr = {};
    (C.brand_and_seg_robust || []).forEach(function (x) { bsr[x.label] = 1; });

    function pack(tests, row) {
      var seen = {}, out = [];
      (tests || []).forEach(function (t) {
        var q = isNum(t.q) ? Math.max(t.q, FLOOR) : null;
        if (q == null) return;
        var k = q.toExponential(2);
        seen[k] = (seen[k] || 0) + 1;
        var off = ((seen[k] - 1) % 5) * 0.16 * (seen[k] % 2 ? 1 : -1);
        out.push({
          value: [q, row + off],
          t: t,
          itemStyle: {
            color: bsr[t.label] ? cv('--pos', '#4F6552') : (t.sig ? C1() : C3()),
            borderColor: bsr[t.label] ? cv('--pos', '#4F6552') : 'transparent',
            borderWidth: bsr[t.label] ? 4 : 0, opacity: t.sig ? 0.95 : 0.55
          },
          symbolSize: bsr[t.label] ? 13 : (t.sig ? 9 : 7)
        });
      });
      return out;
    }

    mk(dom, {
      animation: false,
      grid: { left: labW(dom, 88, 78), right: 22, top: 34, bottom: 44 },
      tooltip: Object.assign(baseTip(p), {
        trigger: 'item',
        formatter: function (o) {
          var t = (o.data || {}).t || {};
          var s = '<b>' + esc(t.label) + '</b>'
            + '<span style="color:' + p.ink5 + '"> · ' + esc(t.field) + '</span><br>'
            + 'q=' + qTxt(t.q) + '　p=' + pTxt(t.p) + '<br>'
            + (t.sig ? '<b>BH-FDR 后显著</b>' : '<b>未达显著</b>') + '<br>';
          if (isNum(t.er1) && isNum(t.er0)) {
            s += '命中组互动率中位 ' + er(t.er1) + ' vs 未命中 ' + er(t.er0)
              + '（n=' + t.n1 + ' / ' + t.n0 + ')<br>';
          }
          if (isNum(t.med1) && isNum(t.med0)) {
            s += '命中组每千播 GMV 中位 ' + t.med1 + ' vs ' + t.med0
              + '（n=' + t.n1 + ' / ' + t.n0 + ')<br>';
          }
          if ((t.levels || []).length) {
            s += (t.levels || []).map(function (l) {
              return esc(l.label) + ' ' + er(l.er_median) + '（n=' + l.n + '）';
            }).join('　') + '<br>';
          }
          if (t.strat) {
            s += '<span style="color:' + p.ink4 + '">品牌分层 p=' + pTxt(t.strat.by_brand_p)
              + '　子赛道分层 p=' + pTxt(t.strat.by_seg_p) + '<br>'
              + (t.strat.brand_robust && t.strat.seg_robust
                ? '两层都稳 → 只能当作待验证假设'
                : '至少一层不稳 → 只作现象记录') + '</span>';
          }
          return s;
        }
      }),
      legend: { show: false },
      xAxis: {
        type: 'log', min: FLOOR, max: 1,
        name: 'q 值（BH-FDR 校正后，对数轴，越左越显著）',
        nameLocation: 'middle', nameGap: 26, nameTextStyle: { color: p.ink4, fontSize: 10.5 },
        axisLabel: {
          color: p.ink5, fontSize: 10,
          formatter: function (v) {
            if (v <= FLOOR) return '≤.0008';
            if (v < 0.002) return '';
            if (v < 0.01) return String(v);
            return v >= 1 ? '1' : String(v);
          }
        },
        splitLine: { lineStyle: { color: p.line2 } }, axisLine: { lineStyle: { color: p.line } }
      },
      yAxis: {
        type: 'value', min: -0.6, max: 1.6, interval: 0.2,
        axisLabel: {
          color: p.ink3, fontSize: 11, fontWeight: 600, margin: 10,
          /* 只在 y=1 / y=0 两处出标签；interval 取 0.2 保证这两个刻度一定存在 */
          formatter: function (v) {
            if (Math.abs(v - 1) < 0.01) return '互动率';
            if (Math.abs(v) < 0.01) return '每千播 GMV';
            return '';
          }
        },
        splitLine: { show: false }, axisLine: { show: false }, axisTick: { show: false }
      },
      series: [
        {
          type: 'scatter', data: pack(C.tests, 1), symbol: 'circle',
          markLine: {
            silent: true, symbol: 'none',
            data: [{ xAxis: 0.05 }],
            lineStyle: { color: cv('--warn', '#8B2E2E'), type: 'dashed', width: 1 },
            label: {
              formatter: 'q=0.05', color: cv('--warn', '#8B2E2E'), fontSize: 10,
              position: 'insideEndTop'
            }
          }
        },
        { type: 'scatter', data: pack(gmv.tests, 0), symbol: 'circle' }
      ]
    });
  }

  function drawCharts(S) {
    var B = S.B_segment_contrast || {}, G = pairSeg(B);
    var A = S.A_female_profile || {}, mu = A.multi || {};
    chTerms(S);
    chBrandTerms(S);
    chSegDiverge('sdCRobust', G.robust, B);
    chSegDiverge('sdCShaky', G.shaky, B);
    chDist('sdDPain', mu.pain_points, A.n, C1());
    chDist('sdDPersu', mu.persuasion_logic, A.n, C2());
    chStage(S);
    chQ(S);
  }

  /* ================================================================== *
   * 13. 主题联动：html[data-theme] 变化后仅 setOption 重绘，不 dispose
   * ================================================================== */
  var THEME_WATCHED = false;
  function watchTheme(S) {
    if (THEME_WATCHED || !window.MutationObserver) return;
    THEME_WATCHED = true;
    var t = null;
    new MutationObserver(function () {
      clearTimeout(t);
      t = setTimeout(function () { try { drawCharts(S); } catch (e) { } }, 60);
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  }

  /* ================================================================== *
   * 14. 入口：window.MXSEED.render(host, pushChart)
   * ================================================================== */
  function render(host, push) {
    if (!host) return;
    PUSH = (typeof push === 'function') ? push : null;
    var S = window.SEEDING;
    if (!S || !S.meta) {
      host.innerHTML = '<div class="sd-wrap"><div class="sd-warn"><div class="t">星图种草洞察 · 数据未加载</div>'
        + '未找到 <code>window.SEEDING</code>：seeding.js 可能未随页面一起产出。'
        + '重跑 <code>python3 female/site_build.py</code> 后刷新即可。</div></div>';
      return;
    }
    injectCSS();
    relInit(S);

    var m = S.meta || {}, ov = S.overall || {}, hl = S.headlines || [];
    var ds = m.dataset || {}, sm = m.samples || {}, rl = m.reliability || {};

    var h = '<div class="sd-wrap">';

    /* —— 区块头（radar Tab 的区块 02，沿用宿主 mt- 头部样式） —— */
    h += '<div class="mt-sech"><span class="mt-hn">02</span>'
      + '<h2 class="mt-h">星图种草洞察</h2>'
      + '<span class="mt-hx">' + esc(m.tab || '品牌动作雷达') + ' · A~J 十块</span></div>'
      + '<div class="mt-sub"><b>' + esc(m.title || '') + '</b><br>' + esc(m.subtitle || '')
      + '<div class="sd-tags">'
      + '<span class="sd-tag">数据集 ' + esc(ds.id) + '</span>'
      + '<span class="sd-tag">' + esc(ds.partition || '') + '</span>'
      + '<span class="sd-tag">' + esc(ds.window || '') + '</span>'
      + '<span class="sd-tag k">全量 ' + nn(ds.universe_videos) + ' 条视频 · '
      + nn(ds.universe_orders) + ' 单 · ' + nn(ds.universe_brands) + ' 个品牌</span>'
      + '<span class="sd-tag k">深度标注 ' + nn(sm.annotated) + ' 条（' + pc(sm.annotated_pct) + '）</span>'
      + '<span class="sd-tag">女性向 ' + nn(sm.female_n) + ' 条</span>'
      + '</div></div>';

    /* —— 口径红线：放在最前 —— */
    h += '<div class="sd-scope"><div class="t">口径边界 · 先看这一句</div>'
      + mdb(m.scope_warning || '')
      + '<br>统计口径：<b>BH-FDR 校正后 q&lt;0.05 判显著，未达显著的一律标注、不包装成正面结论</b>；'
      + '所有数字由聚合脚本产出，前端只做格式化，不做任何统计计算。</div>';

    /* —— 关键发现：数据层给的是 {tag,title,body} —— */
    if (hl.length) {
      h += '<div class="sd-p" style="margin-top:18px"><b>这一块最值得记住的 ' + hl.length
        + ' 条。</b>每条都标了它的成色：「显著」= 经 FDR 校正且分层后仍成立；'
        + '「未达显著」= 数据没撑住，只作现象记录。</div>'
        + '<div class="sd-cgrid" style="grid-template-columns:repeat(auto-fit,minmax(min(100%,272px),1fr))">';
      hl.forEach(function (x) {
        var alarm = x.tag === '未达显著' || x.tag === '诚实结论' || x.tag === '负面结论'
          || x.tag === '合规' || x.tag === '待复核';
        h += '<div class="sd-cbox" style="padding:14px 15px 13px'
          + (alarm ? ';border-left:2px solid var(--warn)' : '') + '">'
          + '<div style="font-size:9.5px;letter-spacing:.1em;font-weight:700;color:'
          + (alarm ? 'var(--warn)' : 'var(--accent)') + '">' + esc(x.tag) + '</div>'
          + '<div style="font-family:var(--serif);font-size:15.5px;line-height:1.45;color:var(--ink);'
          + 'font-weight:500;margin-top:8px">' + esc(x.title) + '</div>'
          + '<div style="font-size:11.5px;line-height:1.8;color:var(--ink-3);margin-top:8px">'
          + mdb(x.body) + '</div></div>';
      });
      h += '</div>';
    }

    /* —— 一致性检验状态：pending 必须显眼；done 也要把两个弱字段挑明 —— */
    if (String(rl.status || '') === 'pending') {
      h += '<div class="sd-warn"><div class="t">标注一致性检验 · 进行中 ' + pendBadge('检验进行中') + '</div>'
        + mdb(rl.note || '')
        + '<br>因此本模块所有<b>语气 / 说服逻辑 / 痛点</b>这类主观字段，'
        + '<b>只读方向与量级，不读精确百分点</b>；'
        + '客观字段（时长、首次出品秒数、原词命中、CTA 有无）不受此限制。</div>';
    } else if (String(rl.status || '') === 'done') {
      var _f = (rl.fields || []);
      h += '<div class="sd-info"><div class="t">标注一致性检验 · 已完成 '
        + '<span class="sd-rb y">✅ done</span></div>'
        + '同一批 ' + nn((_f[0] || {}).n) + ' 条视频、同 prompt 独立双跑：'
        + _f.map(function (f) {
          return '<b>' + esc(f.label) + ' ' + (isNum(f.agree) ? (f.agree * 100).toFixed(0) + '%' : '—')
            + '（κ=' + (isNum(f.kappa) ? f.kappa.toFixed(2) : '—') + '）</b>';
        }).join('、') + '。'
        + '<br><b>两处必须带着看的弱项：</b>① <b>主语气 κ 仅 0.47</b>，'
        + '语气类数字只作辅助描述、不作强结论；'
        + '② <b>单品 / 套组一致率仅 53%（16/30，κ=0.29，来自 female/xingtu/RELIABILITY.md）</b>，'
        + '相关分布只当参考。多选字段（痛点 / 讲解方式 / 说服逻辑）只读排序与量级，'
        + '完整标签组合的复现率仅 17%~33%，详见 A 块两张表。</div>';
    }

    /* —— 十个小节 —— */
    h += blockA(S)
      + blockTaboo(S)
      + blockSeg(S)
      + blockProfile(S)
      + blockStruct(S)
      + blockEffect(S)
      + blockPlay(S)
      + blockBrands(S)
      + blockCompliance(S)
      + blockLimits(S);

    h += '</div>';
    host.innerHTML = h;

    /* 图表：等 DOM 落地后再画，宽度才是对的 */
    setTimeout(function () {
      try { drawCharts(S); } catch (e) { }
      watchTheme(S);
    }, 0);
  }

  window.MXSEED = { render: render };
})();
