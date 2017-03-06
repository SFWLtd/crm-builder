using Autofac;
using Autofac.Integration.WebApi;
using Civica.CrmBuilder.Api.Controllers;
using Civica.CrmBuilder.Api.Filters;
using Civica.CrmBuilder.DataAccess;
using Civica.CrmBuilder.Services;

namespace Civica.CrmBuilder.Api
{
    public class ApiModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterModule<ServicesModule>();
            builder.RegisterModule<DataAccessModule>();

            base.Load(builder);
        }
    }
}