
var last_conversation = $("#last-conversation");

function generateCloseClient(name_client){

    last_conversation.append("<li class='nav-item'><a class='nav-link' href='#'><img src='picture/client.png' width=24' height='24'viewBox='0 0 24 24' fill='none' stroke='currentColor'stroke-width='2' stroke-linecap='round'stroke-linejoin='round' class='feather feather-users'><pathd='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'></path><circlecx='9' cy='7' r='4'></circle><path d='M23 21v-2a4 4 0 00-3-3.87'></path><path d='M16 3.13a4 4 0 0 1 0 7.75'></path></svg>"+name_client+"</a></li>");
}

generateCloseClient("Marek");
generateCloseClient("Gosia");
generateCloseClient("Grazyna");
generateCloseClient("Bartek");

// $('#list-clients li').on('click', function ($) {
//     //e.preventDefault()
//     $('#tabs').tab();
    
//   });

  
    // jQuery(document).ready(function ($) {
    //     $('#tabs').tab();
    // });
    // $('button').addClass('btn-primary').text('Switch to Orange Tab');
    // $('button').click(function(){
    //   $('#tabs a[href=#orange]').tab('show');
    // });


