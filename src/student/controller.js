const pool = require('../../db')
const queries = require('./queries')

const getStudents = (req,res) => {
    pool.query(queries.getStudents, (err,results)=>{
        if(err) throw err;
        res.status(200).json(results.rows)
    })
}

const addStudent = (req,res) => {
    const { name, email, age, dob } = req.body
    console.log(req);
    //check if email exists
    pool.query(queries.checkEmailExists, [email], (err,results)=>{
        if(results.rows.length){
            res.send('Email already exists');
        }

        //add student to db
        pool.query(queries.addStudent, [name,email,age,dob], (err,results)=>{
            if(err) throw err;
            res.status(201).send("Student Created Successfully!")
        })
    })    
}

const getStudentById = (req,res) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getStudentById, [id], (err,results)=>{
        if(err) throw err;
        res.status(200).json(results.rows)
    })
}

const removeStudent = (req,res)=>
{
    const id = parseInt(req.params.id)
    
    pool.query(queries.getStudentById, [id], (err,results)=>
    {

        const noStudentFound = !results.rows.length;
        if(noStudentFound)
        {
        res.send("Student doesn't exist")
        }

        pool.query(queries.removeStudent, [id], (err,results)=>
        {
            if(err) throw err;
            res.status(200).send("Student removed successfully!")
        })
    })
}

const updateStudent = (req,res) =>{
    const id = parseInt(req.params.id)
    const { name } = req.body;

    pool.query(queries.getStudentById, [id], (err,results)=>{
        const noStudentFound = !results.rows.length;
        if(noStudentFound){
            res.send('Student does not exist!')
        }
    

    pool.query(queries.updateStudent, [name,id], (error,results)=>{
        if(err) throw err
        res.status(200).send("Student updated successfully!")
    })
    })
}


module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    removeStudent,
    updateStudent,
};