const mongoose = require('mongoose');

const menuSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    description: {
      type: String,
      required: [true, 'Please add an email'],
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
    },
    image: {
      url: {
        type: String,
        required: [true, 'Please add a image url'],
      },
      name: {
        type: String,
        required: [true, 'Please add a image name'],
      },
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      min: [0.09, 'Minimum price is $0.1'],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Menu', menuSchema);
