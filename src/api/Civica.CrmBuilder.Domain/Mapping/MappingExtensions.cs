namespace Civica.CrmBuilder.Domain.Mapping
{
    public static class MappingExtensions
    {
        public static T Map<T>(this IMappableTo<T> mappable, T target)
        {
            return mappable.Map();
        }
    }
}
