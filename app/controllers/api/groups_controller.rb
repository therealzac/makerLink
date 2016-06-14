class Api::GroupsController < ApplicationController

  def create
    group = Group.new(group_params)

    if group.save
      params[:members].each do |member|
        user = User.find_by_id(member[1][:id])
        user.group_id = group.id

        if !user.save
          render json: user.errors.full_messages, status: 422
        end
      end

      @cohort = group.cohort
      render :show
    else
      render json: group.errors.full_messages, status: 422
    end
  end

  private
  def group_params
    params.require(:members)
    params.require(:group).permit(:name, :cohort_id)
  end
end
