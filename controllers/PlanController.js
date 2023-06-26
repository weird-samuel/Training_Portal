const Plan = require("../models/Plan");
const Course = require("../models/Course");
const CoursePlan = require("../models/CoursePlan");

let fetchPlan = async (req, res) => {
    let plans = await Plan.find();
    let courses = await Course.find();
    res.render("plans", { plans, courses });
}

let storePlan = async (req, res) => {
    let plan = new Plan(req.body)
    let inserted = await plan.save()
    req.flash('success', "Plan added successfully")
    res.redirect('/admin/plans');
}

let editPlan = async (req, res) => {
    let { id } = req.params
    let plan = await Plan.findById(id)
    res.render('edit-plan', { plan })
}

let updatePlan = async (req, res) => {
    let { id } = req.params
    let plan = await Plan.findById(id)
    plan.setProp(req.body)
    let updated = await plan.update()
    res.redirect('/admin/plans')
}

let deletePlan = async (req, res) => {
    let { id } = req.params
    let deleted = await Plan.delete(id)
    res.redirect('back')
}

let attachCourse = async (req, res) => {
    let {plan_id, courses=[]} = req.body
    let plan = await Plan.findById(plan_id)
    let attachedCourses = await CoursePlan.findCourses(plan_id)
    let toAdd = courses.filter(e => !attachedCourses.includes(Number(e)))
    let toDelete = attachedCourses.filter(e => !courses.includes(e.toString()))
    for (const course_id of toAdd) {
        let coursePlan = new CoursePlan({plan_id, course_id});
        await coursePlan.save()
    }
    for (const course_id of toDelete) {
        await CoursePlan.deleteByPlanCourse(plan_id, course_id);
    }
    res.redirect('back');
}

let attachedCourses = async (req, res)=>{
    let {plan_id} = req.params
    let courses = await CoursePlan.findCourses(plan_id);
    res.json(courses);
}

module.exports = { fetchPlan, storePlan, editPlan, updatePlan, deletePlan, attachCourse, attachedCourses }