const toggleAuto = () => {
    state.active = !state.active;
    document.getElementById('main-action').classList.toggle('active-glow', state.active);
    if (state.active && hp > 0) actionLoop();
    else clearTimeout(actionTimer);
}

const actionLoop = () => {
    clearTimeout(actionTimer);
    if (!state.active || hp <= 0) return;
    weaponEl.classList.remove('weapon-attack');
    void weaponEl.offsetWidth;
    weaponEl.classList.add('weapon-attack');

    actionTimer = setTimeout(() => {
        let pMult = 1 + (Number(state.polish || 0) * 0.15);
        let dmg = 34 * state.power * pMult;
        if (state.hasScythe) dmg *= 4; 
        else if (state.hasGreatsword) dmg *= 3; 
        else if (state.hasDagger) dmg *= 1.5; 
        else if (state.hasSword) dmg *= 2;
        hp -= Math.max(1, dmg);
        targetEl.classList.add('hit-shake');
        setTimeout(() => targetEl.classList.remove('hit-shake'), 40);
        if (hp <= 0) finishTarget();
        else actionTimer = setTimeout(actionLoop, state.speed);
    }, 250);
}

const finishTarget = () => {
    clearTimeout(actionTimer);
    targetEl.classList.add('shatter');
    let penalty = 1.0;
    if (state.currentZone === 1 && state.hasSword) penalty = 0.5;
    else if (state.currentZone === 2 && state.hasDagger) penalty = 0.33;
    let zMults = [0, 1, 2, 5, 10];
    let zMult = zMults[state.currentZone] || 1;
    if (state.isBoss) {
        state.coins += Math.round(100 * penalty * zMult);
        if (!state.hasSword && state.currentZone === 1 && Math.random() < 0.20) unlockItem('sword.png', 'SWORD UNLOCKED!');
        if (!state.hasDagger && state.currentZone === 2 && Math.random() < 0.15) unlockItem('wolf_dagger.png', 'WOLF DAGGER UNLOCKED!');
        if (!state.hasGreatsword && state.currentZone === 3 && Math.random() < 0.05) unlockItem('magma_greatsword.png', 'MAGMA SWORD UNLOCKED!');
        if (!state.hasScythe && state.currentZone === 4 && Math.random() < 0.05) unlockItem('glacial_scythe.png', 'SCYTHE UNLOCKED!');
    } else {
        state.coins += Math.round(10 * penalty * zMult);
        if (state.currentTarget.includes('mine')) state.ore += Math.round(1 * penalty * zMult);
        if (state.currentTarget.includes('fish')) state.fish += Math.round(1 * penalty * zMult);
    }
    gainExp(state.isBoss ? 200 * penalty : 25 * penalty);
    updateUI();
    checkProgression();
    setTimeout(() => { targetEl.src = ""; respawn(); }, 1200);
}

const buyBounty = () => {
    if (state.forceBoss) return;
    let costs = [0, 100, 500, 2500, 10000];
    let cost = costs[state.currentZone] || 10000;
    if (state.coins >= cost) { state.coins -= cost; state.forceBoss = true; updateUI(); }
}

const respawn = () => {
    targetEl.classList.remove('shatter', 'boss-style', 'wolf-boss');
    state.isBoss = false;
    let bK = ['boss_z1', 'wolf_z2', 'behemoth_z3', 'titan_z4'];
    let bossKey = bK[state.currentZone-1] || 'titan_z4';
    
    if (state.forceBoss || (Math.random() < 0.10)) {
        state.currentTarget = bossKey;
        state.isBoss = true;
        state.forceBoss = false;
        targetEl.classList.add(state.currentZone > 1 ? 'wolf-boss' : 'boss-style');
    } else {
        let pool = ['hunt', 'mine', 'fish'];
        let type = pool[Math.floor(Math.random()*3)];
        if (type === 'hunt' && state.currentZone > 1) {
            state.currentTarget = `z${state.currentZone}_hunt`;
        } else {
            state.currentTarget = type;
        }
    }
    const info = state.data[state.currentTarget];
    hp = info ? info.hp : 100;
    targetEl.src = info ? info.img : 'slime.png';
    targetEl.style.filter = `drop-shadow(0 0 25px ${info ? info.aura : '#fff'})`;
    updateUI();
    if (state.active) actionLoop();
}

const checkProgression = () => {
    const gt = document.getElementById('travel-gate');
    if (state.level >= 35 && state.hasSword && state.currentZone === 1) { gt.style.display = 'block'; gt.innerText = "ZONE 2: BLIGHTED PEAK"; }
    else if (state.level >= 75 && state.hasDagger && state.currentZone === 2) { gt.style.display = 'block'; gt.innerText = "ZONE 3: VOLCANIC FOREST"; }
    else if (state.level >= 100 && state.hasGreatsword && state.currentZone === 3) { gt.style.display = 'block'; gt.innerText = "ZONE 4: GLACIAL TUNDRA"; }
    else gt.style.display = 'none';
}

const advanceZone = () => {
    state.currentZone++;
    state.polish = 0;
    restoreVisuals();
}


const gainExp = (amt) => {
    state.exp += amt;
    if (state.exp >= 100) { state.exp = 0; state.level++; levelOrb.innerText = state.level; }
    updateXPOrb();
}

const updateXPOrb = () => {
    const circumference = 251.2;
    const offset = circumference - (state.exp / 100) * circumference;
    xpFillRing.style.strokeDashoffset = offset;
}