$(document).ready(function () {
    getData();
});
var postData = function postData() {

    var resume = $("#fileselect").val();
    var github = $("#github").val();
    addData({
        resume: resume,
        github: github
    });
}

var addData = function addData(data) {
    var token = getUrlParameter("access_token");
    var strung = JSON.stringify({
        token: token,
        resume: data.resume,
        github: data.github
    })
    $.ajax({
        type: "POST",
        url: "https://hackisu-x.herokuapp.com/user",
        data: strung,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            window.location.assign("http://hackisu.org/success.html");
        }
    });
}

var getData = function getData() {
    var token = getUrlParameter('access_token');

    $.get("https://my.mlh.io/api/v2/user?access_token=" + token, function (data) {
        var info = data.data;
        console.log(info);
        $('#name').text(info.first_name + ' ' + info.last_name);
        $('#school').text(info.school.name);
        $('#major').text(info.major);
        $('#email').text(info.email);
        $('#shirt').text(info.shirt_size);
    });
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.href.split("#")[1]),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};