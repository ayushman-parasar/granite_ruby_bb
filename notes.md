# Routing

Now when a user visits http://localhost:3000/articles then Rails will read config/routes.rb and Rails will start looking for any pattern matching /articles.
in config/routes if we have
```
  get "/articles" ,to:"articles#list"

```
Then Rails will see articles#list. Here Rails will split that string into two parts - articles & list. articles means invoke controller named ArticlesController and list means in that controller invoke action named list.

```
get "/books/:id", => "books#show"

```
the above mentioned route is an example of the non-resourceful routing or simple routing

```
get 'photos/:id/with_user/:user_id', to: 'photos#show'
```
This route would respond to paths such as /photos/1/with_user/2. In this case,
 params would be { controller: 'photos', action: 'show', id: '1', user_id: '2' }.
Here id is a ***dynamic segment***

- Named Routes
```
get 'exit', to: 'sessions#destroy', as: :logout
````
logout_path will be available in controllers, helpers, and views 
This will create logout_path and logout_url as named route helpers in your application. Calling logout_path will return /exit


- Routes globbing
```
get 'photos/*other', to: 'photos#unknown'
```
This route would match photos/12 or /photos/long/path/to/12, setting params[:other] to "12" or "long/path/to/12". The fragments prefixed with a star are called "wildcard segments".<br>
<i>The params object is a container that enables you to pass values between method calls. For example, when you're on the page called by the list method, you can click a link for a specific book, and it passes the id of that book via the params object so that show can find the specific book.<i>

- Redirect
```
get '/stories/:name', to: redirect('/articles/%{name}')

```
redirect is a helper 
using blocks-->
```
get '/stories/:name', to: redirect { |path_params, req| "/articles/#{path_params[:name].pluralize}" }

```

<b>Rails Resource</b>

```
Rails.application.routes.draw do
  resources :books
end
```
the above code is a shortcut for creating all the routes  as shown below:
```
Rails.application.routes.draw do
  get '/books', to: "books#index"
  get 'books/:id', to: "books#show"
  get 'books/new', to: "books#new"
  post 'books', to: "books#create"
  get 'book/edit', to: "books#edit"
  put 'book/update', to: "books#update"
  delete 'books/:id', to: "books#destroy"
end
```

REST vs CRUD
<br>
REST is an architectureal system to deal with data through HTTP protocols. Typically software applications create RESTful apis to handle CRUD operations.

When we open console and if we make any changes to the database then those changes are permanent. However sometimes we want to test something and we want all those changes to rollback when we exist console. This is very often used in debugging in production environment.
```
$ bundle exec rails console -e production --sandbox
Loading production environment in sandbox
Any modifications you make will be rolled back on exit
>> Task.update_all(name: "new name")
>> exit

```

<hr>

## Using react 

To generate react components use:
```
bundle exec rails g reaact_component tasks/List
```
It creates a folder tasks and inside of which a file/component is created called List.This happens inside app/javascript/components only when you have assembled react within rails. The whole render  operation is done via a helper method called react_component to render React components inside views.

  *** https://learnrubyonrails.bigbinary.com/docs/bringing-reactjs-to-ruby-on-rails.md ***
<hr>

### Creating Task
In task controller
```
def create
    @task = Task.new(task_params)
    if @task.save
      render status: :ok, json: { notice: 'Task was successfully created' }
    else
      errors = @task.errors.full_messages
      render status: :unprocessable_entity, json: { errors: errors  }
    end
  end


```
When a form is submitted then Rails makes all the form data available to the controller in an object called params.The first line creates a new instance variable called @task that holds a Task object built from the data, the user submitted. The task_params method is used to collect all the fields from object :tasks. The data was passed from the new method to create using the params object.

```

  private

  def task_params
    params.require(:task).permit(:description)
  end
```

The permit method returns a new ActionController::Parameters instance that includes only the given filters and sets the permitted attribute for the object to true. This is useful for limiting which attributes should be allowed for mass updating.The private keyword here tells rails that methods defined from now onwards can be accessible within the object i.e can be accessed by the methods inside that particular class .

<br>

So overall task_params will give us a hash like this
```
{
  task: { desc:"This is description text submitted in the form" }
}
```

*** rescue is an error catcher ***
For the below code
```
before_action :load_task, only: [:show]

```
load_task will run before show action . Here before_action is a Filter provided by the Rails.Filters can be used before, around , after actions in the controller.

example-
```
before_action :load_task, only: [:show, :edit, :update, :destroy]
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
```
In the above code , before performing the destroy  operation  the load task is run 
where we obtain @task which is an instance variable and the puts statement gives the blow result <br>
#<Task id: 21, name: nil, desc: "sdsadsadsadsadas", created_at: "2020-06-05 07:41:37", updated_at: "2020-06-05 07:41:37">
<br>
Now we try to destroy @task by the use of destroy method as in @task.destroy which returns true or false,
if true we return response with a status code of 200 and the json body as we did in node <br>
res.status(200).json({ success: true });<br>
if false we return the necessary status code

The rescue catches the exception that *** Task.find(params[:id]) *** may not find any Task with that particular id.


### Details on Foreign Key

when we do 
```
rails g migration add_foreign_key_to_task
```
we get a migration which seems like this
```
class AddForeignKeyToTask < ActiveRecord::Migration[6,0]
  def change
    add_foreign_key :tasks, :users, {column: :user_id, onDelete: :cascade}
  end
end
```
The format for the add_foreign_key is 
```
add_foreign_key  TABLE_NAME_WHERE_YOU_WANT_TO_INSERT_Fkey, TABLE_NAME_CONTAINING_THE_REFERENCED_Pkey,OPTIONS={}
```
The foreign key would be inserted into tasks ,and this is the primary key in the users table.In options we mention the column where you want to insert the foreign key
<br>


### has_secure_password function

To explain in English, this function does the following:

- Loads the bcrypt-ruby Gem and requires bcrypt. bcrypt is a secure hashing function that you can learn more about in Wikipedia.
- Adds a read-only attribute to the model called password.
- Validates that the password is confirmed by another field, called password_confirmation. In other words, you have to enter the password twice to confirm it.
- Ensures that password_digest is present before a model is saved.
- Load the instance methods, which in this case are authenticate (which returns true if the password is correct, otherwise false) and password=, which encrypts the passed password into the password_digest attribute.

<br> 
A password_digest is a  string that has three components:

A flag that indicates that the string is a Bcrypt hash
The (unhashed) salt
The result of hashing password+salt

### insight on the actions of the controller

```
def new
  @user = User.new
end
```
The above method is called when you display a page to get the input from the user. The new method tells Rails that you will create a new object/instance of the User 

## Authorization

use pundit gem

Pundit helps in creating role based authorization with the help of policies. Policies are classes
that contain authorization for an action.
We included it in the application controller where we have current user method defined.
```
 def initialize(user, task)
    @user = user
    @task = task
  end
```
Pundit will call the current_user method to send the result into the ```user``` argument
the second argument is the model object whose authorization you want to check, in this case its task model.

```
def show?
  task.creator_id == user.id || task.user_id == user.id
end
```
It is a query method mapped to the show action of the task controller.



Pundit scopes usually used to fetch a list of records which user have access to.