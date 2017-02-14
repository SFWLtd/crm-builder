using System;
namespace Civica.CrmBuilder.Domain.Componentization
{
    public interface IUpdatableDomainComponent<T> : IDomainComponent<T>
    {
        void UpdateAs(Action<T> action);
    }
}
