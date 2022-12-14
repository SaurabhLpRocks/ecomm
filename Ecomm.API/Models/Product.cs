namespace Ecomm.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; } 
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }
        public int Unit { get; set;}
        public string UnitType { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime LastUpdateDate { get; set;}
    }
}
