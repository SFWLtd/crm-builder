using System;
using Civica.CrmBuilder.Core.Enums;
using Civica.CrmBuilder.Domain.Installation.Components;

namespace Civica.CrmBuilder.Domain.Installation.Versions
{
    public class CreateBuildRunAndBuildRunMessageEntities : InstallationVersion
    {
        public CreateBuildRunAndBuildRunMessageEntities()
            : base (Version.Parse("0.0.45.1"))
        {
            RegisterComponents();
        }

        private void RegisterComponents()
        {
            RegisterNextComponent(CreateBuildRunMessageEntity());
            RegisterNextComponent(CreateBuildRunMessageProperties());
            RegisterNextComponent(CreateBuildRunEntity());
            RegisterNextComponent(CreateBuildRunProperties());
            RegisterNextComponent(CreateBuildRunToBuildRunMessageRelationship());
            RegisterNextComponent(CreateBuildToBuildRunRelationship());
        }

        private InstallationComponent CreateBuildRunMessageEntity()
        {
            return new InstallationComponent("Creating build run message entity",
                client => client.CreateEntity<Entities.BuildRunMessage>(),
                client => client.DoNothing(),
                client => client.Delete<Entities.BuildRunMessage>());
        }

        private InstallationComponent CreateBuildRunMessageProperties()
        {
            return new InstallationComponent("Creating build run message properties",
                client =>
                {
                    client.CreateProperty<Entities.BuildRunMessage, string>(e => e.Message);
                    client.CreateProperty<Entities.BuildRunMessage, int>(e => e.Order);
                },
                client => client.DoNothing(),
                client => client.DoNothing());
        }

        private InstallationComponent CreateBuildRunEntity()
        {
            return new InstallationComponent("Creating build run entity",
                client => client.CreateEntity<Entities.BuildRun>(),
                client => client.DoNothing(),
                client => client.Delete<Entities.BuildRun>());
        }

        private InstallationComponent CreateBuildRunProperties()
        {
            return new InstallationComponent("Creating build run properties",
                client =>
                {
                    client.CreateProperty<Entities.BuildRun, DateTime>(e => e.StartTime);
                    client.CreateProperty<Entities.BuildRun, DateTime>(e => e.FinishTime);
                    client.CreateProperty<Entities.BuildRun, BuildRunStatus>(e => e.Status);
                },
                client => client.DoNothing(),
                client => client.DoNothing());
        }

        private InstallationComponent CreateBuildRunToBuildRunMessageRelationship()
        {
            return new InstallationComponent("Creating relationship between build run and build run message entities",
                client => client.CreateOneToManyRelationship<Entities.BuildRun, Entities.BuildRunMessage>(
                    brm => brm.BuildRun,
                    CrmPlusPlus.Sdk.EntityAttributes.Metadata.AttributeRequiredLevel.ApplicationRequired, "buil"),
                client => client.DoNothing(),
                client => client.DoNothing());
        }

        private InstallationComponent CreateBuildToBuildRunRelationship()
        {
            return new InstallationComponent("Creating relationship between build and build run entities",
                client => client.CreateOneToManyRelationship<Entities.Build, Entities.BuildRun>(
                    br => br.Build,
                    CrmPlusPlus.Sdk.EntityAttributes.Metadata.AttributeRequiredLevel.ApplicationRequired, "buil"),
                client => client.DoNothing(),
                client => client.DoNothing());
        }
    }
}
