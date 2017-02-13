using Civica.CrmPlusPlus;

namespace Civica.CrmBuilder.Domain
{
    public interface IPersistable
    {
        CrmPlusPlusEntity Entity { get; }
    }
}