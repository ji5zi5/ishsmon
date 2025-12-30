const $ = id => document.getElementById(id);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function responsiveScale() {
  const container = $('game-container');
  if (!container) return;
  
  const isMobile = window.innerWidth <= 900;
  
  if (isMobile) {
    const baseWidth = 900;
    const baseHeight = 600;
    const scale = Math.min(window.innerWidth / baseWidth, window.innerHeight / baseHeight);
    
    container.style.width = baseWidth + 'px';
    container.style.height = baseHeight + 'px';
    container.style.transform = `scale(${scale})`;
    container.style.transformOrigin = 'center center';
  } else {
    container.style.width = '';
    container.style.height = '';
    container.style.transform = '';
    container.style.transformOrigin = '';
  }
}

window.addEventListener('resize', responsiveScale);
window.addEventListener('orientationchange', responsiveScale);
window.addEventListener('load', responsiveScale);

const TYPES = {
  수학: { strong: ['물리', '화학'], weak: ['영어', '사회'] },
  물리: { strong: ['지구', '화학'], weak: ['수학', '생물'] },
  생물: { strong: ['화학', '사회'], weak: ['물리', '지구'] },
  화학: { strong: ['생물', '지구'], weak: ['수학', '물리'] },
  지구: { strong: ['수학', '영어'], weak: ['화학', '생물'] },
  영어: { strong: ['사회', '생물'], weak: ['수학', '지구'] },
  사회: { strong: ['수학', '물리'], weak: ['영어', '생물'] }
};

const POKEMONS = [
  { id: 'gyeongmin', name: '경민몬', type: '생물', hp: 180, atk: 65, def: 70, spAtk: 85, spDef: 75, spd: 90, level: 25, catchRate: 60,
    skills: [
      { name: '가속', power: 30, type: '생물', category: 'special', acc: 100 },
      { name: '스키마 주입', power: 45, type: '생물', category: 'special', acc: 95 },
      { name: '스플라이싱', power: 75, type: '생물', category: 'special', acc: 85 }
    ]},
  { id: 'jaegwon', name: '재권몬', type: '생물', hp: 180, atk: 70, def: 80, spAtk: 75, spDef: 85, spd: 50, level: 25, catchRate: 60,
    skills: [
      { name: '맞잖아잉?', power: 0, type: '생물', category: 'status', acc: 100 },
      { name: '별표. 시험.', power: 50, type: '생물', category: 'special', acc: 100 },
      { name: '뭣이 중하다고...', power: 65, type: '생물', category: 'special', acc: 90 }
    ]},
  { id: 'yeonggyo', name: '영교몬', type: '화학', hp: 140, atk: 80, def: 60, spAtk: 95, spDef: 65, spd: 85, level: 28, catchRate: 80,
    skills: [
      { name: '천재야!', power: 40, type: '화학', category: 'special', acc: 100 },
      { name: '시선을 마주치기 바랍니다', power: 55, type: '화학', category: 'special', acc: 95 },
      { name: '주목!', power: 0, type: '화학', category: 'status', acc: 100 }
    ]},
  { id: 'injeong', name: '인정몬', type: '물리', hp: 110, atk: 95, def: 85, spAtk: 50, spDef: 70, spd: 60, level: 30, catchRate: 100,
    skills: [
      { name: '인성교육', power: 65, type: '물리', category: 'physical', acc: 100 },
      { name: '회복적 생활지도', power: 0, type: '물리', category: 'status', acc: 100 },
      { name: '회초리', power: 55, type: '물리', category: 'physical', acc: 95 }
    ]},
  { id: 'hyeonjun', name: '현준몬', type: '지구', hp: 170, atk: 75, def: 90, spAtk: 70, spDef: 85, spd: 45, level: 26, catchRate: 70,
    skills: [
      { name: '쇠똥구리', power: 0, type: '지구', category: 'status', acc: 100 },
      { name: '택배상자', power: 60, type: '지구', category: 'physical', acc: 90 },
      { name: '번데기의 최후', power: 65, type: '지구', category: 'special', acc: 85 }
    ]},
  { id: 'yeonghun', name: '영훈몬', type: '물리', hp: 180, atk: 110, def: 75, spAtk: 80, spDef: 70, spd: 95, level: 35, catchRate: 30,
    skills: [
      { name: '프사이~', power: 45, type: '물리', category: 'special', acc: 100 },
      { name: '그렇지!', power: 60, type: '물리', category: 'physical', acc: 95 },
      { name: '기말 이벤트', power: 110, type: '물리', category: 'special', acc: 70 }
    ]},
  { id: 'huijeong', name: '희정몬', type: '영어', hp: 150, atk: 70, def: 80, spAtk: 75, spDef: 90, spd: 55, level: 27, catchRate: 70,
    skills: [
      { name: '전자기기 압수', power: 45, type: '영어', category: 'physical', acc: 100 },
      { name: '간식 압수', power: 50, type: '영어', category: 'physical', acc: 100 },
      { name: '안돼.', power: 60, type: '영어', category: 'special', acc: 90 }
    ]},
  { id: 'sujin', name: '수진몬', type: '영어', hp: 120, atk: 55, def: 55, spAtk: 80, spDef: 75, spd: 70, level: 22, catchRate: 120,
    skills: [
      { name: '어머어머', power: 35, type: '영어', category: 'special', acc: 100 },
      { name: '랩탑 집어넣을까요~', power: 0, type: '영어', category: 'status', acc: 100 },
      { name: '자스민 출동', power: 45, type: '영어', category: 'special', acc: 95 }
    ]},
  { id: 'jihye', name: '지혜몬', type: '사회', hp: 130, atk: 65, def: 65, spAtk: 90, spDef: 80, spd: 75, level: 26, catchRate: 85,
    skills: [
      { name: '양괄호 1번', power: 40, type: '사회', category: 'special', acc: 100 },
      { name: '맞나?', power: 80, type: '사회', category: 'special', acc: 75 },
      { name: '지혜의 샘', power: 0, type: '사회', category: 'status', acc: 100 }
    ]},
  { id: 'hyeri', name: '혜리몬', type: '화학', hp: 100, atk: 60, def: 50, spAtk: 85, spDef: 60, spd: 100, level: 24, catchRate: 140,
    skills: [
      { name: '숙제 다 했죠?', power: 40, type: '화학', category: 'special', acc: 100 },
      { name: '칼퇴', power: 70, type: '화학', category: 'physical', acc: 85 },
      { name: '이해 되셨죠 여러분들?', power: 40, type: '화학', category: 'special', acc: 100 }
    ]},
  { id: 'jaeha', name: '재하몬', type: '수학', hp: 160, atk: 90, def: 85, spAtk: 100, spDef: 80, spd: 70, level: 32, catchRate: 50,
    skills: [
      { name: '등산', power: 55, type: '수학', category: 'physical', acc: 100 },
      { name: '꼭짓점', power: 65, type: '수학', category: 'special', acc: 95 },
      { name: '이렇게 하면 되겠다!', power: 85, type: '수학', category: 'special', acc: 80 }
    ]},
  { id: 'yeongjae', name: '영재몬', type: '수학', hp: 210, atk: 85, def: 90, spAtk: 130, spDef: 95, spd: 60, level: 40, catchRate: 20,
    skills: [
      { name: '왕에프엑스', power: 45, type: '수학', category: 'special', acc: 100 },
      { name: '위고비', power: 100, type: '수학', category: 'special', acc: 70 },
      { name: '어우 힘들어', power: 0, type: '수학', category: 'status', acc: 100 }
    ]}
];

