(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();let a={languages:[],tools:[],technologies:[]},d=[],u=[];const l={search:"",filter:"all"};function i(n="all"){if(n==="all"||n==="skills"){const t={languages:document.getElementById("skills-languages"),tools:document.getElementById("skills-tools"),tech:document.getElementById("skills-technologies")};if(t.languages){const s=o=>`<span class="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200 font-medium">${o}</span>`;t.languages.innerHTML=a.languages.map(s).join(""),t.tools.innerHTML=a.tools.map(s).join(""),t.tech.innerHTML=a.technologies.map(s).join("")}}if(n==="all"||n==="projects"){const t=document.getElementById("projects-grid");if(t){const s=d.filter(o=>{const e=l.filter==="all"||o.category.toLowerCase()===l.filter,r=o.title.toLowerCase().includes(l.search.toLowerCase());return e&&r});t.innerHTML=s.map(o=>`
        <article class="rounded-3xl border border-white/5 bg-white/5 p-6 flex flex-col justify-between hover:border-cyan-300/30 transition shadow-xl">
          <div>
            <h3 class="mb-3 text-xl font-bold text-white">${o.title}</h3>
            <p class="mb-6 text-slate-400 text-sm leading-relaxed">${o.description}</p>
            <div class="flex flex-wrap gap-2 mb-6">
              ${o.tech.map(e=>`<span class='text-[10px] font-bold border border-white/10 px-2 py-1 rounded uppercase tracking-widest bg-white/5'>${e}</span>`).join("")}
            </div>
          </div>
          ${o.url?`<a class="text-cyan-300 font-bold hover:underline" href="${o.url}">View Project →</a>`:'<span class="text-slate-500 italic text-xs">In Progress</span>'}
        </article>`).join("")}}if(n==="all"||n==="goals"){const t=document.getElementById("career-goals-list");t&&(t.innerHTML=u.map(s=>`
        <li class="flex gap-4">
          <div class="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]"></div>
          <p class="text-slate-400 text-sm leading-relaxed">
            <strong class="text-slate-200 block mb-1">${s.title}</strong>
            ${s.description}
          </p>
        </li>`).join(""))}}async function f(){try{const[n,t,s]=await Promise.all([fetch("data/skills.json"),fetch("data/projects.json"),fetch("data/goals.json")]);a=await n.json(),d=await t.json(),u=await s.json(),i(),console.log("All portfolio data synchronized.")}catch(n){console.error("Sync Error:",n)}}async function p(n){const t=document.getElementById("github-status"),s=document.getElementById("github-grid");if(s)try{const o=await fetch(`https://api.github.com/users/${n}/repos?sort=updated&per_page=6`);if(!o.ok)throw new Error("User not found");const e=await o.json();s.innerHTML="",t.textContent=`Displaying latest ${e.length} public repos for ${n}`,s.innerHTML=e.map(r=>`
      <div class="rounded-3xl border border-white/5 bg-white/5 p-6 hover:bg-white/10 transition shadow-xl">
        <h3 class="font-bold text-white mb-2 text-lg">${r.name}</h3>
        <p class="text-xs text-slate-400 mb-6 h-8 overflow-hidden text-ellipsis">
          ${r.description||"No description provided for this repository."}
        </p>
        <a class="text-cyan-300 text-xs font-bold hover:underline tracking-widest uppercase" 
           href="${r.html_url}" target="_blank">
           View Repository →
        </a>
      </div>
    `).join("")}catch(o){console.error("GitHub Error:",o),t&&(t.textContent="GitHub API currently unavailable or user not found.")}}async function g(){var n,t,s,o,e;await f(),await p("DelvinIsSmort"),(n=document.getElementById("project-search"))==null||n.addEventListener("input",r=>{l.search=r.target.value,i("projects")}),(t=document.getElementById("filter-all"))==null||t.addEventListener("click",()=>{l.filter="all",i("projects")}),(s=document.getElementById("filter-js"))==null||s.addEventListener("click",()=>{l.filter="javascript",i("projects")}),(o=document.getElementById("filter-python"))==null||o.addEventListener("click",()=>{l.filter="python",i("projects")}),(e=document.getElementById("searchPokemon"))==null||e.addEventListener("click",fetchPokemonData)}g();
