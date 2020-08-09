using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SocialApp.API.Models;

namespace SocialApp.API.Data
{
    public class SocialRepository : ISocialRepository
    {
        private readonly SocialAppDbContext _context;
        public SocialRepository(SocialAppDbContext context)
        {
            _context = context;

        }
        public void Add<T>(T entity) where T : class
        {
             _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<User> GetUser(int id)
        {
           var user= await _context.Users.Include(x => x.Photos).FirstOrDefaultAsync(c => c.Id == id);

            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users= await _context.Users.Include(c => c.Photos).ToListAsync();

            return users;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}