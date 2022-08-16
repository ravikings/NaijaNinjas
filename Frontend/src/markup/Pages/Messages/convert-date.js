export const ConvertDateTime = (dateTime) => {
    var d = new Date(dateTime);
    var date = ("0" + d.getDate()).slice(-2) +
        "/" +
        ("0" + (d.getMonth() + 1)).slice(-2) +
        "/" +
        d.getFullYear()
    let hr = d.getHours();
    let mn = d.getMinutes();
    let ss = d.getSeconds();
    let ap = hr >= 12 ? 'PM' : 'AM'
    //12 hour format
    hr = hr > 12 ? hr - 12 : hr;
    //add 0 for single value
    hr = hr < 10 ? '0' + hr : hr;
    mn = mn < 10 ? '0' + mn : mn;
    ss = ss < 10 ? '0' + ss : ss;
    var time = hr + ':' + mn + ':' + ss + ' ' + ap
    return date + ' ' + time;
}