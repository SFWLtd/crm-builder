using System;
using System.Collections.Generic;
using System.Linq;
using Civica.CrmBuilder.Core.Mapping;
using Civica.CrmBuilder.Core.Protection;
using Civica.CrmBuilder.Core.Validation;
using Civica.CrmBuilder.Entities;
using Civica.CrmPlusPlus.Sdk;
using Civica.CrmPlusPlus.Sdk.Client.Retrieve;
using Civica.CrmPlusPlus.Sdk.Querying;

namespace Civica.CrmBuilder.DataAccess.Actions
{
    public static class BuildActions
    {
        public static DataAccessAction<Build> GetBuild(Guid id)
        {
            return new DataAccessAction<Build>((ICrmPlusPlus crm) =>
            {
                var retrieval = Retrieval
                    .ForEntity<Build>(id)
                    .IncludeAllColumns(true);

                var build = crm.EntityClient.Retrieve(retrieval);
                build.Password = Protector.UnprotectString(build.Password);

                return build;
            });
        }

        public static DataAccessAction<Build> GetBuild(string id)
        {
            Guard.This(id).AgainstNonGuidFormat();

            return GetBuild(Guid.Parse(id));
        }

        public static DataAccessAction CreateBuild(Build build)
        {
            return new DataAccessAction((ICrmPlusPlus crm) =>
            {
                build.Validate();
                build.Password = Protector.ProtectString(build.Password);

                crm.EntityClient.Create(build);
            });
        }

        public static DataAccessAction UpdateBuild(Build build)
        {
            return new DataAccessAction((ICrmPlusPlus crm) =>
            {
                build.Validate();
                build.Password = Protector.ProtectString(build.Password);

                crm.EntityClient.Update(build);
            });
        }

        public static DataAccessAction<IEnumerable<Build>> GetAllBuilds()
        {
            return new DataAccessAction<IEnumerable<Build>>((ICrmPlusPlus crm) =>
            {
                var query = Query.ForEntity<Build>().IncludeAllProperties();

                return crm.EntityClient
                    .RetrieveMultiple(query)
                    .OrderByDescending(e => e.CreatedOn)
                    .Select(e =>
                    {
                        e.Password = Protector.UnprotectString(e.Password);
                        return e;
                    });
            });
        }

        public static DataAccessAction DeleteBuild(Guid id)
        {
            return new DataAccessAction((ICrmPlusPlus crm) =>
            {
                var retrieval = Retrieval.ForEntity<Build>(id);
                var build = crm.EntityClient.Retrieve(retrieval);

                crm.EntityClient.Delete(build);
            });
        }

        public static DataAccessAction DeleteBuild(string id)
        {
            Guard.This(id).AgainstNonGuidFormat();

            return DeleteBuild(Guid.Parse(id));
        }

        public static DataAccessAction DeleteAllBuilds()
        {
            return new DataAccessAction((ICrmPlusPlus crm) =>
            {
                var query = Query.ForEntity<Build>();
                var builds = crm.EntityClient.RetrieveMultiple(query);
                foreach (var build in builds)
                {
                    crm.EntityClient.Delete(build);
                }
            });
        }
    }
}
