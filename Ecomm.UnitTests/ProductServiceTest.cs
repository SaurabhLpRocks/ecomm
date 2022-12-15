using Ecomm.Controllers;
using Ecomm.Models;
using Ecomm.Services;
using Ecomm.Services.Interface;
using Ecomm.Settings;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Moq;
using NSubstitute;

namespace Ecomm.UnitTests
{
    public class ProductServiceTest
    {
        private readonly ProductService _service;

        private readonly IOptions<AppSettings> _appSettings = Options.Create(new AppSettings()
        {
            ConnectionStrings = new() { ProductAppDb = "" }
        });


        public ProductServiceTest()
        {
            _service = new();
        }

        [Fact]
        public void ShouldGetAllProducts()
        {
            // Arrange

            // Act
            var products = _service.GetAllProducts().ToList();

            // Assert
            Assert.NotNull(products);
            Assert.Equal(2, products.Count);
        }
    }
}