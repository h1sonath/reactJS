function renderTable() {
$( document ).ready(function() {
    $.ajax({
        url: "http://localhost:6969/api/registrations",
        type: "GET"
    })
    .then(function(response) {
        if (response.success) {
            let registrations = response.registrations;
            let registrationsHtml = registrations.map(function(registration) {
                return `
                    <tr data-registrationid=${registration._id}>
                        <td>${registration.customer}</td>
                        <td>${registration.staff}</td>
                        <td>${registration.room}</td>
                        <td>${registration.daycheckin}</td>
                        <td>${registration.daycheckout}</td>
                        <td>   <button class="delete" type="text" data-registrationid="${registration._id}">Xóa</button> 
                    </tr>
                `
            }).join('');
            $('#result-registrations').append(registrationsHtml);
        }
    })
});
}

$.ajax({
    url: "http://localhost:6969/api/customers",
    type: "GET"
})
.then(function(response) {
    if (response.success) {
        let customers = response.customers;
        let customersHtml = customers.map(function(customer) {
            return `
                <option value="${customer._id}">
                    ${customer.name}
                </option>
            `
        }).join('');
        $('#tenkhachhang').append(customersHtml);
    }
})
$.ajax({
    url: "http://localhost:6969/api/staffs",
    type: "GET"
})
.then(function(response) {
    if (response.success) {
        let staffs = response.staffs;
        let staffsHtml = staffs.map(function(staff) {
            return `
                <option value="${staff._id}">
                    ${staff.name}
                </option>
            `
        }).join('');
        $('#tennhanvien').append(staffsHtml);
    }
})

$.ajax({
    url: "http://localhost:6969/api/rooms",
    type: "GET"
})
.then(function(response) {
    if (response.success) {
        let rooms = response.rooms;
        let roomsHtml = rooms.map(function(room) {
            return `
                <option value="${room._id}">
                    ${room.name}
                </option>
            `
        }).join('');
        $('#phongthue').append(roomsHtml);
    }
})

$( document ).ready(function() {
    renderTable();
});
$(document).on("click", '.delete', function(){
    let registrationId = $(this).data('registrationid');
    console.log($(this).data());
    $.ajax({
      url: 'http://localhost:6969/api/registrations/'+ registrationId,
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

  $('#add-registration').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
        url: "http://localhost:6969/api/registrations",
        method: "POST",
        data: {
            staff: $('#tenkhachhang').val(),
            staff: $('#nhanvien').val(),
            room: $('#phongthue').val(),
            daycheckin:$('#ngaynhanphong').val(),
            daycheckout:$('#ngaytraphong').val()
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