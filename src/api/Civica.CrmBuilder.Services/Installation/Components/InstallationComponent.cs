using Civica.CrmBuilder.DataAccess;

namespace Civica.CrmBuilder.Services.Installation.Components
{
    public class InstallationComponent
    {
        public string Description { get; }

        public DataAccessAction InstallationAction { get; }

        public DataAccessAction DataChangeAction { get; }

        public DataAccessAction RollbackAction { get; }

        public InstallationComponent(string activeDescription,
            DataAccessAction installationAction,
            DataAccessAction dataChangeAction,
            DataAccessAction rollbackAction)
        {
            Description = activeDescription;
            InstallationAction = installationAction;
            DataChangeAction = dataChangeAction;
            RollbackAction = rollbackAction;
        }
    }
}
