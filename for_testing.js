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

function log(a){
  console.log(a);
}

$.ajax({
  url: "api/study_sets/1",
  type: "GET",
  success: log,
  error: log
});
