# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require_relative "config/application"

Rails.application.load_tasks

# Prevent LoadError if test/system doesn't exist
Rake::Task.define_task("test:system") do
  puts "Skipping test:system — no system tests defined."
end
