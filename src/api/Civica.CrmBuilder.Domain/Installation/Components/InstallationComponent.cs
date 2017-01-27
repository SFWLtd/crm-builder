using System;
using System.Linq.Expressions;
using Civica.CrmPlusPlus.Sdk.Client;

namespace Civica.CrmBuilder.Domain.Installation.Components
{
    public class InstallationComponent
    {
        public string Description { get; }

        public Expression<Action<ICrmPlusPlusCustomizationClient>> InstallationAction { get; }

        public Expression<Action<ICrmPlusPlusCustomizationClient>> RollbackAction { get; }

        public InstallationComponent(string descrption, Expression<Action<ICrmPlusPlusCustomizationClient>> installationAction,
            Expression<Action<ICrmPlusPlusCustomizationClient>> rollbackAction)
        {
            Description = descrption;
            InstallationAction = installationAction;
            RollbackAction = rollbackAction;
        }
    }
}
