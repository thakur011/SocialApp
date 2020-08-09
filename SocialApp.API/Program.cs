using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using SocialApp.API.Data;

namespace SocialApp.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host= CreateHostBuilder(args).Build();
            using(var scope = host.Services.CreateScope())
            {
                var services=scope.ServiceProvider;
                try{
                    //apply pending migrations in case the db is droped and create the db
                    var context=services.GetRequiredService<SocialAppDbContext>();
                    context.Database.Migrate();
                    //calling seed method to insert data.
                    Seed.SeedUsers(context);
                }
                catch(Exception ex)
                {
                    var logger=services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex,"An error occured during migration");
                }
                
            }
            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
