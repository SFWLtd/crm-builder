﻿using System;
using System.Web.Http;
using Civica.CrmBuilder.Api.ApiRequests;
using Civica.CrmBuilder.Api.ApiResults;
using Civica.CrmBuilder.Domain.Authentication;

namespace Civica.CrmBuilder.Api.Controllers
{
    public class SessionController : ApiController
    {
        private readonly IClientStore clientStore;

        public SessionController(IClientStore clientStore)
        {
            this.clientStore = clientStore;
        }

        [ActionName("GetSessionToken")]
        [HttpGet()]
        public GlobalJsonResult<SessionTokenResult> GetSessionToken([FromBody]GetSessionTokenRequest request)
        {
            var client = clientStore.Get();

            var result = new SessionTokenResult();
            result.PopulateFrom(client);

            return GlobalJsonResult<SessionTokenResult>.Success(System.Net.HttpStatusCode.OK, result);
        }

        [ActionName("NewSession")]
        [HttpPost()]
        public GlobalJsonResult<SessionTokenResult> NewSession([FromBody]NewSessionRequest request)
        {
            var client = request.Map();
            clientStore.Set(client);

            var result = new SessionTokenResult();
            result.PopulateFrom(client);

            return GlobalJsonResult<SessionTokenResult>.Success(System.Net.HttpStatusCode.OK, result);
        }

        [ActionName("EndSession")]
        [HttpPost()]
        public GlobalJsonResult<EmptyResult> EndSession()
        {
            clientStore.Clear();

            return GlobalJsonResult<EmptyResult>.Success(System.Net.HttpStatusCode.NoContent);
        }
    }
}
