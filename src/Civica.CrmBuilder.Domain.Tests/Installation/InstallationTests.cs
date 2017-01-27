using System;
using System.Collections.Generic;
using Civica.CrmBuilder.Domain.Authentication;
using Civica.CrmBuilder.Domain.Constants;
using Civica.CrmPlusPlus.Sdk;
using Civica.CrmPlusPlus.Sdk.DefaultEntities;
using Civica.CrmPlusPlus.Sdk.Querying;
using FakeItEasy;
using Xunit;

namespace Civica.CrmBuilder.Domain.Tests.Installation
{
    public class InstallationTests
    {
        private readonly ICrmPlusPlus crmPlusPlus;

        public InstallationTests()
        {
            crmPlusPlus = A.Fake<ICrmPlusPlus>();
        }

        [Fact]
        public void ShouldAllowInstallationForDefaultSolutionVersion()
        {
            var version = CrmConstants.InitialSolutionVersion;

            A.CallTo(() => crmPlusPlus.EntityClient.RetrieveMultiple(A<Query<Solution>>._))
                .Returns(new List<Solution> { new Solution { Name = "TestSolution", DisplayName = "Test Solution", Version = version } });

            new Domain.Installation.Installation(crmPlusPlus);
        }

        [Fact]
        public void ShouldNotAllowInstallationForSolutionVersionThatDoesNotExist()
        {
            var version = new Version(int.MaxValue, int.MaxValue, int.MaxValue, int.MaxValue);

            A.CallTo(() => crmPlusPlus.EntityClient.RetrieveMultiple(A<Query<Solution>>._))
                .Returns(new List<Solution> { new Solution { Name = "TestSolution", DisplayName = "Test Solution", Version = version.ToString() } });

            Assert.Throws<ArgumentException>(() => new Domain.Installation.Installation(crmPlusPlus));
        }
    }
}
