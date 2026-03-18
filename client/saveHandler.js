const saveGame = () => {
    const stateToSave = { ...state, active: false };
    localStorage.setItem('magicVisorSave', JSON.stringify(stateToSave));
    alertBox.innerText = "GAME SAVED!";
    alertBox.style.opacity = "1";
    setTimeout(() => { alertBox.style.opacity = "0"; }, 2000);
    toggleSettings();
}

const loadGame = () => {
    const savedData = localStorage.getItem('magicVisorSave');
    if (savedData) {
        try {
            const loaded = JSON.parse(savedData);
            state = Object.assign(state, loaded); 
            state.active = false;
            restoreVisuals();
        } catch(e) { console.error("Load failed."); }
    }
}

const deleteSave = () => {
    if (confirm("THIS WILL DELETE EVERYTHING. NO REFUNDS. PURGE NOW?")) {
        localStorage.removeItem('magicVisorSave');
        location.reload();
    }
}