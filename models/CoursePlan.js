const Model = require('./Model');
const connection = require('./connection');
class CoursePlan extends Model {
    static async findCourses(plan_id){
        let sql = 'SELECT course_id from course_plans WHERE plan_id = ?'
        let [result] = await connection.execute(sql, [plan_id])
        return result.map(e=>e.course_id)
    }
    static async deleteByPlanCourse(plan_id, course_id){
        let sql = 'DELETE FROM course_plans WHERE plan_id = ? AND course_id = ?'
        let [result] = await connection.execute(sql, [plan_id, course_id])
        return result.affectedRows > 0
    }
}

module.exports = CoursePlan;