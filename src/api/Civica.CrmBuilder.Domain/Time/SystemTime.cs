using System;

namespace Civica.CrmBuilder.Domain.Time
{
    public static class SystemTime
    {
        private static DateTime? frozenTime;

        public static DateTime Now
        {
            get
            {
                return frozenTime.HasValue
                    ? frozenTime.Value
                    : DateTime.Now;
            }
        }

        public static void Freeze()
        {
            frozenTime = DateTime.Now;
        }

        public static void Unfreeze()
        {
            frozenTime = null;
        }
    }
}
