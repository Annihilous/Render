class CreateMoodEvents < ActiveRecord::Migration[8.0]
  def change
    create_table :mood_events do |t|
      t.integer :intensity
      t.text :notes
      t.integer :temperament
      t.string :title
      t.datetime :when_it_happened_was

      t.timestamps
    end
  end
end
