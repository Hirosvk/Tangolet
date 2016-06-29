class Api::StudySetsController < ApplicationController

  def show
    @study_set = StudySet.find(params[:id])
    if @study_set
      render :show
    else
      render json: "no such Study Set found", status: 401
    end
  end

  def index
    @study_sets = StudySet.all
    if @study_sets
      render :index
    else
      render json: "recod not found", status: 401
    end
  end

  def create
  end

  def destroy
  end
end
