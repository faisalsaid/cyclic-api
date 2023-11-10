const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    customerName: {
      type: String,
      require: [true, 'Please add customer name'],
    },
    table: {
      type: String,
      require: [true, 'Please choose table'],
    },
    paymentMethod: {
      type: String,
      require: [true, 'Please choose payment method'],
    },
    amount: {
      type: Number,
      require: [true, 'Please add a amount'],
      min: [0.09, 'Minimum amount is $0.1'],
    },
    change: {
      type: Number,
      require: [true, 'Please add a change'],
      min: [0.09, 'Minimum change is $0.1'],
    },
    discountSales: {
      type: Number,
      require: [true, 'Please add a discount'],
      min: [0.09, 'Minimum discount is $0.1'],
    },
    finalPrice: {
      type: Number,
      require: [true, 'Please add a final price'],
      min: [0.09, 'Minimum final price is $0.1'],
    },
    saleTax: {
      type: Number,
      require: [true, 'Please add a sale tax'],
      min: [0.09, 'Minimum sale tax is $0.1'],
    },
    subtotal: {
      type: Number,
      require: [true, 'Please add a subtotal'],
      min: [0.09, 'Minimum subtotal is $0.1'],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Order', orderSchema);
