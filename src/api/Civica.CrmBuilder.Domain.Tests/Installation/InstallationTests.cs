using System;
using System.Collections.Generic;
using System.Linq;
using Civica.CrmBuilder.Core.Constants;
using Civica.CrmBuilder.DataAccess;
using Civica.CrmBuilder.DataAccess.Actions;
using Civica.CrmBuilder.Entities;
using Civica.CrmBuilder.Services.Installation;
using Civica.CrmBuilder.Services.Installation.Components;
using Civica.CrmBuilder.Services.Installation.Versions;
using Civica.CrmPlusPlus;
using Civica.CrmPlusPlus.Sdk;
using FakeItEasy;
using Xunit;

namespace Civica.CrmBuilder.Services.Tests.Installation
{
    public class InstallationTests
    {
        private readonly IInstallationVersionDiscovery discovery;

        public InstallationTests()
        {
            discovery = A.Fake<IInstallationVersionDiscovery>();
        }

        [Fact]
        public void ShouldAllowInstallationForDefaultSolutionVersion()
        {
            var version = CrmConstants.InitialSolutionVersion;

            var dispatcher = A.Fake<IDataAccessDispatcher>();

            A.CallTo(() => dispatcher.Dispatch(A<DataAccessAction<Solution>>._))
                .Returns(new Solution { Name = "TestSolution", DisplayName = "Test Solution", Version = version });

            new InstallationService(discovery, dispatcher).GetStatus();
        }

        [Fact]
        public void ShouldAllowInstallationForSolutionVersionThatDoesExist()
        {
            var version = new Version("0.0.0.1");

            A.CallTo(() => discovery.Discover())
                .Returns(new List<InstallationVersion> { new TestInstallationVersion(version, new Dictionary<int, InstallationComponent>()) });

            var dispatcher = A.Fake<IDataAccessDispatcher>();

            A.CallTo(() => dispatcher.Dispatch(A<DataAccessAction<Solution>>._))
                .Returns(new Solution { Name = "TestSolution", DisplayName = "Test Solution", Version = version.ToString() });

            new InstallationService(discovery, dispatcher).GetStatus();
        }

        [Fact]
        public void ShouldNotAllowInstallationForSolutionVersionThatDoesNotExist()
        {
            var version = new Version(int.MaxValue, int.MaxValue, int.MaxValue, int.MaxValue);

            var dispatcher = A.Fake<IDataAccessDispatcher>();

            A.CallTo(() => dispatcher.Dispatch(A<DataAccessAction<Solution>>._))
                .Returns(new Solution { Name = "TestSolution", DisplayName = "Test Solution", Version = version.ToString() });

            Assert.Throws<ArgumentException>(() => new InstallationService(discovery, dispatcher).GetStatus());
        }

        [Fact]
        public void GetStatus_ForDefaultSolution_ShouldSayNotInstalledAndUpdateNotRequired()
        {
            var version = Version.Parse(CrmConstants.InitialSolutionVersion);

            A.CallTo(() => discovery.Discover())
                .Returns(new List<InstallationVersion> { new TestInstallationVersion(version, new Dictionary<int, InstallationComponent>()) });

            var dispatcher = A.Fake<IDataAccessDispatcher>();

            A.CallTo(() => dispatcher.Dispatch(A<DataAccessAction<Solution>>._))
                .Returns(new Solution { Name = "TestSolution", DisplayName = "Test Solution", Version = version.ToString() });

            var result = new InstallationService(discovery, dispatcher).GetStatus();

            Assert.False(result.IsInstalled);
            Assert.False(result.RequiresUpdate);
        }

        [Fact]
        public void GetStatus_ForUpToDateSolution_ShouldSayIsInstalledAndUpdateNotRequired()
        {
            var version = new Version("0.0.0.1");

            A.CallTo(() => discovery.Discover())
                .Returns(new List<InstallationVersion> { new TestInstallationVersion(version, new Dictionary<int, InstallationComponent>()) });

            var dispatcher = A.Fake<IDataAccessDispatcher>();

            A.CallTo(() => dispatcher.Dispatch(A<DataAccessAction<Solution>>._))
                .Returns(new Solution { Name = "TestSolution", DisplayName = "Test Solution", Version = version.ToString() });

            var result = new InstallationService(discovery, dispatcher).GetStatus();

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

            var dispatcher = A.Fake<IDataAccessDispatcher>();

            A.CallTo(() => dispatcher.Dispatch(A<DataAccessAction<Solution>>._))
                .Returns(new Solution { Name = "TestSolution", DisplayName = "Test Solution", Version = currentVersion.ToString() });

            var result = new InstallationService(discovery, dispatcher).GetStatus();

            Assert.True(result.IsInstalled);
            Assert.True(result.RequiresUpdate);
        }

