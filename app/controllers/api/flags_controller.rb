class Api::FlagsController < ApplicationController
  def create
    @flag = Flag.new(flag_params)

    if @flag.valid?
      dev = @flag.dev
      group = @flag.group
      school = @flag.school
      @project = @flag.project
      client = @project.author

      # Flag project for front end update.
      @project.flagged = true

      # Set messages if everyone in the group has flagged this project.
      if group.everyone_else_is_down?(@project, dev)
        @flag.pending_approval = true

        returnToUserWithNews = true

        adminNews = group.name + " has flagged " + @project.name + "! " +
          "Click here for details."

        clientNews = "A group from " + school.name + " wants to work on " +
          @project.name + "!"

        devNews = "Everyone's on board for " + @project.name + "! " +
          "Your instructors are reviewing the project to determine feasibility."

        adminRecipients = school.admins
        adminRecipients.each do |recipient|
          message = Message.create(
            recipient_id: recipient.id,
            author_id: dev.id,
            body: adminNews
          )
        end
      end

      # Notify devs with current message.
      devRecipients = group.devs
      unless devNews
        devNews = dev.first_name + " has flagged " + @project.name + "!"
        devRecipients -= [dev]
      end

      devRecipients.each do |recipient|
        message = Message.create(
          recipient_id: recipient.id,
          author_id: dev.id,
          body: devNews
        )

        @message = message if returnToUserWithNews
      end

      # Notify client with current message.
      clientNews = dev.full_name + " likes " + @project.name + "!" unless clientNews
      message = Message.create(
        author_id: dev.id,
        recipient_id: client.id,
        body: clientNews
      )

      @flag.save

      render :show
    else
      render json: @flag.errors.full_messages, status: 422
    end
  end

  def update
    @flag = Flag.find(params[:flag][:id]);

    if @flag.update(flag_params)
      @project = @flag.project
      @project.flag = @flag

      if params[:flag][:instructor_approved]
        dev = @flag.dev
        group = @flag.group
        school = @flag.school
        client = @project.author

        clientNews = "You've received a bid for " + @project.name + "! " +
          "Click here for more details."

        devNews = "Your instructors have approved " + @project.name + "! " +
          "The client has been notified."

        devRecipients = group.devs
        devRecipients.each do |recipient|
          Message.create(
          recipient_id: recipient.id,
            author_id: dev.id,
            body: devNews
          )
        end

        Message.create(
        recipient_id: client.id,
          author_id: dev.id,
          body: clientNews
        )
      end

      render :show
    else
      render @flag.errors.full_messages, status: 422
    end
  end

  private
    def flag_params
      params.require(:flag).permit(
        :dev_id,
        :project_id,
        :school_id,
        :group_id,
        :customer_paid,
        :instructor_approved
      )
    end
end
