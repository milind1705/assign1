const Contact = require('../models/contact');
const user = require('../models/user');

module.exports.add_Contact = (req, res) => {
// const {name, email, phone, cty, message, resume} =  req.body;
const newContact = new Contact(req.body);
newContact
    .save()
    .then((data) => {
        return req.status(200).json(data)
    })
    .catch((err) => {
        return req.status(400).json({
            message: err.message || "something went wrong"
        })
    })
}

module.exports.get_Contact = (req, res) => {
    user.find({}).then((data) => {
        return res.status(200).json(data)
    })
    .catch((err) => {
        return req.status(400).json({
            message: err.message || "something went wrong"
        })
    })
}

module.exports.get_contact_byId = (req, res) => {
    user.findById({_id: req.params.id}).then((data) => {
        return res.status(200).json(data)
    })
    .catch((err) => {
        return req.status(400).json({
            message: err.message || "something went wrong"
        })
    })
}

module.exports.update_contact = (req, res) => {
    user.findByIdAndUpdate({_id: req.params.id}, req.body).then(() => {
       user.findById({_id: req.params.id}).then((data) => {
           return res.status(200).json(data)
       })
    })
    .catch((err) => {
        return req.status(400).json({
            message: err.message || "something went wrong"
        })
    })
}