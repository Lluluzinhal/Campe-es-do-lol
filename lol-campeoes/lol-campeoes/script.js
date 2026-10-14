const campeoes = [
  {id:"Ahri",nome:"Ahri",titulo:"A Raposa de Nove Caudas",funcao:"Mid",stats:[3,4,8,5],lore:"Uma vastaya conectada ao mundo espiritual, que consome a essência de suas vítimas e revive suas memórias.",hab:["Essence Theft","Orb of Deception","Fox-Fire","Charm","Spirit Rush"]},
  {id:"Garen",nome:"Garen",titulo:"O Poder de Demacia",funcao:"Top",stats:[7,8,1,5],lore:"Soldado nobre e resistente, lidera a Vanguarda Destemida defendendo Demacia.",hab:["Perseverance","Decisive Strike","Courage","Judgment","Demacian Justice"]},
  {id:"Jinx",nome:"Jinx",titulo:"O Gatilho Frouxo",funcao:"Atirador",stats:[9,2,4,6],lore:"Criminosa impulsiva de Zaun, vive para espalhar o caos com seu arsenal explosivo.",hab:["Get Excited!","Switcheroo!","Zap!","Flame Chompers!","Super Mega Death Rocket!"]},
  {id:"LeeSin",nome:"Lee Sin",titulo:"O Monge Cego",funcao:"Selva",stats:[8,5,3,9],lore:"Mestre das artes marciais de Ionia, luta guiado pelos sentidos e pela disciplina.",hab:["Flurry","Sonic Wave","Safeguard","Tempest","Dragon's Rage"]},
  {id:"Thresh",nome:"Thresh",titulo:"O Carcereiro",funcao:"Suporte",stats:[5,6,6,7],lore:"Espírito sádico das Ilhas das Sombras que tortura e coleciona almas.",hab:["Damnation","Death Sentence","Dark Passage","Flay","The Box"]},
  {id:"Yasuo",nome:"Yasuo",titulo:"O Imperdoável",funcao:"Mid",stats:[8,4,4,10],lore:"Espadachim ioniano que busca provar sua inocência pela morte de seu mestre.",hab:["Way of the Wanderer","Steel Tempest","Wind Wall","Sweeping Blade","Last Breath"]},
  {id:"Darius",nome:"Darius",titulo:"A Mão de Noxus",funcao:"Top",stats:[9,5,1,2],lore:"Comandante implacável de Noxus, acredita que a força é a única lei.",hab:["Hemorrhage","Decimate","Crippling Strike","Apprehend","Noxian Guillotine"]},
  {id:"Lux",nome:"Lux",titulo:"A Dama da Luz",funcao:"Suporte",stats:[2,4,9,5],lore:"Maga demaciana que domina a luz e esconde seu poder em uma sociedade que teme magia.",hab:["Illumination","Light Binding","Prismatic Barrier","Lucent Singularity","Final Spark"]},
  {id:"Ezreal",nome:"Ezreal",titulo:"O Explorador Pródigo",funcao:"Atirador",stats:[7,2,6,7],lore:"Aventureiro ousado que explora ruínas antigas usando uma luva arcana.",hab:["Rising Spell Force","Mystic Shot","Essence Flux","Arcane Shift","Trueshot Barrage"]},
  {id:"Zed",nome:"Zed",titulo:"O Mestre das Sombras",funcao:"Mid",stats:[9,2,1,7],lore:"Líder da Ordem das Sombras, une magia proibida e técnicas ninja letais.",hab:["Contempt for the Weak","Razor Shuriken","Living Shadow","Shadow Slash","Death Mark"]},
  {id:"Ashe",nome:"Ashe",titulo:"A Arqueira de Gelo",funcao:"Atirador",stats:[7,3,2,4],lore:"Líder da tribo Avarosa, empunha um arco de gelo ancestral para unir Freljord.",hab:["Frost Shot","Ranger's Focus","Volley","Hawkshot","Enchanted Crystal Arrow"]},
  {id:"Leona",nome:"Leona",titulo:"A Alvorada Radiante",funcao:"Suporte",stats:[4,8,3,4],lore:"Guerreira do Sol, protege o Monte Targon com seu escudo e sua lâmina solar.",hab:["Sunlight","Shield of Daybreak","Eclipse","Zenith Blade","Solar Flare"]}
];

