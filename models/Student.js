const Plan = require('./Plan');
const User = require('./User');
const connection = require('./connection');
class Student extends User {
    fullName() {
        return `${this.surname} ${this.first_name} ${this.other_name || ''}`.trim()
    }

    get full_name() {
        return this.fullName()
    }

    get name() {
        return this.fullName()
    }

    get age() {
        return Math.max(0, Math.floor((Date.now() - this.dob.getTime()) / (1000 * 60 * 60 * 24 * 365.25)))
    }

    get form_dob(){
        return this.dob.toISOString().slice(0,10)   
    } 

    async getCurrentPlans(){
        let result = []
        let sql = "SELECT * FROM plans WHERE id in (SELECT plan_id FROM plan_students WHERE student_id = ?)"
        let [rows] = await connection.execute(sql, [this.id]);
        for (const row of rows) {
            result.push(Plan.instance(row))
        }
        return result
    }
    async getCourses(){
        let result = []
        let sql = "SELECT * FROM courses WHERE id in (SELECT course_id FROM course_plans WHERE plan_id in (SELECT plan_id FROM plan_students WHERE student_id = ?))"
        let [rows] = await connection.execute(sql, [this.id]);
        for (const row of rows) {
            result.push(Plan.instance(row))
        }
        return result
    }
}

module.exports = Student;