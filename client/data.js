let state = {
    level: 1, exp: 0, coins: 0, ore: 0, fish: 0,
    active: false, power: 1, speed: 2500,
    isBuffed: false, oreReq: 5, fishReq: 3, polish: 0,
    hasSword: false, hasDagger: false, hasGreatsword: false, hasScythe: false,
    currentZone: 1, forceBoss: false,
    isBoss: false, currentTarget: 'hunt',
    data: {
        hunt: { img: 'slime.png', aura: '#00ff88', hp: 100 },
        mine: { img: 'ore.png', aura: '#bdc3c7', hp: 100 },
        fish: { img: 'fish.png', aura: '#00d4ff', hp: 100 },
        boss_z1: { img: 'slime.png', aura: '#ff4444', hp: 500 },
        wolf_z2: { img: 'fire_wolf.png', aura: '#ff4500', hp: 2500 },
        behemoth_z3: { img: 'behemoth.png', aura: '#ff0000', hp: 10000 },
        reaper_z4: { img: 'frost_reaper.png', aura: '#00ffff', hp: 10000 },
        titan_z4: { img: 'titan.png', aura: '#ffffff', hp: 50000 },
        z2_hunt: { img: 'fire_wolf.png', aura: '#ff4500', hp: 400 },
        z3_hunt: { img: 'behemoth.png', aura: '#ff0000', hp: 1500 },
        z4_hunt: { img: 'frost_reaper.png', aura: '#00ffff', hp: 5000 }
    }
};

var targetEl = document.getElementById('target');
var weaponEl = document.getElementById('weapon-hand');
var xpFillRing = document.getElementById('xp-fill-ring');
var buffFillRing = document.getElementById('buff-ring-fill');
var levelOrb = document.getElementById('level-orb');
var alertBox = document.getElementById('loot-alert');
let hp = 100;
let actionTimer = null;

const initData = () => {
    targetEl = document.getElementById('target');
    weaponEl = document.getElementById('weapon-hand');
    xpFillRing = document.getElementById('xp-fill-ring');
    buffFillRing = document.getElementById('buff-ring-fill');
    levelOrb = document.getElementById('level-orb');
    alertBox = document.getElementById('loot-alert');
}