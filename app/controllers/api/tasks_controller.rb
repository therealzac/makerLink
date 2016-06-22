class Api::TasksController < ApplicationController
  def create
    task = Task.new(task_params)

    if task.save
      @project = task.project;
      render :show
    else
      render json: task.errors.full_messages, status: 422
    end
  end

  def update
    task = Task.find(params[:id])

    if task.update(task_params)
      @project = task.project
      render :show
    else
      render json: task.errors.full_messages, status: 422
    end
  end

  private
  def task_params
    params.require(:task).permit(
      :id,
      :author_id,
      :project_id,
      :body,
      :status,
      :updated_at
    )
  end
end
