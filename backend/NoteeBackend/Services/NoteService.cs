using NoteeBackend.Models;
using NoteeBackend.Repositories;

namespace NoteeBackend.Services
{
    public interface INoteService
    {
        public Task<IEnumerable<Note>> GetNotesAsync();
        public Task<Note> AddNoteAsync(Note note);
        public Task<Note> UpdateNoteAsync(Note note);
        public Task<bool> DeleteNoteAsync(int id);
    }

    public class NoteService : INoteService
    {
        private readonly INoteRepository _noteRepository;

        public NoteService(INoteRepository noteRepository)
        {
            _noteRepository = noteRepository;
        }

        public async Task<Note> AddNoteAsync(Note note)
        {
            if (note == null)
            {
                return null;
            }

            var notes = await _noteRepository.GetNotesAsync();
            note.Id = notes.Max(x => x.Id) + 1;
            await _noteRepository.AddNoteAsync(note);
            return note;
        }

        public async Task<bool> DeleteNoteAsync(int id)
        {
            return await _noteRepository.DeleteNoteAsync(id);
        }

        public async Task<IEnumerable<Note>> GetNotesAsync()
        {
            return await _noteRepository.GetNotesAsync();
        }

        public async Task<Note> UpdateNoteAsync(Note note)
        {
            return await _noteRepository.UpdateNoteAsync(note);
        }
    }

    
}
