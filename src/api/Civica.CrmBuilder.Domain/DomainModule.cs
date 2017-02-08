using Autofac;
using Civica.CrmBuilder.Domain.Authentication;
using Civica.CrmBuilder.Domain.Dtos;
using Civica.CrmBuilder.Domain.Installation;
using Civica.CrmPlusPlus.Sdk;

namespace Civica.CrmBuilder.Domain
{
    public class DomainModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<InMemoryClientStore>()
                .As<IClientStore>()
                .WithParameter("slidingExpiryPeriodInMinutes", 240)
                .SingleInstance();

            builder.Register(c =>
            {
                var clientStore = c.Resolve<IClientStore>();
                var client = clientStore.Get();
                return (CrmPlusPlus.Sdk.CrmPlusPlus)client.Crm;
            })
            .As<ICrmPlusPlus>();

            builder.RegisterType<InstallationVersionDiscovery>()
                .As<IInstallationVersionDiscovery>();

            builder.RegisterType<Installation.Installation>()
                .As<IInstallation>();

            builder.RegisterType<BuildRepository>()
                .As<IBuildRepository>();
        }
    }
}
