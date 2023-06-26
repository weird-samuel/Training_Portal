const Model = require("./Model");
const connection = require("./connection");

class User extends Model {
    static async findByEmail(email) {
        let sql = `SELECT * FROM ${this.tableName} WHERE email = ?`
        let [result] = await connection.execute(sql, [email])
        if (result.length > 0) {
            let row = result[0]
            return this.instance(row)
        }
    }   
}

module.exports = User