using System;
namespace Civica.CrmBuilder.Domain.Componentization
{
    public abstract class DomainComponent<T> : IDomainComponent<T>
    {
        protected T Component;

        public DomainComponent(T component)
        {
            Component = component;
        }

        public TProperty ReturnThis<TProperty>(System.Linq.Expressions.Expression<Func<T, TProperty>> get)
        {
            return get.Compile().Invoke(Component);
        }
    }
}