const base = "https://ddragon.leagueoflegends.com/cdn/img/champion/";
const funcoes = ["Todos", ...new Set(campeoes.map(c => c.funcao))];
let filtro = "Todos";
let favoritos = [];
try { favoritos = JSON.parse(localStorage.getItem("favoritos")) || []; } catch (e) {}

const $ = id => document.getElementById(id);
const imgFallback = "this.onerror=null;this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22500%22%3E%3Crect fill=%22%23121f3a%22 width=%22300%22 height=%22500%22/%3E%3C/svg%3E'";

function renderFiltros() {
  $("filtros").innerHTML = funcoes.map(f =>
    `<button class="${f === filtro ? "ativo" : ""}" data-f="${f}">${f}</button>`).join("");
}

function renderGrade() {
  const termo = $("busca").value.toLowerCase().trim();
  const lista = campeoes.filter(c =>
    (filtro === "Todos" || c.funcao === filtro) &&
    c.nome.toLowerCase().includes(termo) &&
    (!$("soFavoritos").checked || favoritos.includes(c.id)));
  $("contador").textContent = `${lista.length} campeão(ões) encontrado(s)`;
  $("grade").innerHTML = lista.map(c => `
    <article class="card" tabindex="0" data-id="${c.id}">
      <img src="${base}loading/${c.id}_0.jpg" alt="${c.nome}" loading="lazy" onerror="${imgFallback}">
      <button class="heart ${favoritos.includes(c.id) ? "on" : ""}" data-fav="${c.id}" aria-label="Favoritar ${c.nome}">♥</button>
      <div class="info"><h3>${c.nome}</h3><small>${c.titulo}</small><br><span class="badge">${c.funcao}</span></div>
    </article>`).join("");
}

function abrirModal(id) {
  const c = campeoes.find(x => x.id === id);
  const nomes = ["Ataque", "Defesa", "Magia", "Dificuldade"];
  $("detalhes").innerHTML = `
    <div class="det">
      <img src="${base}splash/${c.id}_0.jpg" alt="${c.nome}" onerror="${imgFallback}">
      <div class="txt">
        <h2>${c.nome}</h2><small>${c.titulo} • ${c.funcao}</small>
        <p>${c.lore}</p>
        ${c.stats.map((v, i) => `<div class="stat"><span>${nomes[i]}</span><div class="barra"><i style="width:${v * 10}%"></i></div>${v}</div>`).join("")}
        <div class="hab">${c.hab.map(h => `<em>${h}</em>`).join("")}</div>
      </div>
    </div>`;
  $("modal").hidden = false;
}

function fecharModal() { $("modal").hidden = true; }

function alternarFavorito(id) {
  favoritos = favoritos.includes(id) ? favoritos.filter(f => f !== id) : [...favoritos, id];
  try { localStorage.setItem("favoritos", JSON.stringify(favoritos)); } catch (e) {}
  renderGrade();
}

$("filtros").addEventListener("click", e => {
  if (e.target.dataset.f) { filtro = e.target.dataset.f; renderFiltros(); renderGrade(); }
});
$("busca").addEventListener("input", renderGrade);
$("soFavoritos").addEventListener("change", renderGrade);
$("grade").addEventListener("click", e => {
  const fav = e.target.closest("[data-fav]");
  if (fav) return alternarFavorito(fav.dataset.fav);
  const card = e.target.closest(".card");
  if (card) abrirModal(card.dataset.id);
});
$("grade").addEventListener("keydown", e => {
  if (e.key === "Enter" && e.target.classList.contains("card")) abrirModal(e.target.dataset.id);
});
$("fechar").addEventListener("click", fecharModal);
$("modal").addEventListener("click", e => { if (e.target.id === "modal") fecharModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") fecharModal(); });

renderFiltros();
renderGrade();
