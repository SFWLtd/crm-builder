using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Civica.CrmBuilder.Core.Enums;
using Civica.CrmBuilder.Domain.Installation.Components;

namespace Civica.CrmBuilder.Domain.Installation.Versions
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
            base.RegisterNextComponent(GetTargetAuthenticationTypeInstallationComponent());
            base.RegisterNextComponent(GetTargetCrmUrlInstallationComponent());
            base.RegisterNextComponent(GetTargetEmailAddressInstallationComponent());
            base.RegisterNextComponent(GetTargetDomainInstallationComponent());
            base.RegisterNextComponent(GetTargetUsernameInstallationComponent());
            base.RegisterNextComponent(GetTargetPasswordInstallationComponent());
        }

        private InstallationComponent GetTargetAuthenticationTypeInstallationComponent()
        {
            return new InstallationComponent("Creating build target authentication type field",
                client => client.CreateProperty<Entities.Build, AuthenticationType>(b => b.TargetEnvironmentAuthenticationType),
                client => client.DoNothing(),
                client => client.DoNothing());
        }

        private InstallationComponent GetTargetCrmUrlInstallationComponent()
        {
            return new InstallationComponent("Creating build target CRM URL field",
                client => client.CreateProperty<Entities.Build, string>(b => b.TargetEnvironmentCrmUrl),
                client => client.DoNothing(),
                client => client.DoNothing());
        }

        private InstallationComponent GetTargetEmailAddressInstallationComponent()
        {
            return new InstallationComponent("Creating build target email address field",
                client => client.CreateProperty<Entities.Build, string>(b => b.TargetEnvironmentEmail),
                client => client.DoNothing(),
                client => client.DoNothing());
        }

        private InstallationComponent GetTargetDomainInstallationComponent()
        {
            return new InstallationComponent("Creating build target domain field",
                client => client.CreateProperty<Entities.Build, string>(b => b.TargetEnvironmentDomain),
                client => client.DoNothing(),
                client => client.DoNothing());
        }

        private InstallationComponent GetTargetUsernameInstallationComponent()
        {
            return new InstallationComponent("Creating build target username field",
                client => client.CreateProperty<Entities.Build, string>(b => b.TargetEnvironmentUsername),
                client => client.DoNothing(),
                client => client.DoNothing());
        }

        private InstallationComponent GetTargetPasswordInstallationComponent()
        {
            return new InstallationComponent("Creating build target password field",
                client => client.CreateProperty<Entities.Build, string>(b => b.ProtectedTargetEnvironmentPassword),
                client => client.DoNothing(),
                client => client.DoNothing());
        }
    }
}
