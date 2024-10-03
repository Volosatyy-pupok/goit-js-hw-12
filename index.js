import{a as h,S as b,i as L}from"./assets/vendor-DjDxajEQ.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function a(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(t){if(t.ep)return;t.ep=!0;const s=a(t);fetch(t.href,s)}})();const w="https://pixabay.com/api/",S="46141874-6e703aba01419e220f8d650c5";async function g(e,r){return(await h.get(w,{params:{key:S,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15}})).data}function m(e){const r=document.querySelector(".gallery"),a=e.map(o=>`
        <li class="gallery-item">
          <a href="${o.largeImageURL}">
            <img src="${o.webformatURL}" alt="${o.tags}" loading="lazy" />
          </a>
          <div class="info">
            <p><b>Likes:</b> ${o.likes}</p>
            <p><b>Views:</b> ${o.views}</p>
            <p><b>Comments:</b> ${o.comments}</p>
            <p><b>Downloads:</b> ${o.downloads}</p>
          </div>
        </li>
      `).join("");r.insertAdjacentHTML("beforeend",a)}function q(){const e=document.querySelector(".gallery");e.innerHTML=""}const v=document.querySelector("#search-form"),p=document.querySelector(".load-more"),E=document.querySelector(".loader");let y=new b(".gallery a"),i="",n=1,d=0;v.addEventListener("submit",P);p.addEventListener("click",$);async function P(e){if(e.preventDefault(),i=e.currentTarget.elements.searchQuery.value.trim(),!i){l("Please enter a search query");return}n=1,q(),c(!0),f(!1);try{const r=await g(i,n);d=r.totalHits,r.hits.length===0?l("No images found"):(m(r.hits),y.refresh(),d>n*15&&f(!0))}catch(r){l("Error: "+r.message)}finally{c(!1)}}async function $(){n+=1,c(!0);try{const e=await g(i,n),r=window.scrollY;m(e.hits),y.refresh();const o=document.querySelector(".gallery").scrollHeight;window.scrollTo({top:r+(o-r),behavior:"smooth"}),n*15>=d&&(f(!1),l("You've reached the end of search results","warning"))}catch(e){l("Error: "+e.message)}finally{c(!1)}}function c(e){E.classList.toggle("hidden",!e)}function f(e){p.classList.toggle("hidden",!e)}function l(e,r="error"){L.show({title:r==="error"?"Error":"Warning",message:e,position:"topRight",backgroundColor:r==="error"?"red":"yellow",timeout:5e3,color:"#111"})}
//# sourceMappingURL=index.js.map
