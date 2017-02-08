using System;

namespace Civica.CrmBuilder.Core.Validation
{
    public static class GuardGuidExtensions
    {
        public static GuardThis<Guid> AgainstNotEqual(this GuardThis<Guid> guard, Guid otherGuid)
        {
            if (guard.Obj.CompareTo(otherGuid) != 0)
            {
                throw new ArgumentException(
                    guard.CustomErrorMessage != null 
                        ? guard.CustomErrorMessage 
                        : "Guids were expected to match, but do not");
            }

            return guard;
        }
    }
}
