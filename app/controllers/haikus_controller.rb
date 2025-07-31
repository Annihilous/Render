class HaikusController < ApplicationController
  before_action :set_haiku, only: %i[ show edit update destroy ]

  # GET /haikus or /haikus.json
  def index
    @haikus = Haiku.all
  end

  # GET /haikus/1 or /haikus/1.json
  def show
  end

  # GET /haikus/new
  def new
    @haiku = Haiku.new
  end

  # GET /haikus/1/edit
  def edit
  end

  # POST /haikus or /haikus.json
  def create
    @haiku = Haiku.new(haiku_params)

    respond_to do |format|
      if @haiku.save
        format.html { redirect_to @haiku, notice: "Haiku was successfully created." }
        format.json { render :show, status: :created, location: @haiku }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @haiku.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /haikus/1 or /haikus/1.json
  def update
    respond_to do |format|
      if @haiku.update(haiku_params)
        format.html { redirect_to @haiku, notice: "Haiku was successfully updated." }
        format.json { render :show, status: :ok, location: @haiku }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @haiku.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /haikus/1 or /haikus/1.json
  def destroy
    @haiku.destroy!

    respond_to do |format|
      format.html { redirect_to haikus_path, status: :see_other, notice: "Haiku was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_haiku
      @haiku = Haiku.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def haiku_params
      params.expect(haiku: [ :title, :content ])
    end
end
