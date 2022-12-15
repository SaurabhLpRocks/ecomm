using Ecomm.Models;

namespace Ecomm.Services.Interface
{
    public interface IProductService
    {
        IEnumerable<Product> GetAllProducts();
    }
}
