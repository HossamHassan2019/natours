const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json` , "utf8"));

exports.checkID = (req , res , next , val) =>{
        console.log(req.body);
        if(req.params.id >= tours.length){
        return res.status(404).json({
            status: 'fail',
            message:'invalid id'
        })
    }

    next();
}

exports.checkBody = (req , res , next) =>{
    const obj = req.body; 

    if(!obj.name || !obj.price){
        return   res.status(400).json({
            status: 'fail',
            message:'bad request'
        })
    }
    next();
}

exports.getAllTours = (req,res) =>{
    console.log('getting all tours')
    res.status(200).json({
        status:'success', 
        length:tours.length,
        data:{
           tours
        }
    })
}

exports.getTour = (req,res) =>{
    //console.log(req.params);
    const id = req.params.id * 1 ; 
    const tour = tours.find(el => el.id === id);
    res.status(200).json({
        status:'success', 
        data:{
           tour
        }
    })
}

exports.updateTour = (req,res) =>{
    const id = req.params.id * 1 ; 
    res.status(200).json({
        status:'success', 
        data:{
           tour : '<Updated tour here...>'
        }
    })
}

exports.deleteTour = (req,res) =>{
    const id = req.params.id * 1 ; 
    res.status(204).json({
        status:'success', 
        data:null  
    })
}

exports.addTour = (req,res) =>{
     console.log(req.body);
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id:newId} , req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json` , JSON.stringify(tours) , err => {

        if(err){
            return res.status(500).json({
                status:'fail',
                message:'Internal server error'
            })
        }
         res.status(201).json({
            status:'success',
            data:{
                tour:newTour
            }
         })
    }) 
}
