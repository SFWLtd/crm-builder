using Autofac;
using Autofac.Integration.WebApi;
using Civica.CrmBuilder.Api.Controllers;
using Civica.CrmBuilder.Api.Filters;
using Civica.CrmBuilder.Domain;

namespace Civica.CrmBuilder.Api
{
    public class ApiModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<AuthorizeClientFilter>()
                .AsWebApiAuthorizationFilterFor<InstallationController>()
                .InstancePerDependency();

            builder.RegisterModule<DomainModule>();

            base.Load(builder);
        }
    }
}