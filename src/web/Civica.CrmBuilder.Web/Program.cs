using System;
using System.Diagnostics;
using System.IO;

namespace Civica.CrmBuilder.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var npmStart = Process.Start(new ProcessStartInfo
            {
                CreateNoWindow = true,
                UseShellExecute = false,
                RedirectStandardOutput = true,
                RedirectStandardInput = true,
                WorkingDirectory = Path.Combine(Environment.CurrentDirectory, "..\\"),
                FileName = "C:\\Program Files\\nodejs\\npm.cmd",
                Arguments = "start"
            });

            while (!npmStart.HasExited)
            {
                Console.WriteLine(npmStart.StandardOutput.ReadLine());
            }
        }
    }
}