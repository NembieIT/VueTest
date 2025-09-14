const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name:String,
    phone:String,
    address:String
})

const ContactModal = mongoose.model("Contact", ContactSchema);
module.exports = ContactModal;