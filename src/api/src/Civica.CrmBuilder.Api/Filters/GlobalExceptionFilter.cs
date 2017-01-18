using System;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Civica.CrmBuilder.Api.Filters
{
    public class GlobalExceptionFilter : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            if (context.Exception is InvalidOperationException)
            {
                context.HttpContext.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                context.Result = new JsonResult(GlobalJsonResult<EmptyResult>.Error(context.Exception, HttpStatusCode.BadRequest));
            }
            else if (context.Exception is UnauthorizedAccessException)
            {
                context.HttpContext.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                context.Result = new JsonResult(GlobalJsonResult<EmptyResult>.Error(context.Exception, HttpStatusCode.Unauthorized));
            }
            else
            {
                context.HttpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                context.Result = new JsonResult(GlobalJsonResult<EmptyResult>.Error(context.Exception));
            }

            base.OnException(context);
        }
    }
}