using Microsoft.AspNetCore.Mvc;
using NoteeBackend.Models;
using NoteeBackend.Services;

namespace NoteeBackend.Controllers
{
    [ApiController]
    [Route("api/notes")]
    public class NoteController : ControllerBase
    {
        private readonly INoteService _noteService;

        public NoteController(INoteService noteService)
        {
            _noteService = noteService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<Note>))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<Note>>> GetNotesAsync()
        {
            var response = await _noteService.GetNotesAsync();

            return Ok(response);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> CreateNoteAsync([FromBody] Note note)
        {
            await _noteService.AddNoteAsync(note);
            return Ok();
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Note))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<Note>> UpdateNote([FromBody] Note note)
        {
            var response = await _noteService.UpdateNoteAsync(note);

            if (response != null) 
            {
                return Ok(response);
            }
            else 
            { 
                return NotFound(); 
            }
            
        }

        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> DeleteNote(int id)
        {
            var isDeleted = await _noteService.DeleteNoteAsync(id);

            if (isDeleted)
            {
                return Ok();
            }
            else if (id <= 0)
            {
                return BadRequest();
            }
            else
            {
                return NotFound();
            }
        }
    }
}
