using System;
using System.Diagnostics;
using System.IO;

namespace Civica.CrmBuilder.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var process = Process.Start(new ProcessStartInfo
            {
                UseShellExecute = false,
                RedirectStandardOutput = true,
                RedirectStandardInput = true,
                WorkingDirectory = Path.Combine(Environment.CurrentDirectory, "..\\"),
                WindowStyle = ProcessWindowStyle.Normal,
                FileName = "C:\\Program Files\\nodejs\\npm.cmd",
                Arguments = "start"
            });

            process.StandardOutput.ReadToEnd();

            Console.ReadKey();
        }
    }
}