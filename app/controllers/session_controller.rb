class SessionController < ApplicationController

  def new
    render
  end

  def create
    user = User.find_by(email: params[:login][:email].downcase)
    if user && user.authenticate(params[:login][:password])
      session[:user_id] = user.id.to_s
      render status: :ok, json: { notice: 'Successfully logged in!' }
    else
      render status: :not_found, json: { errors: ['Incorrect credentials, try again.'] }
    end
  end

  def destroy
    # puts session.inspect, "inspecting session"
    # session.delete(:user_id)
    if session.delete(:user_id)
      render status: :ok, json:{ notice:"Successfuly logged out"}
    else
      render status: :unprocessable_entity, json:{errors:["Logout cant be performed"]}
    end
  end
end