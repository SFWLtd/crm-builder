using System;
using Civica.CrmBuilder.Domain.Builds;
using Civica.CrmPlusPlus.Sdk.Client;
using Civica.CrmPlusPlus.Sdk.Client.Retrieve;
using FakeItEasy;
using Xunit;

namespace Civica.CrmBuilder.Domain.Tests.Builds
{
    public class BuildTests
    {
        [Fact]
        public void WhenCreatingABuildFromProperties_ShouldThrowArgumentExceptionIfNameDoesNotExist()
        {
            Assert.Throws<ArgumentException>(() => new Build(null, new NewBuildProperties()));
        }

        [Fact]
        public void WhenCreatingABuildFromProperties_ShouldCreateEntityInCrm()
        {
            var entityClient = A.Fake<ICrmPlusPlusEntityClient>();

            var build = new Build(entityClient, new NewBuildProperties
            {
                BuildVersioningType = Core.Enums.BuildVersioningType.JulianDate,
                Name = "test"
            });

            A.CallTo(() => entityClient.Create(A<Entities.Build>._))
                .MustHaveHappened(Repeated.Exactly.Once);
        }

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
