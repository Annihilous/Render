json.extract! mood_event, :id, :intensity, :notes, :temperament, :title, :when_it_happened_was, :created_at, :updated_at
json.url mood_event_url(mood_event, format: :json)
