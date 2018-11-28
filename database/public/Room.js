function renderTable() {
    $.ajax({
        url: "http://localhost:6969/api/rooms",
        type: "GET"
    })
    .then(function(response) {
        if (response.success) {
            let rooms = response.rooms;
            $('#result-room').html('');
            let roomsHtml = rooms.map(function(room) {
                return `
                    <tr data-roomId=${room._id}>
                        <td class="roomcss">${room.name}</td>
                        <td class="roomcss">${room.cost}</td>
                        <td class="roomcss">${room.available}</td>
                        <td>   <button class="delete" type="text" data-roomid="${room._id}">Xóa</button> 
                    </tr>
                `
            }).join('');
            $('#result-room').append(roomsHtml);
        }
    })
}
$( document ).ready(function() {
    renderTable();
});

$(document).on("click", '.delete', function(){
    let roomId = $(this).data('roomid');
    console.log($(this).data());
    $.ajax({
      url: 'http://localhost:6969/api/rooms/'+ roomId,
      type: 'DELETE',
      success: function(response){
        console.log(response)
        if(response){
          renderTable()
        }
      },
      error: function(err){
        console.log(err);
      }
    })
  });

$('#add-room').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
        url: "http://localhost:6969/api/rooms",
        method: "POST",
        data: {
            name: $('#tenphong').val(),
            cost: $('#giatien').val(),
            available: $('#tinhtrang').val()
        },
        success: function(response){
            if(response){
                renderTable()
              }
            },
            error: function(err){
              console.log(err);
            }
          })
})





