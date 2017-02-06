namespace Civica.CrmBuilder.Core.Mapping
{
    public interface IPopulatableFrom<T>
    {
        void PopulateFrom(T source);
    }
}
