const asyncHandler = require('express-async-handler');
const Purchase = require('../models/purchase.model.js');

// get Purchase
// @desc    GET dashboard
// @route   GET /api/dashboard
// @access  Private
const getAllPurchase = asyncHandler(async (req, res) => {
  const allPurchase = await Purchase.find().populate('listOrder.item').sort({ _id: -1 });
  if (!allPurchase) {
    res.status(400);
    throw new Error.apply('Cant find any order');
  }

  //   Handle meal time
  const breackfast = allPurchase.filter((order) => {
    const orderTime = new Date(order.createdAt).getHours();
    return orderTime >= 5 && orderTime < 11;
  });
  const lunch = allPurchase.filter((order) => {
    const orderTime = new Date(order.createdAt).getHours();
    return orderTime >= 11 && orderTime < 17;
  });
  const dinner = allPurchase.filter((order) => {
    const orderTime = new Date(order.createdAt).getHours();
    return orderTime >= 17 && orderTime < 24;
  });
  const overTime = allPurchase.filter((order) => {
    const orderTime = new Date(order.createdAt).getHours();
    return orderTime >= 0 && orderTime < 5;
  });

  //   handle total transaction by day month year
  const today = new Date();
  const thisMonth = new Date(today.getFullYear(), today.getMonth());
  const thisYear = new Date(today.getFullYear(), 0);

  //    Filter orders for today, this month, and this year
  const ordersToday = allPurchase.filter((order) => new Date(order.createdAt).toDateString() === today.toDateString());
  const ordersThisMonth = allPurchase.filter((order) => new Date(order.createdAt) >= thisMonth);
  const ordersThisYear = allPurchase.filter((order) => new Date(order.createdAt) >= thisYear);

  //   refactor my code by chatGPT and me
  const calculateTotal = (orders, property) => {
    if (property === 'quantity') {
      return orders.map((order) => order.listOrder.map((list) => list.quantity).reduce((total, item) => total + item, 0)).reduce((total, item) => total + item, 0);
    }
    if (property === 'finalPrice') {
      return orders.map((order) => order.finalPrice).reduce((total, item) => total + item, 0);
    }
    return { message: 'not Match' };
  };

  //   my refactor calculate income
  const calculateIncome = (list) => {
    return list.length > 0 ? calculateTotal(list, 'finalPrice') : 0;
  };

  //   my refactor calculate item
  const calculateItem = (list) => {
    return list.length > 0 ? calculateTotal(list, 'quantity') : 0;
  };

  const calculateMealTime = (orders, label) => {
    const totalOrders = orders.length;
    const income = calculateIncome(orders);
    const totalItems = calculateItem(orders);

    return {
      label,
      income,
      totalOrders,
      totalItems,
    };
  };

  const calculateTotalTransaction = (orders, timeLabel, title) => {
    const totalOrders = orders.length;
    const income = calculateIncome(orders);
    const totalItems = calculateItem(orders);

    return {
      title,
      label: timeLabel,
      income,
      totalOrders,
      totalItems,
    };
  };

  // Handle popular menu
  const menuQantity = allPurchase.map((order) => order.listOrder.map((list) => ({ menu_id: list.item._id, menuTitle: list.item.title, quantity: list.quantity })));

  // get list uniq menu id
  const flatArray = menuQantity.flat();
  const uniqueMenuIds = [...new Set(flatArray.map((item) => item.menu_id))];

  // Create a dictionary to store the total quantity for each menu_id
  const menuQuantities = {};

  flatArray.forEach((item) => {
    const { menu_id, menuTitle, quantity } = item;

    if (menuQuantities[menu_id]) {
      menuQuantities[menu_id].totalQuantity += quantity;
    } else {
      menuQuantities[menu_id] = {
        menuTitle,
        totalQuantity: quantity,
      };
    }
  });

  // Create a new array with the aggregated results
  const aggregatedMenuItems = Object.keys(menuQuantities).map((menu_id) => ({
    menu_id,
    menuTitle: menuQuantities[menu_id].menuTitle,
    totalQuantity: menuQuantities[menu_id].totalQuantity,
  }));

  // Create dashboard data
  const dashboard = {
    dataTotal: [
      {
        title: 'Total Income',
        value: calculateTotal(allPurchase, 'finalPrice'),
      },
      {
        title: 'Total Items',
        value: calculateTotal(allPurchase, 'quantity'),
      },
    ],

    mealTime: [
      { ...calculateMealTime(breackfast, 'Breakfast') },
      { ...calculateMealTime(lunch, 'Lunch') },
      { ...calculateMealTime(dinner, 'Dinner') },
      { ...calculateMealTime(overTime, 'Over Time') },
    ],

    totalTransaction: [
      { ...calculateTotalTransaction(ordersToday, today.getDate(), 'Today') },
      { ...calculateTotalTransaction(ordersThisMonth, today.getMonth() + 1, 'This Month') },
      { ...calculateTotalTransaction(ordersThisYear, today.getFullYear(), 'This Year') },
    ],

    popularMenu: aggregatedMenuItems.sort((a, b) => b.totalQuantity - a.totalQuantity).slice(0, 5),
  };
  res.status(200).json({ breackfast, dinner, lunch, overTime });
});

