using Ecomm.Models;
using Ecomm.Services.Interface;

namespace Ecomm.Services
{
    public class ProductService : IProductService
    {
        private readonly IEnumerable<Product> _products;
        public ProductService()
        {
            _products = new List<Product>()
            {
                new Product()
                {
                    Id= 1,
                    CreatedDate=DateTime.Now.AddDays(-2),
                    Description="Demo Prod-1 Desc",
                    ImageUrl="https://i.pravatar.cc/30",
                    IsActive=true,
                    LastUpdateDate=DateTime.Now,
                    Name="Prod-1",
                    Price=10,
                    Unit=1,
                    UnitType="Qty",
                },
                new Product()
                {
                    Id= 2,
                    CreatedDate=DateTime.Now.AddDays(-3),
                    Description="Demo Prod-2 Desc",
                    ImageUrl="https://i.pravatar.cc/300",
                    IsActive=true,
                    LastUpdateDate=DateTime.Now,
                    Name="Prod-2",
                    Price=10,
                    Unit=1,
                    UnitType="Qty",
                }
            };
        }

        public IEnumerable<Product> GetAllProducts()
        {
            return _products;
        }
    }
}
