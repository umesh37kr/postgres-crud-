const Customer = require('../models/customer')
const Joi = require('joi');
const CustomErrorHandler = require('../services/CustomErrorHandler');
// saving the customer data
const createCustomer = async(req, res, next) => {
    Customer.sync()
    //validation
    const customerSchema = Joi.object({
        first_name: Joi.string().min(3).max(30).required(),
        last_name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        mobile: Joi.number().min(10).required(),
        gender: Joi.string().required(),
        age: Joi.number().required(),
        address: Joi.string().required(),
        city: Joi.string().required(),
        postal_code: Joi.number().required(),
    })
    const { error } = customerSchema.validate(req.body);
    if(error){
        return next(error)
    }

    try {
        const {
            first_name, last_name, email, mobile, gender, age, address, city, postal_code
        } = req.body
        // check if customer is already exist
        const exist = await Customer.count({ where: { email: email } })
        if(exist > 0){
            return next(CustomErrorHandler.alreadyExist("customer already exist"))
        }
        // storing the data
        const saved_data = await Customer.create({
            first_name,
            last_name,
            email,
            mobile,
            gender,
            age,
            address,
            city,
            postal_code
        })
        return res.status(200).json({message : "customer saved.."})
    } catch (error) {
        return next(error)
    }
};

// fetching all customer list
const customerList = async(req, res, next) => {
    try {
        let customer_list = await Customer.findAll();
        res.send(customer_list)
    } catch (error) {
        return next(error) 
    }
}

// get single customer details
const customerById = async(req, res, next) => {
    try {
        let id = req.body.id;
        if(isNaN(id)){
            return next(CustomErrorHandler.badRequest("please enter correct id"))
        }
        let customer_Deatils = await Customer.findAll({
            where: {
                id: id
            }
        })
        if(customer_Deatils.length == 0){
            return next(CustomErrorHandler.notFound("no customer found with this id"))
        }
        res.send(customer_Deatils)
    } catch (error) {
        return next(error)
    }
}

// update student
const updateCustomer = async(req, res, next) => {
    try {
        const { id, first_name } = req.body
        
        let updateData = await Customer.update({first_name: first_name},{
            where: {
                id: id
            }
        })
        // check if data not found
        if(updateData.length == 0){
            return res.send("unable to update")
         }
         res.send("sucessfully updated")
    } catch (error) {
        return next(error)
    }
}

// delete customer
const deleteCustomer = async(req, res, next) => {
    try {
        let id = req.body.id;
        if(isNaN(id)){
            return next(CustomErrorHandler.badRequest("please enter correct id"))
        }
        let deleted = await Customer.destroy({
            where: {
                id: id
            }
        })

        //check the data is deleted or not
        if(deleted == 0){
            return next(CustomErrorHandler.notFound("no customer found"))
        }
        return next(CustomErrorHandler.sucess("customer deleted sucessfully.."))
    } catch (error) {
        return next(error)
    }
}
module.exports = {
    createCustomer,
    customerList,
    customerById,
    deleteCustomer,
    updateCustomer
};
