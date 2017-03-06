using Autofac;
using Civica.CrmBuilder.DataAccess;
using Civica.CrmBuilder.Services.Installation;

namespace Civica.CrmBuilder.Services
{
    public class ServicesModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterModule<DataAccessModule>();

            builder.RegisterType<InstallationVersionDiscovery>()
                .As<IInstallationVersionDiscovery>();

            builder.RegisterType<Installation.InstallationService>()
                .As<IInstallationService>();
        }
    }
}
