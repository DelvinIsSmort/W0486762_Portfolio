(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();let c={languages:[],tools:[],technologies:[]},p=[],u=[];const i={search:"",filter:"all"};function a(n="all"){if(n==="all"||n==="skills"){const t={languages:document.getElementById("skills-languages"),tools:document.getElementById("skills-tools"),tech:document.getElementById("skills-technologies")};if(t.languages){const r=s=>`<span class="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200 font-medium">${s}</span>`;t.languages.innerHTML=c.languages.map(r).join(""),t.tools.innerHTML=c.tools.map(r).join(""),t.tech.innerHTML=c.technologies.map(r).join("")}}if(n==="all"||n==="projects"){const t=document.getElementById("projects-grid");if(t){const r=p.filter(s=>{const e=i.filter==="all"||s.category.toLowerCase()===i.filter,o=s.title.toLowerCase().includes(i.search.toLowerCase());return e&&o});t.innerHTML=r.map(s=>`
        <article class="rounded-3xl border border-white/5 bg-white/5 p-6 flex flex-col justify-between hover:border-cyan-300/30 transition shadow-xl">
          <div>
            <h3 class="mb-3 text-xl font-bold text-white">${s.title}</h3>
            <p class="mb-6 text-slate-400 text-sm leading-relaxed">${s.description}</p>
            <div class="flex flex-wrap gap-2 mb-6">
              ${s.tech.map(e=>`<span class='text-[10px] font-bold border border-white/10 px-2 py-1 rounded uppercase tracking-widest bg-white/5'>${e}</span>`).join("")}
            </div>
          </div>
          ${s.url?`<a class="text-cyan-300 font-bold hover:underline" href="${s.url}">View Project →</a>`:'<span class="text-slate-500 italic text-xs">In Progress</span>'}
        </article>`).join("")}}if(n==="all"||n==="goals"){const t=document.getElementById("career-goals-list");t&&(t.innerHTML=u.map(r=>`
        <li class="flex gap-4">
          <div class="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]"></div>
          <p class="text-slate-400 text-sm leading-relaxed">
            <strong class="text-slate-200 block mb-1">${r.title}</strong>
            ${r.description}
          </p>
        </li>`).join(""))}}async function m(){try{const[n,t,r]=await Promise.all([fetch("data/skills.json"),fetch("data/projects.json"),fetch("data/goals.json")]);c=await n.json(),p=await t.json(),u=await r.json(),a(),console.log("All portfolio data synchronized.")}catch(n){console.error("Sync Error:",n)}}async function f(){const t=document.getElementById("pokemonName").value.toLowerCase().trim();if(!t)return;const r=document.getElementById("pokemon-result"),s=`poke_${t}`,e=localStorage.getItem(s);if(e){d(JSON.parse(e)),r.classList.remove("hidden");return}try{const o=await fetch(`https://pokeapi.co/api/v2/pokemon/${t}`);if(!o.ok)throw new Error("Pokemon not found");const l=await o.json();localStorage.setItem(s,JSON.stringify(l)),d(l),r.classList.remove("hidden")}catch{alert("Pokémon not found! Double-check the spelling.")}}function d(n){const t=document.getElementById("pokemonSprite"),r=document.getElementById("pokemonDetails"),s=document.getElementById("p_moves");t.src=n.sprites.other.showdown.front_default||n.sprites.front_default,r.innerHTML=`
    <h3 class="text-4xl font-black text-white uppercase mb-2 tracking-tighter">${n.name}</h3>
    <p class="text-cyan-400 font-bold text-sm mb-6 uppercase tracking-widest">${n.types.map(e=>e.type.name).join(" / ")}</p>
    <div class="grid grid-cols-2 gap-2">
      ${n.stats.map(e=>`
        <div class="bg-white/5 p-3 rounded-xl border border-white/5">
          <div class="text-[10px] text-slate-500 uppercase font-bold">${e.stat.name}</div>
          <div class="text-white text-lg font-bold">${e.base_stat}</div>
        </div>
      `).join("")}
    </div>
  `,s.innerHTML=n.moves.map(e=>{const o=e.version_group_details.find(l=>l.move_learn_method.name==="level-up");return o?{name:e.move.name,level:o.level_learned_at}:null}).filter(e=>e!==null).sort((e,o)=>e.level-o.level).map(e=>`
      <tr class="border-b border-white/5 hover:bg-white/5 transition text-xs">
        <td class="p-3 text-cyan-300 font-mono">LVL ${e.level}</td>
        <td class="p-3 text-slate-300 capitalize">${e.name.replace("-"," ")}</td>
      </tr>`).join("")}async function g(n){const t=document.getElementById("github-status"),r=document.getElementById("github-grid");if(r)try{const s=await fetch(`https://api.github.com/users/${n}/repos?sort=updated&per_page=6`);if(!s.ok)throw new Error("User not found");const e=await s.json();r.innerHTML="",t.textContent=`Displaying latest ${e.length} public repos for ${n}`,r.innerHTML=e.map(o=>`
      <div class="rounded-3xl border border-white/5 bg-white/5 p-6 hover:bg-white/10 transition shadow-xl">
        <h3 class="font-bold text-white mb-2 text-lg">${o.name}</h3>
        <p class="text-xs text-slate-400 mb-6 h-8 overflow-hidden text-ellipsis">
          ${o.description||"No description provided for this repository."}
        </p>
        <a class="text-cyan-300 text-xs font-bold hover:underline tracking-widest uppercase" 
           href="${o.html_url}" target="_blank">
           View Repository →
        </a>
      </div>
    `).join("")}catch(s){console.error("GitHub Error:",s),t&&(t.textContent="GitHub API currently unavailable or user not found.")}}async function h(){var n,t,r,s,e;await m(),await g("DelvinIsSmort"),(n=document.getElementById("project-search"))==null||n.addEventListener("input",o=>{i.search=o.target.value,a("projects")}),(t=document.getElementById("filter-all"))==null||t.addEventListener("click",()=>{i.filter="all",a("projects")}),(r=document.getElementById("filter-js"))==null||r.addEventListener("click",()=>{i.filter="javascript",a("projects")}),(s=document.getElementById("filter-python"))==null||s.addEventListener("click",()=>{i.filter="python",a("projects")}),(e=document.getElementById("searchPokemon"))==null||e.addEventListener("click",f)}h();
