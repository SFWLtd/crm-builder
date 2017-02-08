using System;

namespace Civica.CrmBuilder.Core.Validation
{
    public static class GuardStringExtensions
    {
        public static GuardThis<string> AgainstNullOrEmpty(this GuardThis<string> guard)
        {
            if (string.IsNullOrEmpty(guard.Obj))
            {
                throw new ArgumentException(guard.CustomErrorMessage != null
                    ? guard.CustomErrorMessage
                    : "String was found to be either empty or null when it should have a value");
            }

            return guard;
        }

        public static GuardThis<string> AgainstSpaces(this GuardThis<string> guard)
        {
            if (guard.Obj.Trim().Contains(" "))
            {
                throw new ArgumentException(guard.CustomErrorMessage != null
                    ? guard.CustomErrorMessage
                    : "String was found to be contain white space, but white space is not allowed");
            }

            return guard;
        }

        public static GuardThis<string> AgainstNonGuidFormat(this GuardThis<string> guard)
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

        public static GuardThis<string> AgainstInvalidLength(this GuardThis<string> guard, int minLength, int maxLength)
        {
            if (guard.Obj.Length > maxLength)
            {
                throw new ArgumentException(guard.CustomErrorMessage != null
                    ? guard.CustomErrorMessage
                    : string.Format("String was expected to be shorter than {0} characters", maxLength));
            }
            else if (guard.Obj.Length < minLength)
            {
                throw new ArgumentException(guard.CustomErrorMessage != null
                    ? guard.CustomErrorMessage
                    : string.Format("String was expected to be longer than {0} characters", minLength));
            }

            return guard;
        }
    }
}