const Game = {
  screen: 'main',
  myTeam: [],
  wild: null,
  activePokemon: 0,
  items: { pokeball: 10, greatball: 0, ultraball: 0, potion: 5, superpotion: 0, revive: 3 },
  money: 1000,
  centerSlot: null, 
  pokedex: new Set(),
  inBattle: false
};


function createPokemon(data, level = null) {
  const lv = level ?? data.level ?? rand(5, 30);
  const baseHp = data.hp;
  const statMod = lv / 25;
  const hp = Math.floor(baseHp * statMod);
  
  return {
    ...data,
    level: lv,
    exp: Math.pow(lv, 3), // 경험치 3제곱 공식
    maxExp: Math.pow(lv + 1, 3),
    currentHp: hp,
    maxHp: hp,
    atk: Math.floor((data.atk || 70) * statMod),
    def: Math.floor((data.def || 70) * statMod),
    spAtk: Math.floor((data.spAtk || 70) * statMod),
    spDef: Math.floor((data.spDef || 70) * statMod),
    spd: Math.floor((data.spd || 50) * statMod)
  };
}

function calcStats(p) {
  const statMod = p.level / 25;
  const oldMaxHp = p.maxHp;
  const newMaxHp = Math.floor(POKEMONS.find(base => base.id === p.id).hp * statMod);
  
  p.maxHp = newMaxHp;
  if (p.currentHp > 0) p.currentHp += (newMaxHp - oldMaxHp); // 기절하지 않았을 때만 늘어난 체력만큼 회복
  p.currentHp = Math.min(p.currentHp, p.maxHp); 

  p.atk = Math.floor((p.atk || 70) * statMod); // 원본 데이터가 없어서 atk가 계속 줄어들 수 있음. 원본 참조 필요.
  // POKEMONS에서 원본을 찾아야 함.
  const base = POKEMONS.find(base => base.id === p.id);
  p.atk = Math.floor((base.atk || 70) * statMod);
  p.def = Math.floor((base.def || 70) * statMod);
  p.spAtk = Math.floor((base.spAtk || 70) * statMod);
  p.spDef = Math.floor((base.spDef || 70) * statMod);
  p.spd = Math.floor((base.spd || 50) * statMod);
}

// ... (init, selectStarter 등은 유지)

function startEncounter() {
  const randomMon = POKEMONS[rand(0, POKEMONS.length - 1)];
  const wildLevel = rand(Math.max(1, Game.myTeam[0].level - 5), Game.myTeam[0].level + 5);
  Game.wild = createPokemon(randomMon, wildLevel);
  // 야생 포켓몬 경험치 조정 (죽으면 주는 경험치용)
  Game.wild.expYield = Math.floor((60 * wildLevel) / 7);

  Game.inBattle = true;
  Game.activePokemon = Game.myTeam.findIndex(p => p.currentHp > 0);
  
  showScreen('battle');
  updateBattleUI();
  
  setMessage(`야생 ${Game.wild.name}이(가) 나타났다!`);
}

