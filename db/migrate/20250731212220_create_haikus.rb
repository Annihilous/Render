class CreateHaikus < ActiveRecord::Migration[8.0]
  def change
    create_table :haikus do |t|
      t.string :title
      t.text :content

      t.timestamps
    end
  end
end
