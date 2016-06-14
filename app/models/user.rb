class User < ActiveRecord::Base
  validates :first_name, :last_name, :password_digest, :session_token, :email, :mobile, presence: true
  validates :email, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  belongs_to :school
  belongs_to :cohort
  belongs_to :group
  has_one :current_project, class_name: "Project"
  has_many :projects, foreign_key: :author_id
  has_many :authored_messages, class_name: "Message", foreign_key: :author_id
  has_many :received_messages, class_name: "Message", foreign_key: :recipient_id
  has_many :flags, foreign_key: :dev_id
  has_many :flagged_projects, through: :flags, source: :project
  has_many :tasks, foreign_key: :author_id
  has_many :cohorts, through: :school, source: :cohorts
  has_many :groups, through: :cohorts, source: :groups

  attr_reader :password
  after_initialize :ensure_session_token

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil unless user && user.valid_password?(password)
    user
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
    self.session_token
  end

  def is_customer?
    (!self.cohort_id && !self.school_id)
  end

  def is_dev?
    !!self.cohort_id
  end

  def is_admin?
    (!self.cohort_id && self.school_id)
  end

  def type
    return "customer" if self.is_customer?
    return "dev" if self.is_dev?
    return "admin" if self.is_admin?
  end

  def news
    self.received_messages.select { |message| !message.is_read }
  end

  def name
    self.first_name + " " + self.last_name
  end

  private
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end
end
