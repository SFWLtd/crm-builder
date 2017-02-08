namespace Civica.CrmBuilder.Core.Validation
{
    public static class Guard
    {
        public static GuardThis<T> This<T>(T obj, string customErrorMessage = null)
        {
            return new GuardThis<T>(obj, customErrorMessage);
        }
    }
}
