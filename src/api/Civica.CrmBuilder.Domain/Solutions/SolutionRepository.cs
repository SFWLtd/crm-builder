using System;
using System.Collections.Generic;
using System.Linq;
using Civica.CrmBuilder.Core.Constants;
using Civica.CrmBuilder.Domain.Authentication;
using Civica.CrmBuilder.Domain.Componentization;
using Civica.CrmPlusPlus.Sdk.DefaultEntities;
using Civica.CrmPlusPlus.Sdk.Querying;

namespace Civica.CrmBuilder.Domain.Solutions
{
    public sealed class SolutionRepository : Repository<CrmPlusPlus.Sdk.DefaultEntities.Solution>, ISolutionRepository
    {
        public SolutionRepository(IClientStore clientStore)
            : base(clientStore)
        {
        }

        public IEnumerable<IUpdatableDomainComponent<Solution>> GetAll(bool includeManaged = false)
        {
            var query = Query.ForEntity<CrmPlusPlus.Sdk.DefaultEntities.Solution>()
                .IncludeAllProperties()
                .Filter(FilterType.And, a =>
                {
                    // Do not include the CRM Builder solution in the available solutions
                    a.Condition(s => s.Name, ConditionOperator.NotEqual, CrmConstants.DefaultSolutionSettings.Name);
                    a.Condition(s => s.IsVisible, ConditionOperator.Equal, true.ToString());

                    if (!includeManaged)
                    {
                        a.Condition(s => s.IsManaged, ConditionOperator.Equal, false.ToString());
                    }
                });

            return Client.RetrieveMultiple(query)
                .Select(e => new UpdatableDomainComponent<Solution>(
                    new Solution(e), 
                    sol => Update(sol.Entity)));
        }
    }
}
