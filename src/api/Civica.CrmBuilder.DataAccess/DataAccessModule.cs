using Autofac;
using Civica.CrmBuilder.DataAccess.Authentication;
using Civica.CrmPlusPlus.Sdk;

namespace Civica.CrmBuilder.DataAccess
{
    public class DataAccessModule : Module
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
                return ((CrmClient)client).Crm;
            })
            .As<ICrmPlusPlus>();
        }
    }
}
