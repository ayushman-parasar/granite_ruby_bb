class TasksController < ApplicationController
  before_action :load_task, only: [:show, :edit, :update, :destroy]
  before_action :ensure_user_logged_in

  

  # GET /tasks
  # GET /tasks.json
  def index
    puts tasks_path , 'tasks_path named routes'
    @tasks = Task.all
    # @tasks = TaskPolicy::Scope.new(@current_user, Task).resolve
    #same as 
    @tasks = policy_scope(Task)
  end
  # new task
  def new
    @task = Task.new
  end 

  # create Task
  def create
   
    @task = Task.new(task_params)
    authorize @task
    @task.creator_id = @current_user.id
    # if @task.save 
    #   render status: :ok, json: { notice: "Task was successfully created", id:@task.id }
    # else
    #   puts "inside create action else part"
    #   error_message = @task.errors.full_messages
    #   puts error_message
    #   render status: :unprocessable_entity, json: {errors: error_message}
    # end

    if @task.valid?
      @task.save
      redirect_to task_url(@task)
    else
      render new
    end
  end
    
  def show
    @task = Task.find(params[:id])
    authorize @task
    @comments = @task.comments
  end

  def edit
    @task = Task.find(params[:id])
    authorize @task
  end

  def update
    @task = Task.find(params[:id])
    authorize @task

    if @task.update_attributes(task_params)
      # redirect_to @task
      render status: :ok, json:{notice: "updated successfully"}
    end
  end

  def destroy
    @task = Task.find(params[:id])
    authorize @task
    # @task.destroy
    # redirect_to tasks_path  
    if @task.destroy
      render status: :ok, json:{notice:"Deleted successfully"}
    end
  end


  # without the use of pundit
  # def create
  #   @task = Task.new(task_params)
  #   @task.creator_id = @current_user.id
    # if @task.save 
    #   render status: :ok, json: { notice: "Task was successfully created", id:@task.id }
    # else
    #   puts "inside create action else part"
    #   error_message = @task.errors.full_messages
    #   puts error_message
    #   render status: :unprocessable_entity, json: {errors: error_message}
    # end
  # end

  
  # def show
  #   puts params,'inside show action '
  #   render
  # end
  
  # def edit
  #   render
  # end
  
  # def update
  #   puts @task,task_params, "inside update"

  #   if @task.update(task_params)
  #     render status: :ok, json:{ notice: "Successfully updated task "}
  #   else
  #     render status: :unprocessable_entity, json:{ errors: @task.errors.full_messages }
  #   end 
  # end


  # def destroy
  #   puts @task.inspect, "hello world this is destroy"
  #   if @task.destroy
  #     render status: :ok, json:{ notice: "Successfully destroyed task"}
  #   else
  #     render status: :unprocessable_entity, json:{ errors: @task.errors.full_messages }    
  #   end
  # end


  private
    
    def task_params
      puts params, "inside params"
      params.require(:task).permit(:desc,:user_id, :creator_id)
      # puts params, 'params after require and permit'
    end

    def load_task 
      # puts task_params, "xxx"
      @task = Task.find(params[:id])
      # puts @task.inspect,"yyy"
      rescue ActiveRecord::RecordNotFound => errors
        render json:{errors: errors}
    end
  
  
end
