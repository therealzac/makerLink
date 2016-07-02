# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
School.create(name: "Dev Bootcamp")

User.create(
  first_name: "Jo",
  last_name: "Customer",
  email: "customer@gmail.com",
  password: "password",
  mobile: "(505) 401-0936"
)

Project.create(
  author_id: 1,
  name: "HeirBNB",
  pitch: "Find your castle",
  description: "Blah blah blha.",
  expiration_date: "06-06-2006"
)

Project.create(
  author_id: 1,
  name: "Snooper",
  pitch: "Find the best pair of snoops.",
  description: "Blah blah blha.",
  expiration_date: "06-06-2006"
)

Project.create(
  author_id: 1,
  name: "Cliff",
  pitch: "Faker would have been a good choice.",
  description: "Blah blah blha.",
  expiration_date: "06-06-2006"
)

Project.create(
  author_id: 1,
  name: "Spliff",
  pitch: "Faker would have been a good choice.",
  description: "Blah blah blha.",
  expiration_date: "06-06-2006"
)

Project.create(
  author_id: 1,
  name: "Sightcast",
  pitch: "Faker would have been a good choice.",
  description: "Blah blah blha.",
  expiration_date: "06-06-2006"
)

Project.create(
  author_id: 1,
  name: "Free College",
  pitch: "Faker would have been a good choice.",
  description: "Blah blah blha.",
  expiration_date: "06-06-2006"
)

User.create(
  first_name: "Adam",
  last_name: "Admin",
  email: "admin@gmail.com",
  password: "password",
  mobile: "(505) 401-0936",
  school_id: 1,
)

Cohort.create(
name: "Gorillaz",
project_completion_date: "06-06-3006",
school_id: 1
)

User.create(
  first_name: "Becky",
  last_name: "Flakes",
  email: "becky@gmail.com",
  password: "password",
  mobile: "(505) 401-0936",
  cohort_id: 1,
)

User.create(
  first_name: "Jo",
  last_name: "Trevino",
  email: "jo@gmail.com",
  password: "password",
  mobile: "(505) 401-0936",
  cohort_id: 1,
)
