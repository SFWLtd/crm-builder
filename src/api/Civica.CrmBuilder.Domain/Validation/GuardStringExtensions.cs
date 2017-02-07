using System;

namespace Civica.CrmBuilder.Domain.Validation
{
    internal static class GuardStringExtensions
    {
        internal static GuardThis<string> AgainstNullOrEmpty(this GuardThis<string> guard)
        {
            if (string.IsNullOrEmpty(guard.Obj))
            {
                throw new ArgumentException(guard.CustomErrorMessage != null
                    ? guard.CustomErrorMessage
                    : "String was found to be either empty or null when it should have a value");
            }

            return guard;
        }

        internal static GuardThis<string> AgainstSpaces(this GuardThis<string> guard)
        {
            if (guard.Obj.Trim().Contains(" "))
            {
                throw new ArgumentException(guard.CustomErrorMessage != null
                    ? guard.CustomErrorMessage
                    : "String was found to be contain white space, but white space is not allowed");
            }

            return guard;
        }

        internal static GuardThis<string> AgainstNonGuidFormat(this GuardThis<string> guard)
        {
            Guid guid = Guid.Empty;

            if (!Guid.TryParse(guard.Obj, out guid))
            {
                throw new ArgumentException(guard.CustomErrorMessage != null
                    ? guard.CustomErrorMessage
                    : "String was expected to be in GUID format (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)");
            }

            return guard;
        }
    }
}
