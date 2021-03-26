$('#loginFormButton').on('click', function (event) {
    console.log(event);
    event.preventDefault(); // Stop the form from causing a page refresh.
    var data = {
      email: $('#email').val(),
      password: $('#password').val()
    };
    $.ajax({
      url: '/login',
      data: data,
      method: 'POST'
    }).then(function (response) {
        

        if(response.status=='success')
        {
          window.location.href ='/dashboard';
        }
        else if(response.status=='pending')
        {
          window.location.href='/user/subscribe_pending';
        }
        else if(response.status=='subscribe')
        {
          window.location.href='/user/subscribe';
        }
        else
        {
          element= document.getElementById('msg');
          element.innerHTML=response.msg;
          element.style.display='block';
        }
      $('body').append(response);
    }).catch(function (err) {
        console.log(err);
    });
    
  });

  