function log(a){
  console.log(a);
}

$.ajax({
  url: "api/study_sets",
  type: "POST",
  data: {
    study_set: {
      name: "Japanse 3"
    },
    words: [
      {word_english: "pen", word_foreign: "pen"},
      {word_english: "pencil", word_foreign: "pencil"},
      {word_english: "eraser", word_foreign: "keshigomu"},
    ]
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
