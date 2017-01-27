using System;
using System.Collections.Generic;
using System.Linq;
using Civica.CrmBuilder.Domain.Authentication;
using Civica.CrmBuilder.Domain.Constants;
using Civica.CrmBuilder.Domain.Installation;
using Civica.CrmBuilder.Domain.Installation.Components;
using Civica.CrmBuilder.Domain.Installation.Versions;
using Civica.CrmPlusPlus;
using Civica.CrmPlusPlus.Sdk;
using Civica.CrmPlusPlus.Sdk.Client;
using Civica.CrmPlusPlus.Sdk.DefaultEntities;
using Civica.CrmPlusPlus.Sdk.Querying;
using Civica.CrmPlusPlus.Sdk.Settings;
using FakeItEasy;
using Xunit;

namespace Civica.CrmBuilder.Domain.Tests.Installation
{
    public class InstallationTests
    {
        private readonly ICrmPlusPlus crmPlusPlus;
        private readonly IInstallationVersionDiscovery discovery;

        public InstallationTests()
        {
            crmPlusPlus = A.Fake<ICrmPlusPlus>();
            discovery = A.Fake<IInstallationVersionDiscovery>();
        }

        [Fact]
        public void ShouldAllowInstallationForDefaultSolutionVersion()
        {
            var version = CrmConstants.InitialSolutionVersion;

            A.CallTo(() => crmPlusPlus.EntityClient.RetrieveMultiple(A<Query<Solution>>._))
                .Returns(new List<Solution> { new Solution { Name = "TestSolution", DisplayName = "Test Solution", Version = version } });

            new Domain.Installation.Installation(discovery, () => crmPlusPlus).GetStatus();
        }

        [Fact]
        public void ShouldAllowInstallationForSolutionVersionThatDoesExist()
        {
            var version = new Version("0.0.0.1");

            A.CallTo(() => discovery.Discover())
                .Returns(new List<InstallationVersion> { new TestInstallationVersion(version, new Dictionary<int, InstallationComponent>()) });

            A.CallTo(() => crmPlusPlus.EntityClient.RetrieveMultiple(A<Query<Solution>>._))
                .Returns(new List<Solution> { new Solution { Name = "TestSolution", DisplayName = "Test Solution", Version = version.ToString() } });

            new Domain.Installation.Installation(discovery, () => crmPlusPlus).GetStatus();
        }

        [Fact]
        public void ShouldNotAllowInstallationForSolutionVersionThatDoesNotExist()
        {
            var version = new Version(int.MaxValue, int.MaxValue, int.MaxValue, int.MaxValue);

            A.CallTo(() => crmPlusPlus.EntityClient.RetrieveMultiple(A<Query<Solution>>._))
                .Returns(new List<Solution> { new Solution { Name = "TestSolution", DisplayName = "Test Solution", Version = version.ToString() } });

            Assert.Throws<ArgumentException>(() => new Domain.Installation.Installation(discovery, () => crmPlusPlus).GetStatus());
        }

        [Fact]
        public void GetStatus_ForDefaultSolution_ShouldSayNotInstalledAndUpdateNotRequired()
        {
            var version = Version.Parse(CrmConstants.InitialSolutionVersion);

            A.CallTo(() => discovery.Discover())
                .Returns(new List<InstallationVersion> { new TestInstallationVersion(version, new Dictionary<int, InstallationComponent>()) });

            A.CallTo(() => crmPlusPlus.EntityClient.RetrieveMultiple(A<Query<Solution>>._))
                .Returns(new List<Solution> { new Solution { Name = "TestSolution", DisplayName = "Test Solution", Version = version.ToString() } });

            var result = new Domain.Installation.Installation(discovery, () => crmPlusPlus).GetStatus();

            Assert.False(result.IsInstalled);
            Assert.False(result.RequiresUpdate);
        }

