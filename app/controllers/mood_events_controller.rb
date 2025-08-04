class MoodEventsController < ApplicationController
  before_action :set_mood_event, only: %i[ show edit update destroy ]

  # GET /mood_events or /mood_events.json
  def index
    @mood_events = MoodEvent.all
  end

  # GET /mood_events/1 or /mood_events/1.json
  def show
  end

  # GET /mood_events/new
  def new
    @mood_event = MoodEvent.new
  end

  # GET /mood_events/1/edit
  def edit
  end

  # POST /mood_events or /mood_events.json
  def create
    @mood_event = MoodEvent.new(mood_event_params)

    respond_to do |format|
      if @mood_event.save
        format.html { redirect_to @mood_event, notice: "Mood event was successfully created." }
        format.json { render :show, status: :created, location: @mood_event }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @mood_event.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /mood_events/1 or /mood_events/1.json
  def update
    respond_to do |format|
      if @mood_event.update(mood_event_params)
        format.html { redirect_to @mood_event, notice: "Mood event was successfully updated." }
        format.json { render :show, status: :ok, location: @mood_event }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @mood_event.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /mood_events/1 or /mood_events/1.json
  def destroy
    @mood_event.destroy!

    respond_to do |format|
      format.html { redirect_to mood_events_path, status: :see_other, notice: "Mood event was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_mood_event
      @mood_event = MoodEvent.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def mood_event_params
      params.expect(mood_event: [ :intensity, :notes, :temperament, :title, :when_it_happened_was ])
    end
end
