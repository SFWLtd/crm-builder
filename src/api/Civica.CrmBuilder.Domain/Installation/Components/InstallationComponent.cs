using System;
using System.Linq.Expressions;
using Civica.CrmPlusPlus.Sdk.Client;

namespace Civica.CrmBuilder.Domain.Installation.Components
{
    public class InstallationComponent
    {
        public string Description { get; }

        public Action<ICrmPlusPlusCustomizationClient> InstallationAction { get; }

        public Action<ICrmPlusPlusEntityClient> DataChangeAction { get; }

        public Action<ICrmPlusPlusCustomizationClient> RollbackAction { get; }

        public InstallationComponent(string activeDescription, 
            Action<ICrmPlusPlusCustomizationClient> installationAction,
            Action<ICrmPlusPlusEntityClient> dataChangeAction,
            Action<ICrmPlusPlusCustomizationClient> rollbackAction)
        {
            Description = activeDescription;
            InstallationAction = installationAction;
            DataChangeAction = dataChangeAction;
            RollbackAction = rollbackAction;
        }
    }
}
