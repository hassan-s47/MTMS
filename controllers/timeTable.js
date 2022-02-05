const checkIfSlotIsValid = function (slots, slot) {
  if (slots.length == 0) {
    console.log(slots.length);
    return true;
  }
  const timeTable = new Map();
  for (let day = 0; day < 7; day++) {
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 60; j += 5) {
        timeTable.set(day * 1440 + i * 60 + j, false);
      }
    }
  }

  slots.forEach((s) => {
    day = getDay(s.day);
    start = parseInt(s.startTime.split(':')[0]) * 60 + parseInt(s.startTime.split(':')[1]) + day * 1440;
    end = parseInt(s.endTime.split(':')[0]) * 60 + parseInt(s.endTime.split(':')[1]) + day * 1440;
    for (let t = start; t < end; t += 5) {
      timeTable.set(t, true);
      // console.log(timeTable.get(t))
    }
    // console.log(start,end);
  });

  // console.log(timeTable);

  // console.log("Slot Duration:",end-start);
  if (end - start > 60) {
    return false;
  }

  day = getDay(slot.day);
  start = parseInt(slot.startTime.split(':')[0]) * 60 + parseInt(slot.startTime.split(':')[1]) + parseInt(day * 1440);
  end = parseInt(slot.endTime.split(':')[0]) * 60 + parseInt(slot.endTime.split(':')[1]) + parseInt(day * 1440);

  // Now check if any clashExists in TimeTable.
  console.log(start, end);
  for (let t = start; t < end; t += 5) {
    if (timeTable.get(t) == true) {
      console.log(t, timeTable.get(t));
      return false;
    }
  }

  return true;
};
const getDay = function (day) {
  switch (day) {
    case 'Monday': return 0;
    case 'Tuesday': return 1;
    case 'Wednesday': return 2;
    case 'Thursday': return 3;
    case 'Friday': return 4;
    case 'Saturday': return 5;
    case 'Sunday': return 6;
  }
};

// slots =
// [
//     {
//         startTime : "00:00",
//         endTime: "00:30",
//         day: "Monday"
//     },
//     {
//         startTime : "00:30",
//         endTime: "01:00",
//         day: "Tuesday"
//     }
// ]
// slot =
// {
//     startTime : "00:30",
//     endTime: "01:10",
//     day: "Monday"
// }

module.exports = {
  checkIfSlotIsValid,
};

// console.log(getDay('Sunday'))
