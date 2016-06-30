class Api::KlassesController < ApplicationController
  before_action :require_login, except: [:index, :show]

  def index
    @klasses = Klass.all
    render :index
  end

  def show
    @klass = Klass.find(params[:id])
    render :show
  end

  def create
    @klass = current_user.klasses_created.new(klass_params)
    if @klass.save
      render :show
    else
      render json: @klass.errors.full_messages, status: 406
    end
  end

  def update
    @klass = Klass.find(params[:id])
    if @klass.update(klass_params)
      render :show
    else
      render json: @klass.errors.full_messages, status: 406
    end
  end

  def destroy
    @klass = Klass.find(params[:id])
    if @klass.nil?
      render json: "no such Class was found", status: 404
    elsif @klass.teacher_id != current_user.id
      render json: "only the creator can delete the Class", status: 401
    elsif @klass.destroy
      render :show
      # ajax thinks that json: response an error, and calls error callback
    else
      render json: "Error occured", status: 406
    end
  end


  private
  def klass_params
    params.require(:klass).permit(:name, :description, :language_id)
  end
end
