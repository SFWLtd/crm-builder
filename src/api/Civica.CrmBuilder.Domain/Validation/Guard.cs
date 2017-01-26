namespace Civica.CrmBuilder.Domain.Validation
{
    internal static class Guard
    {
        internal static GuardThis<T> This<T>(T obj, string customErrorMessage = null)
        {
            return new GuardThis<T>(obj, customErrorMessage);
        }
    }
}
