const Booking = require('../models/booking');
const Rental = require('../models/rental');
const User = require('../models/user');
const { normalizeErrors }   = require("../helpers/mongoose");
const moment = require('moment');

exports.createBooking= function(req, res){
    const { startAt, endAt, totalPrice, guests, days, rental } = req.body;

    const user = res.locals.user;

    const booking = new Booking({startAt, endAt, totalPrice, guests, days});

    Rental.findById(rental._id)
    .populate('bookings')
    .populate('user')
    .exec(function(err, foundRental){

        if(err){
            return res.status(422).send({
                errors: normalizeErrors(err.errors)
            });
        }
        if(foundRental.user.id === user.id){
            return res.status(422).send({
                errors: [{ title: "Invalid user!", detail: "Can't create booking of your own rental"}]
            });
        }

        // check here for valid booking 
        if(isValidBooking(booking,foundRental)){
            booking.user = user;
            booking.rental = foundRental;
            foundRental.bookings.push(booking);

            booking.save(function(err){
                if(err){
                    return res.status(422).send({
                        errors: normalizeErrors(err.errors)
                    });
                }else {
                    foundRental.save();
                    User.update({_id:user.id}, {$push:{bookings:booking}}, function(){})
                    return res.json({startAt:booking.startAt, endAt: booking.endAt});
                }
            });
        }else{
            return res.status(422).send({
                errors: [{ title: "Invalid Booking!", detail: "Choosen dates are not available"}]
            });
        }

        //return res.json({booking, foundRental})
    })
}
function isValidBooking(proposedBooking, rental) {
    let isValid = true;
   
    if (rental.bookings && rental.bookings.length > 0) {
   
      isValid = rental.bookings.every(function(booking) {
        const proposedStart = moment(proposedBooking.startAt);
        const proposedEnd = moment(proposedBooking.endAt);
   
        const actualStart = moment(booking.startAt);
        const actualEnd = moment(booking.endAt);
   
        return ((actualStart < proposedStart && actualEnd < proposedStart) || (proposedEnd < actualEnd && proposedEnd < actualStart));
      });
    }
   
    return isValid;
  }