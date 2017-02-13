using System;
using Civica.CrmBuilder.Domain.Dtos;
using Civica.CrmPlusPlus.Sdk.Client;
using Civica.CrmPlusPlus.Sdk.Client.Retrieve;
using FakeItEasy;
using Xunit;

namespace Civica.CrmBuilder.Domain.Tests.Builds
{
    public class BuildTests
    {
        [Fact]
        public void WhenRetrievingBuildWithId_ShouldRetrieveFromCrm()
        {
            var existingBuildId = Guid.NewGuid();
            var entityClient = A.Fake<ICrmPlusPlusEntityClient>();

            var build = new Build(entityClient, existingBuildId);

            A.CallTo(() => entityClient.Retrieve(A<Retrieval<Entities.Build>>._))
                .MustHaveHappened(Repeated.Exactly.Once);
        }
    }
}
