class AddImgToMessages < ActiveRecord::Migration[5.2]
  def change
    add_column :messages, :img, :string
  end
end
