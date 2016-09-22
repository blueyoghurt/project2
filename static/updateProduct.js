$('.delete-btn').click(function(e) {
  e.preventDefault();
  var url = "/product/" + $(this).attr('value');
  console.log(url);

  $.ajax({
    url: url,
    type: 'DELETE'
  }).done(function(){
    window.location.href = '/product';
  }).fail(function(){
    console.log("failed to delete product");
  });
}); //Delete button

$('#editProduct').submit(function(e) {
  e.preventDefault();
  var url = "/product/" + $(this).attr('name');
  var data = $(this).serialize();
  console.log(data);
  console.log(url);

  $.ajax({
    url: url,
    type: 'PUT',
    data: data
  }).done(function(){
    window.location.href = '/product';  
  }).fail(function(){
    console.log("failed to edit product");
  });
}); //Edit button
