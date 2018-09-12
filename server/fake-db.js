const Rental = require('./models/rental');
const User = require('./models/user');

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
              category: "house",
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
              category: "condo",
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

          this.users = [{
            username:"Test user",
            email:"test@gmail.com",
            password:"testpass"
          },
          {
            username:"jay",
            email:"jay@gmail.com",
            password:"testpass"
          }]
    }

    async cleanDB() {
      await User.deleteMany();
      await Rental.deleteMany();
    }
    pushDataToDb(){
      const user = new User(this.users[0]);
      const user2 = new User(this.users[1]);

        this.rentals.forEach((rental) => {
            const newRental = new Rental(rental);
            newRental.user = user;
            user.rentals.push(newRental);
            newRental.save()
        });
        user.save();
        user2.save();
    }

    async seedDb(){
      await this.cleanDB();
      this.pushDataToDb();
    }
}

module.exports = FakeDb;