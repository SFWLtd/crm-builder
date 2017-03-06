using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.Controllers;
using Autofac.Integration.WebApi;
using Civica.CrmBuilder.DataAccess.Authentication;

namespace Civica.CrmBuilder.Api.Filters
{
    public class AuthorizeClientFilter : IAutofacAuthorizationFilter
    {
        private readonly IClientStore clientStore;

        public AuthorizeClientFilter(IClientStore clientStore)
        {
            this.clientStore = clientStore;
        }

        public async Task OnAuthorizationAsync(HttpActionContext actionContext, CancellationToken cancellationToken)
        {
            try
            {
                clientStore.Get();
            }
            catch (Exception ex)
            {
                actionContext.Response = new HttpResponseMessage(HttpStatusCode.Unauthorized);
                actionContext.Response.Content = new ObjectContent(typeof(GlobalJsonResult<EmptyResult>),
                    GlobalJsonResult<EmptyResult>.Error(ex, HttpStatusCode.Unauthorized),
                    new JsonMediaTypeFormatter());
            }

            await Task.Yield();
        }
    }
}