const ContactModal = require('../modal/contactModal');

const ContactController = {
    addContact: async (req, res) => {
        try {
            const valid = await ContactModal.findOne({
                $or: [
                    { name: req.body.name },
                    { phone: req.body.phone }
                ]
            })
            if (!valid) {
                const contact = new ContactModal({
                    ...req.body
                })
                await contact.save();
                return res.status(200).json({
                    EC: 0,
                    message: "Success"
                })
            }else{
                return res.json({
                    EC:1,
                    message:"Da ton tai Contact"
                })
            }
        }catch(err){
            return res.status(500).json({
                EC:1,
                message:"Failed in backed"
            })
        }
    },
    getAllContact : async (req,res)=>{
        try{
            const contacts = await ContactModal.find({});
            return res.status(200).json({
                EC:0,
                message:"Success",
                contacts
            });
        }catch(err){
            return res.json({
                EC:1,
                message:"Failed in backed",
                error:err.message
            })
        }
    },
    deleteContact : async (req,res)=>{
        try{
            await ContactModal.findByIdAndDelete(req.params.id);
            return res.status(200).json({
                EC:0,
                message:"Success"
            })
        }catch(err){
            return res.json({
                EC:1,
                message:"Failed in backed",
                error:err.message
            })
        }
    }
}

module.exports = ContactController;