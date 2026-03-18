/**
 * The main save data handler
 * This will do 3 basic functions, set, retrieve and remove save state data
 * 
 * @author Hoek
 * @since 18/03/2026
 * @revisions 0
 */
const SaveState = {
    /**
     * The user ID we are going to (later) search on
     * @author Hoek
     * @since 18/03/2026
     * @revisions 0
     */
    uid: null,
    /**
     * The values to search against
     * @author Hoek
     * @since 18/03/2026
     * @revisions 0
     */
    stats: {
        //#region Level stats
        level: 1,
        exp: 0,
        //#endregion

        //#region Player stats
        power: 1,
        speed: 2500,
        //#endregion

        //#region Currency stats
        coins: 0,
        ore: 0, oreReq: 5, 
        fish: 0, fishReq: 3, 
        //#endregion

        //#region Attack statuses
        active: false,
        isBuffed: false, 
        currentZone: 1, 
        forceBoss: false,
        isBoss: false, 
        currentTarget: `hunt`,
        //#endregion

        //#region Weapon stats
        hasSword: false, 
        hasDagger: false, 
        hasGreatsword: false, 
        hasScythe: false,
        polish: 0,
        //#endregion
    },

    /**
     * Set the current data held in this.stats into the storage
     * 
     * Again another that would be DB based, but, local
     * 
     * @author Hoek
     * @since 18/03/2026
     * @revisions 0
     * @returns {void}
     */
    saveData: () => {
        currStats = JSON.stringify(this.stats);
        localStorage.removeItem(`magicVisorSave`);
        localStorage.setItem(`magicVisorSave`, currStats);
    },

    /**
     * Get the held data from storage
     * @author Hoek
     * @since 18/03/2026
     * @revisions 0
     * @returns {Object}
     */
    getData: () => {
        let localData = localStorage.getItem(`magicVisorSave`);
        if (localData.toString().length > 0) this.stats = JSON.parse(localData);
        return this.stats;
    },

    /**
     * Get the held data from storage
     * @author Hoek
     * @since 18/03/2026
     * @revisions 0
     * @returns {void}
     */
    setData: (part, value) => {
        this.stats[part] = value;
        this.saveData();
    },

    /**
     * Get a singular piece data from 
     * 
     * @param {string} part The piece of information you want to get from the storage
     * @author Hoek
     * @since 18/03/2026
     * @revisions 0
     * @returns {string|int|boolean}
     */
    getSingleData: (part) => {
        return this.stats[part];
    },

    /**
     * Clear the current held data from the storage
     * @author Hoek
     * @since 18/03/2026
     * @revisions 0
     * @returns {void}
     */
    clearData: () => {
        localStorage.removeItem(`magicVisorSave`);
    }
};