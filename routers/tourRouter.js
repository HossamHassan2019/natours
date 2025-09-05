const express = require('express');
const {getAllTours , addTour , getTour , updateTour , deleteTour , checkID , checkBody} = require('../controllers/tourController');

const tourRouter = express.Router();

// tourRouter.route('/').post((req , res , next) =>{
//     const obj = req.body; 

//     if(!obj.name || !obj.price){
//         return   res.status(400).json({
//             status: 'fail',
//             message:'bad request'
//         })
//     }
//     next();
// })

tourRouter.param('id' , checkID);

tourRouter
.route('/')
.get(getAllTours)
.post(checkBody , addTour);

tourRouter
.route('/:id')
.get(getTour)
.patch(updateTour)
.delete(deleteTour);

module.exports = tourRouter;