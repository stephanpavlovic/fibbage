Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get '/controller', to: 'pages#join', as: :join

  root 'pages#home'

end