function updateBattleUI() {
  const my = Game.myTeam[Game.activePokemon];
  const wild = Game.wild;
  
  $('wild-name').textContent = wild.name;
  if ($('wild-lv-text')) $('wild-lv-text').textContent = `Lv.${wild.level}`;
  $('wild-sprite').style.backgroundImage = `url('public/${wild.id}.png')`;
  $('wild-hp-fill').style.width = `${(wild.currentHp / wild.maxHp) * 100}%`;
  if ($('wild-hp-text')) $('wild-hp-text').textContent = `${wild.currentHp}/${wild.maxHp}`;
  updateHpColor($('wild-hp-fill'), wild.currentHp / wild.maxHp);
  
  $('my-name').textContent = my.name;
  if ($('my-lv-text')) $('my-lv-text').textContent = `Lv.${my.level}`;
  $('my-sprite').style.backgroundImage = `url('public/${my.id}.png')`;
  $('my-hp-fill').style.width = `${(my.currentHp / my.maxHp) * 100}%`;
  $('my-hp-text').textContent = `${my.currentHp}/${my.maxHp}`;
  updateHpColor($('my-hp-fill'), my.currentHp / my.maxHp);
  
  // 경험치 바 업데이트
  const currentLevelExp = Math.pow(my.level, 3);
  const nextLevelExp = Math.pow(my.level + 1, 3);
  const expPercent = ((my.exp - currentLevelExp) / (nextLevelExp - currentLevelExp)) * 100;
  $('my-exp-fill').style.width = `${Math.min(100, Math.max(0, expPercent))}%`;

  $('skill-1').textContent = my.skills[0].name;
  $('skill-2').textContent = my.skills[1].name;
  $('skill-3').textContent = my.skills[2].name;
}

// ... 

async function endBattle(caught) {
  Game.inBattle = false;
  $('action-buttons').classList.remove('hidden');
  $('skill-buttons').classList.add('hidden');
  
  if (!caught && Game.wild.currentHp <= 0) {
    // 경험치 획득
    const expGain = Game.wild.expYield || 50;
    const my = Game.myTeam[Game.activePokemon];
    await setMessage(`${my.name}은(는) ${expGain} 경험치를 얻었다!`);
    await gainExp(my, expGain);
  }


  // 배틀 종료 후 스탯 리셋 (디버프 해제)
  Game.myTeam.forEach(p => calcStats(p));

  showScreen('main');
}

async function gainExp(pokemon, amount) {
  pokemon.exp += amount;
  updateBattleUI();
  await sleep(500);

  let nextLevelExp = Math.pow(pokemon.level + 1, 3);
  
  while (pokemon.exp >= nextLevelExp) {
    pokemon.level++;
    calcStats(pokemon);
    pokemon.currentHp = pokemon.maxHp; // 레벨업 시 체력 완전 회복
    updateBattleUI();
    $('my-name').classList.add('level-up-anim'); // 레벨업 애니메이션 클래스 (CSS 필요)
    await setMessage(`${pokemon.name}은(는) Lv.${pokemon.level}(으)로 올랐다!`);
    $('my-name').classList.remove('level-up-anim');
    nextLevelExp = Math.pow(pokemon.level + 1, 3);
    pokemon.maxExp = nextLevelExp;
    await sleep(1000);
  }
}

// ... (renderPokedex 등)

function showPokedexPreview(p) {
  $('pokedex-preview-img').src = `public/${p.id}.png`;
  $('pokedex-preview-info').innerHTML = `
    <div class="preview-name">${p.name}</div>
    <div class="preview-type">${p.type}</div>
    <div class="preview-stats">
      <div>HP: ${p.hp}</div>
      <div>공격: ${p.atk} / 방어: ${p.def}</div>
      <div>특공: ${p.spAtk} / 특방: ${p.spDef}</div>
      <div>스피드: ${p.spd}</div>
      <div>포획률: ${p.catchRate}</div>
    </div>
  `;
}

function showTeamPreview(p) {
  $('team-preview-img').src = `public/${p.id}.png`;
  
  // 현재 레벨 기준 경험치 계산
  const currentLevelExp = Math.pow(p.level, 3);
  const nextLevelExp = Math.pow(p.level + 1, 3);
  const expToNext = nextLevelExp - p.exp;

  $('team-preview-info').innerHTML = `
    <div class="preview-name">${p.name}</div>
    <div class="preview-type">${p.type}</div>
    <div class="preview-stats">
      <div>Lv.${p.level}</div>
      <div>EXP: ${p.exp} / ${nextLevelExp} (다음: ${expToNext})</div>
      <div>HP: ${p.currentHp}/${p.maxHp}</div>
      <div>공격: ${p.atk} / 방어: ${p.def}</div>
      <div>특공: ${p.spAtk} / 특방: ${p.spDef}</div>
      <div>스피드: ${p.spd}</div>
      <hr>
      <div><b>스킬:</b></div>
      ${p.skills.map(s => `<div>• ${s.name} (${s.type}, ${s.power === 0 ? '변화' : s.power + '위력'})</div>`).join('')}
    </div>
  `;
}


