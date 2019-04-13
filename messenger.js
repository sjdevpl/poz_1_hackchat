
var msg_history = $("#msg_history");
function getMonth() {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const d = new Date();
    return (monthNames[d.getMonth()]);
}




(function ($) {
    
    $("button.msg_send_btn").click(function sendMessage() {
        var message_out = $("#messageOut").val();

        var dat = new Date();
        var hour = dat.getHours();
        var minut = dat.getMinutes();
        var day = dat.getDate();

        var name_saler = "Saler";

        msg_history.append("<div class='message outgoing_msg'><div class='sent_msg'><h6>" + name_saler + "</h6><p>" + message_out + "</p><span class='time_date'> DATA -  " + hour + ":" + minut + " | " + getMonth() + " " + day + "</span></div></div>");

    });
})(jQuery);

// for(var i=0; i<10; i++){
    messaginCome();
// }


function messaginCome() {
    var dat = new Date();
    var hour = dat.getHours();
    var minut = dat.getMinutes();
    var day = dat.getDate();

    var name_buyer = "Client";
    var message = "A za ile to ?";
    var amount = document.getElementsByClassName("message");
    
    msg_history.append("<div class='message incoming_msg'><div class='received_msg'><div class='received_withd_msg'><h6>" + name_buyer + "</h6><p>" + message  + "</p><span class='time_date'> DATA -  " + hour + ":" + minut + " | " + getMonth() + " " + day + "</span></div></div></div>");
    
}



