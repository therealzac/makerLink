class Api::SlackController < ApplicationController
  def create
    client = Slack::Web::Client.new
    client.chat_postMessage(channel: '#general', text: 'Slack it bitch', as_user: true)
  end
end
