using System;
using System.Collections.Generic;
using System.Linq;
using Civica.CrmBuilder.Domain.Authentication;
using Civica.CrmBuilder.Domain.Componentization;
using Civica.CrmBuilder.Domain.Dtos;
using Civica.CrmBuilder.Domain.Solutions;
using Civica.CrmBuilder.Domain.Validation;
using Civica.CrmPlusPlus.Sdk.Client.Retrieve;
using Civica.CrmPlusPlus.Sdk.Querying;

namespace Civica.CrmBuilder.Domain.Builds
{
    public class BuildRepository : Repository<Entities.Build>, IBuildRepository
    {
        private readonly ISolutionRepository solutionRepository;

        private IEnumerable<SolutionDto> availableSolutions;

        public BuildRepository(IClientStore clientStore, ISolutionRepository solutionRepository)
            : base(clientStore)
        {
            this.solutionRepository = solutionRepository;
        }

        public IUpdatableDomainComponent<Build> Get(Guid id)
        {
            var retrieval = Retrieval
                .ForEntity<Entities.Build>(id)
                .IncludeAllColumns(true);

            var entity = Client.Retrieve(retrieval);

            return new UpdatableDomainComponent<Build>(
                new Build(entity, GetAvailableSolutions()),
                build => Update(build.Entity));
        }

        public IUpdatableDomainComponent<Build> Get(string id)
        {
            Guard.This(id).AgainstNonGuidFormat();

            return Get(Guid.Parse(id));
        }

        public void Delete(Guid id)
        {
            var retrieval = Retrieval.ForEntity<Entities.Build>(id);
            var build = Client.Retrieve(retrieval);

            Client.Delete(build);
        }

        public void Delete(string id)
        {
            Guard.This(id).AgainstNonGuidFormat();

            Delete(Guid.Parse(id));
        }

        public IEnumerable<IUpdatableDomainComponent<Builds.Build>> GetAll()
        {
            var query = Query.ForEntity<Entities.Build>()
                .IncludeAllProperties();

            return Client
                .RetrieveMultiple(query)
                .OrderByDescending(e => e.CreatedOn)
                .Select(e => new UpdatableDomainComponent<Build>(
                    new Build(e, GetAvailableSolutions()),
                    build => Update(build.Entity)));
        }

        public ICreatableDomainComponent<Build> New()
        {
            var entity = new Entities.Build();

            return new CreatableDomainComponent<Build>(
                new Build(entity, GetAvailableSolutions()),
                build => Create(build.Entity));
        }

        private IEnumerable<SolutionDto> GetAvailableSolutions()
        {
            if (availableSolutions == null)
            {
                availableSolutions = solutionRepository
                .GetAll(false)
                .Select(s =>
                {
                    var result = new SolutionDto();
                    result.PopulateFrom(s);
                    return result;
                });
            }

            return availableSolutions;
        }
    }
}
