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


$.ajax({
  url: "api/study_sets/1",
  type: "GET",
  success: log,
  error: log
});


let t = {
    studySetId: 2,
    score: 30
}

function log(a){
  console.log(a);
}
$.ajax({
  url: "api/search?search=spanish",
  type: "GET",
  success: log,
  error: log
});
