using System;

namespace Civica.CrmBuilder.Domain.Componentization
{
    public sealed class CreatableDomainComponent<TComponent> : DomainComponent<TComponent>, ICreatableDomainComponent<TComponent> 
    {
        private readonly Action<TComponent> create;

        internal CreatableDomainComponent(TComponent component, Action<TComponent> create)
            : base(component)
        {
            this.create = create;
        }

        public void CreateAs(Action<TComponent> action)
        {
            action(Component);
            create(Component);
        }
    }
}
