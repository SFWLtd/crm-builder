using Civica.CrmPlusPlus.Sdk.DefaultEntities;
using Civica.CrmPlusPlus.Sdk.Querying;

namespace Civica.CrmBuilder.Domain.CrmPlusPlusQueries
{
    public static class SolutionQueries
    {
        public static Query<Solution> SolutionByName(string solutionName)
        {
            return Query
                .ForEntity<Solution>()
                .IncludeAllProperties()
                .Filter(FilterType.And, filter =>
                {
                    filter.Condition(s => s.Name, ConditionOperator.Equal, solutionName);
                });
        }
    }
}
