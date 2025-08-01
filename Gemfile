source "https://rubygems.org"

# Core Rails components and extensions
gem "importmap-rails"               # Use JavaScript with ESM import maps
gem "jbuilder"                      # Build JSON APIs with ease
gem "ruby-openai"                   # OpenAPI
gem "pg", "~> 1.1"                  # PostgreSQL for Active Record
gem "propshaft"                     # Modern asset pipeline
gem "puma", ">= 5.0"                # Puma web server
gem "rails", "~> 8.0.2"             # Main Rails gem
gem "solid_cache"                   # Database-backed cache
gem "solid_cable"                   # Database-backed Action Cable
gem "solid_queue"                   # Database-backed Active Job
gem "stimulus-rails"                # Hotwire's JavaScript framework
gem "tailwindcss-rails", "~> 4.3"   # Tailwind via Rails integration
gem "tailwindcss-ruby", "~> 4.1"    # Tailwind as a Ruby gem
gem "turbo-rails"                   # Hotwire's page accelerator

# Optional features
# gem "bcrypt", "~> 3.1.7"    # Use ActiveModel has_secure_password
# gem "image_processing", "~> 1.2" # Active Storage variants

# Infra / Optimization tools
gem "bootsnap", require: false     # Speeds up boot time
gem "kamal", require: false        # Deploy as Docker container
gem "thruster", require: false     # HTTP asset caching and X-Sendfile

# Platform-specific
gem "tzinfo-data", platforms: %i[windows jruby]

group :development, :test do
  gem "brakeman", require: false        # Static analysis security scanner
  gem "debug", platforms: %i[mri windows], require: "debug/prelude"
  gem "rubocop-rails-omakase", require: false # Style guide
end

group :development do
  gem "web-console"              # Interactive console on exception pages
end

group :test do
  gem "capybara"                 # System testing
  gem "selenium-webdriver"       # Used with Capybara
end
