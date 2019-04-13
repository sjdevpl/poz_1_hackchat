
function initServer(){
    var http = new XMLHttpRequest();
    var url = '/api/chat/v1.0/login';
    var params = 'login=admin&password=admin';
    http.open('POST', url, true);
    http.send(params);
    
}
function messaginCome() {
    var dat = new Date();
    var hour = dat.getHours();
    var minut = dat.getMinutes();
    var day = dat.getDate();

    var name_buyer = "Client";
    var message = "A za ile to ?";
    var amount = document.getElementsByClassName("message");

    // msg_history.append("<div class='message incoming_msg'><div class='received_msg'><div class='received_withd_msg'><h6>" + name_buyer + "</h6><p>" + message + "</p><span class='time_date'> DATA -  " + hour + ":" + minut + " | " + getMonth() + " " + day + "</span></div></div></div>");
    msg_history.append("<div class='message incoming_msg'><div class='received_msg'><div class='received_withd_msg'><div><img src='businessman.png'><span>" + name_buyer + "</span></div><p>" + message + "</p><span class='time_date'> DATA -  " + hour + ":" + minut + " | " + getMonth() + " " + day + "</span></div></div></div>");

}
function getMonth() {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const d = new Date();
    return (monthNames[d.getMonth()]);
}

$("button.msg_send_btn").click(function sendMessage() {
    var message_out = $("#messageOut").val();

    var dat = new Date();
    var hour = dat.getHours();
    var minut = dat.getMinutes();
    var day = dat.getDate();

    var name_saler = "Saler";

    msg_history.append("<div class='message outgoing_msg'><div class='sent_msg'><div><img src='manager.png'><span>" + name_saler + "</span></div><p>" + message_out + "</p><span class='time_date'> DATA -  " + hour + ":" + minut + " | " + getMonth() + " " + day + "</span></div></div>");

});





var msg_history = $("#msg_history");

function takeDataFromServer() {
    var http = new XMLHttpRequest();
    var url = '/api/chat/v1.0/login';
    http.onload(function(){

    });
    http.open('GET', url, true);
    http.send();

    

}


messaginCome();







