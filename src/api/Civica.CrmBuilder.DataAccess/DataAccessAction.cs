using System;
using Civica.CrmPlusPlus.Sdk;

namespace Civica.CrmBuilder.DataAccess
{
    public class DataAccessAction
    {
        internal Action<ICrmPlusPlus> Action { get; set; }

        internal DataAccessAction(Action<ICrmPlusPlus> action)
        {
            Action = action;
        }
    }

    public class DataAccessAction<T>
    {
        internal Func<ICrmPlusPlus, T> Action { get; set; }

        internal DataAccessAction(Func<ICrmPlusPlus, T> action)
        {
            Action = action;
        }
    }
}
