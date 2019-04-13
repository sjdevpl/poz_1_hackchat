
var base_url = "http://192.168.43.206:5001"
function initServer(){
    var http = new XMLHttpRequest();
    var url = base_url+'/api/chat/v1.0/login';
    var params = 'login=sklep-mombasa1&password=admin';
    http.open('POST', url, true);
    http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    http.withCredentials = true;
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
    msg_history.append("<div class='message incoming_msg'><div class='received_msg'><div class='received_withd_msg'><div><img src='picture/businessman.png'><span>" + name_buyer + "</span></div><p>" + message + "</p><span class='time_date'> DATA -  " + hour + ":" + minut + " | " + getMonth() + " " + day + "</span></div></div></div>");

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

    var name_saler = "Seller";

    msg_history.append("<div class='message outgoing_msg'><div class='sent_msg'><div><img src='picture/manager.png'><span>" + name_saler + "</span></div><p>" + message_out + "</p><span class='time_date'> DATA -  " + hour + ":" + minut + " | " + getMonth() + " " + day + "</span></div></div>");

});





var msg_history = $("#msg_history");

function handleXhrData(data){
    let msgs = JSON.parse(data.target.response);
    console.log(msgs);
};

function takeDataFromServer(last_message) {
    if(!last_message) last_message = (+new Date())-24*60*60*1000
    var http = new XMLHttpRequest();
    var url = base_url+'/api/chat/v1.0/message/' + last_message;
    http.onload = handleXhrData;
    http.open('GET', url, true);
    http.withCredentials = true;
    http.send();
}
initServer();
takeDataFromServer();

function sendMessage(buyer_id, message_text, last_message) {
    if(!last_message) last_message = (+new Date())-24*60*60*1000
    var http = new XMLHttpRequest();
    var url = base_url+'/api/chat/v1.0/message/' + last_message;
    http.onload = handleXhrData;
    http.open('POST', url, true);
    http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    http.withCredentials = true;
    http.send("buyer_id=" + buyer_id + "&message=" +encodeURIComponent(message_text));
}

messaginCome();