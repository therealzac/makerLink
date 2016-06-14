class Api::CohortsController < ApplicationController

  def create
    @cohort = Cohort.create(cohort_params)
    if @cohort.save
      render :show
    else
      render json: @message.errors.full_messages, status: 422
    end
  end



  private
  def cohort_params
    params.require(:cohort).permit(
    :name,
    :project_completion_date,
    :school_id
    )
  end

end
