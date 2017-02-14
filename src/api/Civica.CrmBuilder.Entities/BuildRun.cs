using System;
using System.Collections.Generic;
using Civica.CrmBuilder.Core.Enums;
using Civica.CrmBuilder.Core.Validation;
using Civica.CrmPlusPlus;
using Civica.CrmPlusPlus.Sdk;
using Civica.CrmPlusPlus.Sdk.EntityAttributes;
using Civica.CrmPlusPlus.Sdk.EntityAttributes.Metadata;
using Civica.CrmPlusPlus.Sdk.EntityAttributes.PropertyTypes;

namespace Civica.CrmBuilder.Entities
{
    [EntityName("buil_buildrun")]
    [EntityInfo("Build Run", OwnershipType.UserOwned, "Build run", "An instance of a running build")]
    public class BuildRun : CrmPlusPlusEntity
    {
        private DateTime startTime;
        private DateTime finishTime;

        public BuildRun()
        {
        }

        public BuildRun(Guid id)
            : base(id)
        {
        }

        [PropertyName("buil_starttime")]
        [PropertyInfo("Start time", AttributeRequiredLevel.ApplicationRequired, "The time the build started")]
        [DateTime(DateTimeFormat.DateAndTime)]
        public DateTime StartTime
        {
            get { return startTime; }
            set
            {
                Guard.This(value).AgainstCrmMinimum();
                startTime = value;
            }
        }

        [PropertyName("buil_finishtime")]
        [PropertyInfo("Finish time", AttributeRequiredLevel.None, "The time the build finished")]
        [DateTime(DateTimeFormat.DateAndTime)]
        public DateTime FinishTime
        {
            get { return finishTime; }
            set
            {
                Guard.This(value).AgainstCrmMinimum();
                finishTime = value;
            }
        }

        [PropertyName("buil_status")]
        [PropertyInfo("Status", AttributeRequiredLevel.ApplicationRequired, "The current status of the build run instance")]
        [OptionSet]
        public BuildRunStatus Status { get; set; }

        [PropertyName("buil_buildid")]
        [PropertyInfo("Build", AttributeRequiredLevel.ApplicationRequired, "The build relating to this build run instance")]
        [Lookup]
        public EntityReference<Build> Build { get; set; }

        IEnumerable<BuildRunMessage> Messages { get; set; }
    }
}
