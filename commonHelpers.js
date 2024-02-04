import{S as L,i as l,a as v}from"./assets/vendor-951421c8.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const k="https://pixabay.com/api/",S="42148811-877485cb71de5bd48342bfa16",C=document.querySelector("#form"),c=document.querySelector(".gallery"),h=document.querySelector(".loader"),a=document.querySelector(".button");let d=1,b=15,m=0;const g=new L(".gallery a",{captionsData:"alt",captionDelay:250});u();C.addEventListener("submit",E);async function E(i){i.preventDefault();const o=i.currentTarget,s=o.elements.images.value;if(c.innerHTML="",d=1,!s.trim()){l.show({message:"Please, fill in the search field",messageColor:"white",backgroundColor:"#EF4040",position:"topRight",timeout:4e3});return}if(y(),!s){l.show({message:"Sorry, there are no images matching your search query.",messageColor:"white",backgroundColor:"#EF4040",position:"topRight",timeout:4e3});return}try{const{hits:e,totalHits:t}=await f(s);m=Math.ceil(t/b),c.insertAdjacentHTML("beforeend",p(e)),g.refresh(),e.length>0&&e.length!==t?(a.classList.remove("is-hidden"),a.addEventListener("click",r)):a.classList.add("is-hidden")}catch{console.log(l.show({message:"Ooops! Something went wrong.",messageColor:"white",backgroundColor:"#EF4040",position:"topRight",timeout:4e3}))}finally{o.reset(),u()}async function r(){y(),d+=1,a.classList.add("is-hidden");try{const{hits:e}=await f(s);c.insertAdjacentHTML("beforeend",p(e)),g.refresh();const t=c.getBoundingClientRect();window.scrollBy({top:t.height*2,behavior:"smooth"})}catch{console.log(l.show({message:"Ooops! Something went wrong.",messageColor:"white",backgroundColor:"#EF4040",position:"topRight",timeout:4e3}))}finally{a.classList.remove("is-hidden"),d===m&&(a.classList.add("is-hidden"),a.removeEventListener("click",r),l.show({message:"We're sorry, but you've reached the end of search results.",messageColor:"white",backgroundColor:"#EF4040",position:"topRight",timeout:4e3})),u()}}}function f(i){return v.get(`${k}`,{params:{key:S,q:i,type:"photo",orientation:"horizontal",safesearch:!0,page:d,per_page:b}}).then(({data:o})=>o)}function p(i){return i.map(({webformatURL:o,largeImageURL:s,tags:r,likes:e,views:t,comments:n,downloads:w})=>`
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
          <p class="amount">${w}</p>
        </div>
      </div>
    </li>`).join("")}function y(){h&&(h.style.display="block")}function u(){h&&(h.style.display="none")}
//# sourceMappingURL=commonHelpers.js.map
