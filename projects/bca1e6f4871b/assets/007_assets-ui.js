window.imageLoadState={loaded:new Set(),failed:new Set()};
window.productImage=(p,cls='product-thumb')=>{
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const a=window.PRODUCT_ASSETS.images[p['商品ID']];
  if(!a)return '<span class="image-missing">真实主图未取得</span>';
  return `<span class="product-photo ${cls}"><img src="${a.file}" alt="${escape(a.name)}｜平台同商品ID展示图" data-product-id="${p['商品ID']}" onload="window.imageLoadState.loaded.add(this.dataset.productId)" onerror="window.imageLoadState.failed.add(this.dataset.productId);this.style.display='none';this.nextElementSibling.hidden=false"><span class="image-missing" hidden>真实主图加载失败</span></span>`;
};
window.imageCoverage=()=>({loaded:window.imageLoadState.loaded.size,failed:window.imageLoadState.failed.size,coreLoaded:Object.values(window.PRODUCT_ASSETS.images).filter(a=>a.core&&window.imageLoadState.loaded.has(Object.keys(window.PRODUCT_ASSETS.images).find(k=>window.PRODUCT_ASSETS.images[k]===a))).length});
