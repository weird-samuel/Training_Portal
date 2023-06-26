const { resolve } = require("path");
const Student = require("../models/Student");
const Plan = require("../models/Plan");
const PlanStudent = require("../models/PlanStudent");
const { existsSync, mkdirSync, } = require('fs');
let fetchStudent = async (req, res) => {
    let students = await Student.find();
    res.render("students", { students });
}

let storeStudent = async (req, res) => {
    let photo = req.files?.photo
    let fileName = 'no-pic.jpg'
    let student = new Student(req.body)
    if (photo && photo.mimetype.startsWith('image')) {
        if (photo.size < 1048576) {
            let ext = '.' + photo.name.split('.').pop()
            if (!existsSync(resolve('uploads', 'students')))
                mkdirSync(resolve('uploads', 'students'))
            fileName = 'students/' + student.email + Date.now() + ext
            photo.mv('uploads/' + fileName)
        }
    }
    student.photo = fileName
    if (await student.save())
        req.flash('success', 'Student added successfully')
    res.redirect('/admin/students');
}

let editStudent = async (req, res) => {
    let { id } = req.params
    let student = await Student.findById(id)
    res.render('edit-student', { student })
}

let updateStudent = async (req, res) => {
    let { id } = req.params
    let student = await Student.findById(id)
    student.setProp(req.body)
    let updated = await student.update()
    res.redirect('/admin/students')
}

let deleteStudent = async (req, res) => {
    let { id } = req.params
    let deleted = await Student.delete(id)
    res.redirect('back')
}

let studentProfile = async (req, res) => {
    let { id } = req.params
    let student = await Student.findById(id)
    student.plans = await student.getCurrentPlans();
    student.courses = await student.getCourses();
    let plans = await Plan.find()
    res.render('student-profile', { student, plans })
}

let attachPlan = async (req, res) => {
    let { plan_id } = req.body
    let { student_id } = req.params
    let student = await Student.findById(student_id)
    let attachedPlans = await student.getCurrentPlans()
    if (attachedPlans.some(p => p.id == plan_id)) {
        req.flash('info', 'The plan is already attached to student');
    } else {
        let planStudent = new PlanStudent({ plan_id, student_id });
        if (await planStudent.save()) {
            req.flash('success', 'Plan attached successfully')
        } else {
            req.flash('success', 'Failed! Unable to attached plan to student')
        }
    }
    res.redirect('back');
}

module.exports = { fetchStudent, storeStudent, editStudent, updateStudent, deleteStudent, studentProfile, attachPlan }