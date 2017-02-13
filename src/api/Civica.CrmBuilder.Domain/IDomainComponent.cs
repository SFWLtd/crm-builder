using System;
using System.Linq.Expressions;

namespace Civica.CrmBuilder.Domain
{
    public interface IDomainComponent<T>
    {
        void DoThis(Action<T> action);

        TProperty ReturnThis<TProperty>(Expression<Func<T, TProperty>> get);
    }
}
