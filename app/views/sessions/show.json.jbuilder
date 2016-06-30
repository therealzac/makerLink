json.user do
  json.partial!('user', user: @user)
end

if @projects
  json.projects do
    json.array!(@projects) do |project|
      json.partial!('project', project: project)
    end
  end
end

if @cohorts
  json.cohorts do
    json.array!(@cohorts) do |cohort|
      json.partial!('cohort', cohort: cohort)
    end
  end
end

json.channel(@channel)
