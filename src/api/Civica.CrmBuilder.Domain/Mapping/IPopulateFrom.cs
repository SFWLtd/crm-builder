namespace Civica.CrmBuilder.Domain.Mapping
{
    public interface IPopulatableFrom<T>
    {
        void PopulateFrom(T source);
    }
}
