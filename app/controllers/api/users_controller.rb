class Api::UsersController < ApplicationController
  def new
    render :layout => "empty"
  end

  def create
    @user = User.new(user_params)

    if @user.valid?
      token = Stripe::Token.create(card: card_params)

      customer = Stripe::Customer.create(
        source: token.id,
        email: @user.email,
        description: @user.name
      )

      @user.stripe_id = customer.id

      @user.save
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    @user = User.find(params[:id])

    if @user.update_attributes(user_params)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private
  def user_params
    params.require(:user).permit(
      :password,
      :mobile,
      :email,
      :cohort_id,
      :school_id,
      :project_id,
      :current_project_id,
      :first_name,
      :last_name,
      :pic_url
    )
  end

  def card_params
    params.require(:card).permit(
      :number,
      :exp_year,
      :exp_month,
      :cvc
    )
  end
end
