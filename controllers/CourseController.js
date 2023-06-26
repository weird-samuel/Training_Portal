const Course = require("../models/Course");

let fetchCourse = async (req, res) => {
    let courses = await Course.find();
    res.render("courses", { courses });
}

let storeCourse = async (req, res) => {
    let course = new Course(req.body);
    let inserted = await course.save();
    req.flash('success', "Course added successfully")
    res.redirect('/admin/courses');
}

let editCourse = async (req, res) => {
    let { id } = req.params;
    let course = await Course.findById(id);
    res.render('edit-course', { course });
}

let updateCourse = async (req, res) => {
    let { id } = req.params;
    let course = await Course.findById(id);
    course.setProp(req.body);
    let updated = await course.save();
    res.redirect('/admin/courses');
}

let deleteCourse = async (req, res) => {
    let { id } = req.params;
    let deleted = await Course.delete(id);
    res.redirect('back');
}

module.exports = { fetchCourse, storeCourse, editCourse, updateCourse, deleteCourse };