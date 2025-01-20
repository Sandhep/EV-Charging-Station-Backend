import db from "./models/index.js";

class Database{

    async initialise(){
        try {
            await db.sequelize.sync();
            console.log("Database synchronized successfully.");
          } catch (err) {
            console.error("Error syncing database:", err);
          }
    }

}

export default new Database();