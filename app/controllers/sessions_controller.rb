class SessionsController < ApplicationController
  def new
    render :layout => "empty"
  end

  def create
    email, password = params[:user][:email], params[:user][:password]
    @user = User.find_by_credentials(email, password)
    if @user
      if @user.is_customer?
        @projects = @user.projects
        @projects.each do |project|
          # This can't handle cases of multiple groups
          project.flag = Flag.where("project_id = #{project.id} AND
            instructor_approved = true")[0]
        end
      end

      if @user.is_dev?
        @user.school = @user.cohort.school
        @projects = Project.all
        flagged_projects = @user.flagged_projects

        # There's got to be a better way to handle this.
        @projects.each do |project|
          project.flagged = true if flagged_projects.include?(project)
        end
      end

      if @user.is_admin?
        @cohorts = @user.cohorts
        @projects = []

        school_id = @user.school_id

        flags = Flag.where("school_id = #{school_id} AND pending_approval = true")
        flags.each do |flag|
          project = flag.project
          project.flag = flag

          @projects << project
        end
      end

      sign_in(@user)
      render :show
    else
      render json: ["Invalid username or password."], status: 422
    end
  end

  def show
    @user = current_user
    if @user
      if @user.is_customer?
        @projects = @user.projects
        @projects.each do |project|
          # This can't handle cases of multiple groups
          project.flag = Flag.where("project_id = #{project.id} AND
            instructor_approved = true")[0]
        end
      end

      if @user.is_dev?
        @projects = Project.all
        flagged_projects = @user.flagged_projects

        @projects.each do |project|
          project.flagged = true if flagged_projects.include?(project)
        end
      end

      if @user.is_admin?
        @cohorts = @user.cohorts
        @projects = []

        school_id = @user.school_id

        flags = Flag.where("school_id = #{school_id} AND pending_approval = true")
        flags.each do |flag|
          project = flag.project
          project.flag = flag

          @projects << project
        end
      end

      render :show
    else
      render :blank
    end
  end

  def destroy
    sign_out
    render :blank
  end
end
