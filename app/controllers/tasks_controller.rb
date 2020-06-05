class TasksController < ApplicationController
  before_action :load_task, only: [:show, :edit, :update, :destroy]
  

  # GET /tasks
  # GET /tasks.json
  def index
    @tasks = Task.all
  end
  # new task
  def new
    @task = Task.new
  end 

  # create Task
  def create
    @task = Task.new(task_params)
    if @task.save 
      render status: :ok, json: { notice: "Task was successfully created", id:@task.id }
    else
      puts "inside create action else part"
      error_message = @task.errors.full_messages
      puts error_message
      render status: :unprocessable_entity, json: {errors: error_message}
    end
  end

  def show
    render
  end

  def edit
    render
  end

  def update
    puts @task,task_params, "inside update"
    if @task.update(task_params)
      render status: :ok, json:{ notice: "Successfully updated task "}
    else
      render status: :unprocessable_entity, json:{ errors: @task.errors.full_messages }
    end 
  end

  def destroy
    puts @task.inspect, "hello world this is destroy"
    if @task.destroy
      render status: :ok, json:{ notice: "Successfully destroyed task"}
    else
      render status: :unprocessable_entity, json:{ errors: @task.errors.full_messages }    
    end
  end

  private
    
    def task_params
      puts params, "params lol"
      params.require(:task).permit(:desc)
    end

    def load_task 
      # puts task_params, "xxx"
      @task = Task.find(params[:id])
      # puts @task.inspect,"yyy"
      rescue ActiveRecord::RecordNotFound => errors
        render json:{errors: errors}
    end
  
  # GET /tasks/1
  # GET /tasks/1.json
  

  # # GET /tasks/new
  # def new
  #   @task = Task.new
  # end

  # # GET /tasks/1/edit
  # def edit
  # end

  # # POST /tasks
  # # POST /tasks.json
  # # def create
  # #   @task = Task.new(task_params)

  # #   respond_to do |format|
  # #     if @task.save
  # #       format.html { redirect_to @task, notice: 'Task was successfully created.' }
  # #       format.json { render :show, status: :created, location: @task }
  # #     else
  # #       format.html { render :new }
  # #       format.json { render json: @task.errors, status: :unprocessable_entity }
  # #     end
  # #   end
  # # end

  # # PATCH/PUT /tasks/1
  # # PATCH/PUT /tasks/1.json
  # def update
  #   respond_to do |format|
  #     if @task.update(task_params)
  #       format.html { redirect_to @task, notice: 'Task was successfully updated.' }
  #       format.json { render :show, status: :ok, location: @task }
  #     else
  #       format.html { render :edit }
  #       format.json { render json: @task.errors, status: :unprocessable_entity }
  #     end
  #   end
  # end

  # # DELETE /tasks/1
  # # DELETE /tasks/1.json
  # def destroy
  #   @task.destroy
  #   respond_to do |format|
  #     format.html { redirect_to tasks_url, notice: 'Task was successfully destroyed.' }
  #     format.json { head :no_content }
  #   end
  # end

  # private
  #   # Use callbacks to share common setup or constraints between actions.
  #   def set_task
  #     @task = Task.find(params[:id])
  #   end

  #   # Only allow a list of trusted parameters through.
  #   def task_params
  #     params.require(:task).permit(:desc)
  #   end
    
    
end
