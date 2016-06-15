# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160615034941) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cohorts", force: :cascade do |t|
    t.integer  "school_id",               null: false
    t.string   "name",                    null: false
    t.date     "project_completion_date", null: false
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  add_index "cohorts", ["school_id"], name: "index_cohorts_on_school_id", using: :btree

  create_table "flags", force: :cascade do |t|
    t.integer  "dev_id",              null: false
    t.integer  "project_id",          null: false
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.boolean  "instructor_approved"
    t.boolean  "customer_paid"
    t.boolean  "pending_approval"
    t.integer  "school_id",           null: false
    t.integer  "group_id",            null: false
  end

  add_index "flags", ["dev_id"], name: "index_flags_on_dev_id", using: :btree
  add_index "flags", ["project_id"], name: "index_flags_on_project_id", using: :btree

  create_table "groups", force: :cascade do |t|
    t.string  "name"
    t.integer "cohort_id"
  end

  create_table "messages", force: :cascade do |t|
    t.integer  "author_id",                    null: false
    t.integer  "recipient_id",                 null: false
    t.string   "body",                         null: false
    t.boolean  "is_sent",      default: false, null: false
    t.boolean  "is_trash",     default: false, null: false
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.boolean  "is_read"
  end

  add_index "messages", ["author_id"], name: "index_messages_on_author_id", using: :btree
  add_index "messages", ["recipient_id"], name: "index_messages_on_recipient_id", using: :btree

  create_table "projects", force: :cascade do |t|
    t.integer  "author_id",                   null: false
    t.integer  "dev_id"
    t.string   "name",                        null: false
    t.string   "pitch",                       null: false
    t.string   "description",                 null: false
    t.string   "url"
    t.integer  "view_count",      default: 0, null: false
    t.date     "expiration_date",             null: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  add_index "projects", ["author_id"], name: "index_projects_on_author_id", using: :btree

  create_table "schools", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tags", force: :cascade do |t|
    t.integer  "project_id", null: false
    t.string   "value",      null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "tags", ["project_id"], name: "index_tags_on_project_id", using: :btree

  create_table "tasks", force: :cascade do |t|
    t.integer  "author_id",              null: false
    t.integer  "project_id",             null: false
    t.string   "body",                   null: false
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.integer  "status",     default: 0, null: false
  end

  add_index "tasks", ["project_id"], name: "index_tasks_on_project_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.integer  "cohort_id"
    t.integer  "school_id"
    t.integer  "current_project_id"
    t.string   "first_name",         null: false
    t.string   "last_name",          null: false
    t.string   "password_digest",    null: false
    t.string   "session_token",      null: false
    t.string   "email",              null: false
    t.string   "mobile",             null: false
    t.string   "pic_url"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.integer  "group_id"
    t.string   "stripe_id"
  end

  add_index "users", ["cohort_id"], name: "index_users_on_cohort_id", using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["school_id"], name: "index_users_on_school_id", using: :btree

end
