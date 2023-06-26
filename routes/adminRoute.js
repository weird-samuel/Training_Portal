const { Router } = require('express');
const { storePlan, fetchPlan, deletePlan, updatePlan, editPlan, attachCourse, attachedCourses } = require('../controllers/PlanController');
const { fetchCourse, storeCourse, editCourse, updateCourse, deleteCourse } = require('../controllers/CourseController');
const { storeStudent, fetchStudent, deleteStudent, updateStudent, editStudent, studentProfile, attachPlan } = require('../controllers/StudentController');
const { storeInstructor, fetchInstructor, deleteInstructor, updateInstructor, editInstructor, instructorProfile, attachInstructorCourse } = require('../controllers/InstructorController');
const { storeAdmin, fetchAdmin, deleteAdmin } = require('../controllers/AdminController');
const studentValidator = require('../validators/studentValidator');
const instructorValidator = require('../validators/instructorValidator');
const courseValidator = require('../validators/CourseValidator');
const planValidator = require('../validators/planValidator');
const route = Router();

route.get('/', (req, res) => { res.send("<h1>Welcome to admin page") });

route.get('/add-plan', (req, res) => res.render("add-plan"));
route.post('/add-plan', planValidator, storePlan);
route.get('/plan/edit/:id', editPlan)
route.post('/plan/edit/:id', updatePlan)
route.get('/plans', fetchPlan);
route.get('/plan/delete/:id', deletePlan)
route.post('/plan/attach-course', attachCourse)
route.get('/plan/:plan_id/attached-courses', attachedCourses)


route.get('/add-student', (req, res) => res.render("add-student"));
route.post('/add-student', studentValidator, storeStudent);
route.get('/student/edit/:id', editStudent)
route.post('/student/edit/:id', updateStudent)
route.get('/students', fetchStudent);
route.get('/student/delete/:id', deleteStudent)
route.get('/student/profile/:id', studentProfile);
route.post('/student/:student_id/attach-plan', attachPlan);

route.get('/add-course', (req, res) => res.render("add-course"));
route.post('/add-course', courseValidator, storeCourse);
route.get('/course/edit/:id', editCourse)
route.post('/course/edit/:id', updateCourse)
route.get('/courses', fetchCourse);
route.get('/course/delete/:id', deleteCourse)

route.get('/add-instructor', (req, res) => res.render("add-instructor"));
route.post('/add-instructor', instructorValidator, storeInstructor);
route.get('/instructor/edit/:id', editInstructor)
route.post('/instructor/edit/:id', updateInstructor)
route.get('/instructors', fetchInstructor);
route.get('/instructor/delete/:id', deleteInstructor)
route.get('/instructor/profile/:id', instructorProfile);
route.post('/instructor/:instructor_id/attach-course', attachInstructorCourse);

route.get('/add-admin', (req, res) => res.render("add-admin"));
route.post('/add-admin', storeAdmin);
route.get('/admins', fetchAdmin);
route.get('/admin/delete/:id', deleteAdmin)
route.get('/logout', (req, res) => {
    req.session.destroy();
    // req.session.save(()=>{})
    res.redirect('/')
})


module.exports = route;