        [Fact]
        public void GetStatus_ForUpToDateSolution_ShouldSayIsInstalledAndUpdateNotRequired()
        {
            var version = new Version("0.0.0.1");

            A.CallTo(() => discovery.Discover())
                .Returns(new List<InstallationVersion> { new TestInstallationVersion(version, new Dictionary<int, InstallationComponent>()) });

            A.CallTo(() => crmPlusPlus.EntityClient.RetrieveMultiple(A<Query<Solution>>._))
                .Returns(new List<Solution> { new Solution { Name = "TestSolution", DisplayName = "Test Solution", Version = version.ToString() } });

            var result = new Domain.Installation.Installation(discovery, () => crmPlusPlus).GetStatus();

            Assert.True(result.IsInstalled);
            Assert.False(result.RequiresUpdate);
        }

        [Fact]
        public void GetStatus_ForNotUpToDateSolution_ShouldSayIsInstalledAndUpdateIsRequired()
        {
            var currentVersion = new Version("0.0.0.1");
            var latestVersion = new Version("0.0.0.2");

            A.CallTo(() => discovery.Discover())
                .Returns(new List<InstallationVersion>
                {
                    new TestInstallationVersion(currentVersion, new Dictionary<int, InstallationComponent>()),
                    new TestInstallationVersion(latestVersion, new Dictionary<int, InstallationComponent>()),
                });

            A.CallTo(() => crmPlusPlus.EntityClient.RetrieveMultiple(A<Query<Solution>>._))
                .Returns(new List<Solution> { new Solution { Name = "TestSolution", DisplayName = "Test Solution", Version = currentVersion.ToString() } });

            var result = new Domain.Installation.Installation(discovery, () => crmPlusPlus).GetStatus();

            Assert.True(result.IsInstalled);
            Assert.True(result.RequiresUpdate);
        }

        [Fact]
        public void StartInstallation_ForNewVersionWithOneComponent_InstallationIsComplete()
        {
            var currentVersion = new Version("0.0.0.1");
            var latestVersion = new Version("0.0.0.2");

            var componentDescription = "dhjskldsa";
            var componentInstall = new InstallationComponent(componentDescription,
                client => client.GetType(),
                client => client.GetType()); // Does nothing on installation or rollback

            var components = new Dictionary<int, InstallationComponent>();
            components.Add(0, componentInstall);

            A.CallTo(() => discovery.Discover())
                .Returns(new List<InstallationVersion>
                {
                    new TestInstallationVersion(currentVersion, new Dictionary<int, InstallationComponent>()),
                    new TestInstallationVersion(latestVersion, components),
                });

            A.CallTo(() => crmPlusPlus.EntityClient.RetrieveMultiple(A<Query<Solution>>._))
                .Returns(new List<Solution> { new Solution { Name = "TestSolution", DisplayName = "Test Solution", Version = currentVersion.ToString() } });

            var result = new Domain.Installation.Installation(discovery, () => crmPlusPlus).StartInstallation();

            Assert.True(result.IsSuccess);
            Assert.Equal(componentDescription, result.ComponentDescription);
            Assert.False(result.MoreToInstall);
        }

        [Fact]
        public void StartInstallation_ForNewVersionWithTwoComponents_InstallationIsNotComplete_AndGivesDetailsOfNextComponentToInstall()
        {
            var currentVersion = new Version("0.0.0.1");
            var latestVersion = new Version("0.0.0.2");

            var firstComponentDescription = "dhjskldsa";
            var secondComponentDescription = "DLAOIEHJK";
            var firstComponent = new InstallationComponent(firstComponentDescription,
                client => client.GetType(),
                client => client.GetType()); // Does nothing on installation or rollback
            var secondComponent = new InstallationComponent(secondComponentDescription,
                client => client.GetType(),
                client => client.GetType());

            var components = new Dictionary<int, InstallationComponent>();
            components.Add(0, firstComponent);
            components.Add(1, secondComponent);

            A.CallTo(() => discovery.Discover())
                .Returns(new List<InstallationVersion>
                {
                    new TestInstallationVersion(currentVersion, new Dictionary<int, InstallationComponent>()),
                    new TestInstallationVersion(latestVersion, components),
                });

            A.CallTo(() => crmPlusPlus.EntityClient.RetrieveMultiple(A<Query<Solution>>._))
                .Returns(new List<Solution> { new Solution { Name = "TestSolution", DisplayName = "Test Solution", Version = currentVersion.ToString() } });

            var result = new Domain.Installation.Installation(discovery, () => crmPlusPlus).StartInstallation();

            Assert.True(result.IsSuccess);
            Assert.True(result.MoreToInstall);
            Assert.Equal(firstComponentDescription, result.ComponentDescription);
            Assert.True(result.NextComponentId.HasValue);
            Assert.Equal(1, result.NextComponentId.Value);
            Assert.NotNull(result.NextComponentVersion);
            Assert.Equal(0, latestVersion.CompareTo(result.NextComponentVersion));
        }

