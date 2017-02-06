using System;
using Civica.CrmBuilder.Core.Enums;
using Civica.CrmBuilder.Domain.Installation.Components;
using Civica.CrmBuilder.Entities;

namespace Civica.CrmBuilder.Domain.Installation.Versions
{
    public class AddBuildVersioningType : InstallationVersion
    {
        public AddBuildVersioningType()
            : base(Version.Parse("0.0.37.1"))
        {
            RegisterComponents();
        }

        private void RegisterComponents()
        {
            var createBuildVersioningTypeOption = new InstallationComponent("Adding build versioning type option",
                client => client.CreateProperty<Build, BuildVersioningType>(e => e.BuildVersioningType),
                client => client.DoNothing(),
                client => client.DoNothing());

            base.RegisterNextComponent(createBuildVersioningTypeOption);
        }
    }
}
