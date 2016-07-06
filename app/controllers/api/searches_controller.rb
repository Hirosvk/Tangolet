class Api::SearchesController < ApplicationController

  def all
    @languages = Language.all
    @study_sets = StudySet.all
    @klasses = Klass.all
    render :show
  end

  def show
    search_text = params[:search]
    search_words = search_text.split(/\W+/)
    @languages, @study_sets, @klasses = [], [], []
    debugger
    search_words.each do |word|
      languages = Language.where("name ILIKE ?", "%#{word}%")
      study_sets = StudySet.find_by_sql([STUDYSETS_QUERY,
                    "%#{word}%","%#{word}%","%#{word}%"])
      klasses = Klass.where("name ILIKE ? OR description ILIKE ?", "%#{word}%", "%#{word}%")
      @languages += languages unless languages.nil?
      @study_sets += study_sets unless study_sets.nil?
      @klasses += klasses unless klasses.nil?
    end
    @languages.uniq!
    @study_sets.uniq!
    @klasses.uniq!
    render :show
  end

  STUDYSETS_QUERY = <<-SQL
    SELECT
      DISTINCT study_sets.*
    FROM
      study_sets JOIN study_set_words
      ON study_sets.id = study_set_words.study_set_id
    WHERE
      study_sets.name ILIKE ? OR
      study_set_words.word_english ILIKE ? OR
      study_set_words.word_foreign ILIKE ?
  SQL

  ## ILIKe is only supported by PostreSQL

end
