using System.Linq;
using System.Web.Http.Filters;

namespace Civica.CrmBuilder.Api.Filters
{
    public class GlobalActionFilter : ActionFilterAttribute
    {
        public override void OnActionExecuted(HttpActionExecutedContext context)
        {
            var results = context.ActionContext.ActionArguments
                .Where(arg => arg.Value != null
                    && arg.Value.GetType().IsGenericType 
                    && arg.Value.GetType().GetGenericTypeDefinition() == typeof(GlobalJsonResult<>));

            foreach (var result in results)
            {
                context.Response.StatusCode = ((dynamic)result).StatusCode;
            }

            base.OnActionExecuted(context);
        }
    }
}