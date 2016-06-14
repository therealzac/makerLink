json.partial!('flag', flag: @flag)
json.project { json.partial!('project', project: @project) }
json.message { json.partial!('message', message: @message) } if @message
