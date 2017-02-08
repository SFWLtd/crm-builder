using System;

namespace Civica.CrmBuilder.Core.Validation
{
    public static class GuardIntExtensions
    {
        public static GuardThis<int> AgainstNegative(this GuardThis<int> guard)
        {
            if (guard.Obj < 0)
            {
                throw new ArgumentException(guard.CustomErrorMessage != null? guard.CustomErrorMessage: "Value should not be less than zero");
            }

            return guard;
        }

        public static GuardThis<int> AgainstZero(this GuardThis<int> guard)
        {
            if (guard.Obj == 0)
            {
                throw new ArgumentException(guard.CustomErrorMessage != null ? guard.CustomErrorMessage : "Value should not be zero");
            }

            return guard;
        }

        public static GuardThis<int> AgainstNotBeingExactly(this GuardThis<int> guard, int value)
        {
            if (guard.Obj != value)
            {
                throw new ArgumentException(guard.CustomErrorMessage != null ? guard.CustomErrorMessage : string.Format("Value should be exactly {0}", value));
            }

            return guard;
        }

        public static GuardThis<int> AgainstInvalidRange(this GuardThis<int> guard, int minValue, int maxValue)
        {
            if (guard.Obj > maxValue)
            {
                throw new ArgumentException(guard.CustomErrorMessage != null
                    ? guard.CustomErrorMessage
                    : string.Format("Integer value was expected to be smaller than {0}", maxValue));
            }
            else if (guard.Obj < minValue)
            {
                throw new ArgumentException(guard.CustomErrorMessage != null
                    ? guard.CustomErrorMessage
                    : string.Format("Integer value was expected to be larger than {0}", minValue));
            }

            return guard;
        }
    }
}
