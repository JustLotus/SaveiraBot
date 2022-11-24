const { Mongosha, Client, Database } = require("mongosha");

class DatabaseManager {
    /**
     * @type {Client}
     */
    static Client;
    /**
     * @type {Database}
     */
    static Database;
    static async init(adress) {
        this.Client = await Mongosha.connect(adress, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        this.Database = this.Client.database("rpg_bot2");
    }
}

module.exports = DatabaseManager;