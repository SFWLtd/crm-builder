using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Civica.CrmBuilder.Domain.Installation.Components;

namespace Civica.CrmBuilder.Domain.Installation.Versions
{
    public class AddSolutionIdToBuildEntity : InstallationVersion
    {
        public AddSolutionIdToBuildEntity()
            : base(Version.Parse("0.0.45.2"))
        {
            RegisterComponents();
        }

        private void RegisterComponents()
        {
            RegisterNextComponent(CreateSolutionIdProperty());
        }

        private InstallationComponent CreateSolutionIdProperty()
        {
            return new InstallationComponent("Creating solution id property",
                client => client.CreateProperty<Entities.Build, string>(e => e.SolutionId),
                client => client.DoNothing(),
                client => client.DoNothing());
        }
    }
}