        [Fact]
        public void StartInstallation_ForTwoNewVersionsWithTwoComponents_InstallationIsNotComplete_AndGivesDetailsOfNextComponentToInstall()
        {
            var currentVersion = new Version("0.0.0.1");
            var firstNewVersion = new Version("0.0.0.2");
            var secondNewVersion = new Version("0.0.0.3");

            var firstComponentDescription = "dhjskldsa";
            var secondComponentDescription = "DLAOIEHJK";
            var firstComponent = new InstallationComponent(firstComponentDescription,
                client => client.GetType(),
                client => client.GetType()); // Does nothing on installation or rollback
            var secondComponent = new InstallationComponent(secondComponentDescription,
                client => client.GetType(),
                client => client.GetType());

            var firstNewVersionComponents = new Dictionary<int, InstallationComponent>();
            firstNewVersionComponents.Add(0, firstComponent);
            
            var secondNewVersionComponents = new Dictionary<int, InstallationComponent>();
            secondNewVersionComponents.Add(0, secondComponent);

            A.CallTo(() => discovery.Discover())
                .Returns(new List<InstallationVersion>
                {
                    new TestInstallationVersion(currentVersion, new Dictionary<int, InstallationComponent>()),
                    new TestInstallationVersion(firstNewVersion, firstNewVersionComponents),
                    new TestInstallationVersion(secondNewVersion, secondNewVersionComponents),
                });

            A.CallTo(() => crmPlusPlus.EntityClient.RetrieveMultiple(A<Query<Solution>>._))
                .Returns(new List<Solution> { new Solution { Name = "TestSolution", DisplayName = "Test Solution", Version = currentVersion.ToString() } });

            var result = new Domain.Installation.Installation(discovery, () => crmPlusPlus).StartInstallation();

            Assert.True(result.IsSuccess);
            Assert.True(result.MoreToInstall);
            Assert.Equal(firstComponentDescription, result.ComponentDescription);
            Assert.True(result.NextComponentId.HasValue);
            Assert.Equal(0, result.NextComponentId.Value);
            Assert.NotNull(result.NextComponentVersion);
            Assert.Equal(0, secondNewVersion.CompareTo(result.NextComponentVersion));
        }

