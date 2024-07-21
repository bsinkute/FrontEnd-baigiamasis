using Microsoft.EntityFrameworkCore;
using NoteeBackend.Database;
using NoteeBackend.Models;

namespace NoteeBackend.Repositories
{
    public interface INoteRepository
    {
        public Task AddNoteAsync(Note note);
        public Task<IList<Note>> GetNotesAsync();
        public Task<Note> UpdateNoteAsync(Note note);
        public Task<bool> DeleteNoteAsync(int id);
    }
    public class NoteRepository : INoteRepository
    {
        private readonly NoteDbContext _dbContext;

        public NoteRepository(NoteDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddNoteAsync(Note note)
        {
            _dbContext.Notes.Add(note);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<bool> DeleteNoteAsync(int id)
        {
            var note = await _dbContext.Notes.FirstOrDefaultAsync(x => x.Id == id);
            if (note == null)
            {
                return false;
            }
            _dbContext.Notes.Remove(note);
            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<IList<Note>> GetNotesAsync()
        {
            return await _dbContext.Notes.ToListAsync();
        }

        public async Task<Note> UpdateNoteAsync(Note note)
        {
            _dbContext.Notes.Update(note);
            int rowCount =  await _dbContext.SaveChangesAsync();
            return rowCount == 0 ? null : note;
        }
    }
}
