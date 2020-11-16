class Message < ApplicationRecord
    validates :content, presence: true
    belongs_to :user    
    mount_uploader :img, ImgUploader
end
