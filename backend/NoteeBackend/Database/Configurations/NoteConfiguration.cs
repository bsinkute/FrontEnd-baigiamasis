using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NoteeBackend.Models;

namespace NoteeBackend.Database.Configurations
{
    public class NoteConfiguration : IEntityTypeConfiguration<Note>
    {
        public void Configure(EntityTypeBuilder<Note> builder)
        {
            builder.ToTable("Note");

            builder.HasKey(x => x.Id);

            // Since we are using GUID we want to generate ID inside our application
            builder.Property(n => n.Id)
                .IsRequired()
                .ValueGeneratedNever();

            builder.Property(n => n.Date)
                .IsRequired();

            builder.Property(n => n.Events)
                .IsRequired()
                .HasMaxLength(5000);

            // Seed data
            builder.HasData(
                new Note
                {
                    Id = 1,
                    Date = new DateOnly(2024, 07, 18),
                    Events = "My note\r\nSecond line",
                },
                new Note
                {
                    Id = 2,
                    Date = new DateOnly(2024, 07, 17),
                    Events = "Yesterday note",
                }
            );
        }
    }
}