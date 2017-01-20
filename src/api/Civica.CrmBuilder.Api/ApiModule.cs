using Autofac;
using Autofac.Integration.WebApi;
using Civica.CrmBuilder.Domain;

namespace Civica.CrmBuilder.Api
{
    public class ApiModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterModule<DomainModule>();

            base.Load(builder);
        }
    }
}