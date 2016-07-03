class Api::SlackController < ApplicationController
  def index
    client = Slack::Web::Client.new
    @channel = client.channels_history(slack_params)
  end

  def create
    client = Slack::Web::Client.new
    @channel = client.chat_postMessage(slack_params)

    render :index
  end

  private
  def slack_params
    params.permit(:channel, :text, :username, :count)
  end
end
