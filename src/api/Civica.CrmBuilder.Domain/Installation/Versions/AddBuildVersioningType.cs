using System;
using Civica.CrmBuilder.DataAccess.Actions;
using Civica.CrmBuilder.Services.Installation.Components;

namespace Civica.CrmBuilder.Services.Installation.Versions
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
                BuildInstallationActions.CreateBuildVersioningTypeField(),
                OtherActions.DoNothing(),
                OtherActions.DoNothing());

            RegisterNextComponent(createBuildVersioningTypeOption);
        }
    }
}
