﻿using System;

namespace Civica.CrmBuilder.Domain.Authentication
{
    public interface IClientStore
    {
        bool CheckClientExists();

        void Set(IClient client);

        IClient Get();

        void Clear();
    }
}
