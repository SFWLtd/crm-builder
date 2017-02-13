using Civica.CrmPlusPlus;

namespace Civica.CrmBuilder.Domain
{
    public abstract class EntityComponent<TEntity> where TEntity : CrmPlusPlusEntity, new()
    {
        public TEntity Entity { get; internal set; }
    }
}
