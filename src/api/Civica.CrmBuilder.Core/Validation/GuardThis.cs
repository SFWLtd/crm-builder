using System;

namespace Civica.CrmBuilder.Core.Validation
{
    public class GuardThis<T>
    {
        internal T Obj { get; private set; }

        internal string CustomErrorMessage { get; set; }

        public GuardThis(T obj, string customErrorMessage = null)
        {
            Obj = obj;
            CustomErrorMessage = customErrorMessage;
        }

        public GuardThis<T> CustomRule(Func<T, bool> guardFunc)
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
