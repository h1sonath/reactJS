function renderTable() {
    $.ajax({
        url: "http://localhost:6969/api/customers",
        type: "GET"
    })
    .then(function(response) {
        if (response.success) {
            let customers = response.customers;
            $('#result-customer').html('');
            let customersHtml = customers.map(function(customer) {
                return `
                    <tr data-customerId=${customer._id}>
                        <td >${customer.name}</td>
                        <td >${customer.sex}</td>
                        <td >${customer.address}</td>
                        <td >${customer.phone}</td>
                        <td>   <button class="delete" type="text" data-customerid="${customer._id}">Xóa</button> 
                    </tr>
                `
            }).join('');
            $('#result-customer').append(customersHtml);
        }
    })
}
$( document ).ready(function() {
    renderTable();
});

$(document).on("click", '.delete', function(){
    let customerId = $(this).data('customerid');
    console.log($(this).data());
    $.ajax({
      url: 'http://localhost:6969/api/customers/'+ customerId,
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

$('#add-customer').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
        url: "http://localhost:6969/api/customers",
        method: "POST",
        data: {
            name: $('#tenkhachhang').val(),
            sex: $('#gioitinh').val(),
            address: $('#diachi').val(),
            phone: $('#sodienthoai').val()
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





