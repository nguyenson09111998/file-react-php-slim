document.querySelector('.create_sub').addEventListener("click", function (event) {
  const formData = new FormData(document.querySelector('form#get_subject'));
  fetch('/manage/create_sub', {
    method: "POST",
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      if (data === 'success') {
        show_data();
        reset();
      } else if (data === 'already') {
        window.alert('This subject ID has already existed!');
      } else if (data === null) {
        window.alert('Please fill in all infomation!');
      }
    })
    .catch(err => {
      console.error(err);
    })
  event.preventDefault();
});
show_data();
function show_data() {
  fetch('/manage/display_sub', {
    method: "POST"
  })
    .then(res => res.json())
    .then(data => {
      get_data(data);
      // console.log(data)
      del_dataSubject()
    })
    .catch(err => {
      console.error(err);
    })
}
function del_dataSubject() {
  $('.subject_del').on("click", function (event) {
    var check = confirm("Are you sure do not delete?");
    var id = '';
    if (check == true) {
      id = this.getAttribute('stt');
      var data = { id: id };
      fetch('/manage/del_sub', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          show_data();
          console.log(data)
        })
        .catch(err => {
          console.error(err);
        })
    }
    event.preventDefault();
  })
}
function reset() {
  $('input[name=sub_id]').val('');
  $('input[name=sub_name]').val('');
}
function get_data(data) {
  let arr = new Array();
  let stt = 0;
  for (let i = 0; i < data.length; i++) {
    stt++;
    arr +=
      '<tr class="row_item">' +
      '<td>' + stt + '</td>' +
      '<td>' + data[i].SUBID + '</td>' +
      '<td>' + data[i].SUBTEXT + '</td>' +
      '<td class="feature_user" style="text-align: left;">' +
      '<span class="user_view" stt="' + data[i].SUBID + '"><i class="fa fa-minus"></i></span>' +
      '<span class="user_edit" stt="' + data[i].SUBID + '"><i class="fa fa-pencil"></i></span>' +
      '<span class="subject_del" stt="' + data[i].SUBID + '"><i class="fa fa-trash-o"></i></span>' +
      '</td>' +
      '</tr>'
  }
  if (data.length == 0) {
    arr = '<p>No found data</p>'
  }
  document.getElementById('display_subject').innerHTML = arr;
}