Myapp::Application.routes.draw do

  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:index, :create, :update]
    resources :messages, only: [:index, :create, :update]
    resources :projects, only: [:index, :create, :update]
    resources :flags, only: [:create, :update, :destroy]
    resources :cohorts, only: [:create, :update, :destroy]
    resources :groups, only: [:create, :update, :destroy]
    resources :tasks, only: [:create, :update, :destroy]
    resources :slack, only: [:create]
  end

resource :session, only: [:show, :create, :destroy, :update]

end
