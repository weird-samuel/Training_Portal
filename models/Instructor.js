const Course = require('./Course');
const User = require('./User');
const connection = require('./connection');
class Instructor extends User {
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
    get form_employment_date(){
        return this.dob.toISOString().slice(0,10)   
    } 

    async getCourseTaken (){
        let result = [];
        let sql = "SELECT * FROM courses WHERE id in (SELECT course_id FROM course_instructors WHERE instructor_id = ?)"
        let [rows] = await connection.execute(sql, [this.id]);
        for (const row of rows) {
            result.push(Course.instance(row))
        }
        return result
    }
}

module.exports = Instructor;