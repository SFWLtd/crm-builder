using System;
using Civica.CrmBuilder.DataAccess.Actions;
using Civica.CrmBuilder.Services.Installation.Components;

namespace Civica.CrmBuilder.Services.Installation.Versions
{
    public class AddBuildTargetAuthenticationDetails : InstallationVersion
    {
        public AddBuildTargetAuthenticationDetails()
            : base(Version.Parse("0.0.44.1"))
        {
            RegisterComponents();
        }

        public void RegisterComponents()
        {
            RegisterNextComponent(GetTargetAuthenticationTypeInstallationComponent());
            RegisterNextComponent(GetTargetCrmUrlInstallationComponent());
            RegisterNextComponent(GetTargetEmailAddressInstallationComponent());
            RegisterNextComponent(GetTargetDomainInstallationComponent());
            RegisterNextComponent(GetTargetUsernameInstallationComponent());
            RegisterNextComponent(GetTargetPasswordInstallationComponent());
        }

        private InstallationComponent GetTargetAuthenticationTypeInstallationComponent()
        {
            return new InstallationComponent("Creating build target authentication type field",
                BuildInstallationActions.CreateTargetAuthenticationTypeField(),
                OtherActions.DoNothing(),
                OtherActions.DoNothing());
        }

        private InstallationComponent GetTargetCrmUrlInstallationComponent()
        {
            return new InstallationComponent("Creating build target CRM URL field",
                BuildInstallationActions.CreateTargetCrmUrlField(),
                OtherActions.DoNothing(),
                OtherActions.DoNothing());
        }

        private InstallationComponent GetTargetEmailAddressInstallationComponent()
        {
            return new InstallationComponent("Creating build target email address field",
                BuildInstallationActions.CreateTargetEmailField(),
                OtherActions.DoNothing(),
                OtherActions.DoNothing());
        }

        private InstallationComponent GetTargetDomainInstallationComponent()
        {
            return new InstallationComponent("Creating build target domain field",
                BuildInstallationActions.CreateTargetDomainField(),
                OtherActions.DoNothing(),
                OtherActions.DoNothing());
        }

        private InstallationComponent GetTargetUsernameInstallationComponent()
        {
            return new InstallationComponent("Creating build target username field",
                BuildInstallationActions.CreateTargetUsernameField(),
                OtherActions.DoNothing(),
                OtherActions.DoNothing());
        }

        private InstallationComponent GetTargetPasswordInstallationComponent()
        {
            return new InstallationComponent("Creating build target password field",
                BuildInstallationActions.CreateTargetPasswordField(),
                OtherActions.DoNothing(),
                OtherActions.DoNothing());
        }
    }
}
