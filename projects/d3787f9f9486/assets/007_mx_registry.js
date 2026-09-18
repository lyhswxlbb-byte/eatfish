/* 她私护 · 追踪版模块注册表
   ------------------------------------------------------------------
   index.html 的 activate() 只调用 MXTRACK.render(tab) / MXTRACK.resize(tab)，
   具体面板由各模块自行注册，互不耦合：

     MXTRACK.reg('track', { render: el => {...}, resize: el => {...} });

   约定：
   - render(el) 只在该 Tab 首次激活时被调用一次，el 是对应的 #viewXxx 容器
   - resize(el) 在之后每次切回该 Tab 时调用，用于 echarts.resize()
   - 任一模块抛错只影响自己那个 Tab，不会带崩整站
*/
window.MXTRACK = (function () {
  var R = {};
  var EL = { track: 'viewTrack', trend: 'viewTrend', play: 'viewPlay', radar: 'viewRadar', learn: 'viewLearn' };
  function el(t) { return document.getElementById(EL[t]); }
  return {
    _r: R,
    reg: function (tab, impl) { R[tab] = impl; },
    render: function (tab) {
      var m = R[tab], node = el(tab);
      if (!node) return;
      if (!m || typeof m.render !== 'function') {
        node.innerHTML = '<div class="wrap" style="padding:72px 0;color:#8F8F8B;font-size:14px">模块「' + tab + '」尚未注册。</div>';
        return;
      }
      m.render(node);
    },
    resize: function (tab) {
      var m = R[tab];
      if (m && typeof m.resize === 'function') { try { m.resize(el(tab)); } catch (e) { } }
    }
  };
})();
