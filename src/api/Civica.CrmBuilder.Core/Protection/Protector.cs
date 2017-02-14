﻿using System;
using System.Security.Cryptography;
using System.Text;

namespace Civica.CrmBuilder.Core.Protection
{
    public static class Protector
    {
        private static byte[] entropy = { 1, 8, 3, 5, 11, 8, 7, 6, 2, 4, 4, 3 };

        public static string ProtectString(string plainText)
        {
            if (string.IsNullOrEmpty(plainText))
            {
                return plainText;
            }

            var bytes = Encoding.Default.GetBytes(plainText);
            var result = ProtectedData.Protect(bytes, entropy, DataProtectionScope.CurrentUser);
            return Convert.ToBase64String(result);
        }

        public static string UnprotectString(string encryptedString)
        {
            if (string.IsNullOrEmpty(encryptedString))
            {
                return encryptedString;
            }

            var bytes = Convert.FromBase64String(encryptedString);
            var result = ProtectedData.Unprotect(bytes, entropy, DataProtectionScope.CurrentUser);
            return Encoding.Default.GetString(result);
        }
    }
}