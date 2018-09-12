const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');

const UserCtrl = require('../controllers/user');

router.get('/secret', UserCtrl.authMiddleware,function(req,res) {
    res.json({"secret": true});
});

router.get('', (req,res) => {

    Rental.find({})
    .select("-bookings")
    .exec(function(err, foundRentals){
        if(err){
            res.status(422).send(
                {errors: [{
                    title: 'Rental Error!',
                    detail: 'Could not find Rental!'
                }]});
                return;
        }else{
            res.json(foundRentals);
        }
    })

    // Rental.find({}, (err, foundRentals) => {
    //     return res.json(foundRentals);
    // });
});

router.get("/:id",(req,res)=> {
    const rentalId = req.params.id;
    Rental.findById(rentalId)
    .populate('user', 'username -_id')
    .populate('bookings', 'startAt endAt -_id')
    .exec(function(err,foundRental){
        if(err){
            return res.status(422).send(
                {errors: [{
                    title: 'Rental Error!',
                    detail: 'Could not find Rental!'
                }]});
        }
        return res.json(foundRental);
    })

    // Rental.findById(rentalId, (err, foundRental) => {
    //     if(err){
    //         res.status(422).send(
    //             {errors: [{
    //                 title: 'Rental Error!',
    //                 detail: 'Could not find Rental!'
    //             }]});
    //             return;
    //     }
    //     res.json(foundRental);
    // });
});

module.exports = router;