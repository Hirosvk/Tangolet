class User < ActiveRecord::Base
  validates :username, :password_digest, :session_token, :email, presence: true
  validates :username, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  after_initialize :ensure_session_token
  has_many :study_sets,
    primary_key: :id,
    foreign_key: :creator_id,
    class_name: "StudySet"

  def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64(16)
  end

  attr_reader :password
  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def self.find_by_credentials(username, password)
    user = self.find_by_username(username)
    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end

  def reset_session_token!
    self.session_token = SecureRandom::urlsafe_base64(16)
    self.save!
    self.session_token
  end

end
