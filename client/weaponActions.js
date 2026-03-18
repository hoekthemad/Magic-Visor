const polishWeapon = () => {
    let pBase = [0, 500, 2500, 10000, 25000];
    let base = pBase[state.currentZone] || 25000;
    let cost = base * (state.polish + 1);
    if (state.coins >= cost && state.polish < 3) {
        state.coins -= cost; state.polish++;
        applyPolishEffects();
        updateUI();
    }
}

// const applyPolishEffects = () => {
//     let glw = "none";
//     if (state.polish === 1) glw = "brightness(1.1) drop-shadow(0 0 8px gold)";
//     if (state.polish === 2) glw = "brightness(1.3) drop-shadow(0 0 18px gold)";
//     if (state.polish === 3) glw = "brightness(1.6) drop-shadow(0 0 28px white)";
//     weaponEl.style.filter = glw;
// }

const applyPolishEffects = () => {
    polishMin = 1;
    polishMax = 3;
    let stateValues = {
        1: {brightness: `1.1`, shadow: `0 0 8px gold`},
        2: {brightness: `1.3`, shadow: `0 0 18px gold`},
        3: {brightness: `1.6`, shadow: `0 0 28px white`},
    };
    
    weaponEl.style.filter = (state.polish >= polishMin && state.polish <= polishMax) ? 
        `brightness(${stateValues[state.polish].brightness}) drop-shadow(${stateValues[state.polish].shadow})` :
        `none`;
}

const unlockItem = (img, text) => {
    if (img.includes('sword')) state.hasSword = true;
    if (img.includes('dagger')) state.hasDagger = true;
    if (img.includes('greatsword')) state.hasGreatsword = true;
    if (img.includes('scythe')) state.hasScythe = true;
    state.polish = 0; 
    weaponEl.src = img;
    weaponEl.style.filter = "none";
    alertBox.innerText = text;
    alertBox.style.opacity = "1";
    setTimeout(() => alertBox.style.opacity = "0", 3000);
    checkProgression();
}

