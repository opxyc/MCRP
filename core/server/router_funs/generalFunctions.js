//function to find current time in IST
var curtime = function(){
    var currentTime = new Date();
    var currentOffset = currentTime.getTimezoneOffset();
    var ISTOffset = 330;   // IST offset UTC +5:30 
    var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
    // ISTTime now represents the time in IST coordinates
    var hoursIST = ISTTime.getHours()
    var minutesIST = ISTTime.getMinutes()
    return {hour : hoursIST, minute : minutesIST}
}

//Function to find todays date
var curday = function(sp){
    today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //As January is 0.
    var yyyy = today.getFullYear();
    
    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;
    return (dd+sp+mm+sp+yyyy);
};

exports.curday = curday
exports.curtime = curtime