function init() {
  // 스타팅 화면 구성
  const starterList = $('starter-list');
  // 인정(물리), 영교(화학), 경민(생물), 현준(지구)
  const starters = [
    POKEMONS.find(p => p.id === 'injeong'),
    POKEMONS.find(p => p.id === 'yeonggyo'),
    POKEMONS.find(p => p.id === 'gyeongmin'),
    POKEMONS.find(p => p.id === 'hyeonjun')
  ];
  
  starterList.innerHTML = '';
  starters.forEach(p => {
    const card = document.createElement('div');
    card.className = 'starter-card';
    card.innerHTML = `
      <img src="public/${p.id}.png">
      <h3>${p.name}</h3>
      <p>타입: ${p.type}</p>
    `;
    card.onclick = () => selectStarter(p.id);
    starterList.appendChild(card);
  });
  
  showScreen('starter');

  $('btn-explore').onclick = startEncounter;
  $('btn-pokedex').onclick = () => showScreen('pokedex');
  $('btn-team').onclick = () => showScreen('team');
  $('btn-shop').onclick = openShop;
  $('btn-center').onclick = usePokemonCenter;
  
  $('btn-back-main').onclick = () => showScreen('main');
  $('btn-back-main2').onclick = () => showScreen('main');
  $('btn-shop-close').onclick = () => showScreen('main');
  
  $('btn-fight').onclick = showSkills;
  $('btn-bag').onclick = showBag;
  $('btn-pokemon').onclick = showSwap;
  $('btn-run').onclick = runAway;
  $('btn-back').onclick = hideAllMenus;
  $('btn-back2').onclick = hideAllMenus;
  
  $('btn-use-pokeball').onclick = () => tryCatch('pokeball');
  $('btn-use-greatball').onclick = () => tryCatch('greatball');
  $('btn-use-ultraball').onclick = () => tryCatch('ultraball');
  $('btn-use-potion').onclick = usePotion;
  $('btn-use-superpotion').onclick = useSuperPotion;
  $('btn-use-revive').onclick = showReviveSelect;
  
  $('skill-1').onclick = () => useSkill(0);
  $('skill-2').onclick = () => useSkill(1);
  $('skill-3').onclick = () => useSkill(2);
}

function selectStarter(id) {
  const starter = POKEMONS.find(p => p.id === id);
  Game.myTeam.push(createPokemon(starter, 5));
  Game.pokedex.add(id);
  showScreen('main');
}


function showScreen(name) {
  Game.screen = name;
  $('starter-screen').classList.toggle('hidden', name !== 'starter');
  $('main-screen').classList.toggle('hidden', name !== 'main');
  $('battle-screen').classList.toggle('hidden', name !== 'battle');
  $('pokedex-screen').classList.toggle('hidden', name !== 'pokedex');
  $('team-screen').classList.toggle('hidden', name !== 'team');
  $('center-screen').classList.toggle('hidden', name !== 'center');
  $('shop-screen').classList.toggle('hidden', name !== 'shop');
  
  if (name === 'pokedex') renderPokedex();
  if (name === 'team') renderTeam();
  if (name === 'center') updateCenterUI();
  if (name === 'shop') updateShopUI();
}




function updateHpColor(elem, ratio) {
  if (ratio > 0.5) elem.style.background = '#58C858';
  else if (ratio > 0.2) elem.style.background = '#F8C038';
  else elem.style.background = '#E86048';
}

let currentMessageId = 0;

async function setMessage(text) {
  const box = $('message-box');
  const myMessageId = ++currentMessageId;
  box.textContent = '';
  
  for (let i = 0; i < text.length; i++) {
    if (myMessageId !== currentMessageId) return; // 새 메시지가 오면 중단
    box.textContent += text[i];
    await sleep(30);
  }
}

function showSkills() {
  $('action-buttons').classList.add('hidden');
  $('skill-buttons').classList.remove('hidden');
  $('bag-buttons').classList.add('hidden');
  $('swap-buttons').classList.add('hidden');
}

function updateBagLabels() {
  $('btn-use-pokeball').innerHTML = `몬스터볼<br><span style="font-size:0.8em">(x${Game.items.pokeball})</span>`;
  $('btn-use-greatball').innerHTML = `슈퍼볼<br><span style="font-size:0.8em">(x${Game.items.greatball})</span>`;
  $('btn-use-ultraball').innerHTML = `하이퍼볼<br><span style="font-size:0.8em">(x${Game.items.ultraball})</span>`;
  $('btn-use-potion').innerHTML = `상처약<br><span style="font-size:0.8em">(x${Game.items.potion})</span>`;
  $('btn-use-superpotion').innerHTML = `좋은상처약<br><span style="font-size:0.8em">(x${Game.items.superpotion})</span>`;
  $('btn-use-revive').innerHTML = `기력의조각<br><span style="font-size:0.8em">(x${Game.items.revive})</span>`;
}

function showBag() {
  $('action-buttons').classList.add('hidden');
  $('skill-buttons').classList.add('hidden');
  $('bag-buttons').classList.remove('hidden');
  $('swap-buttons').classList.add('hidden');
  
  updateBagLabels();
}

function hideAllMenus() {
  $('action-buttons').classList.remove('hidden');
  $('skill-buttons').classList.add('hidden');
  $('bag-buttons').classList.add('hidden');
  $('swap-buttons').classList.add('hidden');
}

function showSwap() {
  $('action-buttons').classList.add('hidden');
  $('skill-buttons').classList.add('hidden');
  $('bag-buttons').classList.add('hidden');
  $('swap-buttons').classList.remove('hidden');
  
  const swapDiv = $('swap-buttons');
  swapDiv.innerHTML = '';
  
  Game.myTeam.forEach((p, i) => {
    if (i === Game.activePokemon) return;
    const btn = document.createElement('button');
    btn.textContent = p.name + (p.currentHp <= 0 ? ' (기절)' : '');
    btn.disabled = p.currentHp <= 0;
    btn.onclick = () => swapPokemon(i);
    swapDiv.appendChild(btn);
  });
  
  const backBtn = document.createElement('button');
  backBtn.textContent = '뒤로';
  backBtn.onclick = hideAllMenus;
  swapDiv.appendChild(backBtn);
}

async function swapPokemon(index) {
  hideAllMenus();
  Game.activePokemon = index;
  const newMon = Game.myTeam[index];
  await setMessage(`${newMon.name}, 너로 정했다!`);
  updateBattleUI();
  await sleep(1000);
  await enemyTurn();
}

