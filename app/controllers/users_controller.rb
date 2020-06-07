class UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      render status :ok, json: { notice:"User created successfully" }
    else
      render status :unprocessable_entity, json: { errors: @user.errors.full_messages }
  end

  def new
    @user = User.new
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
