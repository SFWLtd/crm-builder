using System;

namespace Civica.CrmBuilder.Domain.Validation
{
    internal class GuardThis<T>
    {
        internal T Obj { get; private set; }

        internal string CustomErrorMessage { get; set; }

        internal GuardThis(T obj, string customErrorMessage = null)
        {
            Obj = obj;
            CustomErrorMessage = customErrorMessage;
        }

        internal GuardThis<T> CustomRule(Func<T, bool> guardFunc)
        {
            if (!guardFunc(Obj))
            {
                throw new ArgumentException(CustomErrorMessage == null
                    ? string.Format("A validation error occured for type '{0}'", typeof(T).Name)
                    : CustomErrorMessage);
            }

            return this;
        }
    }
}
