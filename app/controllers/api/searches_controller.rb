class Api::SearchesController < ApplicationController
  def show
    debugger
    search_text = params[:search]
    @languages = Language.where("name LIKE ?", "%#{search_text}%")
    @study_sets = StudySet.find_by_sql([STUDYSETS_QUERY,
                  "%#{search_text}%","%#{search_text}%","%#{search_text}%"])
    @klasses = Klass.where("name LIKE ?", "%#{search_text}%")
    render :show
  end

  STUDYSETS_QUERY = <<-SQL
    SELECT *
    FROM
      study_sets JOIN study_set_words
      ON study_sets.id = study_set_words.id
    WHERE
      study_sets.name LIKE ? OR
      study_set_words.word_english LIKE ? OR
      study_set_words.word_foreign LIKE ?
  SQL

end