function calcDamage(attacker, defender, skill) {
  if (skill.power === 0) return 0;
  
  const level = attacker.level || 25;
  const power = skill.power;
  
  let atk, def;
  if (skill.category === 'physical') {
    atk = attacker.atk || 70;
    def = defender.def || 70;
  } else {
    atk = attacker.spAtk || 70;
    def = defender.spDef || 70;
  }
  
  const baseDamage = Math.floor(((2 * level / 5 + 2) * power * atk / def) / 50 + 2);
  
  let stab = 1;
  if (skill.type === attacker.type) stab = 1.5;
  
  let typeEffect = 1;
  const skillType = TYPES[skill.type];
  if (skillType) {
    if (skillType.strong.includes(defender.type)) typeEffect = 2;
    if (skillType.weak.includes(defender.type)) typeEffect = 0.5;
  }
  
  const randomMod = 0.85 + Math.random() * 0.15;
  
  return Math.floor(baseDamage * stab * typeEffect * randomMod);
}

function getTypeEffectiveness(skillType, defenderType) {
  const type = TYPES[skillType];
  if (!type) return 1;
  if (type.strong.includes(defenderType)) return 2;
  if (type.weak.includes(defenderType)) return 0.5;
  return 1;
}

async function useSkill(index) {
  if (!Game.inBattle) return;
  hideAllMenus();
  
  const my = Game.myTeam[Game.activePokemon];
  const wild = Game.wild;
  const skill = my.skills[index];
  
  const mySpeed = my.spd || 50;
  const wildSpeed = wild.spd || 50;
  const myFirst = mySpeed > wildSpeed || (mySpeed === wildSpeed && Math.random() > 0.5);
  
  if (myFirst) {
    await doAttack(my, wild, skill, 'wild-sprite');
    await finishTurn();
  } else {
    await doEnemyAttack();
    if (my.currentHp > 0) {
      await doAttack(my, wild, skill, 'wild-sprite');
      await finishTurn(false); // 적 턴은 이미 수행했으므로 메뉴만 복구
    } else {
      await finishTurn(false); // 내가 죽었어도 메뉴 복구 시도 (handleMyPokemonFaint에서 endBattle 호출 가능)
    }
  }
}

async function doAttack(attacker, defender, skill, targetImg) {
  if (Math.random() * 100 > skill.acc) {
    await setMessage(`${attacker.name}의 ${skill.name}! 하지만 빗나갔다!`);
    await sleep(1000);
    return;
  }
  
  if (skill.power === 0) {
    await setMessage(`${attacker.name}의 ${skill.name}!`);
    await sleep(500);

    const healKeywords = ['회복', '지혜', '힘들어', '쇠똥구리', '샘'];
    const isHeal = healKeywords.some(k => skill.name.includes(k));
    const selfImg = targetImg === 'wild-sprite' ? 'my-sprite' : 'wild-sprite';

    if (isHeal) {
      const healAmount = Math.floor(attacker.maxHp * 0.4);
      attacker.currentHp = Math.min(attacker.maxHp, attacker.currentHp + healAmount);
      updateBattleUI();
      $(selfImg).classList.add('flash'); 
      await setMessage(`체력이 회복되었다!`);
      await sleep(500);
      $(selfImg).classList.remove('flash');
    } else {
      defender.def = Math.floor(defender.def * 0.8);
      await setMessage(`${defender.name}의 방어력이 떨어졌다!`);
      $(targetImg).classList.add('shake');
      await sleep(500);
      $(targetImg).classList.remove('shake');
    }
    
    await sleep(500);
    return;
  }
  
  const damage = calcDamage(attacker, defender, skill);
  await setMessage(`${attacker.name}의 ${skill.name}!`);
  $(targetImg).classList.add('shake');
  await sleep(500);
  $(targetImg).classList.remove('shake');
  
  defender.currentHp = Math.max(0, defender.currentHp - damage);
  updateBattleUI();
  
  const typeEff = getTypeEffectiveness(skill.type, defender.type);
  const verb = (defender === Game.wild) ? '입혔다' : '입었다';
  
  if (typeEff > 1) await setMessage(`효과가 굉장했다! ${damage} 데미지를 ${verb}!`);
  else if (typeEff < 1) await setMessage(`효과가 별로였다... ${damage} 데미지를 ${verb}!`);
  else await setMessage(`${damage} 데미지를 ${verb}!`);
  
  await sleep(1000);
  
  if (defender === Game.wild && defender.currentHp <= 0) {
    await setMessage(`야생 ${defender.name}이(가) 쓰러졌다!`);
    await sleep(1000);
    
    // 전투 승리 보상 (본가 트레이너 배틀 기준: 레벨 * 20 정도)
    const rewardMoney = Game.wild.level * 20;
    Game.money += rewardMoney;
    await setMessage(`${rewardMoney}원을 얻었다!`);
    await sleep(1000);
    
    endBattle(false);
  } else if (defender === Game.myTeam[Game.activePokemon] && defender.currentHp <= 0) {
    await handleMyPokemonFaint();
  }
}

async function doEnemyAttack() {
  const wild = Game.wild;
  const my = Game.myTeam[Game.activePokemon];
  
  if (!wild || !wild.skills || wild.skills.length === 0) {
    // 기본 공격
    await doAttack(wild, my, { name: '몸통박치기', power: 30, type: '사회', category: 'physical', acc: 100 }, 'my-sprite');
    return;
  }
  
  const skill = wild.skills[rand(0, wild.skills.length - 1)];
  await doAttack(wild, my, skill, 'my-sprite');
}

