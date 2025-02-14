require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect("", { useNewUrlParser: true, useUnifiedTopology: true })

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model('Person', schema);

const createAndSavePerson = (done) => {

  const person = new Person({
    name: "Rogério",
    age: 17,
    favoriteFoods: ['pizza', 'feijoada']
  })

  person.save(function(error, data) {
    if (error) return done(error);
    done(null, data);
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(error, data) {
    if (error) return done(error);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function(error, data) {
    if (error) return done(error);
    done(null, data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function(error, data) {
    if (error) return done(error);
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(error, data) {
    if (error) return done(error);
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(error, data) {
    data.favoriteFoods.push(foodToAdd);

    data.save(function(error, data) {
      if (error) return done(error);
      done(null, data);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person
    .findOneAndUpdate(
      { name: personName },
      { $set: { age: ageToSet } },
      { new: true },
      function(error, data) {
        if (error) return done(error)
        done(null, data)
      }
    );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function(error, data) {
    if (error) return done(error);
    done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, function(error, data) {
    if (error) return done(error);
    done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person
    .find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select('-age')
    .exec(function (error, data){
      done(error, data)
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
