using Autofac;
using Civica.CrmBuilder.Domain.Authentication;

namespace Civica.CrmBuilder.Domain
{
    public class DomainModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<InMemoryClientStore>()
                .As<IClientStore>()
                .SingleInstance();
        }
    }
}
