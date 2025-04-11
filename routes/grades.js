let {Grade, Student, Course} = require('../model/schemas');

function getAll(req, res) {
    Grade.find()
        .populate('student')
        .populate('course')
        .then((grades) => {
            res.send(grades);
        }).catch((err) => {
        res.send(err);
    });
}
function createMany(req, res) {
    const gradesData = req.body; 
  
    if (!Array.isArray(gradesData)) {
      return res.status(400).send('Le corps de la requête doit être un tableau de grades.');
    }
  
    Grade.insertMany(gradesData)
      .then((grades) => {
        res.json({ message: `${grades.length} grades enregistrées avec succès !`, ids: grades.map(grade => grade._id) });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send('Erreur lors de l\'enregistrement des grades ', err.message);
      });
  }

function create(req, res) {
    let grade = new Grade();

    grade.student = req.body.student;
    grade.course = req.body.course;
    grade.grade = req.body.grade;
    grade.date = req.body.date;

    grade.save()
        .then((grade) => {
                res.json({message: `grade saved with id ${grade.id}!`});
            }
        ).catch((err) => {
        console.log(err);
        res.status(400).send('cant post grade ', err.message);
    });
}

module.exports = {getAll, create, createMany};
