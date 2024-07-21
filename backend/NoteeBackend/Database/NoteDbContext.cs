using Microsoft.EntityFrameworkCore;
using NoteeBackend.Database.Configurations;
using NoteeBackend.Models;

namespace NoteeBackend.Database
{
    public class NoteDbContext : DbContext
    {
        public NoteDbContext(DbContextOptions<NoteDbContext> options) : base(options) { }

        public DbSet<Note> Notes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new NoteConfiguration());
        }
    }
}
