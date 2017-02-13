using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Civica.CrmBuilder.Domain.Protection;
using Xunit;

namespace Civica.CrmBuilder.Domain.Tests.Protection
{
    public class ProtectorTests
    {
        [Fact]
        public void ProtectedString_DoesNotEqualUnprotectedString()
        {
            var unprotectedString = "Testing 123";
            var protectedString = Protector.ProtectString(unprotectedString);

            Assert.NotEqual(protectedString, unprotectedString);
        }

        [Fact]
        public void ProtectedString_Unprotected_EqualsOriginalUnprotectedString()
        {
            var unprotectedString = "Testing 123";
            var protectedString = Protector.ProtectString(unprotectedString);

            var recoveredString = Protector.UnprotectString(protectedString);

            Assert.Equal(recoveredString, unprotectedString);
        }
    }
}
