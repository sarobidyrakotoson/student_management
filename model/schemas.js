let mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://sarobidy:NSXeIUL9vtaUMpyy@cluster0.ypcx6va.mongodb.net/ecole?retryWrites=true&w=majority';

mongoose.connect(mongoURI)
    .then(() => {
        console.log("Connexion réussie à MongoDB Atlas");
    })
    .catch((error) => {
        console.error("Erreur de connexion à MongoDB Atlas :", error);
    });

let Schema = mongoose.Schema;

let StudentSchema = Schema({
    firstName: String,
    lastName: String,
});

let student = mongoose.model('Student', StudentSchema);

let courseSchema = Schema({
    name: String,
    code: String,
});

let Course = mongoose.model('Course', courseSchema);

let gradeSchema = Schema({
    student: {type: mongoose.Schema.Types.ObjectId, ref: 'Student'},
    course: {type: mongoose.Schema.Types.ObjectId, ref: 'Course'},
    grade: Number,
    date: Date,
});
let Grade = mongoose.model('Grade', gradeSchema);

// Exports the modeles
module.exports = {
    Student: student,
    Course: Course,
    Grade: Grade,
}
