using System;
using Civica.CrmBuilder.Core.Mapping;
using Civica.CrmBuilder.Domain.Authentication;
using Civica.CrmPlusPlus.Sdk.Client;

namespace Civica.CrmBuilder.Domain.Builds
{
    public class BuildBuilder : IBuildBuilder
    {
        private readonly ICrmPlusPlusEntityClient entityClient;

        public BuildBuilder(IClientStore clientStore)
        {
            entityClient = clientStore.Get().Crm.EntityClient;
        }

        public IBuild Existing(Guid id)
        {
            return new Build(entityClient, id);
        }

        public IBuild New(IMappableTo<NewBuildProperties> newBuildProperties)
        {
            return new Build(entityClient, newBuildProperties.Map());
        }
    }
}
