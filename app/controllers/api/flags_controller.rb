class Api::FlagsController < ApplicationController
  def create
    @flag = Flag.new(flag_params)

    if @flag.valid?
      dev = @flag.dev
      group = @flag.group
      school = @flag.school
      @project = @flag.project
      customer = @project.author

      adminRecipients = school.admins
      devRecipients = group.devs

      soloDev = devRecipients.length == 1 ? true : false

      # Flag project for front end update.
      @project.flagged = true

      # Set messages if everyone in the group has flagged this project.
      if soloDev || group.everyone_else_is_down?(@project, dev)
        @flag.pending_approval = true

        returnToUserWithNews = true

        adminNews = group.name + " has flagged " + @project.name + "! " +
          "Click here for details."

        customerNews = "A group from " + school.name + " wants to work on " +
          @project.name + "!"

        devNews = "Everyone's on board for " + @project.name + "!"

        # Notify admins of group consensus.
        adminRecipients.each do |recipient|
          message = Message.create(
            recipient_id: recipient.id,
            author_id: dev.id,
            body: adminNews
          )
        end
      end

      # Notify appropriate devs with current message.
      devRecipients = group.devs

      if !devNews || soloDev
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

      # Notify customer with current message.
      customerNews = customerNews || dev.full_name + " likes " + @project.name + "!"
      message = Message.create(
        author_id: dev.id,
        recipient_id: customer.id,
        body: customerNews
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

      if params[:flag][:instructor_approved] == "true" &&
         params[:flag][:customer_paid] != "true"

        dev = @flag.dev
        group = @flag.group
        school = @flag.school
        customer = @project.author

        customerNews = "You've received a bid for " + @project.name + "! " +
          "Click here for more details."

        devNews = "Your instructors have approved " + @project.name + "! " +
          "The customer has been notified."

        devRecipients = group.devs
        devRecipients.each do |recipient|
          Message.create(
          recipient_id: recipient.id,
            author_id: dev.id,
            body: devNews
          )
        end

        Message.create(
        recipient_id: customer.id,
          author_id: dev.id,
          body: customerNews
        )

      elsif params[:flag][:customer_paid] == "true"
        # Create slack channel for project.
        client = Slack::Web::Client.new
        slack = client.channels_create({name: @project.name})

        dev = @flag.dev
        group = @flag.group
        school = @flag.school
        customer = @project.author

        @project.update({group_id: group.id, slack_id: slack.channel.id})
        group.update({project_id: @project.id})

        customerNews = "We've received payment for " + @project.name + "! " +
          "Your developers will be contacting you shortly."

        devNews = "Congratulations on being selected to work on " +
          @project.name + "!"

        adminNews = group.name + " has been selected to work on " +
          @project.name + "!"

        # Message devs and set their current_project.
        devs = group.devs
        devs.each do |this_dev|
          this_dev.update({current_project_id: @project.id})

          message = Message.create(
            recipient_id: this_dev.id,
            author_id: dev.id,
            body: devNews
          )
        end

        # Message customer.
        message = Message.create(
          author_id: dev.id,
          recipient_id: customer.id,
          body: customerNews
        )

        # Message admins.
        adminRecipients = school.admins
        adminRecipients.each do |recipient|
          message = Message.create(
            recipient_id: recipient.id,
            author_id: dev.id,
            body: adminNews
          )
        end
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
