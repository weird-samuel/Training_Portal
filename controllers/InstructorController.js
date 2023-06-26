const { resolve } = require("path");
const Instructor = require("../models/Instructor");
const CourseInstructor = require("../models/CourseInstructor");
const Course = require("../models/Course");
const { existsSync, mkdirSync, } = require('fs');
let fetchInstructor = async (req, res) => {
    let instructors = await Instructor.find();
    res.render("instructors", { instructors });
}

let storeInstructor = async (req, res) => {
    let fileName = 'no-pic.jpg'
    let photo = req.files?.photo
    let instructor = new Instructor(req.body)
    if (photo.mimetype.startsWith('image')) {
        if (photo.size < 1048576) {
            let ext = '.' + photo.name.split('.').pop()
            if (!existsSync(resolve('uploads', 'instructors')))
                mkdirSync(resolve('uploads', 'instructors'))
            fileName = 'instructors/' + instructor.email + Date.now() + ext
            photo.mv('uploads/'+ fileName)
        }
    } 
    instructor.photo = fileName
    let inserted = await instructor.save()
    res.redirect('/admin/instructors');
}

let editInstructor = async (req, res) => {
    let { id } = req.params
    let instructor = await Instructor.findById(id)
    res.render('edit-instructor', { instructor })
}

let updateInstructor = async (req, res) => {
    let { id } = req.params
    let instructor = await Instructor.findById(id)
    instructor.setProp(req.body)
    let updated = await instructor.update()
    res.redirect('/admin/instructors')
}

let deleteInstructor = async (req, res) => {
    let { id } = req.params
    let deleted = await Instructor.delete(id)
    res.redirect('back')
}

let instructorProfile = async (req, res) => {
    let { id } = req.params
    let instructor = await Instructor.findById(id)
    let courses = await Course.find()
    instructor.courses = await instructor.getCourseTaken()
    res.render('instructor-profile', { instructor, courses })
}

let attachInstructorCourse = async (req, res) => {
    let {courses=[]} = req.body
    let {instructor_id} = req.params
    let instructor = await Instructor.findById(instructor_id)
    let attachedCourses = await CourseInstructor.findCourses(instructor_id)
    let toAdd = courses.filter(e => !attachedCourses.includes(Number(e)))
    let toDelete = attachedCourses.filter(e => !courses.includes(e.toString()))
    for (const course_id of toAdd) {
        let courseInstructor = new CourseInstructor({instructor_id, course_id});
        await courseInstructor.save()
    }
    for (const course_id of toDelete) {
        await CourseInstructor.deleteByPlanCourse(instructor_id, course_id);
    }
    res.redirect('back');
}

module.exports = { storeInstructor, fetchInstructor, deleteInstructor, updateInstructor, editInstructor, instructorProfile, attachInstructorCourse }; 