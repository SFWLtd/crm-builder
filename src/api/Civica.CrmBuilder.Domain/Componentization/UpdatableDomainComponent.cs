using System;

namespace Civica.CrmBuilder.Domain.Componentization
{
    public sealed class UpdatableDomainComponent<TComponent> : DomainComponent<TComponent>, IUpdatableDomainComponent<TComponent>
    {
        private readonly Action<TComponent> update;

        internal UpdatableDomainComponent(TComponent component, Action<TComponent> update)
            : base(component)
        {
            this.update = update;
        }

        public void UpdateAs(Action<TComponent> action)
        {
            action(Component);
            update(Component);
        }
    }
}
