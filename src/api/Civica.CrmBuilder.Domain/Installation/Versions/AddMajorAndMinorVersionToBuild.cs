using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Civica.CrmBuilder.Domain.Installation.Components;
using Civica.CrmBuilder.Entities;
using Civica.CrmPlusPlus.Sdk.Client;
using Civica.CrmPlusPlus.Sdk.Querying;

namespace Civica.CrmBuilder.Domain.Installation.Versions
{
    public class AddMajorAndMinorVersionToBuild : InstallationVersion
    {
        public AddMajorAndMinorVersionToBuild()
            :base(Version.Parse("0.0.39.1"))
        {
            RegisterComponents();
        }

        public void RegisterComponents()
        {
            var createVersioningProperties = new InstallationComponent(
                "Creating major and minor version properties",
                CreateMajorAndMinorVersionProperties(),
                UpdateExistingBuildsToHaveDefaultMajorAndMinorVersions(),
                client => client.DoNothing());

            base.RegisterNextComponent(createVersioningProperties);
        }

        private Action<ICrmPlusPlusCustomizationClient> CreateMajorAndMinorVersionProperties()
        {
            return (ICrmPlusPlusCustomizationClient client) =>
            {
                client.CreateProperty<Build, int>(e => e.VersionMajor);
                client.CreateProperty<Build, int>(e => e.VersionMinor);
            };
        }

        private Action<ICrmPlusPlusEntityClient> UpdateExistingBuildsToHaveDefaultMajorAndMinorVersions()
        {
            var existingBuildsQuery = Query.ForEntity<Build>()
                .Include(e => e.VersionMajor)
                .Include(e => e.VersionMinor);

            return (ICrmPlusPlusEntityClient client) =>
            {
                var builds = client.RetrieveMultiple(existingBuildsQuery);

                foreach (var build in builds)
                {
                    build.VersionMajor = 0;
                    build.VersionMinor = 0;

                    client.Update(build);
                }
            };
        }
    }
}
