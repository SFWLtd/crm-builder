using System;
using System.Collections.Generic;
using System.Linq;
using Civica.CrmBuilder.Core.Enums;
using Civica.CrmBuilder.Core.Protection;
using Civica.CrmBuilder.Core.Validation;
using Civica.CrmBuilder.Domain.Dtos;

namespace Civica.CrmBuilder.Domain.Builds
{
    public class Build
    {
        internal Entities.Build Entity;

        internal IEnumerable<SolutionDto> AvailableSolutions;

        internal Build(Entities.Build entity, IEnumerable<SolutionDto> availableSolutions)
        {
            Entity = entity;
            AvailableSolutions = availableSolutions;
        }

        public void SetName(string name)
        {
            Entity.Name = name;
        }

        public void SetBuildVersioningType(BuildVersioningType buildVersioningType)
        {
            Entity.BuildVersioningType = buildVersioningType;
        }

        public void SetVersion(int versionMajor, int versionMinor)
        {
            Entity.VersionMajor = versionMajor;
            Entity.VersionMinor = versionMinor;
        }

        public void SetSolution(string solutionId)
        {
            Guard.This(solutionId).AgainstNonGuidFormat();
            var solution = AvailableSolutions.SingleOrDefault(s => s.Id == solutionId);

            if (solution == null)
            {
                throw new ArgumentException(string.Format("Build solution with Id '{0}' does not exist", solutionId));
            }

            Entity.SolutionId = solutionId;
        }

        public void SetTargetEnvironment(AuthenticationDto authenticationDto)
        {
            Entity.TargetEnvironmentAuthenticationType = authenticationDto.AuthenticationType;
            Entity.TargetEnvironmentCrmUrl = authenticationDto.Url;
            Entity.ProtectedTargetEnvironmentPassword = Protector.ProtectString(authenticationDto.Password);

            switch (authenticationDto.AuthenticationType)
            {
                case AuthenticationType.Dynamics365:
                    Entity.TargetEnvironmentEmail = authenticationDto.EmailAddress;
                    break;
                default:
                    Entity.TargetEnvironmentUsername = authenticationDto.UserName;
                    Entity.TargetEnvironmentDomain = authenticationDto.Domain;
                    break;
            }
        }
    }
}