        [Fact]
        public void StartInstallation_ForTwoNewVersionsWithTwoComponents_UpdatesSolutionVersionAsFirstComponentInstalled()
        {
            var currentVersion = new Version("0.0.0.1");
            var firstNewVersion = new Version("0.0.0.2");
            var secondNewVersion = new Version("0.0.0.3");

            var firstComponentDescription = "dhjskldsa";
            var secondComponentDescription = "DLAOIEHJK";
            var firstComponent = new InstallationComponent(firstComponentDescription,
                client => client.GetType(),
                client => client.GetType()); // Does nothing on installation or rollback
            var secondComponent = new InstallationComponent(secondComponentDescription,
                client => client.GetType(),
                client => client.GetType());

            var firstNewVersionComponents = new Dictionary<int, InstallationComponent>();
            firstNewVersionComponents.Add(0, firstComponent);

            var secondNewVersionComponents = new Dictionary<int, InstallationComponent>();
            secondNewVersionComponents.Add(0, secondComponent);

            A.CallTo(() => discovery.Discover())
                .Returns(new List<InstallationVersion>
                {
                    new TestInstallationVersion(currentVersion, new Dictionary<int, InstallationComponent>()),
                    new TestInstallationVersion(firstNewVersion, firstNewVersionComponents),
                    new TestInstallationVersion(secondNewVersion, secondNewVersionComponents),
                });

            A.CallTo(() => crmPlusPlus.EntityClient.RetrieveMultiple(A<Query<Solution>>._))
                .Returns(new List<Solution> { new Solution { Name = "TestSolution", DisplayName = "Test Solution", Version = currentVersion.ToString() } });

            var result = new Domain.Installation.Installation(discovery, () => crmPlusPlus).StartInstallation();

            A.CallTo(() => crmPlusPlus.EntityClient.Update(A<Solution>._))
                .MustHaveHappened();
        }

        [Fact]
        public void StartInstallation_ForTwoNewVersionsWithTwoComponents_ButSolutionUpdateFailsAfterFirstComponentInstalled_RollsBackComponentInstallation_AndStatesFailure()
        {
            var currentVersion = new Version("0.0.0.1");
            var firstNewVersion = new Version("0.0.0.2");
            var secondNewVersion = new Version("0.0.0.3");

            var firstComponentDescription = "dhjskldsa";
            var secondComponentDescription = "DLAOIEHJK";

            A.CallTo(() => crmPlusPlus.EntityClient.Update(A<Solution>._))
                .Throws<Exception>();

            var rollbacks = new List<bool>();
            var firstComponent = new InstallationComponent(firstComponentDescription,
                client => client.GetType(),
                client => rollbacks.Add(true)); // Notifies that rollback was called on installation component
            var secondComponent = new InstallationComponent(secondComponentDescription,
                client => client.GetType(),
                client => client.GetType());

            var firstNewVersionComponents = new Dictionary<int, InstallationComponent>();
            firstNewVersionComponents.Add(0, firstComponent);

            var secondNewVersionComponents = new Dictionary<int, InstallationComponent>();
            secondNewVersionComponents.Add(0, secondComponent);

            A.CallTo(() => discovery.Discover())
                .Returns(new List<InstallationVersion>
                {
                    new TestInstallationVersion(currentVersion, new Dictionary<int, InstallationComponent>()),
                    new TestInstallationVersion(firstNewVersion, firstNewVersionComponents),
                    new TestInstallationVersion(secondNewVersion, secondNewVersionComponents),
                });

            A.CallTo(() => crmPlusPlus.EntityClient.RetrieveMultiple(A<Query<Solution>>._))
                .Returns(new List<Solution> { new Solution { Name = "TestSolution", DisplayName = "Test Solution", Version = currentVersion.ToString() } });

            var result = new Domain.Installation.Installation(discovery, () => crmPlusPlus).StartInstallation();

            Assert.Equal(1, rollbacks.Count);
            Assert.False(result.IsSuccess);
            Assert.False(result.MoreToInstall);
        }

