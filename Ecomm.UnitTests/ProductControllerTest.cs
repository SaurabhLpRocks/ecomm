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
    public class ProductControllerTest
    {
        private readonly ProductController _controller;
        private readonly IProductService _productServiceMock = Substitute.For<IProductService>();

        private readonly IOptions<AppSettings> _appSettings = Options.Create(new AppSettings()
        {
            ConnectionStrings = new() { ProductAppDb = "" }
        });


        public ProductControllerTest()
        {
            _controller = new(_productServiceMock);
        }

        [Fact]
        public void ShouldGetTwoProducts()
        {
            // Arrange
            _productServiceMock.GetAllProducts().Returns(p =>
            new List<Product>()
                {
                    new Product{ Id = 1,},
                    new Product{ Id = 2,},
                }
            );

            // Act
            var okResult = _controller.Get() as OkObjectResult;        
            
            // Assert
            Assert.IsType<OkObjectResult>(okResult as OkObjectResult); 
            var items = Assert.IsType<List<Product>>(okResult.Value);
            Assert.Equal(2, items.Count);
        }
    }
}