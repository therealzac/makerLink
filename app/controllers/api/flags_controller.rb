class Api::FlagsController < ApplicationController
  def create
    @flag = Flag.new(flag_params)

    if @flag.valid?
      dev = @flag.dev
      group = @flag.group
      school = @flag.school
      @project = @flag.project
      customer = @project.author

      # Flag project for front end update.
      @project.flagged = true 

      # Set messages and notify admins if group has reached consensus on @project.
      if group.everyone_else_is_down?(@project, dev)
        @flag.pending_approval = true

        returnToUserWithNews = true

        adminSubject = group.name + " has flagged " + @project.name + "!"
        adminBody = "This project is awaiting your approval. Click here for details."

        devSubject = "Everyone's on board for " + @project.name + "!"
        devBody = "Your instructors have been notified."

        customerSubject = "A group from " + school.name + " likes " + @project.name + "!"
        customerBody = "Blah blah blah."

        adminRecipients = school.admins
        adminRecipients.each do |recipient|
          message = Message.create(
            author_id: dev.id,
            recipient_id: recipient.id,
            subject: adminSubject,
            body: adminBody
          )

        end
      end

      # Notify group members with current message.
      devRecipients = group.devs
      unless devSubject && devBody
        devSubject = dev.first_name + " has flagged " + @project.name + "!"
        devBody = "Check it out."
        devRecipients -= [dev]
      end

      devRecipients.each do |recipient|
        message = Message.create(
          author_id: dev.id,
          recipient_id: recipient.id,
          subject: devSubject,
          body: devBody
        )

        @message = message if returnToUserWithNews
      end

      # Notify customer with current message.
      customer = @project.author
      unless customerSubject && customerBody
        customerSubject = "A dev from " + school.name + " likes " + @project.name + "!"
        customerBody = "Blah blah blah."
      end

      message = Message.create(
        author_id: dev.id,
        recipient_id: customer.id,
        subject: customerSubject,
        body: customerBody
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
        customer = @project.author

        devBody = "The customer has been notified."
        devSubject = "Your instructor has approved " + @project.name + "!"

        customerSubject = "A group from " + school.name + " has picked up your project!"
        customerBody = "BlAh blah"

        devRecipients = group.devs
        devRecipients.each do |recipient|
          Message.create(
            author_id: dev.id,
            recipient_id: recipient.id,
            subject: devSubject,
            body: devBody
          )
        end

        Message.create(
          author_id: dev.id,
          recipient_id: customer.id,
          subject: customerSubject,
          body: customerBody
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
