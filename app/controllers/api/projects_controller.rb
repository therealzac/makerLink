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
      :name,
      :description,
      :inspiration_links,
      :youtube_link,
      :tags,
      :involvement_level,
      :author_id,
      :url,
    )
  end

end
