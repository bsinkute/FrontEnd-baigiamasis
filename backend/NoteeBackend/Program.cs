
using Microsoft.EntityFrameworkCore;
using NoteeBackend.Database;
using NoteeBackend.Repositories;
using NoteeBackend.Services;

namespace NoteeBackend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddHttpClient();

            builder.Services.AddDbContext<NoteDbContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("NoteConnection"));
            });
            // Create cors policy
            builder.Services.AddCors(p => p.AddPolicy("notee-cors", builder =>
            {
                builder.WithOrigins("*")
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            }));

            // Dependency Injection
            builder.Services.AddScoped<INoteService, NoteService>();
            builder.Services.AddScoped<INoteRepository, NoteRepository>();
            builder.Services.AddSingleton<IQuoteService, QuoteService>();
            builder.Services.AddSingleton<IQuoteMapper, QuoteMapper>();


            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors("notee-cors");

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
