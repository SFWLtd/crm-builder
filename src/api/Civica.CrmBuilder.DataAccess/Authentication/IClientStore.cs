namespace Civica.CrmBuilder.DataAccess.Authentication
{
    public interface IClientStore
    {
        bool CheckClientExists();

        void Set(IClient client);

        IClient Get();

        void Clear();
    }
}
