class Api::MessagesController < ApplicationController
  def create
    @message = Message.new(message_params)
    if @message.save
      render :blank
    else
      render json: @message.errors.full_messages, status: 422
    end
  end

  def index
    id = params[:id]
    if id == "" || !id
      render :blank
    else
      all_messages = Message.where("recipient_id = #{id} OR author_id = #{id}")
      @received_messages = all_messages.where("recipient_id = #{id}")
      @unread_messages = @received_messages.where("is_read = false")

      @trash = all_messages.where("is_trash = true")

      authored_messages = all_messages.where("author_id = #{id}")
      @drafts = authored_messages.where("is_sent = false")
      @sent_messages = authored_messages.where("is_sent = true")
    end
  end

  def update
  end

  private
  def message_params
    params.require(:message).permit(
    :author_id,
    :recipient_id,
    :body,
    :is_sent,
    :is_trash
    )
  end
end
