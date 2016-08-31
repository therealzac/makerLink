class Api::ProjectsController < ApplicationController
  def create
    @project = Project.new(project_params)

    if project_params[:inspiration_link] != ""
      @project.inspiration_link = project_params[:inspiration_link]
        .sub(/^https?\:\/\//, '')
        .sub(/^www./,'')

      secret_key = Digest::MD5.hexdigest(
        "http://www." + @project.inspiration_link + "baller"
      )

      @project.screenshot_url = "https://api.screenshotlayer.com/api/capture?" +
        "access_key=e5dcd814eafbbe4fa22f3d21f997607b&secret_key=" +
        secret_key + "&url=http://www.#{@project.inspiration_link}"
    end

    if @project.save
      render :show
    else
      render json: @project.errors.full_messages, status: 422
    end
  end

  def update
    @project = Project.find_by_id(project_params[:id])

    if @project
      @project.assign_attributes(project_params)

      if project_params[:inspiration_link] != ""
        @project.inspiration_link = project_params[:inspiration_link]
          .sub(/^https?\:\/\//, '')
          .sub(/^www./,'')

        secret_key = Digest::MD5.hexdigest(
          "http://www." + @project.inspiration_link + "baller"
        )

        @project.screenshot_url = "https://api.screenshotlayer.com/api/capture?" +
          "access_key=e5dcd814eafbbe4fa22f3d21f997607b&secret_key=" +
          secret_key + "&url=http://www.#{@project.inspiration_link}"
      end

      if @project.save
        if new_tag_params[:tags] && @project.tags.length < new_tag_params[:tags].length
          previous_tag_values = @project.tags.map { |tag| tag.value }

          new_tag_params[:tags].each do |tag|
            next if previous_tag_values.include?(tag)
            Tag.create(value: tag, project_id: @project.id)
          end
        elsif new_tag_params[:tags]
          @project.tags.each do |tag|
            next if new_tag_params[:tags].include?(tag.value)
            tag.destroy
          end
        elsif !params[:project][:tags]
          @project.tags.destroy_all
        end

        @project.reload
        render :show
      else
        render json: @project.errors.full_messages
      end
    end
  end

  private
   def project_params
    params.require(:project).permit(
      :id,
      :name,
      :description,
      :inspiration_link,
      :youtube_link,
      :involvement_level,
      :screenshot_url,
      :author_id,
      :url,
      :target_date
    )
  end

  def new_tag_params
    params.require(:project).permit(tags: [])
  end
end