async function finishTurn(runEnemyTurn = true) {
  if (!Game.inBattle) return;

  if (runEnemyTurn && Game.wild.currentHp > 0) {
    await doEnemyAttack();
  }
  
  if (Game.inBattle) {
    $('action-buttons').classList.remove('hidden');
    $('skill-buttons').classList.add('hidden');
    $('bag-buttons').classList.add('hidden');
    $('swap-buttons').classList.add('hidden');
    updateBattleUI();
    setMessage('무엇을 할까?');
  }
}

async function enemyTurn() {
  await finishTurn(true);
}

async function handleMyPokemonFaint() {
  const nextAlive = Game.myTeam.findIndex(p => p.currentHp > 0);
  if (nextAlive === -1) {
    await setMessage('모든 포켓몬이 쓰러졌다...');
    await sleep(1500);
    endBattle(false);
  } else {
    Game.activePokemon = nextAlive;
    await setMessage(`${Game.myTeam[nextAlive].name}, 너로 정했다!`);
    updateBattleUI();
  }
}



async function tryCatch(type = 'pokeball') {
  if (!Game.inBattle) return;
  
  if (Game.items[type] <= 0) {
    const names = { pokeball:'몬스터볼', greatball:'슈퍼볼', ultraball:'하이퍼볼' };
    setMessage(`${names[type]}이(가) 없다!`);
    return;
  }
  
  // 메뉴 숨김
  hideAllMenus();
  
  Game.items[type]--;
  updateBagLabels(); // 즉시 UI 갱신
  
  const pokeball = $('pokeball-anim');
  
  // 볼 이미지 변경 (이미지 파일이 있다면 교체, 없으면 기본 사용)
  // 현재는 pokeball-bg.png 하나만 쓰므로 색상 변경 효과 등을 줄 수 있으나 일단 기본 애니메이션 사용
  // (필요 시 CSS filter로 색상 변경 가능)
  
  pokeball.classList.remove('hidden', 'throwing', 'wiggling');
  pokeball.style.opacity = '1';
  
  const names = { pokeball:'몬스터볼', greatball:'슈퍼볼', ultraball:'하이퍼볼' };
  setMessage(`${names[type]}을(를) 던졌다!`);
  
  await sleep(100);
  pokeball.classList.add('throwing');
  await sleep(800);
  pokeball.classList.add('hidden');
  
  $('wild-sprite').classList.add('flash');
  await sleep(300);
  $('wild-sprite').classList.remove('flash');
  
  // 포획률 공식 수정 (볼 보정 추가)
  const M = Game.wild.maxHp;
  const H = Game.wild.currentHp;
  const C = Game.wild.catchRate || 100;
  
  let ballBonus = 1;
  if (type === 'greatball') ballBonus = 1.5;
  if (type === 'ultraball') ballBonus = 2.0;

  let X = Math.max(Math.floor(((3 * M - 2 * H) * C * ballBonus) / (3 * M)), 1);
  X = Math.min(X, 255);
  
  const catchChance = (X + 1) / 256;
  const success = Math.random() < catchChance;
  
  if (success) {
    $('wild-sprite').style.opacity = '0';
    await setMessage(`${Game.wild.name}을(를) 잡았다!`);
    
    // 포획 보상 (본가 트레이너 배틀 기준: 레벨 * 20 정도)
    const rewardMoney = Game.wild.level * 20;
    Game.money += rewardMoney;
    await setMessage(`${rewardMoney}원을 얻었다!`);
    await sleep(1000);
    
    // 야생 포켓몬의 레벨과 경험치 유지
    const captured = createPokemon(POKEMONS.find(p => p.id === Game.wild.id), Game.wild.level);
    captured.exp = Game.wild.exp || Math.pow(Game.wild.level, 3);
    
    Game.myTeam.push(captured);
    Game.pokedex.add(Game.wild.id);
    await sleep(1500);
    $('wild-sprite').style.opacity = '1';
    endBattle(true);
  } else {
    await setMessage('포획에 실패했다...');
    await sleep(1000);
    await finishTurn();
  }
}

async function usePotion() {
  if (Game.items.potion <= 0) {
    setMessage('상처약이 없다!');
    return;
  }
  
  const my = Game.myTeam[Game.activePokemon];
  if (my.currentHp >= my.maxHp) {
    setMessage('HP가 이미 가득 찼다!');
    return;
  }
  
  hideAllMenus();
  Game.items.potion--;
  updateBagLabels();
  my.currentHp = Math.min(my.maxHp, my.currentHp + 20);
  updateBattleUI();
  await setMessage(`${my.name}의 HP가 회복되었다!`);
  
  await sleep(500);
  await finishTurn();
}

async function useSuperPotion() {
  if (!Game.inBattle) return;
  
  if (Game.items.superpotion <= 0) {
    setMessage('좋은상처약이 없다!');
    return;
  }
  
  const my = Game.myTeam[Game.activePokemon];
  if (my.currentHp >= my.maxHp) {
    setMessage('체력이 이미 가득 찼다!');
    return;
  }
  
  hideAllMenus();
  Game.items.superpotion--;
  updateBagLabels();
  my.currentHp = Math.min(my.maxHp, my.currentHp + 50); // 좋은상처약 회복량 50 (4세대 기준)
  updateBattleUI();
  await setMessage(`${my.name}의 HP가 50 회복되었다!`);
  
  // 회복 효과음/이펙트 추가 가능
  $('my-sprite').classList.add('flash');
  await sleep(500);
  $('my-sprite').classList.remove('flash');
  
  await sleep(500);
  await finishTurn();
}

