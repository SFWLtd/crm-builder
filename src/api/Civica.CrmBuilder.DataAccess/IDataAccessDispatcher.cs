namespace Civica.CrmBuilder.DataAccess
{
    public interface IDataAccessDispatcher
    {
        void Dispatch(DataAccessAction dataAccessAction);

        T Dispatch<T>(DataAccessAction<T> dataAccessAction);
    }
}
