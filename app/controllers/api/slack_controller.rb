class Api::SlackController < ApplicationController
  def index
    client = Slack::Web::Client.new
    @channel = client.channels_history(slack_params)
  end

  private
  def slack_params
    params.permit(:channel, :unreads)
  end
end
