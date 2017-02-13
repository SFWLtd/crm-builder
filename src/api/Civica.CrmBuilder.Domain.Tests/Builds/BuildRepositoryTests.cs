using System;
using Civica.CrmBuilder.Domain.Authentication;
using Civica.CrmBuilder.Domain.Builds;
using Civica.CrmBuilder.Domain.Dtos;
using Civica.CrmPlusPlus.Sdk;
using Civica.CrmPlusPlus.Sdk.Client;
using Civica.CrmPlusPlus.Sdk.Client.Retrieve;
using FakeItEasy;
using Xunit;

namespace Civica.CrmBuilder.Domain.Tests.Builds
{
    public class BuildRepositoryTests
    {
        [Fact]
        public void WhenRetrievingBuildWithId_ShouldRetrieveFromCrm()
        {
            var clientStore = A.Fake<IClientStore>();
            var client = A.Fake<IClient>();
            var crm = A.Fake<ICrmPlusPlus>();
            var entityClient = A.Fake<ICrmPlusPlusEntityClient>();

            A.CallTo(() => crm.EntityClient).Returns(entityClient);
            A.CallTo(() => client.Crm).Returns(crm);
            A.CallTo(() => clientStore.Get()).Returns(client);

            var existingBuildId = Guid.NewGuid();

            new BuildRepository(clientStore).Get(existingBuildId);

            A.CallTo(() => entityClient.Retrieve(A<Retrieval<Entities.Build>>._))
                .MustHaveHappened(Repeated.Exactly.Once);
        }
    }
}
