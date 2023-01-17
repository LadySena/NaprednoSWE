using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using BackEnd.Models;
using Microsoft.Extensions.FileProviders;
using BackEnd.Services;
namespace BackEnd
{
    public class Startup
    {
       
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            AutenticationConfiguration autenticationConfiguration=new AutenticationConfiguration();
            Configuration.Bind("Authentication",autenticationConfiguration);
            services.AddSingleton(autenticationConfiguration);
          //  services.AddSingleton<IPasswordHashers,PasswordHashers>();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "BackEnd", Version = "v1" });
            });
            services.AddDbContext<SkolaKlizanjaContext>(options=>{
                options.UseSqlServer(Configuration.GetConnectionString("SkolaKlizanjaCS"));
            }) ;
            services.AddScoped<JwtService>();
            services.AddCors();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "BackEnd v1"));
            }
            app.UseStaticFiles(new StaticFileOptions{
                FileProvider=new PhysicalFileProvider(Path.Combine(env.ContentRootPath,"Images")),
                 RequestPath="/Images"
            });

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseCors(options =>
            options.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins(new string[]{
                "http://localhost:3000",
                "http://localhost:8080",
                "http://localhost:4200"
            }));

            app.UseAuthentication();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
