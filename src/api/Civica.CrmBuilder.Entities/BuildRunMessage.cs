using System;
using Civica.CrmBuilder.Core.Validation;
using Civica.CrmPlusPlus;
using Civica.CrmPlusPlus.Sdk;
using Civica.CrmPlusPlus.Sdk.EntityAttributes;
using Civica.CrmPlusPlus.Sdk.EntityAttributes.Metadata;
using Civica.CrmPlusPlus.Sdk.EntityAttributes.PropertyTypes;

namespace Civica.CrmBuilder.Entities
{
    [EntityName("buil_buildrunmessage")]
    [EntityInfo("Build Run Message", OwnershipType.UserOwned, "Build run message", "A log message relating to a build run")]
    public class BuildRunMessage : CrmPlusPlusEntity
    {
        private string message;
        private int order;

        public BuildRunMessage()
        {
        }

        public BuildRunMessage(Guid id)
            : base(id)
        {
        }

        [PropertyName("buil_message")]
        [PropertyInfo("Message", AttributeRequiredLevel.ApplicationRequired, "The message relating to a build instance")]
        [String(3999, StringFormatName.Text)]
        public string Message
        {
            get { return message; }
            set
            {
                Guard.This(value)
                    .AgainstNullOrEmpty()
                    .AgainstInvalidLength(1, 3999);
                message = value;
            }
        }

        [PropertyName("buil_order")]
        [PropertyInfo("Message order", AttributeRequiredLevel.ApplicationRequired, "The order of the message relating to the build instance")]
        [Integer(int.MaxValue, 0, IntegerFormat.None)]
        public int Order
        {
            get { return order; }
            set
            {
                Guard.This(value).AgainstNegative();
                order = value;
            }
        }

        [PropertyName("buil_buildrunid")]
        [PropertyInfo("Build run", AttributeRequiredLevel.ApplicationRequired, "The build run the current message relates to")]
        [Lookup]
        public EntityReference<BuildRun> BuildRun { get; set; }
    }
}
