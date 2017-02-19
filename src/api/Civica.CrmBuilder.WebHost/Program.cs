using System;
using Civica.CrmBuilder.Api;
using Microsoft.Owin.Hosting;

namespace Civica.CrmBuilder.WebHost
{
    class Program
    {
        static void Main(string[] args)
        {
            string baseUrl = "http://localhost:8001";
            using (WebApp.Start<Startup>(baseUrl))
            {
                Console.WriteLine("Press any key to stop");
                Console.ReadKey();
            }
        }
    }
}
