namespace Civica.CrmBuilder.Domain.SessionManagement
{
    public interface ICrmSessionManager
    {
        bool HasSession(string crmConnectionString);

        bool GetSession(string crmConnectionString);
    }
}
