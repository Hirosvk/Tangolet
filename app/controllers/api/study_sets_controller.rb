class Api::StudySetsController < ApplicationController
  before_action :require_login, only: [:create, :destroy, :update]

  def show
    @study_set = StudySet.find(params[:id])
    if @study_set
      render :show
    else
      render json: "no such Study Set found", status: 404
    end
  end

  def index
    @study_sets = StudySet.all
    if @study_sets
      render :index
    else
      render json: "recod not found", status: 404
    end
  end

  def create
    @study_set = current_user.study_sets.new(study_set_params)
    debugger
    words_params.each do |_, word|
      @study_set.words.new(word.permit(:word_english, :word_foreign))
    end

    if @study_set.save
      render :show
    else
      render json: @study_set.errors.full_messages, status: 406
    end

  end

  def update
    @study_set = StudySet.find(params[:id])
    if @study_set.creator_id != current_user.id
      render json: "Only creator can edit Study Set", status: 401
    end

    @study_set.name = study_set_params[:name]
    @study_set.words.destroy_all
    words_params.each do |_, word|
      @study_set.words.new(word.permit(:word_english, :word_foreign))
    end

    if @study_set.save
      render :show
    else
      render json: @study_set.errors.full_messages, status: 401
    end

  end

  def destroy
    @study_set = StudySet.find(params[:id])

    if @study_set.nil?
      render json: "no such Study Set was found", status: 404
    elsif @study_set.creator_id != current_user.id
      render json: "only the creator can delete the Study Set", status: 401
    elsif @study_set.destroy
      render :show
      # ajax thinks that json: response an error, and calls error callback
    else
      render json: "Error occured", status: 406
    end
  end

private
  def study_set_params
    params.require(:study_set).permit(:name)
  end

  def words_params
    return {} if params["words"].nil?
    params.require(:words)
  end

end
