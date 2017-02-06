namespace Civica.CrmBuilder.Core.Mapping
{
    public static class MappingExtensions
    {
        public static T Map<T>(this IMappableTo<T> mappable, T target)
        {
            return mappable.Map();
        }

        public static void Populate<T>(this IPopulatableFrom<T> populatable, T source)
        {
            populatable.PopulateFrom(source);
        }
    }
}
