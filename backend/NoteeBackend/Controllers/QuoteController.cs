using Microsoft.AspNetCore.Mvc;
using NoteeBackend.Models.Dto;
using NoteeBackend.Services;

namespace NoteeBackend.Controllers
{
    [ApiController]
    [Route("api/quote")]
    public class QuoteController : ControllerBase
    {
        private readonly IQuoteService _quoteService;
        private readonly IQuoteMapper _quoteMapper;

        public QuoteController(IQuoteService quoteService, IQuoteMapper quoteMapper)
        {
            _quoteService = quoteService;
            _quoteMapper = quoteMapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(GetQuoteDto))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<GetQuoteDto>> GetQuoteAsync()
        {
            var response = await _quoteService.GetQuoteAsync();

            var getQuoteDto = _quoteMapper.Bind(response);

            return Ok(getQuoteDto);
        }

    }

}
