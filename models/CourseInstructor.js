const Model = require('./Model');
const connection = require('./connection');
class CourseInstructor extends Model {
    static async findCourses(instructor_id){
        let sql = 'SELECT course_id from course_instructors WHERE instructor_id = ?'
        let [result] = await connection.execute(sql, [instructor_id])
        return result.map(e=>e.course_id)
    }
    static async deleteByPlanCourse(instructor_id, course_id){
        let sql = 'DELETE FROM course_instructors WHERE instructor_id = ? AND course_id = ?'
        let [result] = await connection.execute(sql, [instructor_id, course_id])
        return result.affectedRows > 0
    }
}

module.exports = CourseInstructor;