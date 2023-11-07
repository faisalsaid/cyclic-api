const mongoose = require('mongoose');

const menuSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, 'Please add a title'],
    },
    description: {
      type: String,
      require: [true, 'Please add an email'],
    },
    category: {
      type: String,
      require: [true, 'Please add a category'],
    },
    image: {
      url: {
        type: String,
        require: [true, 'Please add a image url'],
      },
      name: {
        type: String,
        require: [true, 'Please add a image name'],
      },
    },
    price: {
      type: Number,
      require: [true, 'Please add a price'],
      min: [0.09, 'Minimum price is $0.1'],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Menu', menuSchema);
