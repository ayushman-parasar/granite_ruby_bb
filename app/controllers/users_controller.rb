class UsersController < ApplicationController
  def create
    puts "checking user_params in create"
    @user = User.new(user_params)
    puts @user.inspect, "inspecting user "
    if @user.save
      puts @user.inspect, "after save"
      render status: :ok, json: { notice:"User created successfully" }
    else
      puts @user.errors.inspect, "after else"
      render status: :unprocessable_entity, json: { errors: @user.errors.full_messages }
  
    end
  end

  def new
    @user = User.new
  end

  private

  def user_params
    puts params, 'parameters in user_params'
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

end
