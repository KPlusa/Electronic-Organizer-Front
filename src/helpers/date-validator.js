let timeDifference = 30;
let timeChecker = /^([0-1][0-9]|2[0-3]):([0-5][0-9])+/;
export function StartTimeValidator(startTime, endTime) {
  if (!startTime) return 'Start Time is required.';
  let startTimeConverted = startTime.split(':');
  if (!timeChecker.test(startTime)) return 'Invalid Time Format.';
  if (startTimeConverted[0] >= 16 || startTimeConverted[0] < 8)
    return 'Working hours are 8-16.';
  if (typeof endTime !== 'undefined') {
    var endTimeConverted = endTime.split(':');
    var totalMinutesStartTime =
      parseInt(startTimeConverted[0]) * 60 + parseInt(startTimeConverted[1]);
    var totalMinutesEndTime =
      parseInt(endTimeConverted[0]) * 60 + parseInt(endTimeConverted[1]);

    if (totalMinutesEndTime <= totalMinutesStartTime)
      return 'Start Time should be less than End Time.';
    if (totalMinutesEndTime < totalMinutesStartTime + timeDifference)
      return 'Start Time should be less than Start Time for at least 30 minutes.';
  }
  return '';
}

export function EndTimeValidator(startTime, endTime) {
  let startTimeConverted = startTime.split(':');
  if (typeof endTime !== 'undefined' && endTime !== '') {
    if (!timeChecker.test(endTime)) return 'Invalid Time Format.';
    var endTimeConverted = endTime.split(':');
    if (endTimeConverted[0] >= 16 || endTimeConverted[0] < 8)
      return 'Working hours are 8-16.';
    var totalMinutesStartTime =
      parseInt(startTimeConverted[0]) * 60 + parseInt(startTimeConverted[1]);
    var totalMinutesEndTime =
      parseInt(endTimeConverted[0]) * 60 + parseInt(endTimeConverted[1]);

    if (totalMinutesEndTime <= totalMinutesStartTime)
      return 'End Time should be greater than Start Time.';
    if (totalMinutesEndTime < totalMinutesStartTime + timeDifference)
      return 'End Time should be greater than Start Time for at least 30 minutes.';
  }
  return '';
}
