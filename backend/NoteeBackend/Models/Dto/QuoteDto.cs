namespace NoteeBackend.Models.Dto
{
    public class QuoteDto
    {
        public string _id { get; set; }
        public string content { get; set; }
        public string author { get; set; }
        public string[] tags { get; set; }
        public string authorSlug { get; set; }
        public int length { get; set; }
        public DateTime dateAdded { get; set; }
        public DateTime dateModified { get; set; }
    }
}
