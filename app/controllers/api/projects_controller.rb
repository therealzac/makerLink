class Api::ProjectsController < ApplicationController
  def create
    @project = Project.create(project_params)
    if @project.save
      render :show
    else
      render json: @project.errors.full_messages, status: 422
    end
  end

  def update
  end

private
   def project_params
    params.require(:project).permit(
      :author_id,
      :dev_id,
      :name,
      :pitch,
      :description,
      :url,
      :view_count,
      :expiration_date
    )
  end

end
