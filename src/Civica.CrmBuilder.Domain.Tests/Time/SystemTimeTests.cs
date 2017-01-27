using System.Threading;
using Civica.CrmBuilder.Domain.Time;
using Xunit;

namespace Civica.CrmBuilder.Domain.Tests.Time
{
    public class SystemTimeTests
    {
        [Fact]
        public void FreezeTime_ThenRetrieveTimeTwice_TimesAreTheSame()
        {
            SystemTime.Freeze();

            var timeNow = SystemTime.Now;
            Thread.Sleep(50);
            var timeAfter = SystemTime.Now;

            Assert.Equal(timeAfter, timeNow);
        }

        [Fact]
        public void FreezeTime_ThenRetrieveTime_ThenUnfreeze_ThenRetrieveTime_SecondTimeIsLater()
        {
            SystemTime.Freeze();
            var timeNow = SystemTime.Now;
            SystemTime.Unfreeze();
            Thread.Sleep(50);
            var timeAfter = SystemTime.Now;

            Assert.NotEqual(timeAfter, timeNow);
        }
    }
}
