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
This route would match photos/12 or /photos/long/path/to/12, setting params[:other] to "12" or "long/path/to/12". The fragments prefixed with a star are called "wildcard segments".

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

