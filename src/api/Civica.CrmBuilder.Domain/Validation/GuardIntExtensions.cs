using System;

namespace Civica.CrmBuilder.Domain.Validation
{
    internal static class GuardIntExtensions
    {
        internal static GuardThis<int> AgainstNegative(this GuardThis<int> guard)
        {
            if (guard.Obj < 0)
            {
                throw new ArgumentException(guard.CustomErrorMessage != null? guard.CustomErrorMessage: "Value should not be less than zero");
            }

            return guard;
        }

        internal static GuardThis<int> AgainstZero(this GuardThis<int> guard)
        {
            if (guard.Obj == 0)
            {
                throw new ArgumentException(guard.CustomErrorMessage != null ? guard.CustomErrorMessage : "Value should not be zero");
            }

            return guard;
        }

        internal static GuardThis<int> AgainstNotBeingExactly(this GuardThis<int> guard, int value)
        {
            if (guard.Obj != value)
            {
                throw new ArgumentException(guard.CustomErrorMessage != null ? guard.CustomErrorMessage : string.Format("Value should be exactly {0}", value));
            }

            return guard;
        }
    }
}
