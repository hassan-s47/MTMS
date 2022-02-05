const concert = require('../models/concert');
const env = require('../config/env');

const calender = async (req, res, next) => {
  result = await concert.find();

  eventList = [];

  result.forEach((element) => {
    eventList.push(
      {
        title: element.title,
        date: element.dates,
        startTime: element.startTime,
        endTime: element.endTime,
      },
    );
  });

  res.render('calender', { eventList });
};

module.exports = {
  calender,
};
