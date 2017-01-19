using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http.Filters;
using System.Web.Http.Results;

namespace Civica.CrmBuilder.Api.Filters
{
    public class GlobalExceptionFilter : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext context)
        {
            if (context.Exception is InvalidOperationException)
            {
                context.Response.StatusCode = HttpStatusCode.BadRequest;
                context.Response.Content = new ObjectContent(typeof(GlobalJsonResult<EmptyResult>),
                    GlobalJsonResult<EmptyResult>.Error(context.Exception, HttpStatusCode.BadRequest),
                    new JsonMediaTypeFormatter());
            }
            else if (context.Exception is UnauthorizedAccessException)
            {
                context.Response.StatusCode = HttpStatusCode.Unauthorized;
                context.Response.Content = new ObjectContent(typeof(GlobalJsonResult<EmptyResult>),
                    GlobalJsonResult<EmptyResult>.Error(context.Exception, HttpStatusCode.Unauthorized),
                    new JsonMediaTypeFormatter());
            }
            else
            {
                context.Response.StatusCode = HttpStatusCode.InternalServerError;
                context.Response.Content = new ObjectContent(typeof(GlobalJsonResult<EmptyResult>),
                    GlobalJsonResult<EmptyResult>.Error(context.Exception, HttpStatusCode.InternalServerError),
                    new JsonMediaTypeFormatter());
            }

            base.OnException(context);
        }
    }
}