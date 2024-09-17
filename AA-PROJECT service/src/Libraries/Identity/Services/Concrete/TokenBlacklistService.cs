using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Identity.Services.Concrete
{
    public class TokenBlacklistService
    {
        private readonly HashSet<string> _blacklistedTokens = new HashSet<string>();

        public void AddTokenToBlacklist(string token)
        {
            _blacklistedTokens.Add(token);
        }

        public bool IsTokenBlacklisted(string token)
        {
            return _blacklistedTokens.Contains(token);
        }
    }
}