function showReviveSelect() {
  if (Game.items.revive <= 0) {
    setMessage('기력의조각이 없다!');
    return;
  }
  
  const fainted = Game.myTeam.filter(p => p.currentHp <= 0);
  if (fainted.length === 0) {
    setMessage('기절한 포켓몬이 없다!');
    return;
  }
  
  $('action-buttons').classList.add('hidden');
  $('skill-buttons').classList.add('hidden');
  $('bag-buttons').classList.add('hidden');
  $('swap-buttons').classList.remove('hidden');
  
  const swapDiv = $('swap-buttons');
  swapDiv.innerHTML = '';
  
  Game.myTeam.forEach((p, i) => {
    if (p.currentHp > 0) return;
    const btn = document.createElement('button');
    btn.textContent = `${p.name} (기절)`;
    btn.onclick = () => useRevive(i);
    swapDiv.appendChild(btn);
  });
  
  const backBtn = document.createElement('button');
  backBtn.textContent = '뒤로';
  backBtn.onclick = showBag;
  swapDiv.appendChild(backBtn);
}

async function useRevive(index) {
  hideAllMenus();
  Game.items.revive--;
  updateBagLabels();
  
  const target = Game.myTeam[index];
  target.currentHp = Math.floor(target.maxHp / 2);
  
  // 배틀 UI가 현재 활성화된 포켓몬만 보여주므로, 
  // 기절한 포켓몬을 살려도 화면상 변화는 없을 수 있음.
  // 하지만 메시지로 확인.
  await setMessage(`${target.name}이(가) 부활했다! (체력:${target.currentHp})`);
  
  // 적 턴 없이 바로 내 턴 계속 (즉시 적용)
  $('action-buttons').classList.remove('hidden');
}

async function runAway() {
  setMessage('무사히 도망쳤다!');
  await sleep(1000);
  endBattle(false);
}



function renderPokedex() {
  const list = $('pokedex-list');
  list.innerHTML = '';
  
  let firstUnlocked = null;
  
  POKEMONS.forEach(p => {
    const card = document.createElement('div');
    const unlocked = Game.pokedex.has(p.id);
    card.className = 'pokemon-card' + (unlocked ? '' : ' locked');
    card.innerHTML = `
      <img src="public/${p.id}.png" alt="${p.name}">
      <p>${unlocked ? p.name : '???'}</p>
      <span class="type-info">${unlocked ? p.type : '???'}</span>
    `;
    if (unlocked) {
      card.onclick = () => showPokedexPreview(p);
      if (!firstUnlocked) firstUnlocked = p;
    }
    list.appendChild(card);
  });
  
  // 첫 번째 해금된 포켓몬 자동 표시
  if (firstUnlocked) {
    showPokedexPreview(firstUnlocked);
  }
}



function renderTeam() {
  const list = $('team-list');
  list.innerHTML = '';
  
  Game.myTeam.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'pokemon-card';
    const hpPercent = Math.round((p.currentHp / p.maxHp) * 100);
    card.innerHTML = `
      <img src="public/${p.id}.png" alt="${p.name}">
      <p>${p.name}</p>
      <div class="hp-info">HP: ${p.currentHp}/${p.maxHp} (${hpPercent}%)</div>
    `;
    card.onclick = () => showTeamPreview(p);
    list.appendChild(card);
  });
  
  // 첫 번째 포켓몬 자동 표시
  if (Game.myTeam.length > 0) {
    showTeamPreview(Game.myTeam[0]);
  }
}





/* ========== 포켓몬 센터 리뉴얼 V2 (Pokemon5e Style) ========== */

function usePokemonCenter() {
  showScreen('center');
}

function updateCenterUI() {
  const container = $('center-machine-container');
  if (!container) return;
  container.innerHTML = ''; 

  // 머신 래퍼
  const machine = document.createElement('div');
  machine.className = 'healing-machine-v2';
  
  // 캡슐
  const capsule = document.createElement('div');
  capsule.className = 'capsule-v2';
  
  // 상태 메시지창
  const statusBox = document.createElement('div');
  statusBox.className = 'status-text-v2';

  if (Game.centerSlot) {
    // 치료 중인 포켓몬 있음
    const p = Game.centerSlot.pokemon;
    const now = Date.now();
    const endTime = Game.centerSlot.endTime;
    const isHealing = now < endTime;

    // 포켓몬 이미지
    const img = document.createElement('img');
    img.src = `public/${p.id}.png`;
    img.className = 'floating-pokemon-v2';
    
    const actionBtn = document.createElement('button'); // 변수 선언 추가
    
    if (isHealing) {
      capsule.classList.add('healing'); // 배경 펄스 효과
      img.style.filter = 'brightness(0.8) sepia(1) hue-rotate(90deg)'; // 약물 효과
      
      const remaining = Math.ceil((endTime - now) / 1000);
      statusBox.innerHTML = `치료 진행 중...<br><span style="color:#0078C0; font-size:16px;">${remaining}s</span>`;
      
      setTimeout(updateCenterUI, 1000);
    } else {
      img.style.filter = 'drop-shadow(0 0 5px white)';
      statusBox.innerHTML = `<span style="color:#58d0d0;">치료 완료!</span><br>${p.name}이(가) 회복되었습니다.`;
      
      actionBtn.textContent = '찾기';
      actionBtn.className = 'pixel-btn primary';
      actionBtn.onclick = () => {
        // 찾을 때 실제로 회복
        const p = Game.centerSlot.pokemon;
        p.currentHp = p.maxHp;
        showCenterMessage(`${p.name}의 치료가 완료되었습니다!`);
        
        Game.centerSlot = null;
        updateCenterUI();
      };
    }
    
    capsule.appendChild(img);
    statusBox.appendChild(actionBtn);
  } else {
    // 치료 중인 포켓몬 없음 -> 맡기기 화면
    statusBox.textContent = '치료할 포켓몬을 선택해주세요.';
    
    const list = document.createElement('div');
    list.className = 'mini-party-grid'; // 그리드 복구
    
    Game.myTeam.forEach((p, i) => {
      const btn = document.createElement('button');
      btn.textContent = p.name; // HP 제거, 이름만 표시
      btn.className = 'party-slot-btn'; // 스타일 복구
      
      if (p.currentHp >= p.maxHp) {
        btn.disabled = true; 
        btn.style.opacity = '0.5';
      }
      
      btn.onclick = () => {
        Game.centerSlot = {
          pokemon: p,
          endTime: Date.now() + 60000 // 1분
        };
        // 여기서 즉시 회복하던 로직 삭제
        showCenterMessage(`${p.name}을(를) 맡겼습니다. (1분 소요)`);
        updateCenterUI();
      };
      
      list.appendChild(btn);
    });
    
    statusBox.appendChild(list);
  }
  
  machine.appendChild(capsule);
  machine.appendChild(statusBox);
  container.appendChild(machine);
  
  // 나가기 버튼
  const closeBtn = document.createElement('button');
  closeBtn.textContent = '나가기';
  closeBtn.className = 'pixel-btn close';
  closeBtn.onclick = () => showScreen('main');
  container.appendChild(closeBtn);
}

