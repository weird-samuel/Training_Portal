const connection = require("./connection");
const pluralize = require('pluralize');

class Model {
    constructor(obj = {}) {
        this.setProp(obj)
    }

    setProp(obj) {
        for (const key in obj) {
            this[key] = obj[key]
        }
    }

    static instance(obj) {
        let inst = new this()
        inst.setProp(obj)
        return inst;
    }

    static get tableName() {
        return pluralize(this.name.replace(/[a-z][A-Z]/, (m) => m.split('').join('_'))).toLowerCase();
    }

    async insert() {
        let sql = `INSERT INTO ${this.constructor.tableName} (${Object.keys(this).join(', ')}) VALUES (${'?'.repeat(Object.keys(this).length).split('').join(', ')})`
        let [result] = await connection.execute(sql, Object.values(this));
        this.id = result.insertId
        return result.affectedRows > 0
    }

    async save() {
        if (this.id) return await this.update()
        return await this.insert()
    }

    static async findById(id) {
        let sql = `SELECT * FROM ${this.tableName} WHERE id = ?`
        let [result] = await connection.execute(sql, [id])
        if (result.length > 0) {
            let row = result[0]
            return this.instance(row)
        }
    }

    static async find() {
        let result = []
        let sql = `SELECT * FROM ${this.tableName}`
        let [rows] = await connection.execute(sql)
        for (const row of rows) {
            result.push(this.instance(row))
        }
        return result
    }

    async update() {
        let { id, created_at, updated_at, ...obj } = this
        let props = Object.keys(obj)
        let values = Object.values(obj)
        let sql = `UPDATE ${this.constructor.tableName} SET ${props.join(' = ?, ')} = ? WHERE id = ?`;
        values.push(id)
        let [result] = await connection.execute(sql, values);
        return result.affectedRows > 0
    }

    async delete() {
        let sql = `DELETE FROM ${this.constructor.tableName} WHERE id = ?`
        let [result] = await connection.execute(sql, [this.id])
        return result.affectedRows > 0
    }

    static async delete(id) {
        let sql = `DELETE FROM ${this.tableName} WHERE id = ?`
        let [result] = await connection.execute(sql, [id])
        return result.affectedRows > 0
    }


}

module.exports = Model