module.exports = { getAllPurchase };

// My orginial code replace by chatGPT code
//   const dashboard = {
//     totalIncome: allPurchase.map((order) => order.listOrder.map((list) => list.orderPrice).reduce((total, item) => total + item)).reduce((total, item) => total + item),

//     totalItems: allPurchase.map((order) => order.listOrder.map((list) => list.quantity).reduce((total, item) => total + item)).reduce((total, item) => total + item),

//     mealTime: {
//       breackfast: {
//         label: 'Breackfast',
//         totalOrders: breackfast.length,
//         income:
//           dinner.length > 0
//             ? breackfast.map((order) => order.listOrder.map((list) => list.orderPrice).reduce((total, item) => total + item)).reduce((total, item) => total + item)
//             : null,
//         totalItems:
//           dinner.length > 0
//             ? breackfast.map((order) => order.listOrder.map((list) => list.quantity).reduce((total, item) => total + item)).reduce((total, item) => total + item)
//             : null,
//       },

//       lunch: {
//         label: 'Lunch',
//         totalOrders: lunch.length,
//         income:
//           dinner.length > 0
//             ? lunch.map((order) => order.listOrder.map((list) => list.orderPrice).reduce((total, item) => total + item)).reduce((total, item) => total + item)
//             : null,
//         totalItems:
//           dinner.length > 0 ? lunch.map((order) => order.listOrder.map((list) => list.quantity).reduce((total, item) => total + item)).reduce((total, item) => total + item) : null,
//       },

//       dinner: {
//         label: 'Dinner',
//         totalOrders: dinner.length,
//         income:
//           dinner.length > 0
//             ? dinner.map((order) => order.listOrder.map((list) => list.orderPrice).reduce((total, item) => total + item)).reduce((total, item) => total + item)
//             : null,
//         totalItems:
//           dinner.length > 0
//             ? dinner.map((order) => order.listOrder.map((list) => list.quantity).reduce((total, item) => total + item)).reduce((total, item) => total + item)
//             : null,
//       },

//       overTime: {
//         totalOrders: overTime.length,
//         income: overTime.length > 0 ? overTime.map((order) => order.finalPrice).reduce((total, item) => total + item) : null,
//         totalItems:
//           overTime.length > 0
//             ? overTime.map((order) => order.listOrder.map((list) => list.quantity).reduce((total, item) => total + item)).reduce((total, item) => total + item)
//             : null,
//       },
//     },

//     totalTransaction: {
//       ordersToday: {
//         label: today.getDate(),
//         totalOrders: ordersToday.length,
//         income:
//           ordersToday.length > 0
//             ? ordersToday.map((order) => order.listOrder.map((list) => list.orderPrice).reduce((total, item) => total + item)).reduce((total, item) => total + item)
//             : null,
//         totalItems:
//           ordersToday.length > 0
//             ? ordersToday.map((order) => order.listOrder.map((list) => list.quantity).reduce((total, item) => total + item)).reduce((total, item) => total + item)
//             : null,
//       },

//       ordersThisMonth: {
//         label: today.getMonth() + 1,
//         totalOrders: ordersThisMonth.length,
//         income:
//           ordersThisMonth.length > 0
//             ? ordersThisMonth.map((order) => order.listOrder.map((list) => list.orderPrice).reduce((total, item) => total + item)).reduce((total, item) => total + item)
//             : null,
//         totalItems:
//           ordersThisMonth.length > 0
//             ? ordersThisMonth.map((order) => order.listOrder.map((list) => list.quantity).reduce((total, item) => total + item)).reduce((total, item) => total + item)
//             : null,
//       },

//       ordersThisYear: {
//         label: today.getFullYear(),
//         totalOrders: ordersThisYear.length,
//         income:
//           ordersThisYear.length > 0
//             ? ordersThisYear.map((order) => order.listOrder.map((list) => list.orderPrice).reduce((total, item) => total + item)).reduce((total, item) => total + item)
//             : 0,
//         totalItems:
//           ordersThisYear.length > 0
//             ? ordersThisYear.map((order) => order.listOrder.map((list) => list.quantity).reduce((total, item) => total + item)).reduce((total, item) => total + item)
//             : 0,
//       },
//     },
//   };
