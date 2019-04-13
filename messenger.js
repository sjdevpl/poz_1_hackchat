
var base_url = ""; //"http://192.168.43.206:5001"

//var hashMap = [];
var lastTimeStamp = 0;
var id_messengera_active = "0"
function initServer() {
    var http = new XMLHttpRequest();
    var url = base_url + '/api/chat/v1.0/login';
    var params = 'login=sklep-mombasa1&password=admin';
    http.open('POST', url, true);
    http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    http.withCredentials = true;
    http.onload = onLogin;
    http.send(params);
}
function messaginCome(buyer_id, element) {
    //id=" + id + "><div  class='msg_history' 
    //var msg_history = $("#"+id_messengera_active+".msg_history");
    
    var msg_history = $("#"+buyer_id+" .msg_history");
    var dat = new Date(element.timestamp);
    var hour = dat.getHours();
    var minut = dat.getMinutes();
    var day = dat.getDate();
    let message = element.message_text;
    var name_buyer = "Klient";
    var name_saler = "Sprzedawca";
        
    
    
    //var para = document.createElement("<div class='message incoming_msg'><div class='received_msg'><div class='received_withd_msg'><div><img src='picture/businessman.png'><span>" + name_buyer + "</span></div><p>" + message + "</p><span class='time_date'> DATA -  " + hour + ":" + minut + " | " + getMonth() + " " + day + "</span></div></div></div>")
    //document.getElementById("id_messengera_active").getElementsByClassName("msg_history")[0].appendChild(para);

	if(!element.direction)
    // msg_history.append("<div class='message incoming_msg'><div class='received_msg'><div class='received_withd_msg'><h6>" + name_buyer + "</h6><p>" + message + "</p><span class='time_date'> DATA -  " + hour + ":" + minut + " | " + getMonth() + " " + day + "</span></div></div></div>");
		msg_history.append("<div class='message incoming_msg'><div class='received_msg'><div class='received_withd_msg'><div><img src='picture/man.png'><span>" + name_buyer + "</span></div><p>" + message + "</p><span class='time_date'> DATA -  " + hour + ":" + minut + " | " + getMonth() + " " + day + "</span></div></div></div>");
	else
		 msg_history.append("<div class='message outgoing_msg'><div class='sent_msg'><div><img src='picture/girl.png'><span>" + name_saler + "</span></div><p>" + message + "</p><span class='time_date'> DATA -  " + hour + ":" + minut + " | " + getMonth() + " " + day + "</span></div></div>");
}
function getMonth() {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const d = new Date();
    return (monthNames[d.getMonth()]);
}  

var last_conversation = $("#last-conversation");
var tabs_client = $("#tabs-client")
var messenger_client = $("#messenger-client");
var countPeople = 0;

function generateCloseClient(name_client) {
    last_conversation.append("<li class='nav-item'><a class='nav-link' href='#'><img src='picture/client.png' width=24' height='24'viewBox='0 0 24 24' fill='none' stroke='currentColor'stroke-width='2' stroke-linecap='round'stroke-linejoin='round' class='feather feather-users'><pathd='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'></path><circlecx='9' cy='7' r='4'></circle><path d='M23 21v-2a4 4 0 00-3-3.87'></path><path d='M16 3.13a4 4 0 0 1 0 7.75'></path></svg>" + name_client + "</a></li>");
}

generateCloseClient("Marek");
generateCloseClient("Gosia");
generateCloseClient("Grazyna");
generateCloseClient("Bartek");

function activeBuyers(buyer_id) {
    if($("#"+buyer_id+"-tab").length > 0) return;
    if (countPeople  == 0) {
        tabs_client.append("<li class='nav-item' ><a href='#" + buyer_id + "' data-target='"+buyer_id+"' id='"
        + buyer_id + "-tab' class='nav-link active' role='tab' data-toggle='tab' aria-controls='"+buyer_id
        +"' aria-selected='true'><img src='picture/man.png' ></a></li>");
        
       messenger_client.append("<div class='tab-pane fade show active' id='"
        + buyer_id + "' role='tabpanel' aria-labelledby='"+buyer_id+"-tab'><div  class='msg_history' ></div><div class='type_msg'><div class='input_msg_write'><input type='text' class='write_msg' id='messageOut' placeholder='Type a message' /><button class='msg_send_btn' type='button'><i class='fa fa-paper-plane-o' aria-hidden='true'></i></button></div></div></div>");
        id_messengera_active = buyer_id;
         
    } else {
        tabs_client.append("<li class='nav-item' ><a href='#" + buyer_id + "' data-target='"+buyer_id+"'  id='"
        + buyer_id + "-tab' class='nav-link ' role='tab' data-toggle='tab' aria-controls='"+buyer_id
        +"' aria-selected='false'><img src='picture/man.png'></a></li>");
        messenger_client.append("<div class='tab-pane fade' id='"
        + buyer_id + "' role='tabpanel' aria-labelledby='"+buyer_id+"-tab'><div  class='msg_history' ></div><div class='type_msg'><div class='input_msg_write'><input type='text' class='write_msg' id='messageOut' placeholder='Type a message' /><button class='msg_send_btn' type='button'><i class='fa fa-paper-plane-o' aria-hidden='true'></i></button></div></div></div>");
         
    }
    countPeople++;
}

function handleXhrData(data) {
    let msgs = JSON.parse(data.target.response);

    let messages = {};
    for(let index in msgs.sort((a, b) => (a.timestamp - b.timestamp))){
        let element = msgs[index];
        if(element.buyer_id in messages) messages[element.buyer_id].push(element);
        else messages[element.buyer_id] = [element];
        if(lastTimeStamp < element.timestamp) lastTimeStamp = element.timestamp;
    }
   
    //for ech buyer_id add new 
    for(let buyer in messages){
        if (messages.hasOwnProperty(buyer)) {
            activeBuyers(buyer);
        
            for(let index in messages[buyer]){
                messaginCome(buyer, messages[buyer][index]);
                
            }
        }
    }
    
    $('#tabs-client a').on('click', function (e) {
        e.preventDefault()
        let id= $(this).data("target"); 
        $("#messenger-client .tab-pane.active").removeClass("active show");
        $("#"+id).addClass("active show");
        $("#"+id+".show")[0].scrollIntoView();
    });
	
	
};

function takeDataFromServer(last_message) {
    if (!last_message) last_message = (+new Date()) - 24 * 60 * 60 * 1000
    var http = new XMLHttpRequest();
    var url = base_url + '/api/chat/v1.0/message/' + last_message;
    http.onload = handleXhrData;
    http.open('GET', url, true);
    http.withCredentials = true;
    http.send();
	
	return http;
}

function onLogin(){
    takeDataFromServer();
    setInterval(() => takeDataFromServer(lastTimeStamp), 2000);
	
	setTimeout(() => $(".msg_send_btn").on('click', function (e) {
        e.preventDefault();
		let buyer_id = this.closest( ".tab-pane" ).id;
		
		let message_text = $(this).prev().val(); $(this).prev().val("");
		if(message_text)
			sendMessage(buyer_id, message_text, lastTimeStamp) ;
	}), 1000);
}

initServer();


function sendMessage(buyer_id, message_text, last_message) {
    if (!last_message) last_message = (+new Date()) - 24 * 60 * 60 * 1000
    var http = new XMLHttpRequest();
    var url = base_url + '/api/chat/v1.0/message/' + last_message;
    http.onload = handleXhrData;
    http.open('PUT', url, true);
    http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    http.withCredentials = true;
    http.send("buyer_id=" + buyer_id + "&message=" + encodeURIComponent(message_text));
}