        [Fact]
        public void StartInstallation_WithComponentThatFailsToInstall_ShouldSayUnsuccessful()
        {
            var currentVersion = new Version("0.0.0.1");
            var latestVersion = new Version("0.0.0.2");

            var customizationClient = A.Fake<ICrmPlusPlusCustomizationClient>();
            A.CallTo(() => customizationClient.CreateEntity<TestEntity>())
                .Throws<Exception>();

            A.CallTo(() => crmPlusPlus.GetCustomizationClientForSolution(A<PublisherSettings>._, A<SolutionSettings>._))
                .Returns(customizationClient);

            var componentDescription = "dhjskldsa";
            var componentInstall = new InstallationComponent(componentDescription,
                client => client.CreateEntity<TestEntity>(), // This will throw an error
                client => client.GetType()); // Does nothing on rollback

            var components = new Dictionary<int, InstallationComponent>();
            components.Add(0, componentInstall);

            A.CallTo(() => discovery.Discover())
                .Returns(new List<InstallationVersion>
                {
                    new TestInstallationVersion(currentVersion, new Dictionary<int, InstallationComponent>()),
                    new TestInstallationVersion(latestVersion, components),
                });

            A.CallTo(() => crmPlusPlus.EntityClient.RetrieveMultiple(A<Query<Solution>>._))
                .Returns(new List<Solution> { new Solution { Name = "TestSolution", DisplayName = "Test Solution", Version = currentVersion.ToString() } });

            var result = new Domain.Installation.Installation(discovery, () => crmPlusPlus).StartInstallation();

            Assert.False(result.IsSuccess);
            Assert.False(result.MoreToInstall);
            Assert.NotNull(result.ErrorMessage);
        }

        [Fact]
        public void InstallNextComponent_WithUnknownVersion_FailsInstallation()
        {
            var unknownVersion = new Version(int.MaxValue, int.MaxValue, int.MaxValue, int.MaxValue);
            var currentVersion = new Version("0.0.0.1");
            var latestVersion = new Version("0.0.0.2");

            A.CallTo(() => discovery.Discover())
                .Returns(new List<InstallationVersion>
                {
                    new TestInstallationVersion(currentVersion, new Dictionary<int, InstallationComponent>()),
                    new TestInstallationVersion(latestVersion, new Dictionary<int, InstallationComponent>()),
                });

            A.CallTo(() => crmPlusPlus.EntityClient.RetrieveMultiple(A<Query<Solution>>._))
                .Returns(new List<Solution> { new Solution { Name = "TestSolution", DisplayName = "Test Solution", Version = currentVersion.ToString() } });

            var result = new Domain.Installation.Installation(discovery, () => crmPlusPlus).InstallNextComponent(0, unknownVersion);

            Assert.False(result.IsSuccess);
            Assert.False(result.MoreToInstall);
            Assert.NotNull(result.ErrorMessage);
        }

        [Fact]
        public void InstallNextComponent_WithUnknownVersionComponent_FailsInstallation()
        {
            var unknownVersion = new Version(int.MaxValue, int.MaxValue, int.MaxValue, int.MaxValue);
            var currentVersion = new Version("0.0.0.1");
            var latestVersion = new Version("0.0.0.2");

            var component = new InstallationComponent("dshajdkh",
                client => client.GetType(),
                client => client.GetType()); // Does nothing on installation or rollback

            var installationComponents = new Dictionary<int, InstallationComponent>();
            installationComponents.Add(0, component);

            A.CallTo(() => discovery.Discover())
                .Returns(new List<InstallationVersion>
                {
                    new TestInstallationVersion(currentVersion, new Dictionary<int, InstallationComponent>()),
                    new TestInstallationVersion(latestVersion, installationComponents),
                });

            A.CallTo(() => crmPlusPlus.EntityClient.RetrieveMultiple(A<Query<Solution>>._))
                .Returns(new List<Solution> { new Solution { Name = "TestSolution", DisplayName = "Test Solution", Version = currentVersion.ToString() } });

            var result = new Domain.Installation.Installation(discovery, () => crmPlusPlus).InstallNextComponent(int.MaxValue, latestVersion);

            Assert.False(result.IsSuccess);
            Assert.False(result.MoreToInstall);
            Assert.NotNull(result.ErrorMessage);
        }


        private class TestInstallationVersion : InstallationVersion
        {
            public TestInstallationVersion(Version version, Dictionary<int, InstallationComponent> installationComponents)
                : base(version)
            {
                foreach (var installationComponent in installationComponents.OrderBy(ic => ic.Key))
                {
                    RegisterNextComponent(installationComponent.Value);
                }
            }
        }

        private class TestEntity : CrmPlusPlusEntity
        {
        }
    }
}
