const Rental = require('./models/rental');

class FakeDb {
    constructor() {
        this.rentals = [
            {
              title:"Central Appartment",
              city: "New York",
              street: "Times Square",
              category: "appartment",
              image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
              bedrooms: 3,
              shared: true,
              description: 'Very nice appartment',
              dailyRate: 34
            },
            {
              title:"Pearl village",
              city: "Hyderabad",
              street: "Botanical garden",
              category: "appartment",
              image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
              bedrooms: 3,
              shared: false,
              description: 'Very nice appartment',
              dailyRate: 34
            },
            {
              title:"Maphar complex",
              city: "Hyderabad",
              street: "pearl village road",
              category: "appartment",
              image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
              bedrooms: 3,
              shared: true,
              description: 'Very nice appartment',
              dailyRate: 24
            },
            {
              title:"Green View Appartment",
              city: "New York",
              street: "Times Square",
              category: "house",
              image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
              bedrooms: 3,
              shared: false,
              description: 'Very nice appartment',
              dailyRate: 14
            }
          ];
    }

    async cleanDB() {
      await Rental.deleteMany();
    }
    pushRentalsToDb(){
        this.rentals.forEach((rental) => {
            const newRental = new Rental(rental);
            newRental.save()
        })
    }

    seedDb(){
      this.cleanDB();
      this.pushRentalsToDb();
    }
}

module.exports = FakeDb;