using NoteeBackend.Models.Dto;
using System.Data;
using System.Text.Json;

namespace NoteeBackend.Services
{
    public interface IQuoteService
    {
        public Task<QuoteDto> GetQuoteAsync();
    }
    public class QuoteService : IQuoteService
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public string url = "https://api.quotable.io/random";


        public QuoteService(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public async Task<QuoteDto> GetQuoteAsync()
        {
            var client = _httpClientFactory.CreateClient();

            var response = await client.GetAsync(url);

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                var quote = JsonSerializer.Deserialize<QuoteDto>(content);
                return quote;
            }
            else
            {
                throw new Exception("Unable to get a Quote");
            }
        }
    }
}