        [Fact]
        public void StartInstallation_ForNewVersionWithOneComponent_InstallationIsNotComplete_AndReturnsDetailsOfFirstComponent()
        {
            var currentVersion = new Version("0.0.0.1");
            var latestVersion = new Version("0.0.0.2");

            var componentDescription = "dhjskldsa";
            var componentInstall = new InstallationComponent(componentDescription,
                OtherActions.DoNothing(),
                OtherActions.DoNothing(),
                OtherActions.DoNothing());

            var components = new Dictionary<int, InstallationComponent>();
            components.Add(0, componentInstall);

            A.CallTo(() => discovery.Discover())
                .Returns(new List<InstallationVersion>
                {
                    new TestInstallationVersion(currentVersion, new Dictionary<int, InstallationComponent>()),
                    new TestInstallationVersion(latestVersion, components),
                });


            var dispatcher = A.Fake<IDataAccessDispatcher>();

            A.CallTo(() => dispatcher.Dispatch(A<DataAccessAction<Solution>>._))
                .Returns(new Solution { Name = "TestSolution", DisplayName = "Test Solution", Version = currentVersion.ToString() });

            var result = new InstallationService(discovery, dispatcher).StartInstallation();

            Assert.True(result.IsSuccess);
            Assert.Equal(componentDescription, result.NextComponentDescription);
            Assert.Equal(0, result.NextComponentId);
            Assert.Equal("0.0.0.2", result.NextComponentVersion.ToString());
            Assert.True(result.MoreToInstall);
        }

        [Fact]
        public void InstallNextComponent_ForNewVersionWithTwoComponents_InstallationIsNotComplete_AndGivesDetailsOfNextComponentToInstall()
        {
            var currentVersion = new Version("0.0.0.1");
            var latestVersion = new Version("0.0.0.2");

            var firstComponentDescription = "dhjskldsa";
            var secondComponentDescription = "DLAOIEHJK";
            var firstComponent = new InstallationComponent(firstComponentDescription,
                OtherActions.DoNothing(),
                OtherActions.DoNothing(),
                OtherActions.DoNothing());  // Does nothing on installation or rollback
            var secondComponent = new InstallationComponent(secondComponentDescription,
                OtherActions.DoNothing(),
                OtherActions.DoNothing(),
                OtherActions.DoNothing());

            var components = new Dictionary<int, InstallationComponent>();
            components.Add(0, firstComponent);
            components.Add(1, secondComponent);

            A.CallTo(() => discovery.Discover())
                .Returns(new List<InstallationVersion>
                {
                    new TestInstallationVersion(currentVersion, new Dictionary<int, InstallationComponent>()),
                    new TestInstallationVersion(latestVersion, components),
                });

            var dispatcher = A.Fake<IDataAccessDispatcher>();

            A.CallTo(() => dispatcher.Dispatch(A<DataAccessAction<Solution>>._))
                .Returns(new Solution { Name = "TestSolution", DisplayName = "Test Solution", Version = currentVersion.ToString() });

            var installation = new InstallationService(discovery, dispatcher);
            var startInstallationResult = installation.StartInstallation();
            var result = installation.InstallNextComponent(startInstallationResult.NextComponentId.Value, startInstallationResult.NextComponentVersion);

            Assert.True(result.IsSuccess);
            Assert.True(result.MoreToInstall);
            Assert.Equal(secondComponentDescription, result.NextComponentDescription);
            Assert.True(result.NextComponentId.HasValue);
            Assert.Equal(1, result.NextComponentId.Value);
            Assert.NotNull(result.NextComponentVersion);
            Assert.Equal(0, latestVersion.CompareTo(result.NextComponentVersion));
        }

