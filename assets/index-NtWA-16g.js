(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const i={search:"",filter:"all"};let p=[],a={languages:[],tools:[],technologies:[]};async function u(){const n=document.getElementById("career-goals-list");if(n)try{const r=await fetch("./data/goals.json");if(!r.ok)throw new Error("JSON not found");const o=await r.json();n.innerHTML="",o.forEach(s=>{const e=document.createElement("li");e.className="flex gap-4",e.innerHTML=`
        <div class="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]"></div>
        <p class="text-slate-400 text-sm leading-relaxed">
          <strong class="text-slate-200 block mb-1">${s.title}</strong>
          ${s.description}
        </p>
      `,n.appendChild(e)})}catch(r){console.error("Error loading goals:",r)}}async function f(){const n=document.getElementById("skills-languages");try{const r=await fetch("data/skills.json");if(!r.ok)throw new Error("Could not find skills.json");const o=await r.json();o.languages&&(a=o,g(),console.log("Skills rendered from JSON!"))}catch(r){console.error("Skills Load Error:",r),n&&(n.innerHTML="<p class='text-red-500 text-xs'>Failed to load skills data.</p>")}}async function h(){try{p=await(await fetch("data/projects.json")).json(),c()}catch(n){console.error("Error loading projects:",n)}}function g(){const n=document.getElementById("skills-languages"),r=document.getElementById("skills-tools"),o=document.getElementById("skills-technologies");if(!n||!r||!o){console.error("Skill containers not found in HTML!");return}n.innerHTML="",r.innerHTML="",o.innerHTML="";const s=e=>{const t=document.createElement("span");return t.className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-200",t.textContent=e,t};a.languages&&a.languages.forEach(e=>n.appendChild(s(e))),a.tools&&a.tools.forEach(e=>r.appendChild(s(e))),a.technologies&&a.technologies.forEach(e=>o.appendChild(s(e)))}function c(){const n=document.getElementById("projects-grid");if(!n)return;n.innerHTML="",p.filter(o=>{const s=i.filter==="all"||o.category.toLowerCase()===i.filter,e=o.title.toLowerCase().includes(i.search.toLowerCase());return s&&e}).forEach(o=>{const s=document.createElement("article");s.className="rounded-3xl border border-white/5 bg-white/5 p-6 flex flex-col justify-between hover:border-cyan-300/30 transition shadow-xl";const e=o.url?`<a class="text-cyan-300 font-bold hover:underline" href="${o.url}">View Project →</a>`:'<span class="text-slate-500 italic text-xs">Development in Progress</span>';s.innerHTML=`
      <div>
        <h3 class="mb-3 text-xl font-bold text-white">${o.title}</h3>
        <p class="mb-6 text-slate-400 text-sm leading-relaxed">${o.description}</p>
        <div class="flex flex-wrap gap-2 mb-6">
          ${o.tech.map(t=>`<span class='text-[10px] font-bold border border-white/10 px-2 py-1 rounded uppercase tracking-widest'>${t}</span>`).join("")}
        </div>
      </div>
      ${e}
    `,n.appendChild(s)})}async function y(n){const r=document.getElementById("github-status"),o=document.getElementById("github-grid");if(o)try{const e=await(await fetch(`https://api.github.com/users/${n}/repos?sort=updated&per_page=6`)).json();o.innerHTML="",r.textContent=`Displaying latest ${e.length} public repos for ${n}`,e.forEach(t=>{const l=document.createElement("div");l.className="rounded-3xl border border-white/5 bg-white/5 p-6 hover:bg-white/10 transition",l.innerHTML=`
        <h3 class="font-bold text-white mb-2">${t.name}</h3>
        <p class="text-xs text-slate-500 mb-4 h-8 overflow-hidden text-ellipsis">${t.description||"No description provided."}</p>
        <a class="text-cyan-300 text-xs font-bold hover:underline" href="${t.html_url}" target="_blank">Repository Link</a>
      `,o.appendChild(l)})}catch{r.textContent="GitHub API unavailable."}}async function d(){const r=document.getElementById("pokemonName").value.toLowerCase().trim();if(!r)return;const o=document.getElementById("pokemon-result"),s=`poke_${r}`,e=localStorage.getItem(s);if(e){m(JSON.parse(e)),o.classList.remove("hidden");return}try{const t=await fetch(`https://pokeapi.co/api/v2/pokemon/${r}`);if(!t.ok)throw new Error;const l=await t.json();localStorage.setItem(s,JSON.stringify(l)),m(l),o.classList.remove("hidden")}catch{alert("Pokémon not found!")}}function m(n){const r=document.getElementById("pokemonSprite"),o=document.getElementById("pokemonDetails"),s=document.getElementById("p_moves");r.src=n.sprites.other.showdown.front_default||n.sprites.front_default,o.innerHTML=`
    <h3 class="text-4xl font-black text-white uppercase mb-2 tracking-tighter">${n.name}</h3>
    <p class="text-cyan-400 font-bold text-sm mb-6 uppercase tracking-widest">${n.types.map(e=>e.type.name).join(" / ")}</p>
    <div class="grid grid-cols-2 gap-2 text-[10px]">
      ${n.stats.map(e=>`
        <div class="bg-white/5 p-3 rounded-xl border border-white/5">
          <div class="text-slate-500 uppercase font-bold">${e.stat.name}</div>
          <div class="text-white text-lg font-bold">${e.base_stat}</div>
        </div>
      `).join("")}
    </div>
  `,s.innerHTML=n.moves.map(e=>{const t=e.version_group_details.find(l=>l.move_learn_method.name==="level-up");return t?{name:e.move.name,level:t.level_learned_at}:null}).filter(e=>e!==null).sort((e,t)=>e.level-t.level).map(e=>`
      <tr class="border-b border-white/5 hover:bg-white/5 transition">
        <td class="p-3 text-cyan-300 font-mono text-xs">LVL ${e.level}</td>
        <td class="p-3 text-slate-300 capitalize text-sm">${e.name.replace("-"," ")}</td>
      </tr>`).join("")}async function x(){var n,r,o,s,e,t;await f(),await h(),await u(),y("DelvinIsSmort"),(n=document.getElementById("project-search"))==null||n.addEventListener("input",l=>{i.search=l.target.value,c()}),(r=document.getElementById("filter-all"))==null||r.addEventListener("click",()=>{i.filter="all",c()}),(o=document.getElementById("filter-js"))==null||o.addEventListener("click",()=>{i.filter="javascript",c()}),(s=document.getElementById("filter-python"))==null||s.addEventListener("click",()=>{i.filter="python",c()}),(e=document.getElementById("searchPokemon"))==null||e.addEventListener("click",d),(t=document.getElementById("pokemonName"))==null||t.addEventListener("keypress",l=>{l.key==="Enter"&&d()})}x();
