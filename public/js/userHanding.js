function features(){
    $('.user_view').click(function(){
        $('.info_user').show();
    })
    $('.btn_seen').click(function(){
        $('.info_user').hide();
    })
}

fetch('/display_user',{
    method:"POST"
})
.then(res=>res.json())
.then(data=>{
    show_data(data);
    features();
})
.catch(err=>{
    console.error(err);
})

function show_data(data){
    let arr = new Array();
    let stt = 0;
    for (let i = 0; i < data.length; i++) {
        stt++;
        arr  +=
            '<tr class="row_item">' +
            '<td>' + stt + '</td>' +
            '<td>' + data[i].IDUSER + '</td>' +
            '<td>' + data[i].LASTNAME + '</td>' +
            '<td>' + data[i].FIRSTNAME + '</td>' +
            '<td>' + data[i].USERNAME + '</td>' +
            '<td>' + data[i].PASS + '</td>' +
            '<td class="feature_user" style="text-align: left;">'+
                '<span class="user_view" stt="'+ data[i].IDUSER +'"><i class="fa fa-minus"></i></span>'+
            '</td>'+
            '</tr>'
    }
    document.getElementById('display_users').innerHTML = arr;
}