using System;

namespace Civica.CrmBuilder.Domain.Componentization
{
    public interface ICreatableDomainComponent<T> : IDomainComponent<T>
    {
        void CreateAs(Action<T> action);
    }
}
