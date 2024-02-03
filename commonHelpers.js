import{S as v,i as d,a as w}from"./assets/vendor-951421c8.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const k="https://pixabay.com/api/",S="42148811-877485cb71de5bd48342bfa16",E=document.querySelector("#form"),l=document.querySelector(".gallery"),c=document.querySelector(".loader"),a=document.querySelector(".button");let u=1,b=15,m=0;const f=new v(".gallery a",{captionsData:"alt",captionDelay:250});h();E.addEventListener("submit",C);async function C(i){i.preventDefault();const o=i.currentTarget,s=o.elements.images.value;if(l.innerHTML="",!s.trim()){d.show({message:"Please, fill in the search field",messageColor:"white",backgroundColor:"#EF4040",position:"topRight",timeout:4e3});return}if(y(),!s){d.show({message:"Sorry, there are no images matching your search query.",messageColor:"white",backgroundColor:"#EF4040",position:"topRight",timeout:4e3});return}try{const{hits:e,totalHits:t}=await g(s);m=Math.ceil(t/b),l.insertAdjacentHTML("beforeend",p(e)),f.refresh(),e.length>0&&e.length!==t?(a.classList.remove("is-hidden"),a.addEventListener("click",r)):a.classList.add("is-hidden")}catch(e){console.log(e)}finally{o.reset(),h()}async function r(){y(),u+=1,a.classList.add("is-hidden");try{const{hits:e}=await g(s);l.insertAdjacentHTML("beforeend",p(e)),f.refresh();const t=l.getBoundingClientRect();window.scrollBy({top:t.height*2,behavior:"smooth"})}catch(e){console.log(e)}finally{a.classList.remove("is-hidden"),u===m&&(a.classList.add("is-hidden"),a.removeEventListener("click",r),d.show({message:"We're sorry, but you've reached the end of search results.",messageColor:"white",backgroundColor:"#EF4040",position:"topRight",timeout:4e3})),h()}}}function g(i){return w.get(`${k}`,{params:{key:S,q:i,type:"photo",orientation:"horizontal",safesearch:!0,page:u,per_page:b}}).then(({data:o})=>o)}function p(i){return i.map(({webformatURL:o,largeImageURL:s,tags:r,likes:e,views:t,comments:n,downloads:L})=>`
    <li class="gallery-item">
      <a class="gallery-link" href="${s}">
        <img
          class="gallery-image"
          src="${o}"
          alt="${r}"
          width="360"
        />
      </a>
      <div class="info-block">
        <div class="block">
          <h2 class="title">Likes</h2>
          <p class="amount">${e}</p>
        </div>
        <div class="block">
          <h2 class="title">Views</h2>
          <p class="amount">${t}</p>
        </div>
        <div class="block">
          <h2 class="title">Comments</h2>
          <p class="amount">${n}</p>
        </div>
        <div class="block">
          <h2 class="title">Downloads</h2>
          <p class="amount">${L}</p>
        </div>
      </div>
    </li>`).join("")}function y(){c&&(c.style.display="block")}function h(){c&&(c.style.display="none")}
//# sourceMappingURL=commonHelpers.js.map
