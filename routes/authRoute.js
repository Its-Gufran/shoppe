import express from 'express'
import {registerController,loginController,testController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController} from '../controllers/authController.js'
import {isAdmin, requireSignIn} from '../middlewares/authMiddleware.js'
//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post('/register', registerController)

//LOGIN || POST
router.post('/login', loginController)

//forget Password || POST
router.post('/forgot-password', forgotPasswordController)

//test
router.get('/test',requireSignIn, isAdmin, testController)

//protected User route
router.get("/user-auth", requireSignIn, (req,res) => {
    res.status(200).send({ok:true});
});

//protected Admin route
router.get("/admin-auth", requireSignIn, isAdmin, (req,res) => {
    
    res.status(200).send({ok:true});
});

//update profile
router.put("/profile", requireSignIn, updateProfileController)

//order
router.get("/orders", requireSignIn,getOrdersController)

//All order
router.get("/all-orders", requireSignIn,isAdmin,getAllOrdersController)

//order status
router.put("/order-status", requireSignIn,isAdmin,orderStatusController)


export default router;