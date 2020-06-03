Rails.application.routes.draw do
  

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # roots to welcome action of home controller


  resources :tasks, only: :index



end