        [Fact]
        public void InstallNextComponent_ForTwoNewVersionsWithTwoComponents_InstallationIsNotComplete_AndGivesDetailsOfNextComponentToInstall()
        {
            var currentVersion = new Version("0.0.0.1");
            var firstNewVersion = new Version("0.0.0.2");
            var secondNewVersion = new Version("0.0.0.3");

            var firstComponentDescription = "dhjskldsa";
            var secondComponentDescription = "DLAOIEHJK";
            var firstComponent = new InstallationComponent(firstComponentDescription,
                OtherActions.DoNothing(),
                OtherActions.DoNothing(),
                OtherActions.DoNothing());  // Does nothing on installation or rollback
            var secondComponent = new InstallationComponent(secondComponentDescription,
                OtherActions.DoNothing(),
                OtherActions.DoNothing(),
                OtherActions.DoNothing());

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

            var dispatcher = A.Fake<IDataAccessDispatcher>();

            A.CallTo(() => dispatcher.Dispatch(A<DataAccessAction<Solution>>._))
                .Returns(new Solution { Name = "TestSolution", DisplayName = "Test Solution", Version = currentVersion.ToString() });

            var installation = new InstallationService(discovery, dispatcher);
            var startInstallationResult = installation.StartInstallation();
            var result = installation.InstallNextComponent(startInstallationResult.NextComponentId.Value, startInstallationResult.Version);

            Assert.True(result.IsSuccess);
            Assert.True(result.MoreToInstall);
            Assert.Equal(secondComponentDescription, result.NextComponentDescription);
            Assert.True(result.NextComponentId.HasValue);
            Assert.Equal(0, result.NextComponentId.Value);
            Assert.NotNull(result.NextComponentVersion);
            Assert.Equal(0, secondNewVersion.CompareTo(result.NextComponentVersion));
        }

        [Fact]
        public void InstallNextComponent_ForTwoNewVersionsWithTwoComponents_UpdatesSolutionVersionAsFirstComponentInstalled()
        {
            var currentVersion = new Version("0.0.0.1");
            var firstNewVersion = new Version("0.0.0.2");
            var secondNewVersion = new Version("0.0.0.3");

            var firstComponentDescription = "dhjskldsa";
            var secondComponentDescription = "DLAOIEHJK";
            var firstComponent = new InstallationComponent(firstComponentDescription,
                OtherActions.DoNothing(),
                OtherActions.DoNothing(),
                OtherActions.DoNothing());  // Does nothing on installation or rollback
            var secondComponent = new InstallationComponent(secondComponentDescription,
                OtherActions.DoNothing(),
                OtherActions.DoNothing(),
                OtherActions.DoNothing());

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

            var dispatcher = A.Fake<IDataAccessDispatcher>();

            A.CallTo(() => dispatcher.Dispatch(A<DataAccessAction<Solution>>._))
                .Returns(new Solution { Name = "TestSolution", DisplayName = "Test Solution", Version = currentVersion.ToString() });

            var installation = new Services.Installation.InstallationService(discovery, dispatcher);
            var startInstallationResult = installation.StartInstallation();
            var result = installation.InstallNextComponent(startInstallationResult.NextComponentId.Value, startInstallationResult.NextComponentVersion);

            A.CallTo(() => dispatcher.Dispatch(A<DataAccessAction>._))
                .MustHaveHappened();
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

            var dispatcher = A.Fake<IDataAccessDispatcher>();

            A.CallTo(() => dispatcher.Dispatch(A<DataAccessAction<Solution>>._))
                .Returns(new Solution { Name = "TestSolution", DisplayName = "Test Solution", Version = currentVersion.ToString() });

            var result = new InstallationService(discovery, dispatcher).InstallNextComponent(0, unknownVersion);

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
                OtherActions.DoNothing(),
                OtherActions.DoNothing(),
                OtherActions.DoNothing()); // Does nothing on installation or rollback

            var installationComponents = new Dictionary<int, InstallationComponent>();
            installationComponents.Add(0, component);

            A.CallTo(() => discovery.Discover())
                .Returns(new List<InstallationVersion>
                {
                    new TestInstallationVersion(currentVersion, new Dictionary<int, InstallationComponent>()),
                    new TestInstallationVersion(latestVersion, installationComponents),
                });

            var dispatcher = A.Fake<IDataAccessDispatcher>();

            A.CallTo(() => dispatcher.Dispatch(A<DataAccessAction<Solution>>._))
                .Returns(new Solution { Name = "TestSolution", DisplayName = "Test Solution", Version = currentVersion.ToString() });

            var result = new InstallationService(discovery, dispatcher).InstallNextComponent(int.MaxValue, latestVersion);

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
