using System;
namespace Civica.CrmBuilder.Domain.Componentization
{
    public interface IUpdatableDomainComponent<T> : IDomainComponent<T>
    {
        void DoThis(Action<T> action);
    }
}
