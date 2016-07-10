require 'google/apis/calendar_v3'
require 'googleauth'
require 'googleauth/stores/file_token_store'
require 'fileutils'

class Api::CalendarsController < ApplicationController
  def index
    google_client = Google::Apis::CalendarV3::CalendarService.new
    google_client.client_options.application_name = "MakerLink"
    google_client.authorization = calendar_authorize

    page_token = nil
    begin
      @events = google_client.list_events(event_params[:calendar_id])
      @events.items.each do |event|
        event.start = event.start.date_time
        event.end = event.end.date_time
      end
      if @events.next_page_token != page_token
        page_token = @events.next_page_token
      else
        page_token = nil
      end
    end while !page_token.nil?

    render :events
  end

  def create
    google_client = Google::Apis::CalendarV3::CalendarService.new
    google_client.client_options.application_name = "MakerLink"
    google_client.authorization = calendar_authorize

    p 'codeword6'
    p event_params[:calendar_id]

    newEvent = Google::Apis::CalendarV3::Event.new(
      summary: event_params[:title],
      start: {
        date_time: event_params[:start],
        time_zone: 'America/Los_Angeles'
      },
      end: {
        date_time: event_params[:end],
        time_zone: 'America/Los_Angeles'
      }
    )

    @event = google_client.insert_event(event_params[:calendar_id], newEvent)

    @event.start = @event.start.date_time
    @event.end = @event.end.date_time

    render :event
  end

  private
  def event_params
    params.permit(:title, :start, :end, :attendees, :calendar_id)
  end

  def calendar_authorize
    scope = Google::Apis::CalendarV3::AUTH_CALENDAR
    path = File.join(Dir.home, '.credentials', "calendar-ruby-makerlink.yaml")

    FileUtils.mkdir_p(File.dirname(path))

    client_id = Google::Auth::ClientId.from_file('client_secret.json')
    token_store = Google::Auth::Stores::FileTokenStore.new(file: path)
    authorizer = Google::Auth::UserAuthorizer.new(client_id, scope, token_store)
    user_id = 'default'
    credentials = authorizer.get_credentials(user_id)
    # Use if auth gets fucked.

    # if credentials.nil?
    #   url = authorizer.get_authorization_url(
    #     base_url: 'urn:ietf:wg:oauth:2.0:oob')
    #   puts "Open the following URL in the browser and enter the " +
    #        "resulting code after authorization"
    #   puts url
    #   code = gets
    #   credentials = authorizer.get_and_store_credentials_from_code(
    #     user_id: user_id, code: code, base_url: 'urn:ietf:wg:oauth:2.0:oob')
    # end
    credentials
  end
end
