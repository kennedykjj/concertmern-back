const User = require("./models/user");
const Event = require("./models/event");

const seedDatabase = async () => {
  try {
    await User.deleteMany({});
    await Event.deleteMany({});

    const user1 = new User({ username: "user1", password: "password1" });
    const user2 = new User({ username: "user2", password: "password2" });

    await user1.save();
    await user2.save();

    const addDays = (date, days) => {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    };

    const event1 = new Event({
      name: "Evento 1",
      date: addDays(new Date(), 30),
      location: "Local 1",
      description: "Descrição do Evento 1",
    });

    const event2 = new Event({
      name: "Evento 2",
      date: addDays(new Date(), 30),
      location: "Local 2",
      description: "Descrição do Evento 2",
    });

    await event1.save();
    await event2.save();

    console.log("Database seeded!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

module.exports = seedDatabase;
