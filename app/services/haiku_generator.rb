class HaikuGenerator
  def initialize(words)
    words = ['winter', 'sadness', 'hope'] if words.empty?

    @words = Array(words).map(&:strip).join(', ')
    @client = OpenAI::Client.new(access_token: ENV["OPEN_AI_API_SECRET"])
  end

  def generate
    response = @client.chat(
      parameters: {
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are a poet who only writes haikus using standard English vocabulary (no titles, explanations, commentary)." },
          { role: "user", content: "Please return only a haiku inspired by this: #{@words}" }
        ],
        temperature: 0.7
      }
    )

    response.dig("choices", 0, "message", "content").to_s.strip

  rescue => e
    Rails.logger.error("OpenAI error: #{e.message}")
    nil
  end
end
