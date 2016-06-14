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

ActiveRecord::Schema.define(version: 20160612223144) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "account_emailaddress", force: :cascade do |t|
    t.string  "email",    limit: 254, null: false
    t.boolean "verified",             null: false
    t.boolean "primary",              null: false
    t.integer "user_id",              null: false
  end

  add_index "account_emailaddress", ["email"], name: "account_emailaddress_email_03be32b2_like", using: :btree
  add_index "account_emailaddress", ["email"], name: "account_emailaddress_email_key", unique: true, using: :btree
  add_index "account_emailaddress", ["user_id"], name: "account_emailaddress_e8701ad4", using: :btree

  create_table "account_emailconfirmation", force: :cascade do |t|
    t.datetime "created",                     null: false
    t.datetime "sent"
    t.string   "key",              limit: 64, null: false
    t.integer  "email_address_id",            null: false
  end

  add_index "account_emailconfirmation", ["email_address_id"], name: "account_emailconfirmation_6f1edeac", using: :btree
  add_index "account_emailconfirmation", ["key"], name: "account_emailconfirmation_key_f43612bd_like", using: :btree
  add_index "account_emailconfirmation", ["key"], name: "account_emailconfirmation_key_key", unique: true, using: :btree

  create_table "auth_group", force: :cascade do |t|
    t.string "name", limit: 80, null: false
  end

  add_index "auth_group", ["name"], name: "auth_group_name_a6ea08ec_like", using: :btree
  add_index "auth_group", ["name"], name: "auth_group_name_key", unique: true, using: :btree

  create_table "auth_group_permissions", force: :cascade do |t|
    t.integer "group_id",      null: false
    t.integer "permission_id", null: false
  end

  add_index "auth_group_permissions", ["group_id", "permission_id"], name: "auth_group_permissions_group_id_0cd325b0_uniq", unique: true, using: :btree
  add_index "auth_group_permissions", ["group_id"], name: "auth_group_permissions_0e939a4f", using: :btree
  add_index "auth_group_permissions", ["permission_id"], name: "auth_group_permissions_8373b171", using: :btree

  create_table "auth_permission", force: :cascade do |t|
    t.string  "name",            limit: 255, null: false
    t.integer "content_type_id",             null: false
    t.string  "codename",        limit: 100, null: false
  end

  add_index "auth_permission", ["content_type_id", "codename"], name: "auth_permission_content_type_id_01ab375a_uniq", unique: true, using: :btree
  add_index "auth_permission", ["content_type_id"], name: "auth_permission_417f1b1c", using: :btree

  create_table "auth_user", force: :cascade do |t|
    t.string   "password",     limit: 128, null: false
    t.datetime "last_login"
    t.boolean  "is_superuser",             null: false
    t.string   "username",     limit: 30,  null: false
    t.string   "first_name",   limit: 30,  null: false
    t.string   "last_name",    limit: 30,  null: false
    t.string   "email",        limit: 254, null: false
    t.boolean  "is_staff",                 null: false
    t.boolean  "is_active",                null: false
    t.datetime "date_joined",              null: false
  end

  add_index "auth_user", ["username"], name: "auth_user_username_6821ab7c_like", using: :btree
  add_index "auth_user", ["username"], name: "auth_user_username_key", unique: true, using: :btree

  create_table "auth_user_groups", force: :cascade do |t|
    t.integer "user_id",  null: false
    t.integer "group_id", null: false
  end

  add_index "auth_user_groups", ["group_id"], name: "auth_user_groups_0e939a4f", using: :btree
  add_index "auth_user_groups", ["user_id", "group_id"], name: "auth_user_groups_user_id_94350c0c_uniq", unique: true, using: :btree
  add_index "auth_user_groups", ["user_id"], name: "auth_user_groups_e8701ad4", using: :btree

  create_table "auth_user_user_permissions", force: :cascade do |t|
    t.integer "user_id",       null: false
    t.integer "permission_id", null: false
  end

  add_index "auth_user_user_permissions", ["permission_id"], name: "auth_user_user_permissions_8373b171", using: :btree
  add_index "auth_user_user_permissions", ["user_id", "permission_id"], name: "auth_user_user_permissions_user_id_14a6b632_uniq", unique: true, using: :btree
  add_index "auth_user_user_permissions", ["user_id"], name: "auth_user_user_permissions_e8701ad4", using: :btree

  create_table "cohorts", force: :cascade do |t|
    t.integer  "school_id",               null: false
    t.string   "name",                    null: false
    t.date     "project_completion_date", null: false
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  add_index "cohorts", ["school_id"], name: "index_cohorts_on_school_id", using: :btree

  create_table "django_admin_log", force: :cascade do |t|
    t.datetime "action_time",                 null: false
    t.text     "object_id"
    t.string   "object_repr",     limit: 200, null: false
    t.integer  "action_flag",     limit: 2,   null: false
    t.text     "change_message",              null: false
    t.integer  "content_type_id"
    t.integer  "user_id",                     null: false
  end

  add_index "django_admin_log", ["content_type_id"], name: "django_admin_log_417f1b1c", using: :btree
  add_index "django_admin_log", ["user_id"], name: "django_admin_log_e8701ad4", using: :btree

  create_table "django_content_type", force: :cascade do |t|
    t.string "app_label", limit: 100, null: false
    t.string "model",     limit: 100, null: false
  end

  add_index "django_content_type", ["app_label", "model"], name: "django_content_type_app_label_76bd3d3b_uniq", unique: true, using: :btree

  create_table "django_migrations", force: :cascade do |t|
    t.string   "app",     limit: 255, null: false
    t.string   "name",    limit: 255, null: false
    t.datetime "applied",             null: false
  end

  create_table "django_session", primary_key: "session_key", force: :cascade do |t|
    t.text     "session_data", null: false
    t.datetime "expire_date",  null: false
  end

  add_index "django_session", ["expire_date"], name: "django_session_de54fa62", using: :btree
  add_index "django_session", ["session_key"], name: "django_session_session_key_c0390e0f_like", using: :btree

  create_table "django_site", force: :cascade do |t|
    t.string "domain", limit: 100, null: false
    t.string "name",   limit: 50,  null: false
  end

  add_index "django_site", ["domain"], name: "django_site_domain_a2e37b91_like", using: :btree
  add_index "django_site", ["domain"], name: "django_site_domain_a2e37b91_uniq", unique: true, using: :btree

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
    t.boolean  "is_read",      default: false, null: false
    t.string   "subject",                      null: false
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
    t.integer  "author_id",                   null: false
    t.integer  "project_id",                  null: false
    t.string   "body",                        null: false
    t.string   "status",     default: "todo", null: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  add_index "tasks", ["project_id"], name: "index_tasks_on_project_id", using: :btree

  create_table "trudy_academicclass", force: :cascade do |t|
    t.string   "name",              limit: 255, null: false
    t.string   "class_code",        limit: 50
    t.float    "gpa"
    t.float    "quality_hours"
    t.boolean  "remedial",                      null: false
    t.boolean  "honors",                        null: false
    t.boolean  "transferred",                   null: false
    t.integer  "class_category_id"
    t.integer  "class_type_id"
    t.float    "units_attempted"
    t.float    "units_earned"
    t.integer  "grade_status"
    t.datetime "created_at",                    null: false
    t.integer  "term_id",                       null: false
    t.datetime "updated_at",                    null: false
  end

  add_index "trudy_academicclass", ["class_category_id"], name: "trudy_academicclass_813d359a", using: :btree
  add_index "trudy_academicclass", ["class_type_id"], name: "trudy_academicclass_c00a02a1", using: :btree
  add_index "trudy_academicclass", ["term_id"], name: "trudy_academicclass_ba3248a2", using: :btree

  create_table "trudy_academicterm", force: :cascade do |t|
    t.integer  "batch_year",             null: false
    t.integer  "term",                   null: false
    t.float    "cumulative_gpa"
    t.float    "credits_earned"
    t.integer  "academic_standing"
    t.integer  "enrollment_status"
    t.integer  "student_id"
    t.integer  "college_id"
    t.integer  "annual_student_data_id", null: false
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.float    "credits_attempted"
  end

  add_index "trudy_academicterm", ["annual_student_data_id"], name: "trudy_academicterm_53cf7b1b", using: :btree
  add_index "trudy_academicterm", ["college_id"], name: "trudy_academicterm_3d404635", using: :btree
  add_index "trudy_academicterm", ["student_id", "batch_year", "term"], name: "trudy_academicterm_student_id_386e425d_uniq", unique: true, using: :btree
  add_index "trudy_academicterm", ["student_id"], name: "trudy_academicterm_30a811f6", using: :btree

  create_table "trudy_academicterm_major", force: :cascade do |t|
    t.integer "academicterm_id", null: false
    t.integer "major_id",        null: false
  end

  add_index "trudy_academicterm_major", ["academicterm_id", "major_id"], name: "trudy_academicterm_major_academicterm_id_8fc1f5ff_uniq", unique: true, using: :btree
  add_index "trudy_academicterm_major", ["academicterm_id"], name: "trudy_academicterm_major_d4847723", using: :btree
  add_index "trudy_academicterm_major", ["major_id"], name: "trudy_academicterm_major_632501ce", using: :btree

  create_table "trudy_academicterm_minor", force: :cascade do |t|
    t.integer "academicterm_id", null: false
    t.integer "major_id",        null: false
  end

  add_index "trudy_academicterm_minor", ["academicterm_id", "major_id"], name: "trudy_academicterm_minor_academicterm_id_1ac8c8e8_uniq", unique: true, using: :btree
  add_index "trudy_academicterm_minor", ["academicterm_id"], name: "trudy_academicterm_minor_d4847723", using: :btree
  add_index "trudy_academicterm_minor", ["major_id"], name: "trudy_academicterm_minor_632501ce", using: :btree

  create_table "trudy_annualcollegedata", force: :cascade do |t|
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.integer  "batch_year",                   null: false
    t.float    "resident_tuition_and_fees"
    t.float    "nonresident_tuition_and_fees"
    t.float    "room_and_board"
    t.float    "personal"
    t.float    "other_costs"
    t.float    "transportation"
    t.float    "books_and_supplies"
    t.float    "pell_grant_percentage"
    t.float    "admitted"
    t.float    "four_yr_grad_rate"
    t.float    "six_yr_grad_rate"
    t.float    "avg_hs_gpa"
    t.float    "median_sat"
    t.float    "median_act"
    t.integer  "mn_earn_wne_p6"
    t.integer  "db_required_credits"
    t.integer  "selectivity_tier"
    t.integer  "college_id",                   null: false
    t.float    "avg_salary"
    t.float    "freshmen_retention"
    t.boolean  "mn_earn_wne_p6_estimated"
    t.float    "avg_net_cost_after_grants"
    t.float    "avg_net_cost_lo_inc"
    t.float    "avg_student_loan_amt"
    t.float    "five_yr_grad_rate"
    t.boolean  "open_admissions"
    t.float    "per_pell_among_undergrad"
    t.float    "stem_percentage"
    t.float    "three_yr_default_rate"
    t.float    "undergrad_size"
  end

  add_index "trudy_annualcollegedata", ["college_id", "batch_year"], name: "trudy_annualcollegedata_college_id_7ddc107f_uniq", unique: true, using: :btree
  add_index "trudy_annualcollegedata", ["college_id"], name: "trudy_annualcollegedata_3d404635", using: :btree

  create_table "trudy_annualstudentdata", force: :cascade do |t|
    t.integer  "cohort"
    t.integer  "year_as_college_freshman"
    t.string   "mobile",                                limit: 20
    t.integer  "year_of_application"
    t.string   "hs_grade_level",                        limit: 25
    t.string   "entry_date",                            limit: 10
    t.string   "exit_date",                             limit: 10
    t.boolean  "PELL_GRANT_ELIGABLE",                                                       null: false
    t.integer  "eligibility_cd",                        limit: 2
    t.integer  "academic_need",                         limit: 2
    t.boolean  "AB540",                                                                     null: false
    t.boolean  "EOP",                                                                       null: false
    t.float    "SEOG"
    t.float    "EFC"
    t.decimal  "institutional_grants_received",                     precision: 8, scale: 2
    t.decimal  "work_study_grants",                                 precision: 8, scale: 2
    t.decimal  "cal_grants_received",                               precision: 8, scale: 2
    t.decimal  "pell_grants_received",                              precision: 8, scale: 2
    t.decimal  "ac_grants_received",                                precision: 8, scale: 2
    t.string   "sports",                                limit: 100
    t.string   "extracurricular",                       limit: 100
    t.string   "parent_first_name",                     limit: 35
    t.string   "parent_last_name",                      limit: 35
    t.string   "parent_email",                          limit: 254
    t.string   "parent_phone",                          limit: 20
    t.string   "pr_award_no",                           limit: 11
    t.integer  "batch_year"
    t.date     "first_enrolled"
    t.string   "first_service",                         limit: 10
    t.date     "last_service"
    t.integer  "entrance_grade_level",                  limit: 2
    t.integer  "p_beg_college_grade_level",             limit: 2
    t.integer  "p_current_college_grade_level",         limit: 2
    t.integer  "enrollment_status",                     limit: 2
    t.integer  "participant_status",                    limit: 2
    t.integer  "academic_standing",                     limit: 2
    t.float    "cumulative_gpa"
    t.integer  "withdraw_reason",                       limit: 2
    t.integer  "transfer_status",                       limit: 2
    t.integer  "degree_completed",                      limit: 2
    t.string   "undergrad_degree_dt",                   limit: 10
    t.integer  "field_of_study_degree_earned",          limit: 2
    t.decimal  "federal_parent_plus_received",                      precision: 8, scale: 2
    t.decimal  "federal_perkins_loans_received",                    precision: 8, scale: 2
    t.decimal  "institutional_loans_received",                      precision: 8, scale: 2
    t.decimal  "private_loans_received",                            precision: 8, scale: 2
    t.decimal  "sss_grants_received",                               precision: 8, scale: 2
    t.decimal  "stafford_sub_perkins_loans_received",               precision: 8, scale: 2
    t.decimal  "stafford_unsub_perkins_loans_received",             precision: 8, scale: 2
    t.decimal  "state_grants_received",                             precision: 8, scale: 2
    t.integer  "student_id"
    t.decimal  "financial_aid_received",                            precision: 8, scale: 2
    t.integer  "persistence_status",                    limit: 2
    t.datetime "created_at",                                                                null: false
    t.datetime "updated_at",                                                                null: false
    t.decimal  "books_and_supplies",                                precision: 8, scale: 2
    t.decimal  "gi_bill",                                           precision: 8, scale: 2
    t.decimal  "institutional_scholarships_received",               precision: 8, scale: 2
    t.decimal  "personal_budget",                                   precision: 8, scale: 2
    t.decimal  "private_scholarships_received",                     precision: 8, scale: 2
    t.decimal  "room_and_board",                                    precision: 8, scale: 2
    t.decimal  "transportation",                                    precision: 8, scale: 2
    t.decimal  "tuition_and_fees",                                  precision: 8, scale: 2
    t.decimal  "cost_of_attendance",                                precision: 8, scale: 2
    t.decimal  "net_cost",                                          precision: 8, scale: 2
    t.decimal  "total_gift_aid_received",                           precision: 8, scale: 2
    t.decimal  "total_student_loans_received",                      precision: 8, scale: 2
  end

  add_index "trudy_annualstudentdata", ["student_id", "batch_year"], name: "trudy_annualstudentdata_student_id_3a2a5891_uniq", unique: true, using: :btree
  add_index "trudy_annualstudentdata", ["student_id"], name: "trudy_annualdata2014_30a811f6", using: :btree

  create_table "trudy_booking", primary_key: "application_id", force: :cascade do |t|
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.datetime "start_time"
    t.datetime "end_time"
    t.text     "hangout_link"
    t.integer  "rescheduled",  null: false
  end

  create_table "trudy_booking_interviewers", force: :cascade do |t|
    t.integer "booking_id",     null: false
    t.integer "interviewer_id", null: false
  end

  add_index "trudy_booking_interviewers", ["booking_id", "interviewer_id"], name: "trudy_booking_interviewers_booking_id_eb2630b1_uniq", unique: true, using: :btree
  add_index "trudy_booking_interviewers", ["booking_id"], name: "trudy_booking_interviewers_b0060af7", using: :btree
  add_index "trudy_booking_interviewers", ["interviewer_id"], name: "trudy_booking_interviewers_cb0f7719", using: :btree

  create_table "trudy_childorganization", force: :cascade do |t|
    t.string  "name",                   limit: 100, null: false
    t.string  "address_street",         limit: 100, null: false
    t.string  "address_city",           limit: 100, null: false
    t.string  "address_zip",            limit: 20,  null: false
    t.string  "address_state",          limit: 20,  null: false
    t.string  "phone",                  limit: 20,  null: false
    t.integer "parent_organization_id",             null: false
  end

  add_index "trudy_childorganization", ["parent_organization_id"], name: "trudy_childorganization_3693957f", using: :btree

  create_table "trudy_classcategory", force: :cascade do |t|
    t.string "name",   limit: 500, null: false
    t.float  "weight",             null: false
  end

  add_index "trudy_classcategory", ["name"], name: "trudy_classcategory_name_23f57d1d_like", using: :btree
  add_index "trudy_classcategory", ["name"], name: "trudy_classcategory_name_key", unique: true, using: :btree

  create_table "trudy_classtype", force: :cascade do |t|
    t.string "name",   limit: 500, null: false
    t.float  "weight",             null: false
  end

  add_index "trudy_classtype", ["name"], name: "trudy_classtype_name_db4c471f_like", using: :btree
  add_index "trudy_classtype", ["name"], name: "trudy_classtype_name_key", unique: true, using: :btree

  create_table "trudy_college", force: :cascade do |t|
    t.string   "name",               limit: 100, null: false
    t.string   "address_street",     limit: 100
    t.string   "address_city",       limit: 100
    t.string   "address_zip",        limit: 20
    t.string   "address_state",      limit: 20
    t.string   "phone",              limit: 20
    t.string   "url",                limit: 200
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.string   "sector",             limit: 100
    t.string   "PEID",               limit: 10
    t.boolean  "in_smartloan",                   null: false
    t.integer  "common_degree_type"
    t.integer  "school_type"
  end

  create_table "trudy_collegeapplication", force: :cascade do |t|
    t.float   "tuition_and_fees"
    t.float   "room_and_board"
    t.float   "personal"
    t.float   "other_costs"
    t.float   "transportation"
    t.float   "books_and_supplies"
    t.float   "federal_pell_grants"
    t.float   "federal_seog"
    t.float   "institutional_grants"
    t.float   "institutional_scholarships"
    t.float   "private_scholarships"
    t.float   "work_study"
    t.float   "federal_perkins_loan"
    t.float   "state_grants"
    t.float   "federal_subsidized_stafford_loans"
    t.float   "federal_unsubsidized_stafford_loans"
    t.float   "institutional_loans"
    t.float   "private_loans"
    t.float   "parent_plus_loans"
    t.float   "expected_family_contribution"
    t.integer "status",                              null: false
    t.integer "batch_year",                          null: false
    t.integer "annual_student_data_id",              null: false
    t.integer "college_id",                          null: false
    t.integer "student_id",                          null: false
    t.float   "cost_of_attendance"
    t.float   "cost_with_gift_aid"
    t.float   "net_cost"
    t.float   "total_gift_aid"
    t.float   "total_student_loans"
    t.boolean "edited",                              null: false
    t.float   "state_loans"
    t.integer "annual_college_data_id"
  end

  add_index "trudy_collegeapplication", ["annual_college_data_id"], name: "trudy_collegeapplication_341040bf", using: :btree
  add_index "trudy_collegeapplication", ["annual_student_data_id"], name: "trudy_collegeapplication_53cf7b1b", using: :btree
  add_index "trudy_collegeapplication", ["college_id"], name: "trudy_collegeapplication_3d404635", using: :btree
  add_index "trudy_collegeapplication", ["student_id", "college_id", "batch_year"], name: "trudy_collegeapplication_student_id_0ccee0fb_uniq", unique: true, using: :btree
  add_index "trudy_collegeapplication", ["student_id"], name: "trudy_collegeapplication_30a811f6", using: :btree

  create_table "trudy_collegestudent", force: :cascade do |t|
    t.string  "status",                              limit: 4, null: false
    t.float   "total_private_scholarships"
    t.float   "total_institutional_scholarships"
    t.float   "work_study"
    t.float   "private_loans"
    t.float   "federal_perkins_loan"
    t.float   "federal_subsidized_stafford_loans"
    t.float   "federal_unsubsidized_stafford_loans"
    t.float   "parent_plus_loans"
    t.float   "federal_pell_grant"
    t.float   "federal_SEOG"
    t.float   "institutional_grant"
    t.float   "institutional_loans"
    t.float   "state_grant"
    t.float   "food_expenses"
    t.float   "tuition_and_fees"
    t.float   "room_and_board"
    t.float   "books_and_supplies"
    t.float   "personal"
    t.float   "transportation"
    t.float   "total_finanical_package"
    t.float   "total_cost"
    t.float   "total_grants"
    t.float   "efc"
    t.float   "total_scholarships"
    t.integer "college_id",                                    null: false
    t.integer "student_id",                                    null: false
  end

  add_index "trudy_collegestudent", ["college_id"], name: "trudy_collegestudent_3d404635", using: :btree
  add_index "trudy_collegestudent", ["student_id"], name: "trudy_collegestudent_30a811f6", using: :btree

  create_table "trudy_counselor", force: :cascade do |t|
    t.string  "first_name",      limit: 35
    t.string  "middle_name",     limit: 35
    t.string  "last_name",       limit: 35
    t.string  "address_street",  limit: 100
    t.string  "address_city",    limit: 100
    t.string  "address_zip",     limit: 20
    t.string  "address_state",   limit: 20
    t.string  "phone",           limit: 20
    t.integer "organization_id",             null: false
    t.integer "user_profile_id",             null: false
  end

  add_index "trudy_counselor", ["organization_id"], name: "trudy_counselor_26b2345e", using: :btree
  add_index "trudy_counselor", ["user_profile_id"], name: "trudy_counselor_user_profile_id_key", unique: true, using: :btree

  create_table "trudy_counselor_students", force: :cascade do |t|
    t.integer "counselor_id", null: false
    t.integer "student_id",   null: false
  end

  add_index "trudy_counselor_students", ["counselor_id", "student_id"], name: "trudy_counselor_students_counselor_id_2615569e_uniq", unique: true, using: :btree
  add_index "trudy_counselor_students", ["counselor_id"], name: "trudy_counselor_students_f8b35d09", using: :btree
  add_index "trudy_counselor_students", ["student_id"], name: "trudy_counselor_students_30a811f6", using: :btree

  create_table "trudy_course", force: :cascade do |t|
    t.string  "course_number", limit: 35,  null: false
    t.string  "name",          limit: 100, null: false
    t.float   "units",                     null: false
    t.integer "college_id_id",             null: false
  end

  add_index "trudy_course", ["college_id_id"], name: "trudy_course_e70155af", using: :btree

  create_table "trudy_enrollment", force: :cascade do |t|
    t.date    "entry_date",    null: false
    t.date    "exit_date",     null: false
    t.integer "grade_level",   null: false
    t.integer "college_id_id", null: false
    t.integer "school_id_id",  null: false
    t.integer "student_id_id", null: false
  end

  add_index "trudy_enrollment", ["college_id_id"], name: "trudy_enrollment_e70155af", using: :btree
  add_index "trudy_enrollment", ["school_id_id"], name: "trudy_enrollment_4a31d710", using: :btree
  add_index "trudy_enrollment", ["student_id_id"], name: "trudy_enrollment_e462bf81", using: :btree

  create_table "trudy_ethnicity", force: :cascade do |t|
    t.integer "background"
  end

  create_table "trudy_extracurractivities", force: :cascade do |t|
    t.text    "activity"
    t.date    "start_date"
    t.date    "end_date"
    t.boolean "ongoing",        null: false
    t.integer "application_id", null: false
  end

  add_index "trudy_extracurractivities", ["application_id"], name: "trudy_extracurractivities_6bc0a4eb", using: :btree

  create_table "trudy_familymeeting", force: :cascade do |t|
    t.text     "notes"
    t.datetime "date",       null: false
    t.integer  "student_id", null: false
  end

  add_index "trudy_familymeeting", ["student_id"], name: "trudy_familymeeting_30a811f6", using: :btree

  create_table "trudy_fileupload", force: :cascade do |t|
    t.text     "description"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.integer  "upload_type",                 null: false
    t.string   "file",            limit: 100, null: false
    t.integer  "student_id"
    t.integer  "uploader_id",                 null: false
    t.integer  "application_id"
    t.string   "extension",       limit: 5
    t.boolean  "processed",                   null: false
    t.boolean  "illegible",                   null: false
    t.integer  "processed_by_id"
  end

  add_index "trudy_fileupload", ["application_id"], name: "trudy_fileupload_6bc0a4eb", using: :btree
  add_index "trudy_fileupload", ["processed_by_id"], name: "trudy_fileupload_18ad76df", using: :btree
  add_index "trudy_fileupload", ["student_id"], name: "trudy_fileupload_30a811f6", using: :btree
  add_index "trudy_fileupload", ["uploader_id"], name: "trudy_fileupload_af76a535", using: :btree

  create_table "trudy_financialsurvey", force: :cascade do |t|
    t.string  "first_name",               limit: 55,  null: false
    t.string  "last_name",                limit: 55,  null: false
    t.string  "email",                    limit: 254, null: false
    t.integer "units_completed"
    t.integer "work_hours_week"
    t.boolean "undergraduate",                        null: false
    t.boolean "graduated",                            null: false
    t.boolean "not_in_school",                        null: false
    t.float   "parent_plus_total"
    t.float   "private_loans_total"
    t.float   "other_loans_total"
    t.float   "loans_this_year"
    t.boolean "applied_parent_plus",                  null: false
    t.boolean "denied_parent_plus",                   null: false
    t.integer "upcoming_finance_options"
    t.integer "college_id"
    t.integer "organization_id"
    t.boolean "completed",                            null: false
    t.string  "unknown_college",          limit: 55
    t.boolean "use_unknown_college",                  null: false
  end

  add_index "trudy_financialsurvey", ["college_id"], name: "trudy_financialsurvey_3d404635", using: :btree
  add_index "trudy_financialsurvey", ["email"], name: "trudy_financialsurvey_email_22c3e2f3_like", using: :btree
  add_index "trudy_financialsurvey", ["email"], name: "trudy_financialsurvey_email_key", unique: true, using: :btree
  add_index "trudy_financialsurvey", ["organization_id"], name: "trudy_financialsurvey_26b2345e", using: :btree

  create_table "trudy_financialsurvey_major", force: :cascade do |t|
    t.integer "financialsurvey_id", null: false
    t.integer "major_id",           null: false
  end

  add_index "trudy_financialsurvey_major", ["financialsurvey_id", "major_id"], name: "trudy_financialsurvey_major_financialsurvey_id_a17de187_uniq", unique: true, using: :btree
  add_index "trudy_financialsurvey_major", ["financialsurvey_id"], name: "trudy_financialsurvey_major_979a9de9", using: :btree
  add_index "trudy_financialsurvey_major", ["major_id"], name: "trudy_financialsurvey_major_632501ce", using: :btree

  create_table "trudy_financialsurveyv2", force: :cascade do |t|
    t.string  "first_name",               limit: 55,  null: false
    t.string  "last_name",                limit: 55,  null: false
    t.string  "email",                    limit: 254, null: false
    t.integer "units_completed"
    t.string  "unknown_college",          limit: 55
    t.boolean "use_unknown_college",                  null: false
    t.integer "work_hours_week"
    t.boolean "undergraduate",                        null: false
    t.boolean "graduated",                            null: false
    t.boolean "not_in_school",                        null: false
    t.float   "parent_plus_total"
    t.float   "private_loans_total"
    t.float   "other_loans_total"
    t.float   "loans_this_year"
    t.boolean "applied_parent_plus",                  null: false
    t.boolean "denied_parent_plus",                   null: false
    t.integer "upcoming_finance_options"
    t.boolean "completed",                            null: false
    t.string  "high_school",              limit: 255
    t.integer "high_school_grad_year"
    t.integer "private_interest_rate"
    t.integer "credit_card_tuition"
    t.integer "college_id"
    t.integer "organization_id"
    t.float   "cumulative_college_gpa",               null: false
  end

  add_index "trudy_financialsurveyv2", ["college_id"], name: "trudy_financialsurveyv2_3d404635", using: :btree
  add_index "trudy_financialsurveyv2", ["email"], name: "trudy_financialsurveyv2_email_322d15fa_like", using: :btree
  add_index "trudy_financialsurveyv2", ["email"], name: "trudy_financialsurveyv2_email_key", unique: true, using: :btree
  add_index "trudy_financialsurveyv2", ["organization_id"], name: "trudy_financialsurveyv2_26b2345e", using: :btree

  create_table "trudy_financialsurveyv2_major", force: :cascade do |t|
    t.integer "financialsurveyv2_id", null: false
    t.integer "major_id",             null: false
  end

  add_index "trudy_financialsurveyv2_major", ["financialsurveyv2_id", "major_id"], name: "trudy_financialsurveyv2_majo_financialsurveyv2_id_dad1aa96_uniq", unique: true, using: :btree
  add_index "trudy_financialsurveyv2_major", ["financialsurveyv2_id"], name: "trudy_financialsurveyv2_major_830fe49c", using: :btree
  add_index "trudy_financialsurveyv2_major", ["major_id"], name: "trudy_financialsurveyv2_major_632501ce", using: :btree

  create_table "trudy_highschool", force: :cascade do |t|
    t.string "name",           limit: 100, null: false
    t.string "number",         limit: 25
    t.string "address_street", limit: 100
    t.string "address_city",   limit: 100
    t.string "address_zip",    limit: 20
    t.string "address_state",  limit: 20
    t.string "phone",          limit: 20
  end

  create_table "trudy_highschool_counselors", force: :cascade do |t|
    t.integer "highschool_id", null: false
    t.integer "counselor_id",  null: false
  end

  add_index "trudy_highschool_counselors", ["counselor_id"], name: "trudy_highschool_counselors_f8b35d09", using: :btree
  add_index "trudy_highschool_counselors", ["highschool_id", "counselor_id"], name: "trudy_highschool_counselors_highschool_id_2b5bf92c_uniq", unique: true, using: :btree
  add_index "trudy_highschool_counselors", ["highschool_id"], name: "trudy_highschool_counselors_ddae9605", using: :btree

  create_table "trudy_highschool_students", force: :cascade do |t|
    t.integer "highschool_id", null: false
    t.integer "student_id",    null: false
  end

  add_index "trudy_highschool_students", ["highschool_id", "student_id"], name: "trudy_highschool_students_highschool_id_8f187fb9_uniq", unique: true, using: :btree
  add_index "trudy_highschool_students", ["highschool_id"], name: "trudy_highschool_students_ddae9605", using: :btree
  add_index "trudy_highschool_students", ["student_id"], name: "trudy_highschool_students_30a811f6", using: :btree

  create_table "trudy_internships", force: :cascade do |t|
    t.text    "company_or_org"
    t.text    "role"
    t.date    "start_date"
    t.date    "end_date"
    t.boolean "ongoing",        null: false
    t.integer "application_id", null: false
  end

  add_index "trudy_internships", ["application_id"], name: "trudy_internships_6bc0a4eb", using: :btree

  create_table "trudy_interviewanswers", force: :cascade do |t|
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.integer  "curiosity_and_creativity"
    t.integer  "resourcefulness"
    t.integer  "connectedness"
    t.integer  "purpose"
    t.integer  "problem_solver"
    t.boolean  "social_awareness"
    t.boolean  "engagement"
    t.boolean  "conversational"
    t.boolean  "answers_available"
    t.boolean  "language_interaction"
    t.boolean  "body_language"
    t.boolean  "eye_contact"
    t.integer  "application_id",           null: false
    t.integer  "interviewer_id",           null: false
    t.text     "score_note"
    t.text     "summary_note"
  end

  add_index "trudy_interviewanswers", ["application_id"], name: "trudy_interviewanswers_6bc0a4eb", using: :btree
  add_index "trudy_interviewanswers", ["interviewer_id", "application_id"], name: "trudy_interviewanswers_interviewer_id_5bb4549f_uniq", unique: true, using: :btree
  add_index "trudy_interviewanswers", ["interviewer_id"], name: "trudy_interviewanswers_cb0f7719", using: :btree

  create_table "trudy_interviewer", force: :cascade do |t|
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.string   "first_name",      limit: 35
    t.string   "last_name",       limit: 35
    t.text     "description"
    t.text     "calendar_link"
    t.string   "phone",           limit: 20
    t.string   "address_street",  limit: 100
    t.string   "address_city",    limit: 100
    t.string   "address_zip",     limit: 20
    t.string   "address_state",   limit: 20
    t.integer  "priority"
    t.integer  "user_profile_id"
  end

  add_index "trudy_interviewer", ["user_profile_id"], name: "trudy_interviewer_user_profile_id_key", unique: true, using: :btree

  create_table "trudy_invitation", force: :cascade do |t|
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.datetime "accepted_at"
    t.integer  "invited_by_id", null: false
    t.integer  "student_id",    null: false
  end

  add_index "trudy_invitation", ["invited_by_id"], name: "trudy_invitation_36fc3d93", using: :btree
  add_index "trudy_invitation", ["student_id", "invited_by_id"], name: "trudy_invitation_student_id_0ac712e3_uniq", unique: true, using: :btree
  add_index "trudy_invitation", ["student_id"], name: "trudy_invitation_30a811f6", using: :btree

  create_table "trudy_invitecode", force: :cascade do |t|
    t.string   "invite_code",     limit: 20,  null: false
    t.integer  "organization_id",             null: false
    t.boolean  "expired",                     null: false
    t.integer  "referred_by_id"
    t.integer  "type",                        null: false
    t.string   "email",           limit: 254
    t.datetime "created_at",                  null: false
    t.string   "first_name",      limit: 35
    t.string   "last_name",       limit: 35
    t.datetime "updated_at",                  null: false
  end

  add_index "trudy_invitecode", ["invite_code"], name: "trudy_invitecode_invite_code_3303a803_like", using: :btree
  add_index "trudy_invitecode", ["invite_code"], name: "trudy_invitecode_invite_code_key", unique: true, using: :btree
  add_index "trudy_invitecode", ["organization_id"], name: "trudy_invitecode_26b2345e", using: :btree
  add_index "trudy_invitecode", ["referred_by_id"], name: "trudy_invitecode_b483248d", using: :btree

  create_table "trudy_major", force: :cascade do |t|
    t.string  "name",              limit: 500, null: false
    t.string  "cip_code",          limit: 10
    t.float   "weight",                        null: false
    t.integer "category_id"
    t.integer "classification_id"
    t.float   "median_earnings"
    t.boolean "active",                        null: false
  end

  add_index "trudy_major", ["category_id"], name: "trudy_major_b583a629", using: :btree
  add_index "trudy_major", ["cip_code"], name: "trudy_major_cip_code_key", unique: true, using: :btree
  add_index "trudy_major", ["classification_id"], name: "trudy_major_946aa2ca", using: :btree

  create_table "trudy_majorcategory", force: :cascade do |t|
    t.string  "name",       limit: 500, null: false
    t.float   "weight",                 null: false
    t.integer "cip_family"
  end

  add_index "trudy_majorcategory", ["name"], name: "trudy_majorcategory_name_39f1b269_like", using: :btree
  add_index "trudy_majorcategory", ["name"], name: "trudy_majorcategory_name_key", unique: true, using: :btree

  create_table "trudy_majorclassification", force: :cascade do |t|
    t.string "name",   limit: 500, null: false
    t.float  "weight",             null: false
  end

  add_index "trudy_majorclassification", ["name"], name: "trudy_majorclassification_name_62d2448a_like", using: :btree
  add_index "trudy_majorclassification", ["name"], name: "trudy_majorclassification_name_key", unique: true, using: :btree

  create_table "trudy_note", force: :cascade do |t|
    t.text     "text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "author_id",  null: false
    t.integer  "student_id"
  end

  add_index "trudy_note", ["author_id"], name: "trudy_note_4f331e2f", using: :btree
  add_index "trudy_note", ["student_id"], name: "trudy_note_30a811f6", using: :btree

  create_table "trudy_organization", force: :cascade do |t|
    t.string   "name",           limit: 100, null: false
    t.string   "address_street", limit: 100
    t.string   "address_city",   limit: 100
    t.string   "address_zip",    limit: 20
    t.string   "address_state",  limit: 20
    t.string   "phone",          limit: 20
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.integer  "org_type",                   null: false
    t.boolean  "active",                     null: false
  end

  create_table "trudy_profilepictureupload", force: :cascade do |t|
    t.text     "description"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.string   "full_pic",        limit: 100, null: false
    t.string   "thumb",           limit: 100, null: false
    t.string   "extension",       limit: 5
    t.integer  "uploader_id",                 null: false
    t.integer  "user_profile_id"
  end

  add_index "trudy_profilepictureupload", ["uploader_id"], name: "trudy_profilepictureupload_af76a535", using: :btree
  add_index "trudy_profilepictureupload", ["user_profile_id"], name: "trudy_profilepictureupload_user_profile_id_key", unique: true, using: :btree

  create_table "trudy_smracademicclass", force: :cascade do |t|
    t.string   "name",              limit: 255
    t.string   "class_code",        limit: 50
    t.float    "units_attempted"
    t.float    "gpa"
    t.float    "quality_hours"
    t.boolean  "remedial",                      null: false
    t.boolean  "honors",                        null: false
    t.boolean  "transferred",                   null: false
    t.float    "units_earned"
    t.integer  "class_category_id"
    t.integer  "class_type_id"
    t.integer  "term_id",                       null: false
    t.integer  "grade_status"
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
  end

  add_index "trudy_smracademicclass", ["class_category_id"], name: "trudy_smracademicclass_813d359a", using: :btree
  add_index "trudy_smracademicclass", ["class_type_id"], name: "trudy_smracademicclass_c00a02a1", using: :btree
  add_index "trudy_smracademicclass", ["term_id"], name: "trudy_smracademicclass_ba3248a2", using: :btree

  create_table "trudy_smracademicterm", force: :cascade do |t|
    t.integer  "batch_year",        null: false
    t.integer  "term",              null: false
    t.float    "cumulative_gpa"
    t.float    "credits_earned"
    t.integer  "academic_standing"
    t.integer  "enrollment_status"
    t.integer  "application_id",    null: false
    t.integer  "college_id"
    t.integer  "student_id"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.float    "credits_attempted"
  end

  add_index "trudy_smracademicterm", ["application_id"], name: "trudy_smracademicterm_6bc0a4eb", using: :btree
  add_index "trudy_smracademicterm", ["college_id"], name: "trudy_smracademicterm_3d404635", using: :btree
  add_index "trudy_smracademicterm", ["student_id", "batch_year", "term", "application_id"], name: "trudy_smracademicterm_student_id_2ce58307_uniq", unique: true, using: :btree
  add_index "trudy_smracademicterm", ["student_id"], name: "trudy_smracademicterm_30a811f6", using: :btree

  create_table "trudy_smracademicterm_major", force: :cascade do |t|
    t.integer "smracademicterm_id", null: false
    t.integer "major_id",           null: false
  end

  add_index "trudy_smracademicterm_major", ["major_id"], name: "trudy_smracademicterm_major_632501ce", using: :btree
  add_index "trudy_smracademicterm_major", ["smracademicterm_id", "major_id"], name: "trudy_smracademicterm_major_smracademicterm_id_808a6b3c_uniq", unique: true, using: :btree
  add_index "trudy_smracademicterm_major", ["smracademicterm_id"], name: "trudy_smracademicterm_major_a1c52567", using: :btree

  create_table "trudy_smracademicterm_minor", force: :cascade do |t|
    t.integer "smracademicterm_id", null: false
    t.integer "major_id",           null: false
  end

  add_index "trudy_smracademicterm_minor", ["major_id"], name: "trudy_smracademicterm_minor_632501ce", using: :btree
  add_index "trudy_smracademicterm_minor", ["smracademicterm_id", "major_id"], name: "trudy_smracademicterm_minor_smracademicterm_id_e356f511_uniq", unique: true, using: :btree
  add_index "trudy_smracademicterm_minor", ["smracademicterm_id"], name: "trudy_smracademicterm_minor_a1c52567", using: :btree

  create_table "trudy_smrapplication", force: :cascade do |t|
    t.datetime "created_at",                                      null: false
    t.datetime "updated_at",                                      null: false
    t.datetime "time_removed"
    t.string   "first_name",                          limit: 65
    t.string   "last_name",                           limit: 65
    t.string   "mobile_number",                       limit: 20
    t.string   "home_state",                          limit: 2
    t.string   "home_city",                           limit: 65
    t.string   "home_zip_code",                       limit: 20
    t.integer  "incoming_status"
    t.float    "weekly_work_hours"
    t.float    "loan_amount_needed"
    t.float    "outstanding_student_loan_total"
    t.float    "outstanding_personal_debt"
    t.string   "autograph",                           limit: 3
    t.datetime "interview_time"
    t.boolean  "application_complete",                            null: false
    t.boolean  "recommended"
    t.boolean  "financial_approval"
    t.float    "progress"
    t.integer  "college_id"
    t.integer  "transcript_id"
    t.integer  "user_profile_id",                                 null: false
    t.float    "academic_stress"
    t.integer  "credit_tier"
    t.boolean  "finished",                                        null: false
    t.integer  "sixup_tier"
    t.integer  "financial_score"
    t.integer  "interview_score"
    t.integer  "invitation_id"
    t.string   "halt_reason",                         limit: 250
    t.integer  "halt_system_reason"
    t.boolean  "halted",                                          null: false
    t.boolean  "application_files_processed",                     null: false
    t.float    "books_and_supplies"
    t.float    "cost_of_attendance"
    t.float    "expected_family_contribution"
    t.float    "federal_pell_grants"
    t.float    "federal_perkins_loan"
    t.float    "federal_seog"
    t.float    "federal_subsidized_stafford_loans"
    t.float    "federal_unsubsidized_stafford_loans"
    t.float    "institutional_grants"
    t.float    "institutional_loans"
    t.float    "institutional_scholarships"
    t.boolean  "interviews_complete",                             null: false
    t.float    "net_cost"
    t.float    "overall_cumulative_gpa"
    t.float    "overall_total_units_attempted"
    t.float    "overall_total_units_earned"
    t.float    "parent_plus_loans"
    t.float    "personal_budget"
    t.float    "private_loans"
    t.float    "private_scholarships"
    t.float    "room_and_board"
    t.integer  "sar_year"
    t.float    "total_gift_aid"
    t.float    "total_student_loans"
    t.float    "transportation"
    t.float    "tuition_and_fees"
    t.float    "work_study"
    t.float    "state_grants"
    t.boolean  "external_approval"
    t.boolean  "sixup_approved"
    t.boolean  "sixup_tier_confirmed",                            null: false
    t.integer  "sixup_tier_confirmed_by_id"
    t.integer  "sixup_tier_denial_reason"
    t.integer  "sixup_tier_final"
    t.boolean  "sixup_tier_overridden",                           null: false
    t.integer  "sixup_tier_overridden_by_id"
    t.text     "sixup_tier_override_reason"
    t.float    "credits_to_graduate"
    t.string   "middle_name",                         limit: 65
    t.float    "summer_work_hours"
    t.float    "ap_classes_attempted"
    t.float    "ap_classes_completed"
    t.integer  "batch_year",                                      null: false
    t.float    "overall_cumulative_gpa_highschool"
    t.float    "overall_total_units_earned_hs"
    t.integer  "class_rank"
    t.integer  "class_size"
    t.boolean  "fixed_rate_disclosure_agreement",                 null: false
    t.boolean  "variable_rate_disclosure_agreement",              null: false
    t.boolean  "complete_email_sent",                             null: false
    t.float    "total_credits_to_graduate"
    t.boolean  "over_18"
    t.integer  "sixup_overall_application_progress"
    t.datetime "finished_time"
    t.string   "academic_score_version",              limit: 8
    t.string   "college_outcome_score_version",       limit: 8
    t.string   "college_selectivity_score_version",   limit: 8
    t.string   "financial_score_version",             limit: 8
    t.boolean  "legal_us_resident"
    t.integer  "organization_id",                                 null: false
    t.integer  "college_outcome_score"
  end

  add_index "trudy_smrapplication", ["invitation_id"], name: "trudy_smrapplication_invitation_id_key", unique: true, using: :btree
  add_index "trudy_smrapplication", ["organization_id"], name: "trudy_smrapplication_26b2345e", using: :btree
  add_index "trudy_smrapplication", ["sixup_tier_confirmed_by_id"], name: "trudy_smrapplication_45bc43ca", using: :btree
  add_index "trudy_smrapplication", ["sixup_tier_overridden_by_id"], name: "trudy_smrapplication_961bfab0", using: :btree
  add_index "trudy_smrapplication", ["transcript_id"], name: "trudy_smrapplication_2a7198c1", using: :btree

  create_table "trudy_smrapplication_majors", force: :cascade do |t|
    t.integer "smrapplication_id", null: false
    t.integer "major_id",          null: false
  end

  add_index "trudy_smrapplication_majors", ["major_id"], name: "trudy_smrapplication_majors_632501ce", using: :btree
  add_index "trudy_smrapplication_majors", ["smrapplication_id", "major_id"], name: "trudy_smrapplication_majors_smrapplication_id_058eb045_uniq", unique: true, using: :btree
  add_index "trudy_smrapplication_majors", ["smrapplication_id"], name: "trudy_smrapplication_majors_a31b13e1", using: :btree

  create_table "trudy_smrapplication_other_colleges_accepted", force: :cascade do |t|
    t.integer "smrapplication_id", null: false
    t.integer "college_id",        null: false
  end

  add_index "trudy_smrapplication_other_colleges_accepted", ["college_id"], name: "trudy_smrapplication_other_colleges_accepted_3d404635", using: :btree
  add_index "trudy_smrapplication_other_colleges_accepted", ["smrapplication_id", "college_id"], name: "trudy_smrapplication_other_coll_smrapplication_id_7a388786_uniq", unique: true, using: :btree
  add_index "trudy_smrapplication_other_colleges_accepted", ["smrapplication_id"], name: "trudy_smrapplication_other_colleges_accepted_a31b13e1", using: :btree

  create_table "trudy_student", force: :cascade do |t|
    t.datetime "created_at",                                  null: false
    t.datetime "updated_at",                                  null: false
    t.string   "first_name",                      limit: 35
    t.string   "middle_name",                     limit: 35
    t.string   "last_name",                       limit: 35
    t.string   "sid",                             limit: 35
    t.string   "ethnicity",                       limit: 25
    t.boolean  "in_college",                                  null: false
    t.boolean  "in_hs",                                       null: false
    t.date     "birthday"
    t.string   "student_email",                   limit: 254
    t.string   "mobile_number",                   limit: 20
    t.text     "profile_picture"
    t.text     "ssn"
    t.integer  "college_attending_id"
    t.integer  "hs_school_id"
    t.integer  "primary_organization_id"
    t.integer  "user_profile_id"
    t.integer  "cohort_year"
    t.integer  "gender"
    t.float    "academic_stress"
    t.string   "current_city",                    limit: 35
    t.string   "current_state",                   limit: 2
    t.string   "current_street_address",          limit: 35
    t.string   "current_zip_code",                limit: 20
    t.string   "facebook_link",                   limit: 35
    t.string   "home_city",                       limit: 35
    t.string   "home_number",                     limit: 20
    t.string   "home_state",                      limit: 2
    t.string   "home_street_address",             limit: 35
    t.string   "home_zip_code",                   limit: 20
    t.string   "instagram_link",                  limit: 35
    t.string   "parent_mobile_number",            limit: 20
    t.string   "parent_name",                     limit: 35
    t.integer  "primary_counselor_id"
    t.float    "credits_to_graduate"
    t.integer  "total_colleges_applied_accepted",             null: false
    t.integer  "total_colleges_applied_denied",               null: false
    t.integer  "total_colleges_applied_to",                   null: false
  end

  add_index "trudy_student", ["college_attending_id"], name: "trudy_student_57985489", using: :btree
  add_index "trudy_student", ["hs_school_id"], name: "trudy_student_8c7123ef", using: :btree
  add_index "trudy_student", ["primary_counselor_id"], name: "trudy_student_c559e3b9", using: :btree
  add_index "trudy_student", ["primary_organization_id"], name: "trudy_student_f78d0bf3", using: :btree
  add_index "trudy_student", ["user_profile_id"], name: "trudy_student_user_profile_id_key", unique: true, using: :btree

  create_table "trudy_student_ethnic_background", force: :cascade do |t|
    t.integer "student_id",   null: false
    t.integer "ethnicity_id", null: false
  end

  add_index "trudy_student_ethnic_background", ["ethnicity_id"], name: "trudy_student_ethnic_background_31999bd7", using: :btree
  add_index "trudy_student_ethnic_background", ["student_id", "ethnicity_id"], name: "trudy_student_ethnic_background_student_id_7a97bc3c_uniq", unique: true, using: :btree
  add_index "trudy_student_ethnic_background", ["student_id"], name: "trudy_student_ethnic_background_30a811f6", using: :btree

  create_table "trudy_student_majors", force: :cascade do |t|
    t.integer "student_id", null: false
    t.integer "major_id",   null: false
  end

  add_index "trudy_student_majors", ["major_id"], name: "trudy_student_majors_632501ce", using: :btree
  add_index "trudy_student_majors", ["student_id", "major_id"], name: "trudy_student_majors_student_id_1536fe5b_uniq", unique: true, using: :btree
  add_index "trudy_student_majors", ["student_id"], name: "trudy_student_majors_30a811f6", using: :btree

  create_table "trudy_student_organizations", force: :cascade do |t|
    t.integer "student_id",      null: false
    t.integer "organization_id", null: false
  end

  add_index "trudy_student_organizations", ["organization_id"], name: "trudy_student_organizations_26b2345e", using: :btree
  add_index "trudy_student_organizations", ["student_id", "organization_id"], name: "trudy_student_organizations_student_id_5db456d8_uniq", unique: true, using: :btree
  add_index "trudy_student_organizations", ["student_id"], name: "trudy_student_organizations_30a811f6", using: :btree

  create_table "trudy_term", force: :cascade do |t|
    t.string  "name",          limit: 35, null: false
    t.date    "start_date",               null: false
    t.date    "end_date",                 null: false
    t.integer "college_id_id",            null: false
  end

  add_index "trudy_term", ["college_id_id"], name: "trudy_term_e70155af", using: :btree

  create_table "trudy_userprofile", primary_key: "user_id", force: :cascade do |t|
    t.boolean "accepted_eula",  null: false
    t.integer "invite_code_id"
  end

  add_index "trudy_userprofile", ["invite_code_id"], name: "trudy_userprofile_3601d3d1", using: :btree

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

  add_foreign_key "account_emailaddress", "auth_user", column: "user_id", name: "account_emailaddress_user_id_2c513194_fk_auth_user_id"
  add_foreign_key "account_emailconfirmation", "account_emailaddress", column: "email_address_id", name: "account_em_email_address_id_5b7f8c58_fk_account_emailaddress_id"
  add_foreign_key "auth_group_permissions", "auth_group", column: "group_id", name: "auth_group_permissions_group_id_b120cbf9_fk_auth_group_id"
  add_foreign_key "auth_group_permissions", "auth_permission", column: "permission_id", name: "auth_group_permiss_permission_id_84c5c92e_fk_auth_permission_id"
  add_foreign_key "auth_permission", "django_content_type", column: "content_type_id", name: "auth_permiss_content_type_id_2f476e4b_fk_django_content_type_id"
  add_foreign_key "auth_user_groups", "auth_group", column: "group_id", name: "auth_user_groups_group_id_97559544_fk_auth_group_id"
  add_foreign_key "auth_user_groups", "auth_user", column: "user_id", name: "auth_user_groups_user_id_6a12ed8b_fk_auth_user_id"
  add_foreign_key "auth_user_user_permissions", "auth_permission", column: "permission_id", name: "auth_user_user_per_permission_id_1fbb5f2c_fk_auth_permission_id"
  add_foreign_key "auth_user_user_permissions", "auth_user", column: "user_id", name: "auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id"
  add_foreign_key "django_admin_log", "auth_user", column: "user_id", name: "django_admin_log_user_id_c564eba6_fk_auth_user_id"
  add_foreign_key "django_admin_log", "django_content_type", column: "content_type_id", name: "django_admin_content_type_id_c4bce8eb_fk_django_content_type_id"
  add_foreign_key "trudy_academicclass", "trudy_academicterm", column: "term_id", name: "trudy_academicclass_term_id_55fe60d1_fk_trudy_academicterm_id"
  add_foreign_key "trudy_academicclass", "trudy_classcategory", column: "class_category_id", name: "trudy_acad_class_category_id_cd3f4be3_fk_trudy_classcategory_id"
  add_foreign_key "trudy_academicclass", "trudy_classtype", column: "class_type_id", name: "trudy_academicclas_class_type_id_dbb6bcef_fk_trudy_classtype_id"
  add_foreign_key "trudy_academicterm", "trudy_annualstudentdata", column: "annual_student_data_id", name: "t_annual_student_data_id_b1e735db_fk_trudy_annualstudentdata_id"
  add_foreign_key "trudy_academicterm", "trudy_college", column: "college_id", name: "trudy_academicterm_college_id_8442eea2_fk_trudy_college_id"
  add_foreign_key "trudy_academicterm", "trudy_student", column: "student_id", name: "trudy_academicterm_student_id_1e5e676b_fk_trudy_student_id"
  add_foreign_key "trudy_academicterm_major", "trudy_academicterm", column: "academicterm_id", name: "trudy_academi_academicterm_id_582191f6_fk_trudy_academicterm_id"
  add_foreign_key "trudy_academicterm_major", "trudy_major", column: "major_id", name: "trudy_academicterm_major_major_id_a01fba45_fk_trudy_major_id"
  add_foreign_key "trudy_academicterm_minor", "trudy_academicterm", column: "academicterm_id", name: "trudy_academi_academicterm_id_5279b603_fk_trudy_academicterm_id"
  add_foreign_key "trudy_academicterm_minor", "trudy_major", column: "major_id", name: "trudy_academicterm_minor_major_id_6eb89a78_fk_trudy_major_id"
  add_foreign_key "trudy_annualcollegedata", "trudy_college", column: "college_id", name: "trudy_annualcollegedata_college_id_47164a14_fk_trudy_college_id"
  add_foreign_key "trudy_annualstudentdata", "trudy_student", column: "student_id", name: "trudy_annualdata2014_student_id_65241bbf_fk_trudy_student_id"
  add_foreign_key "trudy_booking", "trudy_smrapplication", column: "application_id", name: "trudy_bookin_application_id_894728f5_fk_trudy_smrapplication_id"
  add_foreign_key "trudy_booking_interviewers", "trudy_booking", column: "booking_id", primary_key: "application_id", name: "trudy_booki_booking_id_972a5553_fk_trudy_booking_application_id"
  add_foreign_key "trudy_booking_interviewers", "trudy_interviewer", column: "interviewer_id", name: "trudy_booking_i_interviewer_id_b7f499e8_fk_trudy_interviewer_id"
  add_foreign_key "trudy_childorganization", "trudy_organization", column: "parent_organization_id", name: "trudy__parent_organization_id_13db2577_fk_trudy_organization_id"
  add_foreign_key "trudy_collegeapplication", "trudy_annualcollegedata", column: "annual_college_data_id", name: "t_annual_college_data_id_bd8109af_fk_trudy_annualcollegedata_id"
  add_foreign_key "trudy_collegeapplication", "trudy_annualstudentdata", column: "annual_student_data_id", name: "t_annual_student_data_id_deffdc2b_fk_trudy_annualstudentdata_id"
  add_foreign_key "trudy_collegeapplication", "trudy_college", column: "college_id", name: "trudy_collegeapplicatio_college_id_a05cfbe3_fk_trudy_college_id"
  add_foreign_key "trudy_collegeapplication", "trudy_student", column: "student_id", name: "trudy_collegeapplicatio_student_id_29065598_fk_trudy_student_id"
  add_foreign_key "trudy_collegestudent", "trudy_college", column: "college_id", name: "trudy_collegestudent_college_id_5d99a76b_fk_trudy_college_id"
  add_foreign_key "trudy_collegestudent", "trudy_student", column: "student_id", name: "trudy_collegestudent_student_id_570e2f4b_fk_trudy_student_id"
  add_foreign_key "trudy_counselor", "trudy_organization", column: "organization_id", name: "trudy_counsel_organization_id_9e4236aa_fk_trudy_organization_id"
  add_foreign_key "trudy_counselor", "trudy_userprofile", column: "user_profile_id", primary_key: "user_id", name: "trudy_cou_user_profile_id_29e44843_fk_trudy_userprofile_user_id"
  add_foreign_key "trudy_counselor_students", "trudy_counselor", column: "counselor_id", name: "trudy_counselor_stu_counselor_id_57e98834_fk_trudy_counselor_id"
  add_foreign_key "trudy_counselor_students", "trudy_student", column: "student_id", name: "trudy_counselor_student_student_id_29418d37_fk_trudy_student_id"
  add_foreign_key "trudy_course", "trudy_college", column: "college_id_id", name: "trudy_course_college_id_id_c6cd1462_fk_trudy_college_id"
  add_foreign_key "trudy_enrollment", "trudy_college", column: "college_id_id", name: "trudy_enrollment_college_id_id_476fc1ef_fk_trudy_college_id"
  add_foreign_key "trudy_enrollment", "trudy_highschool", column: "school_id_id", name: "trudy_enrollment_school_id_id_b5cc19dc_fk_trudy_highschool_id"
  add_foreign_key "trudy_enrollment", "trudy_student", column: "student_id_id", name: "trudy_enrollment_student_id_id_75d58fca_fk_trudy_student_id"
  add_foreign_key "trudy_extracurractivities", "trudy_smrapplication", column: "application_id", name: "trudy_extrac_application_id_0319f009_fk_trudy_smrapplication_id"
  add_foreign_key "trudy_familymeeting", "trudy_student", column: "student_id", name: "trudy_familymeeting_student_id_18babeaa_fk_trudy_student_id"
  add_foreign_key "trudy_fileupload", "trudy_smrapplication", column: "application_id", name: "trudy_fileup_application_id_6eba7d8c_fk_trudy_smrapplication_id"
  add_foreign_key "trudy_fileupload", "trudy_student", column: "student_id", name: "trudy_fileupload_student_id_39011927_fk_trudy_student_id"
  add_foreign_key "trudy_fileupload", "trudy_userprofile", column: "processed_by_id", primary_key: "user_id", name: "trudy_fil_processed_by_id_bd073873_fk_trudy_userprofile_user_id"
  add_foreign_key "trudy_fileupload", "trudy_userprofile", column: "uploader_id", primary_key: "user_id", name: "trudy_fileupl_uploader_id_a3f48095_fk_trudy_userprofile_user_id"
  add_foreign_key "trudy_financialsurvey", "trudy_college", column: "college_id", name: "trudy_financialsurvey_college_id_f59fb8d6_fk_trudy_college_id"
  add_foreign_key "trudy_financialsurvey", "trudy_organization", column: "organization_id", name: "trudy_financi_organization_id_fd266fa6_fk_trudy_organization_id"
  add_foreign_key "trudy_financialsurvey_major", "trudy_financialsurvey", column: "financialsurvey_id", name: "trudy_f_financialsurvey_id_eb78d141_fk_trudy_financialsurvey_id"
  add_foreign_key "trudy_financialsurvey_major", "trudy_major", column: "major_id", name: "trudy_financialsurvey_major_major_id_6432a584_fk_trudy_major_id"
  add_foreign_key "trudy_financialsurveyv2", "trudy_college", column: "college_id", name: "trudy_financialsurveyv2_college_id_77d846cf_fk_trudy_college_id"
  add_foreign_key "trudy_financialsurveyv2", "trudy_organization", column: "organization_id", name: "trudy_financi_organization_id_d0a0ff45_fk_trudy_organization_id"
  add_foreign_key "trudy_financialsurveyv2_major", "trudy_financialsurveyv2", column: "financialsurveyv2_id", name: "tru_financialsurveyv2_id_552a9be3_fk_trudy_financialsurveyv2_id"
  add_foreign_key "trudy_financialsurveyv2_major", "trudy_major", column: "major_id", name: "trudy_financialsurveyv2_maj_major_id_e1d4100d_fk_trudy_major_id"
  add_foreign_key "trudy_highschool_counselors", "trudy_counselor", column: "counselor_id", name: "trudy_highschool_co_counselor_id_05963c71_fk_trudy_counselor_id"
  add_foreign_key "trudy_highschool_counselors", "trudy_highschool", column: "highschool_id", name: "trudy_highschool__highschool_id_f9b96bad_fk_trudy_highschool_id"
  add_foreign_key "trudy_highschool_students", "trudy_highschool", column: "highschool_id", name: "trudy_highschool__highschool_id_e1a13456_fk_trudy_highschool_id"
  add_foreign_key "trudy_highschool_students", "trudy_student", column: "student_id", name: "trudy_highschool_studen_student_id_4550bbfa_fk_trudy_student_id"
  add_foreign_key "trudy_internships", "trudy_smrapplication", column: "application_id", name: "trudy_intern_application_id_6e426803_fk_trudy_smrapplication_id"
  add_foreign_key "trudy_interviewanswers", "trudy_smrapplication", column: "application_id", name: "trudy_interv_application_id_337f95dc_fk_trudy_smrapplication_id"
  add_foreign_key "trudy_interviewanswers", "trudy_userprofile", column: "interviewer_id", primary_key: "user_id", name: "trudy_inte_interviewer_id_84199e8e_fk_trudy_userprofile_user_id"
  add_foreign_key "trudy_interviewer", "trudy_userprofile", column: "user_profile_id", primary_key: "user_id", name: "trudy_int_user_profile_id_4240f8c9_fk_trudy_userprofile_user_id"
  add_foreign_key "trudy_invitation", "trudy_student", column: "student_id", name: "trudy_invitation_student_id_c5cca3aa_fk_trudy_student_id"
  add_foreign_key "trudy_invitation", "trudy_userprofile", column: "invited_by_id", primary_key: "user_id", name: "trudy_invit_invited_by_id_67d392d6_fk_trudy_userprofile_user_id"
  add_foreign_key "trudy_invitecode", "trudy_organization", column: "organization_id", name: "trudy_invitec_organization_id_07b30a06_fk_trudy_organization_id"
  add_foreign_key "trudy_invitecode", "trudy_userprofile", column: "referred_by_id", primary_key: "user_id", name: "trudy_invi_referred_by_id_807bb8b1_fk_trudy_userprofile_user_id"
  add_foreign_key "trudy_major", "trudy_majorcategory", column: "category_id", name: "trudy_major_category_id_09f03291_fk_trudy_majorcategory_id"
  add_foreign_key "trudy_major", "trudy_majorclassification", column: "classification_id", name: "trud_classification_id_8669b2aa_fk_trudy_majorclassification_id"
  add_foreign_key "trudy_note", "trudy_student", column: "student_id", name: "trudy_note_student_id_fbc11c61_fk_trudy_student_id"
  add_foreign_key "trudy_note", "trudy_userprofile", column: "author_id", primary_key: "user_id", name: "trudy_note_author_id_5c66d601_fk_trudy_userprofile_user_id"
  add_foreign_key "trudy_profilepictureupload", "trudy_userprofile", column: "uploader_id", primary_key: "user_id", name: "trudy_profile_uploader_id_ce79fc38_fk_trudy_userprofile_user_id"
  add_foreign_key "trudy_profilepictureupload", "trudy_userprofile", column: "user_profile_id", primary_key: "user_id", name: "trudy_pro_user_profile_id_11604be6_fk_trudy_userprofile_user_id"
  add_foreign_key "trudy_smracademicclass", "trudy_classcategory", column: "class_category_id", name: "trudy_smra_class_category_id_e6b7e105_fk_trudy_classcategory_id"
  add_foreign_key "trudy_smracademicclass", "trudy_classtype", column: "class_type_id", name: "trudy_smracademicc_class_type_id_4d18d274_fk_trudy_classtype_id"
  add_foreign_key "trudy_smracademicclass", "trudy_smracademicterm", column: "term_id", name: "trudy_smracademicc_term_id_e7c816bf_fk_trudy_smracademicterm_id"
  add_foreign_key "trudy_smracademicterm", "trudy_college", column: "college_id", name: "trudy_smracademicterm_college_id_3fd0a7e2_fk_trudy_college_id"
  add_foreign_key "trudy_smracademicterm", "trudy_smrapplication", column: "application_id", name: "trudy_smraca_application_id_9c4ee2c0_fk_trudy_smrapplication_id"
  add_foreign_key "trudy_smracademicterm", "trudy_student", column: "student_id", name: "trudy_smracademicterm_student_id_1c7c8eb2_fk_trudy_student_id"
  add_foreign_key "trudy_smracademicterm_major", "trudy_major", column: "major_id", name: "trudy_smracademicterm_major_major_id_a131c463_fk_trudy_major_id"
  add_foreign_key "trudy_smracademicterm_major", "trudy_smracademicterm", column: "smracademicterm_id", name: "trudy_s_smracademicterm_id_7e97b7bf_fk_trudy_smracademicterm_id"
  add_foreign_key "trudy_smracademicterm_minor", "trudy_major", column: "major_id", name: "trudy_smracademicterm_minor_major_id_c83a717c_fk_trudy_major_id"
  add_foreign_key "trudy_smracademicterm_minor", "trudy_smracademicterm", column: "smracademicterm_id", name: "trudy_s_smracademicterm_id_2747636e_fk_trudy_smracademicterm_id"
  add_foreign_key "trudy_smrapplication", "trudy_college", column: "college_id", name: "trudy_smrapplication_college_id_262b19de_fk_trudy_college_id"
  add_foreign_key "trudy_smrapplication", "trudy_fileupload", column: "transcript_id", name: "trudy_smrapplicat_transcript_id_d8a3eff1_fk_trudy_fileupload_id"
  add_foreign_key "trudy_smrapplication", "trudy_invitation", column: "invitation_id", name: "trudy_smrapplicat_invitation_id_84a6978e_fk_trudy_invitation_id"
  add_foreign_key "trudy_smrapplication", "trudy_organization", column: "organization_id", name: "trudy_smrappl_organization_id_329773e5_fk_trudy_organization_id"
  add_foreign_key "trudy_smrapplication", "trudy_userprofile", column: "sixup_tier_confirmed_by_id", primary_key: "user_id", name: "D14ddcde2579be6e0f2a1dc3ba71fa21"
  add_foreign_key "trudy_smrapplication", "trudy_userprofile", column: "sixup_tier_overridden_by_id", primary_key: "user_id", name: "D34f95b72230fe337f65a9c61ab6365e"
  add_foreign_key "trudy_smrapplication", "trudy_userprofile", column: "user_profile_id", primary_key: "user_id", name: "trudy_smr_user_profile_id_0292c6f8_fk_trudy_userprofile_user_id"
  add_foreign_key "trudy_smrapplication_majors", "trudy_major", column: "major_id", name: "trudy_smrapplication_majors_major_id_02b2bcd2_fk_trudy_major_id"
  add_foreign_key "trudy_smrapplication_majors", "trudy_smrapplication", column: "smrapplication_id", name: "trudy_smr_smrapplication_id_e4a753d0_fk_trudy_smrapplication_id"
  add_foreign_key "trudy_smrapplication_other_colleges_accepted", "trudy_college", column: "college_id", name: "trudy_smrapplication_ot_college_id_5ad1f74b_fk_trudy_college_id"
  add_foreign_key "trudy_smrapplication_other_colleges_accepted", "trudy_smrapplication", column: "smrapplication_id", name: "trudy_smr_smrapplication_id_5078803b_fk_trudy_smrapplication_id"
  add_foreign_key "trudy_student", "trudy_college", column: "college_attending_id", name: "trudy_student_college_attending_id_529a7295_fk_trudy_college_id"
  add_foreign_key "trudy_student", "trudy_counselor", column: "primary_counselor_id", name: "trudy_stude_primary_counselor_id_39c93877_fk_trudy_counselor_id"
  add_foreign_key "trudy_student", "trudy_highschool", column: "hs_school_id", name: "trudy_student_hs_school_id_236d585f_fk_trudy_highschool_id"
  add_foreign_key "trudy_student", "trudy_organization", column: "primary_organization_id", name: "trudy_primary_organization_id_65ea022f_fk_trudy_organization_id"
  add_foreign_key "trudy_student", "trudy_userprofile", column: "user_profile_id", primary_key: "user_id", name: "trudy_stu_user_profile_id_1ed19d9c_fk_trudy_userprofile_user_id"
  add_foreign_key "trudy_student_ethnic_background", "trudy_ethnicity", column: "ethnicity_id", name: "trudy_student_ethni_ethnicity_id_510a0bf3_fk_trudy_ethnicity_id"
  add_foreign_key "trudy_student_ethnic_background", "trudy_student", column: "student_id", name: "trudy_student_ethnic_ba_student_id_0d1063c8_fk_trudy_student_id"
  add_foreign_key "trudy_student_majors", "trudy_major", column: "major_id", name: "trudy_student_majors_major_id_99e4c468_fk_trudy_major_id"
  add_foreign_key "trudy_student_majors", "trudy_student", column: "student_id", name: "trudy_student_majors_student_id_c6a2784a_fk_trudy_student_id"
  add_foreign_key "trudy_student_organizations", "trudy_organization", column: "organization_id", name: "trudy_student_organization_id_a05f7712_fk_trudy_organization_id"
  add_foreign_key "trudy_student_organizations", "trudy_student", column: "student_id", name: "trudy_student_organizat_student_id_112d02a9_fk_trudy_student_id"
  add_foreign_key "trudy_term", "trudy_college", column: "college_id_id", name: "trudy_term_college_id_id_87720468_fk_trudy_college_id"
  add_foreign_key "trudy_userprofile", "auth_user", column: "user_id", name: "trudy_userprofile_user_id_47e4ccc7_fk_auth_user_id"
  add_foreign_key "trudy_userprofile", "trudy_invitecode", column: "invite_code_id", name: "trudy_userprofil_invite_code_id_ab54ea2b_fk_trudy_invitecode_id"
end
