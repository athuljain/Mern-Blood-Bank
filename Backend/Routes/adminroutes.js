const express = require('express');
const router = express.Router();
const adminController =require('../Controller/admincontroller');

router.get('/users', adminController.getAllUsers);
router.get('/requests',adminController.getAllBloodRequests)
router.get('/blood-count', adminController.getTotalBloodCount);
router.put('/request/:requestId/accept', adminController.acceptBloodRequest);
router.delete('/request/:requestId', adminController.deleteBloodRequest);
router.post('/adminlogin',adminController.Adminlogin);

module.exports = router;