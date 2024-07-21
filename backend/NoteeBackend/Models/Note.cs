namespace NoteeBackend.Models
{
    public class Note
    {
        public required int Id { get; set; }
        public required DateOnly Date { get; set; }
        public required string Events { get; set; }
    }
}
