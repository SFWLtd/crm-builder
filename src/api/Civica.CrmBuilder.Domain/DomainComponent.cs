using System;

namespace Civica.CrmBuilder.Domain
{
    public class DomainComponent<T> : IDomainComponent<T> 
    {
        private readonly T component;
        private readonly Action<T> persistChanges;

        internal DomainComponent(T component, Action<T> persistChanges)
        {
            this.persistChanges = persistChanges;
            this.component = component;
        }

        public void DoThis(Action<T> action)
        {
            action(component);
            persistChanges(component);
        }

        public TProperty ReturnThis<TProperty>(System.Linq.Expressions.Expression<Func<T, TProperty>> get)
        {
            return get.Compile().Invoke(component);
        }
    }
}