function showCenterMessage(text) {
  const overlay = $('center-message-overlay');
  if (!overlay) return;
  overlay.textContent = text;
  overlay.classList.add('show');
  setTimeout(() => overlay.classList.remove('show'), 3000);
}



/* ========== 상점 V2 (Pokemon5e Style) ========== */
const SHOP_ITEMS_V2 = [
  { id: 'pokeball', name: '몬스터볼', price: 200, desc: '야생 포켓몬을 잡을 때 사용 (포획률 1.0x)' },
  { id: 'greatball', name: '슈퍼볼', price: 600, desc: '몬스터볼보다 잡기 쉽다 (포획률 1.5x)' },
  { id: 'ultraball', name: '하이퍼볼', price: 1200, desc: '야생 포켓몬을 아주 잘 잡는다 (포획률 2.0x)' },
  { id: 'potion', name: '상처약', price: 300, desc: '포켓몬의 체력을 20 회복' },
  { id: 'superpotion', name: '좋은상처약', price: 700, desc: '포켓몬의 체력을 50 회복' },
  { id: 'revive', name: '기력의조각', price: 1500, desc: '기절한 포켓몬 부활 (체력 50%)' }
];

function openShop() {
  showScreen('shop');
  updateShopUI();
}

function updateShopUI() {
  const container = $('shop-list');
  container.innerHTML = '';
  
  // 소지금 표시 업데이트 (preview 쪽으로 이동했으므로 id 확인)
  const moneyDisplay = $('shop-money-display');
  if(moneyDisplay) moneyDisplay.textContent = `${Game.money.toLocaleString()}원`;
  
  SHOP_ITEMS_V2.forEach(item => {
    const card = document.createElement('div');
    card.className = 'starter-card'; // 도감 카드 스타일 재사용 (starter-card 또는 pokemon-card)
    card.style.width = 'auto'; // 그리드에 맞게
    card.style.display = 'flex';
    card.style.flexDirection = 'column';
    card.style.alignItems = 'center';
    
    // 아이콘 매핑
    const iconMap = {
      pokeball: 'image/ball.png',
      greatball: 'image/super.png',
      ultraball: 'image/hyper.png',
      potion: 'image/medicine.png',
      superpotion: 'image/good medicine.png',
      revive: 'image/giryeok.png'
    };
    let iconSrc = iconMap[item.id] || 'Pokemon5e-styles/images/pokeball-bg.png';
    
    card.innerHTML = `
      <img src="${iconSrc}" style="width:40px; height:40px; object-fit:contain; margin-bottom:5px;">
      <div style="font-weight:bold; margin-bottom:2px;">${item.name}</div>
      <div style="font-size:11px; color:#666; margin-bottom:3px; text-align:center;">${item.desc.split('(')[0]}</div>
      <div style="font-size:10px; color:#888; margin-bottom:3px;">${item.desc.match(/\(.*\)/) ? item.desc.match(/\(.*\)/)[0] : ''}</div>
      <div style="color:#d32f2f; font-weight:bold;">${item.price}원</div>
      <button class="shop-buy-btn" onclick="buyItem('${item.id}')" style="margin-top:5px;">구매</button>
    `;
    
    container.appendChild(card);
  });
}

function buyItem(id) {
  const item = SHOP_ITEMS_V2.find(i => i.id === id);
  if (!item) return;
  const price = item.price;

  if (Game.money < price) {
    // alert 대신 메시지나 시각적 피드백을 주는 것이 좋지만, 
    // 현재 상점 구조상 alert가 가장 확실함.
    alert('돈이 없잖아! (Not enough money)');
    return;
  }
  
  Game.money -= price;
  if (!Game.items[id]) Game.items[id] = 0;
  Game.items[id]++;
  
  // 성공 메시지는 상단 돈 표시 업데이트로 대체하거나 짧은 알림
  updateShopUI();
  updateBagLabels(); 
}

init();