using Ecomm.Services;
using Ecomm.Services.Interface;
using Ecomm.Settings;

namespace Ecomm
{
    public class Program
    {
        public static void Main(string[] args)
        {
            WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            IConfigurationRoot config = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
            AppSettings appSettings = config.GetSection("AppSettings").Get<AppSettings>();

            _ = builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            _ = builder.Services.AddEndpointsApiExplorer();
            _ = builder.Services.AddSwaggerGen();
            _ = builder.Services.AddSingleton<IProductService, ProductService>();

            // Add CORS config
            string CorsConfig = "_corsConfig";
            _ = builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: CorsConfig,
                      policy =>
                      {
                          // TODO: Specify specific urls
                          _ = policy.AllowAnyOrigin()
                                .AllowAnyHeader()
                                .AllowAnyMethod(); ;
                      });
            });

            WebApplication app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                _ = app.UseSwagger();
                _ = app.UseSwaggerUI();
            }

            _ = app.UseHttpsRedirection();

            _ = app.UseAuthorization();

            _ = app.UseCors(CorsConfig);

            _ = app.MapControllers();

            app.Run();
        }
    }
}