using System;
using Civica.CrmBuilder.Domain.Authentication;
using Civica.CrmBuilder.Domain.Time;
using FakeItEasy;
using Xunit;

namespace Civica.CrmBuilder.Domain.Tests.Authentication
{
    public class InMemoryClientStoreTests
    {
        private readonly InMemoryClientStore clientStore;

        public InMemoryClientStoreTests()
        {
            clientStore = new InMemoryClientStore();
        }

        [Fact]
        public void GetClientBeforeSetting_ShouldThrowUnauthorizedAccessException()
        {
            Assert.Throws<UnauthorizedAccessException>(() => clientStore.Get());
        }

        [Fact]
        public void GetClientAfterSetting_Within15Minutes_ShouldReturnSameClient()
        {
            SystemTime.Freeze();

            var timeNow = SystemTime.Now;
            var time15MinutesAgo = timeNow.AddMinutes(-15);
            var testAccessToken = Guid.NewGuid();

            var client = A.Fake<IClient>();

            A.CallTo(() => client.AccessToken).Returns(testAccessToken);
            A.CallTo(() => client.LastAccess).Returns(time15MinutesAgo);

            clientStore.Set(client);
            var result = clientStore.Get();

            Assert.Equal(client.AccessToken, result.AccessToken);
        }

        [Fact]
        public void GetClientAfterSetting_After15Minutes_ShouldThrowUnauthorizedAccessException()
        {
            SystemTime.Freeze();

            var timeNow = SystemTime.Now;
            var time15MinutesAnd1SecondAgo = timeNow.AddMinutes(-15).AddSeconds(-1);
            var testAccessToken = Guid.NewGuid();

            var client = A.Fake<IClient>();

            A.CallTo(() => client.AccessToken).Returns(testAccessToken);
            A.CallTo(() => client.LastAccess).Returns(time15MinutesAnd1SecondAgo);

            clientStore.Set(client);

            Assert.Throws<UnauthorizedAccessException>(() => clientStore.Get());
        }
    }
}
