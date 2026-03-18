const toggleSettings = () => {
    const menu = document.getElementById('settings-menu');
    menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';
}

const restoreVisuals = () => {
    levelOrb.innerText = state.level;
    updateXPOrb();
    const bg = document.getElementById('game-bg');
    const root = document.querySelector(':root');

    let auraColor = "var(--aura-green)";
    if (state.currentZone === 2) auraColor = "var(--zone2-purple)";
    if (state.currentZone === 3) auraColor = "var(--zone3-orange)";
    if (state.currentZone === 4) auraColor = "var(--zone4-cyan)";

    root.style.setProperty('--current-aura', auraColor);
    document.getElementById('fish-count-ui').style.color = auraColor;
    document.getElementById('zone-mult-ui').style.color = auraColor;

    if (state.currentZone >= 2) {
        bg.style.filter = "hue-rotate(140deg) brightness(0.4) contrast(1.5)";
    }
    if (state.currentZone >= 3) {
        bg.classList.add('heat-haze');
        bg.style.filter = "sepia(1) saturate(2) hue-rotate(-30deg) brightness(0.3)";
    }
    if (state.currentZone >= 4) {
        bg.style.backgroundImage = "url('background2.png')";
    }

    if (state.hasScythe) weaponEl.src = 'glacial_scythe.png';
    else if (state.hasGreatsword) weaponEl.src = 'magma_greatsword.png';
    else if (state.hasDagger) weaponEl.src = 'wolf_dagger.png';
    else if (state.hasSword) weaponEl.src = 'sword.png';
    else weaponEl.src = 'stick.png';

    applyPolishEffects();
    updateUI();
    checkProgression();
    respawn();
}

const useOre = () => { if (state.ore >= state.oreReq) { state.ore -= state.oreReq; state.power += 0.5; state.oreReq = Math.floor(state.oreReq * 1.6); updateUI(); }  }

const useFish = () => {
    const currentFishReq = [0, 3, 15, 50, 200][state.currentZone] || 200;
    if (state.fish >= currentFishReq && !state.isBuffed) {
        state.fish -= currentFishReq; state.isBuffed = true;
        const prevSpeed = state.speed; state.speed = 700;

        const duration = 10000;
        const start = Date.now();
        const circ = 226;

        const timer = setInterval(() => {
            const elapsed = Date.now() - start;
            const remaining = Math.max(0, 1 - (elapsed / duration));
            buffFillRing.style.strokeDashoffset = circ * (1 - remaining);

            if (elapsed >= duration) {
                clearInterval(timer);
                state.isBuffed = false;
                state.speed = prevSpeed;
                buffFillRing.style.strokeDashoffset = 226;
                updateUI();
            }
        }, 50);

        updateUI();
    }
}

const updateUI = () => {
    // Hacker Check
    if (state.coins > 1000000000) { document.getElementById('hacker-overlay').style.display = 'flex'; }

    document.getElementById('coins').innerText = Math.floor(state.coins || 0);
    document.getElementById('ore').innerText = state.ore;
    document.getElementById('fish').innerText = state.fish;
    document.getElementById('ore-cost').innerText = state.oreReq;

    let fCosts = [0, 3, 15, 50, 200];
    let currentFishReq = fCosts[state.currentZone] || 200;
    document.getElementById('fish-cost').innerText = currentFishReq;

    let zMults = [0, 1, 2, 5, 10];
    document.getElementById('zone-mult-ui').innerText = `LOOT: x${zMults[state.currentZone] || 1}`;

    document.getElementById('polish-lv').innerText = state.polish;
    let bC = [0, 100, 500, 2500, 10000];
    document.getElementById('bounty-cost').innerText = bC[state.currentZone] || 10000;
    let pB = [0, 500, 2500, 10000, 25000];
    document.getElementById('polish-cost').innerText = (pB[state.currentZone] || 25000) * (state.polish + 1);

    const bBtn = document.getElementById('btn-bounty');
    if (state.forceBoss) bBtn.classList.add('locked'); else bBtn.classList.remove('locked');

    const fBtn = document.getElementById('btn-forge'), buffBtn = document.getElementById('btn-buff');
    if (state.ore >= state.oreReq) fBtn.classList.remove('disabled'); else fBtn.classList.add('disabled');
    if (state.fish >= currentFishReq && !state.isBuffed) buffBtn.classList.remove('disabled'); else if (state.isBuffed) buffBtn.classList.add('disabled'); else buffBtn.classList.add('disabled');
}