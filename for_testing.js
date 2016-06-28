function log(a){
  console.log(a);
}

$.ajax({
  url: "api/user",
  type: "POST",
  data: {
    user: {
      username: 'Nasley',
      password: 'nasnas',
      email: 'nasley@nasley.com'
    }
  },
  success: log,
  error: log
});

$.ajax({
  url: "api/session",
  type: "DELETE",
  success: log,
  error: log
});
