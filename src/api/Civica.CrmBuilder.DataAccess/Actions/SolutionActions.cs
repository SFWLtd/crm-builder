using System;
using System.Collections.Generic;
using System.Linq;
using Civica.CrmBuilder.Core.Constants;
using Civica.CrmBuilder.Entities;
using Civica.CrmPlusPlus.Sdk;
using Civica.CrmPlusPlus.Sdk.Querying;

namespace Civica.CrmBuilder.DataAccess.Actions
{
    public static class SolutionActions
    {
        public static DataAccessAction<IEnumerable<Solution>> GetAll(bool includeManaged = false)
        {
            return new DataAccessAction<IEnumerable<Solution>>((ICrmPlusPlus crm) =>
            {
                var query = Query.ForEntity<Solution>()
                .IncludeAllProperties()
                .Filter(FilterType.And, a =>
                {
                    a.Condition(s => s.Name, ConditionOperator.NotEqual, CrmConstants.DefaultSolutionSettings.Name); // Do not include the CRM Builder solution in the available solutions
                    a.Condition(s => s.Name, ConditionOperator.NotEqual, "Default"); // Exclude the default solution
                    a.Condition(s => s.IsVisible, ConditionOperator.Equal, true.ToString());

                    if (!includeManaged)
                    {
                        a.Condition(s => s.IsManaged, ConditionOperator.Equal, false.ToString());
                    }
                });

                return crm.EntityClient.RetrieveMultiple(query);
            });
        }

        public static DataAccessAction<Solution> GetSolutionByName(string name)
        {
            return new DataAccessAction<Solution>((ICrmPlusPlus crm) =>
            {
                var query = Query
                    .ForEntity<Solution>()
                    .IncludeAllProperties()
                    .Filter(FilterType.And, filter =>
                    {
                        filter.Condition(s => s.Name, ConditionOperator.Equal, name);
                    });

                var matchingSolutions = crm.EntityClient.RetrieveMultiple(query);

                if (matchingSolutions.Count() > 1)
                {
                    throw new ArgumentException(string.Format("More than 1 solution found with the name '{0}'", name));
                }

                if (matchingSolutions.Count() == 0)
                {
                    throw new ArgumentException(string.Format("No solution found with the name '{0}'", name));
                }

                return matchingSolutions.Single();
            });
        }

        public static DataAccessAction<Solution> UpdateSolution(Solution solution)
        {
            return new DataAccessAction<Solution>((ICrmPlusPlus crm) =>
            {
                crm.EntityClient.Update(solution);

                return solution;
            });
        }
    }
}
