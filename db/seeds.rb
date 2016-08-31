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
  description: "Blah blah blha.",
)

Project.create(
  author_id: 1,
  name: "Snooper",
  description: "Blah blah blha.",
)

Project.create(
  author_id: 1,
  name: "Cliff",
  description: "Blah blah blha.",
)

Project.create(
  author_id: 1,
  name: "Spliff",
  description: "Blah blah blha.",
)

Project.create(
  author_id: 1,
  name: "Sightcast",
  description: "Blah blah blha.",
)

Project.create(
  author_id: 1,
  name: "Free College",
  description: "Blah blah blha.",
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
