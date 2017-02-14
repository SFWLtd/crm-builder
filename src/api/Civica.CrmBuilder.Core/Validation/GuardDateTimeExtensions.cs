using System;
using Civica.CrmBuilder.Core.Constants;

namespace Civica.CrmBuilder.Core.Validation
{
    public static class GuardDateTimeExtensions
    {
        public static GuardThis<DateTime> AgainstCrmMinimum(this GuardThis<DateTime> guard)
        {
            if (guard.Obj.CompareTo(CrmConstants.CrmMinimum) < 0)
            {
                throw new ArgumentException(guard.CustomErrorMessage != null 
                    ? guard.CustomErrorMessage 
                    : "DateTime was expected to be on or after 01/01/1970");
            }

            return guard;
        }
    }
}
