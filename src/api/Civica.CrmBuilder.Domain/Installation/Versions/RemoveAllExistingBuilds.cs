using System;
using Civica.CrmBuilder.Domain.Installation.Components;
using Civica.CrmBuilder.Entities;
using Civica.CrmPlusPlus.Sdk.Querying;

namespace Civica.CrmBuilder.Domain.Installation.Versions
{
    public class RemoveAllExistingBuilds : InstallationVersion
    {
        public RemoveAllExistingBuilds()
            : base (Version.Parse("0.0.47.1"))
        {
            RegisterComponents();
        }

        private void RegisterComponents()
        {
            RegisterNextComponent(RemoveExistingBuilds());
        }

        private InstallationComponent RemoveExistingBuilds()
        {
            return new InstallationComponent("Removing any existing builds",
                a => a.DoNothing(),
                a =>
                {
                    var query = Query.ForEntity<Build>();
                    var builds = a.RetrieveMultiple(query);
                    foreach (var build in builds)
                    {
                        a.Delete(build);
                    }
                },
                a => a.DoNothing());
        }
    }
}
