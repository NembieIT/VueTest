const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        await mongoose.connect('mongodb+srv://mtdung240205_db_user:qp4vfDi9wd730ru8@cluster0.eplyyu9.mongodb.net/VueContact?retryWrites=true&w=majority&appName=Cluster0');
        console.log("Connected to MongoDB");
    }catch(err){
        console.error("Loi khi ket noi DB", err);
    }
}

module.exports = connectDB;