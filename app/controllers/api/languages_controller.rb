class Api::LanguagesController < ApplicationController
  def index
    @languages = Language.all
    render :index
  end

  def show
    @language = Language.find(params[:id])
    @study_sets = @language.study_sets
    @klasses = @language.klasses
    render :show
  end

end
