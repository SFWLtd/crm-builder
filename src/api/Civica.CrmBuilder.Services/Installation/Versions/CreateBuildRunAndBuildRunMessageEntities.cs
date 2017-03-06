using System;
using Civica.CrmBuilder.DataAccess.Actions;
using Civica.CrmBuilder.DataAccess.Actions.Installation;
using Civica.CrmBuilder.Services.Installation.Components;

namespace Civica.CrmBuilder.Services.Installation.Versions
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
            RegisterNextComponent(CreateBuildRunMessageMessageProperty());
            RegisterNextComponent(CreateBuildRunMessageOrderProperty());
            RegisterNextComponent(CreateBuildRunEntity());
            RegisterNextComponent(CreateBuildRunStartTimeProperty());
            RegisterNextComponent(CreateBuildRunFinishTimeProperty());
            RegisterNextComponent(CreateBuildRunStatusProperty());
            RegisterNextComponent(CreateBuildRunToBuildRunMessageRelationship());
            RegisterNextComponent(CreateBuildToBuildRunRelationship());
        }

        private InstallationComponent CreateBuildRunMessageEntity()
        {
            return new InstallationComponent("Creating build run message entity",
                BuildRunMessageInstallationActions.CreateEntity(),
                OtherActions.DoNothing(),
                BuildRunMessageInstallationActions.DeleteEntity());
        }

        private InstallationComponent CreateBuildRunMessageMessageProperty()
        {
            return new InstallationComponent("Creating build run message message property",
                BuildRunMessageInstallationActions.CreateMessageProperty(),
                OtherActions.DoNothing(),
                OtherActions.DoNothing());
        }

        private InstallationComponent CreateBuildRunMessageOrderProperty()
        {
            return new InstallationComponent("Creating build run message order property",
                BuildRunMessageInstallationActions.CreateOrderProperty(),
                OtherActions.DoNothing(),
                OtherActions.DoNothing());
        }

        private InstallationComponent CreateBuildRunEntity()
        {
            return new InstallationComponent("Creating build run entity",
                BuildRunInstallationActions.CreateEntity(),
                OtherActions.DoNothing(),
                BuildRunInstallationActions.DeleteEntity());
        }

        private InstallationComponent CreateBuildRunStartTimeProperty()
        {
            return new InstallationComponent("Creating build run start time property",
                BuildRunInstallationActions.CreateStartTimeProperty(),
                OtherActions.DoNothing(),
                OtherActions.DoNothing());
        }

        private InstallationComponent CreateBuildRunFinishTimeProperty()
        {
            return new InstallationComponent("Creating build run finish time property",
                BuildRunInstallationActions.CreateFinishTimeProperty(),
                OtherActions.DoNothing(),
                OtherActions.DoNothing());
        }

        private InstallationComponent CreateBuildRunStatusProperty()
        {
            return new InstallationComponent("Creating build run status property",
                BuildRunInstallationActions.CreateStatusProperty(),
                OtherActions.DoNothing(),
                OtherActions.DoNothing());
        }

        private InstallationComponent CreateBuildRunToBuildRunMessageRelationship()
        {
            return new InstallationComponent("Creating relationship between build run and build run message entities",
                BuildRunInstallationActions.CreateRelationshipWithBuildRunMessageEntity(),
                OtherActions.DoNothing(),
                OtherActions.DoNothing());
        }

        private InstallationComponent CreateBuildToBuildRunRelationship()
        {
            return new InstallationComponent("Creating relationship between build and build run entities",
                BuildInstallationActions.CreateRelationshipWithBuildRunEntity(),
                OtherActions.DoNothing(),
                OtherActions.DoNothing());
        }
    }
}
