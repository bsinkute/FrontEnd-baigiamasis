using NoteeBackend.Models.Dto;

namespace NoteeBackend.Services
{
    public interface IQuoteMapper
    {
        public GetQuoteDto Bind(QuoteDto quote);
        public QuoteDto Bind(GetQuoteDto quote);
    }
    public class QuoteMapper : IQuoteMapper
    {
        public GetQuoteDto Bind(QuoteDto quote)
        {
            return new GetQuoteDto
            {
                Author = quote.author,
                Content = quote.content,
            };
        }

        public QuoteDto Bind(GetQuoteDto quote)
        {
            return new QuoteDto
            {
                author = quote.Author,
                content = quote.Content,
            };
        }
    }


}
