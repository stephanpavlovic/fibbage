class User < ApplicationRecord

  belongs_to :game, optional: true

  validates :token, uniqueness: { case_sensitive: false }

end
