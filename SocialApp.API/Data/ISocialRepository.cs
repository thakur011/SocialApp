using System.Collections.Generic;
using System.Threading.Tasks;
using SocialApp.API.Models;

namespace SocialApp.API.Data
{
    public interface ISocialRepository
    {
         //methods to Add Del Save select all select one.
         //T is used to create generic method instead of creating seprate for different 
         //class use T will replace class in method dynamically

         void Add<T> (T entity) where T:class;
         void Delete<T> (T entity) where T:class;

         Task<bool> SaveAll();
         Task<User> GetUser(int id);
         Task<IEnumerable<User>> GetUsers();
    }
}