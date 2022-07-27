const router = require('express').Router();
const student = require('../controller/students')
const customerController = require('../controller/customer-controller')

router.get('/', (req, res) =>{
    res.send("welcome to shop")
})
router.post('/create-customer', customerController.createCustomer)
router.get('/customer-list', customerController.customerList)
router.post('/customer-deatils', customerController.customerById)
router.post('/delete-customer', customerController.deleteCustomer)
router.post('/update-customer', customerController.updateCustomer)

router.get('/user/:userId/', (req, res) => {
    // req.params; // { userId: '42' }
    console.log(req.query['userId']);
    console.log('inside routes only')
    res.json("req.params");
  });

module.exports = router;