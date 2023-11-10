const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    refCode: {
      type: String,
      required: [true, 'Please add ref code'],
    },
    customerName: {
      type: String,
      required: [true, 'Please add customer name'],
    },
    table: {
      type: String,
      required: [true, 'Please choose table'],
    },
    paymentMethod: {
      type: String,
      required: [true, 'Please choose payment method'],
    },
    amount: {
      type: Number,
      required: [true, 'Please add a amount'],
      min: [0.009, 'Minimum amount is $0.01'],
    },
    change: {
      type: Number,
      required: [true, 'Please add a change'],
      min: [0.009, 'Minimum change is $0.01'],
    },
    discountSales: {
      type: Number,
      required: [true, 'Please add a discount'],
    },
    finalPrice: {
      type: Number,
      required: [true, 'Please add a final price'],
      min: [0.009, 'Minimum final price is $0.01'],
    },
    saleTax: {
      type: Number,
      required: [true, 'Please add a sale tax'],
      min: [0.009, 'Minimum sale tax is $0.01'],
    },
    subtotal: {
      type: Number,
      required: [true, 'Please add a subtotal'],
      min: [0.009, 'Minimum subtotal is $0.01'],
    },
    listOrder: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Menu',
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Order', orderSchema);
