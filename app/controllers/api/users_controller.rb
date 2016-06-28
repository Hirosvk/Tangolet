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

private
  def user_params
    params.require(:user).permit(:username, :password, :email)
  end
end
