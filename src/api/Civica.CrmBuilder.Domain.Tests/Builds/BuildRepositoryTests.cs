using System;
using Civica.CrmBuilder.Domain.Authentication;
using Civica.CrmBuilder.Domain.Dtos;
using Civica.CrmPlusPlus.Sdk;
using Civica.CrmPlusPlus.Sdk.Client;
using FakeItEasy;
using Xunit;

namespace Civica.CrmBuilder.Domain.Tests.Builds
{
    public class BuildRepositoryTests
    {
        [Fact]
        public void WhenCreatingANewBuild_ShouldThrowArgumentExceptionIfNameDoesNotExist()
        {
            var clientStore = A.Fake<IClientStore>();
            var client = A.Fake<IClient>();
            var crm = A.Fake<ICrmPlusPlus>();
            var entityClient = A.Fake<ICrmPlusPlusEntityClient>();

            A.CallTo(() => crm.EntityClient).Returns(entityClient);
            A.CallTo(() => client.Crm).Returns(crm);
            A.CallTo(() => clientStore.Get()).Returns(client);

            var build = new BuildDto();

            Assert.Throws<ArgumentException>(() => new BuildRepository(clientStore).New(build));
        }

        [Fact]
        public void WhenCreatingANewBuildWithName_ShouldCreateEntityInCrm()
        {
            var clientStore = A.Fake<IClientStore>();
            var client = A.Fake<IClient>();
            var crm = A.Fake<ICrmPlusPlus>();
            var entityClient = A.Fake<ICrmPlusPlusEntityClient>();

            A.CallTo(() => crm.EntityClient).Returns(entityClient);
            A.CallTo(() => client.Crm).Returns(crm);
            A.CallTo(() => clientStore.Get()).Returns(client);

            var build = new BuildDto
            {
                Name = "Test",
                TargetPassword = "password",
                TargetAuthenticationType = Core.Enums.AuthenticationType.Dynamics365,
                TargetEmailAddress = "a@b.c",
                TargetCrmUrl = "https://something"
            };

            new BuildRepository(clientStore).New(build);

            A.CallTo(() => entityClient.Create(A<Entities.Build>._))
                .MustHaveHappened(Repeated.Exactly.Once);
        }
    }
}
