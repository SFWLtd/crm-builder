using System;
using Civica.CrmPlusPlus.Sdk.Client;

namespace Civica.CrmBuilder.Domain.Installation.Components
{
    public class InstallationComponent
    {
        public string Description { get; }

        public Action<ICrmPlusPlusCustomizationClient> InstallationAction { get; }

        public Action<ICrmPlusPlusCustomizationClient> RollbackAction { get; }

        public InstallationComponent(string descrption, Action<ICrmPlusPlusCustomizationClient> installationAction,
            Action<ICrmPlusPlusCustomizationClient> rollbackAction)
        {
            Description = descrption;
            InstallationAction = installationAction;
            RollbackAction = rollbackAction;
        }
    }
}
