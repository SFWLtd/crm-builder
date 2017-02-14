using System;
using System.Linq.Expressions;

namespace Civica.CrmBuilder.Domain.Componentization
{
    public interface IDomainComponent<T>
    {
        TProperty ReturnThis<TProperty>(Expression<Func<T, TProperty>> get);
    }
}
