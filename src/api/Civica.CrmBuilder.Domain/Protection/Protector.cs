using System.Security.Cryptography;
using System.Text;

namespace Civica.CrmBuilder.Domain.Protection
{
    public class Protector
    {
        private static byte[] entropy = { 1, 8, 3, 5, 11, 8, 7, 6, 2, 4, 4, 3 };

        public static string ProtectString(string plainText)
        {
            var bytes = Encoding.UTF8.GetBytes(plainText);
            var result = ProtectedData.Protect(bytes, entropy, DataProtectionScope.CurrentUser);
            return Encoding.UTF8.GetString(result);
        }

        public static string UnprotectString(string encryptedString)
        {
            var bytes = Encoding.UTF8.GetBytes(encryptedString);
            var result = ProtectedData.Unprotect(bytes, entropy, DataProtectionScope.CurrentUser);
            return Encoding.UTF8.GetString(result);
        }
    }
}
