using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace Civica.CrmBuilder.Core.Protection
{
    public static class Protector
    {
        private static byte[] entropy = { 1, 8, 3, 5, 11, 8, 7, 6, 2, 4, 4, 3 };
        private static string encryptionKey = "lqpnc7892nmQQKJ";

        public static string ProtectString(string plainText)
        {
            byte[] clearBytes = Encoding.Unicode.GetBytes(plainText);
            using (var encryptor = Aes.Create())
            {
                var pdb = new Rfc2898DeriveBytes(encryptionKey, entropy);
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (var ms = new MemoryStream())
                {
                    using (var cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(clearBytes, 0, clearBytes.Length);
                        cs.Close();
                    }
                    plainText = Convert.ToBase64String(ms.ToArray());
                }
            }
            return plainText;
        }

        public static string UnprotectString(string encryptedString)
        {
            encryptedString = encryptedString.Replace(" ", "+");
            byte[] cipherBytes = Convert.FromBase64String(encryptedString);
            using (var encryptor = Aes.Create())
            {
                var pdb = new Rfc2898DeriveBytes(encryptionKey, entropy);
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (var ms = new MemoryStream())
                {
                    using (var cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(cipherBytes, 0, cipherBytes.Length);
                        cs.Close();
                    }
                    encryptedString = Encoding.Unicode.GetString(ms.ToArray());
                }
            }
            return encryptedString;
        }
    }
}
