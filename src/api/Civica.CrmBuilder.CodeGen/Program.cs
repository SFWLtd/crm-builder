using System.IO;
using System.Linq;
using System.Reflection;
using Civica.CrmBuilder.Api;
using NSwag.CodeGeneration.CodeGenerators.TypeScript;
using NSwag.CodeGeneration.SwaggerGenerators.WebApi;
using System;
using System.Configuration;

namespace Civica.CrmBuilder.CodeGen
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var controllers = Metadata.GetAllControllers();

            var swagDocSettings = new WebApiToSwaggerGeneratorSettings
            {
                DefaultUrlTemplate = "api/{controller}/{action}/{id}"
            };
            var swagDocGenerator = new WebApiToSwaggerGenerator(swagDocSettings);
            var document = swagDocGenerator.GenerateForControllersAsync(controllers).Result;

            var codeGenSettings = new SwaggerToTypeScriptClientGeneratorSettings
            {
                Template = TypeScriptTemplate.Fetch,
                PromiseType = PromiseType.Promise,
                TypeScriptGeneratorSettings = new NJsonSchema.CodeGeneration.TypeScript.TypeScriptGeneratorSettings
                {

                },
                GenerateClientInterfaces = true
            };

            var generator = new SwaggerToTypeScriptClientGenerator(document, codeGenSettings);
            var code = generator.GenerateFile();
            code = code.RemoveStatusCodeHandling();
            code = code.AddReferencedTypes();
            code = code.WithCustomReplacements();

            string outputPath = string.Empty;

            var directory = ConfigurationManager.AppSettings["OutputDirectory"].ToString();

            directory = directory.EndsWith("\\") ? directory : directory + "\\";
            outputPath = directory + "ApiClient.ts";

            File.WriteAllText(outputPath, code);
        }
    }
}
