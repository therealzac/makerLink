json.received_messages do
  json.array(@received_messages) do |received_message|
    json.partial!('message', message: message)
  end
end

json.unread_messages do
  json.array(@unread_messages) do |unread_message|
    json.partial!('message', message: message)
  end
end

json.sent_messages do
  json.array(@sent_messages) do |sent_message|
    json.partial!('message', message: message)
  end
end

json.drafts do
  json.array(@drafts) do |draft|
    json.partial!('message', message: message)
  end
end

json.trash do
  json.array(@trash) do |trash_item|
    json.partial!('message', message: message)
  end
end
