class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 401
    end
  end

  def show
    @user = current_user
    if @user
      render :show
    else
      render json: "user not logged in"
    end
  end

  def enroll
    @user = current_user
    klass_ids = @user.klass_ids.dup
    if klass_ids.delete(params_klass_id).nil?
      klass_ids.push(params_klass_id)
    end

    begin
      @user.klass_ids = klass_ids
    rescue ActiveRecord::ActiveRecordError => e
    end

    if e
      render json: e.message, status: 404
    else
      render :show
    end
  end

  def my_klasses
    @klasses = current_user.klasses
    render "api/klasses/index.json.jbuilder"
  end

  def my_klasses_created
    @klasses = current_user.klasses_created
    render "api/klasses/index.json.jbuilder"
  end

  def my_study_sets
    @study_sets = current_user.study_sets
    render "api/study_sets/index.json.jbuilder"
  end

private
  def user_params
    params.require(:user).permit(:username, :password, :email)
  end

  def params_klass_id
    params.require(:user)["klass_id"].to_i
  end
end
