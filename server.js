const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({path: './config.env'});
const app = require('./index');

const connectionString = process.env.DATABASE.replace('<db_password>' , process.env.PASSWORD);
mongoose.connect(
  connectionString
)
.then(() => console.log('DB connected'))
.catch(err => console.error(err));


const tourSchema = new mongoose.Schema({
    name:{
        type:String , 
        required:[true , 'A tour must have a name '],
        unique:true
    },
    rating:{
        type:Number , 
        default:4.5
    },
    price:{
        type:Number,
        required:[true , 'A tour must have a price']
    }
})

const Tour = mongoose.model('Tour' , tourSchema);

const testTour = new Tour({
    name: 'belgium 2',
    rating:4.5,
    price: 1000
});

testTour.save()
.then(doc => {
    console.log(doc);
})
.catch(err => {
    console.log('Error :' , err);
})

// console.log(process.env.NODE_ENV);
const port = process.env.PORT||3000 ; 
app.listen(port , () => {
    console.log(`app started on port ${port}`);
})