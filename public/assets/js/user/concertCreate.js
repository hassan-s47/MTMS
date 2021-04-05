
$('#addConcert').on('click', function (event) {
    event.preventDefault(); // Stop the form from causing a page refresh.
    var data = {
      title: $('#concert-title').val(),
      time: $('#time').val(),
      date: $('#date').val(),
      location: $('#location').val(),
      description: $('#commentar').val(),
      studentIDs: $('.studentid').val(),
    };
    $.ajax({
      url: '/createConcert',
      data: data,
      method: 'POST'
    }).then(function (response) {
        console.log(response);

      
    }).catch(function (err) {
        console.log(err);
    });
    
  });

  