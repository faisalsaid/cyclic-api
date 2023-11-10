const mongoose = require('mongoose');

const purchaseSchema = mongoose.Schema(
  {
    orderRef: {
      type: String,
      required: [true, 'Please add ref code'],
      unique: [true, 'Ref Code is alreadt exist'],
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
        item: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Menu',
        },
        quantity: {
          type: Number,
          required: [true, 'Please add a final price'],
          min: [0, 'Minimum quantity 1'],
        },
        orderPrice: {
          type: Number,
          required: [true, 'Please add a price'],
          min: [0.009, 'Minimum price is $0.01'],
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Purchase', purchaseSchema);
