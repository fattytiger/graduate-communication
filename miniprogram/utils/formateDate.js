
function transferDate(date_time) {
  //get the detail year moth day 
  let year = date_time.getFullYear(),
    month = ("0" + (date_time.getMonth() + 1)).slice(-2),
    date = ("0" + date_time.getDate()).slice(-2)
  //link the date
  let result = `${year}-${month}-${date}`
  return result
}

function detailTime(date_time){
  //get the detail year moth day 
  let year = date_time.getFullYear(),
    month = ("0" + (date_time.getMonth() + 1)).slice(-2),
    date = ("0" + date_time.getDate()).slice(-2),
    hour = ("0" + date_time.getHours()).slice(-2),
    minute = ("0" + date_time.getMinutes()).slice(-2),
    seconds = ("0" + date_time.getSeconds()).slice(-2)
  //link the date
  let result = `${year}-${month}-${date}-${hour}-${minute}-${seconds}`
  return result
}
exports.transferDate = transferDate
exports.detailTime = detailTime