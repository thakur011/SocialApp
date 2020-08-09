using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using SocialApp.API.Models;

namespace SocialApp.API.Data
{
    public class Seed
    {
        public static void SeedUsers(SocialAppDbContext context) 
        {
            if(!context.Users.Any())
            {
                var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
                //convert it to user object from json object
                var users=JsonConvert.DeserializeObject<List<User>>(userData);
                 
                 byte[] passwordhash, passwordSalt;
                
                 GetPasswordHash("password", out passwordhash, out passwordSalt);
                 foreach(var user in users)
                 {
                     user.PasswordHash=passwordhash;
                     user.PasswordSalt=passwordSalt;
                     user.Username=user.Username.ToLower();
                     context.Users.Add(user);
                 }
                 context.SaveChanges();
            }
        }

        private static void GetPasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}